<#
.SYNOPSIS
    Diagnostico COMPLETO do workspace. Roda todas as verificacoes e agrega o resultado.
    SOMENTE LEITURA - nao altera nada, nao inicia servico, nao consome tokens.
.EXAMPLE
    .\scripts\verificar-ambiente.ps1
#>
$ErrorActionPreference = 'Continue'
$Root = Split-Path -Parent $PSScriptRoot
$Falhas = @()

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  CLAUDE CODE VS FINAL - Diagnostico Completo" -ForegroundColor Cyan
Write-Host "  $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# ── Ferramentas base ──
Write-Host ""
Write-Host "### FERRAMENTAS ###" -ForegroundColor White
$tools = [ordered]@{
    'Node.js'     = { node --version 2>$null }
    'npm'         = { npm --version 2>$null }
    'Python'      = { python --version 2>&1 }
    'Git'         = { git --version 2>$null }
    'Claude Code' = { claude --version 2>$null }
    'PowerShell'  = { $PSVersionTable.PSVersion.ToString() }
}
foreach ($t in $tools.GetEnumerator()) {
    $v = try { & $t.Value } catch { $null }
    if ($v) { Write-Host ("  [OK]    {0,-14} {1}" -f $t.Key, $v) -ForegroundColor Green }
    else    { Write-Host ("  [ERRO]  {0,-14} nao encontrado" -f $t.Key) -ForegroundColor Red; $Falhas += $t.Key }
}
if (Get-Command code -EA SilentlyContinue) { Write-Host ("  [OK]    {0,-14} instalado" -f 'VS Code') -ForegroundColor Green }
else { Write-Host ("  [AVISO] {0,-14} nao no PATH" -f 'VS Code') -ForegroundColor Yellow }

# ── Extensao oficial ──
Write-Host ""
Write-Host "### EXTENSAO VS CODE ###" -ForegroundColor White
if (Get-Command code -EA SilentlyContinue) {
    $ext = & code --list-extensions --show-versions 2>$null
    $cc = @($ext | Where-Object { $_ -like 'anthropic.claude-code*' })
    if ($cc) { Write-Host "  [OK]    anthropic.claude-code   $($cc[0])" -ForegroundColor Green }
    else { Write-Host "  [ERRO]  anthropic.claude-code   NAO instalada" -ForegroundColor Red; $Falhas += 'extensao' }
    $ps = @($ext | Where-Object { $_ -like 'ms-vscode.powershell*' })
    if ($ps) { Write-Host "  [OK]    ms-vscode.powershell    $($ps[0])" -ForegroundColor Green }
} else { Write-Host "  [AVISO] code nao no PATH - nao da para listar extensoes" -ForegroundColor Yellow }

# ── Estrutura do workspace ──
Write-Host ""
Write-Host "### ESTRUTURA ###" -ForegroundColor White
$esperados = @(
    '.claude\settings.json', '.mcp.json', 'CLAUDE.md',
    'CLAUDE-CODE-VS.code-workspace', '.gitignore'
)
foreach ($e in $esperados) {
    if (Test-Path "$Root\$e") { Write-Host ("  [OK]    {0}" -f $e) -ForegroundColor Green }
    else { Write-Host ("  [ERRO]  {0} ausente" -f $e) -ForegroundColor Red; $Falhas += $e }
}
$dirs = @{
    '.claude\agents' = 25; '.claude\rules' = 1; '.claude\skills' = 1
    'scripts' = 1; 'docs' = 1; 'config' = 0; 'tests' = 0; 'tools' = 0; 'workspace' = 0
}
foreach ($d in $dirs.GetEnumerator()) {
    $path = "$Root\$($d.Key)"
    if (Test-Path $path) {
        $n = @(Get-ChildItem $path -Recurse -File -EA SilentlyContinue).Count
        if ($n -ge $d.Value) { Write-Host ("  [OK]    {0,-18} {1} arquivo(s)" -f $d.Key, $n) -ForegroundColor Green }
        else { Write-Host ("  [ERRO]  {0,-18} {1} (esperado >= {2})" -f $d.Key, $n, $d.Value) -ForegroundColor Red; $Falhas += $d.Key }
    } else { Write-Host ("  [ERRO]  {0} ausente" -f $d.Key) -ForegroundColor Red; $Falhas += $d.Key }
}

