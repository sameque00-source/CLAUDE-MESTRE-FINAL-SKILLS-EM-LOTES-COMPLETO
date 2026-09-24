<#
.SYNOPSIS
    Diagnostico dos servidores MCP: claude-flow (Ruflo) e Playwright.
    SOMENTE LEITURA - nao instala, nao inicia servidor.
.EXAMPLE
    .\scripts\verificar-mcp.ps1
#>
$ErrorActionPreference = 'Continue'
$Root = Split-Path -Parent $PSScriptRoot
$Ok = 0; $Err = 0; $Warn = 0

function G($l, $v) { Write-Host ("  [OK]    {0,-28} {1}" -f $l, $v) -ForegroundColor Green; $script:Ok++ }
function B($l, $v) { Write-Host ("  [ERRO]  {0,-28} {1}" -f $l, $v) -ForegroundColor Red;   $script:Err++ }
function W($l, $v) { Write-Host ("  [AVISO] {0,-28} {1}" -f $l, $v) -ForegroundColor Yellow; $script:Warn++ }

Write-Host "=== MCP - Diagnostico ===" -ForegroundColor Cyan
Write-Host ""

# ── .mcp.json ──
Write-Host "[ .mcp.json ]" -ForegroundColor White
$mcpPath = "$Root\.mcp.json"
if (-not (Test-Path $mcpPath)) {
    B ".mcp.json" "nao encontrado"
    Write-Host ""; Write-Host "MCP: ERRO" -ForegroundColor Red; exit 1
}
try {
    $j = Get-Content $mcpPath -Raw | ConvertFrom-Json
    G "JSON valido" "$(@($j.mcpServers.PSObject.Properties).Count) servidor(es)"
} catch {
    B "JSON invalido" $_.Exception.Message
    Write-Host ""; Write-Host "MCP: ERRO" -ForegroundColor Red; exit 1
}

# Sem segredos
$raw = Get-Content $mcpPath -Raw
if ($raw -match 'sk-ant|sk-or-|Bearer |api[_-]?key\s*[:=]\s*["'']\w{20}') {
    B "segredos" "possivel credencial no arquivo"
} else { G "sem segredos" "nenhuma credencial no .mcp.json" }

# ── claude-flow ──
Write-Host ""
Write-Host "[ claude-flow (Ruflo) ]" -ForegroundColor White
$cf = $j.mcpServers.'claude-flow'
if ($cf) {
    G "declarado" "$($cf.command) $($cf.args -join ' ')"
    if (Get-Command npx -EA SilentlyContinue) { G "npx disponivel" "sim" } else { B "npx" "ausente - o servidor nao sobe" }
    if ($cf.env.CLAUDE_FLOW_MAX_AGENTS) { G "MAX_AGENTS" "$($cf.env.CLAUDE_FLOW_MAX_AGENTS)" }
} else { B "claude-flow" "nao declarado" }

# ── playwright ──
Write-Host ""
Write-Host "[ playwright ]" -ForegroundColor White
$pw = $j.mcpServers.playwright
if ($pw) {
    G "declarado" "$($pw.command)"
    $cli = @($pw.args | Where-Object { $_ -like '*cli.js' })[0]
    if ($cli -and (Test-Path $cli)) { G "cli.js existe no disco" "$([math]::Round((Get-Item $cli).Length/1KB,1)) KB" }
    elseif ($cli) { B "cli.js" "caminho declarado NAO existe: $cli" }
    else { W "cli.js" "nao identificado nos args" }
} else { W "playwright" "nao declarado" }

# ── Pre-aprovacao no settings ──
Write-Host ""
Write-Host "[ Aprovacao dos servidores ]" -ForegroundColor White
$s = Get-Content "$Root\.claude\settings.json" -Raw | ConvertFrom-Json
if ($s.enableAllProjectMcpServers -eq $true) { G "enableAllProjectMcpServers" "true" }
else { W "enableAllProjectMcpServers" "ausente/false" }
if ($s.enabledMcpjsonServers) { G "enabledMcpjsonServers" "$($s.enabledMcpjsonServers -join ', ')" }
else { W "enabledMcpjsonServers" "ausente" }

# Workspace confiado (sem trust, permissoes e MCP sao ignorados)
$cjPath = "$env:USERPROFILE\.claude.json"
if (Test-Path $cjPath) {
    $cj = Get-Content $cjPath -Raw | ConvertFrom-Json
    $entry = $cj.projects.PSObject.Properties | Where-Object { $_.Name -like "*CLAUDE CODE VS FINAL*" }
    if ($entry -and $entry.Value.hasTrustDialogAccepted) { G "workspace confiado" "hasTrustDialogAccepted=true" }
    else { B "workspace confiado" "NAO - permissoes e MCP serao ignorados" }
}

# ── Status real via CLI ──
Write-Host ""
Write-Host "[ claude mcp list (status real) ]" -ForegroundColor White
if (Get-Command claude -EA SilentlyContinue) {
    Push-Location $Root
    $out = & claude mcp list 2>&1 | Out-String
    Pop-Location
    foreach ($line in ($out -split "`n" | Where-Object { $_ -match ':' -and $_ -notmatch 'Checking' })) {
        $t = $line.Trim()
        if (-not $t) { continue }
        if ($t -match 'Connected|✔')      { Write-Host "  [OK]    $t" -ForegroundColor Green; $Ok++ }
        elseif ($t -match 'Pending|⏸')    { Write-Host "  [AVISO] $t" -ForegroundColor Yellow; $Warn++ }
        elseif ($t -match 'Failed|✗')     { Write-Host "  [ERRO]  $t" -ForegroundColor Red; $Err++ }
        else                              { Write-Host "          $t" }
    }
} else { W "claude CLI" "nao encontrado - nao da para checar status real" }

Write-Host ""
if ($Err -eq 0) { Write-Host "MCP: OK ($Ok checagens, $Warn aviso(s))" -ForegroundColor Green; exit 0 }
else { Write-Host "MCP: ERRO ($Err falha(s))" -ForegroundColor Red; exit 1 }