# ── Seguranca ──
Write-Host ""
Write-Host "### SEGURANCA ###" -ForegroundColor White
$s = Get-Content "$Root\.claude\settings.json" -Raw | ConvertFrom-Json
$gitBash = @($s.permissions.deny + $s.permissions.allow | Where-Object { $_ -match '//c/' })
if ($gitBash.Count -eq 0) { Write-Host "  [OK]    deny-list em sintaxe Windows (C:/)" -ForegroundColor Green }
else { Write-Host "  [ERRO]  regras com sintaxe Git Bash (nunca casam): $($gitBash -join ', ')" -ForegroundColor Red; $Falhas += 'deny-syntax' }

$writeRules = @($s.permissions.deny | Where-Object { $_ -like 'Write(*' })
if ($writeRules.Count -eq 0) { Write-Host "  [OK]    deny usa Edit() (Write() e ignorado pelo CLI)" -ForegroundColor Green }
else { Write-Host "  [ERRO]  deny com Write(): $($writeRules -join ', ')" -ForegroundColor Red; $Falhas += 'deny-write' }

foreach ($alvo in @('ssh','FiveM','Imperiom')) {
    $tem = @($s.permissions.deny | Where-Object { $_ -match $alvo })
    if ($tem) { Write-Host ("  [OK]    bloqueio de {0,-10} ativo" -f $alvo) -ForegroundColor Green }
    else { Write-Host ("  [AVISO] sem bloqueio explicito de {0}" -f $alvo) -ForegroundColor Yellow }
}

# Os proprios scripts de diagnostico contem os padroes de busca — exclui-los evita falso positivo
$secrets = Get-ChildItem $Root -Recurse -File -Include *.json,*.md,*.ps1 -EA SilentlyContinue |
    Where-Object { $_.FullName -notlike "*\scripts\verificar-*" } |
    Select-String -Pattern 'sk-ant-|sk-or-|Bearer [A-Za-z0-9]{20}' -EA SilentlyContinue
if (-not $secrets) { Write-Host "  [OK]    nenhum segredo no workspace" -ForegroundColor Green }
else { Write-Host "  [ERRO]  possivel segredo em: $($secrets.Path -join ', ')" -ForegroundColor Red; $Falhas += 'secrets' }

# ── Sub-diagnosticos ──
$subs = [ordered]@{
    '9ROUTER'      = 'verificar-9router.ps1'
    'IMPERION-DEV' = 'verificar-imperion-dev.ps1'
    'AGENTES'      = 'verificar-agentes.ps1'
    'RUFLO'        = 'verificar-ruflo.ps1'
    'MCP'          = 'verificar-mcp.ps1'
}
$resultados = [ordered]@{}
foreach ($sub in $subs.GetEnumerator()) {
    Write-Host ""
    Write-Host ("### {0} ###" -f $sub.Key) -ForegroundColor White
    $script = "$PSScriptRoot\$($sub.Value)"
    if (-not (Test-Path $script)) {
        Write-Host "  [ERRO]  script ausente: $($sub.Value)" -ForegroundColor Red
        $resultados[$sub.Key] = 'ERRO'; $Falhas += $sub.Key
        continue
    }
    & powershell -NoProfile -ExecutionPolicy Bypass -File $script | ForEach-Object { Write-Host $_ }
    if ($LASTEXITCODE -eq 0) { $resultados[$sub.Key] = 'OK' }
    else { $resultados[$sub.Key] = 'ERRO'; $Falhas += $sub.Key }
}

# ── Resumo ──
Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  RESUMO" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
foreach ($r in $resultados.GetEnumerator()) {
    $cor = if ($r.Value -eq 'OK') { 'Green' } else { 'Red' }
    Write-Host ("  {0,-14} {1}" -f $r.Key, $r.Value) -ForegroundColor $cor
}
Write-Host ""
if ($Falhas.Count -eq 0) {
    Write-Host "  AMBIENTE: PRONTO" -ForegroundColor Green
    Write-Host ""
    exit 0
} else {
    Write-Host "  AMBIENTE: COM FALHAS ($($Falhas.Count))" -ForegroundColor Red
    Write-Host "  $($Falhas -join ', ')" -ForegroundColor Red
    Write-Host ""
    exit 1
}
