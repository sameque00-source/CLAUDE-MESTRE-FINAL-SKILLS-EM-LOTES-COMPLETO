<#
.SYNOPSIS
    Valida os 25 subagents do Claude (.claude/agents) e o store do Ruflo.
    SOMENTE LEITURA - nao cria, nao altera, nao executa agente.
.EXAMPLE
    .\scripts\verificar-agentes.ps1
#>
$ErrorActionPreference = 'Continue'
$Root = Split-Path -Parent $PSScriptRoot
$Ok = 0; $Err = 0

Write-Host "=== Agentes - Diagnostico ===" -ForegroundColor Cyan
Write-Host ""

# ── 1. Subagents do Claude (.claude/agents/*.md) ──
Write-Host "[ .claude/agents ]" -ForegroundColor White
$files = @(Get-ChildItem "$Root\.claude\agents\*.md" -EA SilentlyContinue)
Write-Host "  arquivos .md: $($files.Count)"

$semFrontmatter = @(); $semName = @(); $semDesc = @(); $comModelo = @(); $nomes = @{}

foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw
    if ($c -notmatch '(?s)\A---\r?\n(.*?)\r?\n---') { $semFrontmatter += $f.Name; continue }
    $fm = $Matches[1]
    if ($fm -match '(?m)^name:\s*(\S+)') {
        $n = $Matches[1]
        if ($nomes.ContainsKey($n)) { Write-Host "  [ERRO] nome duplicado: $n" -ForegroundColor Red; $Err++ }
        $nomes[$n] = $f.Name
    } else { $semName += $f.Name }
    if ($fm -notmatch '(?m)^description:\s*\S') { $semDesc += $f.Name }
    if ($fm -match '(?m)^model:\s*\S')          { $comModelo += $f.Name }
}

if ($files.Count -eq 25) { Write-Host "  [OK]    25 agentes encontrados" -ForegroundColor Green; $Ok++ }
else { Write-Host "  [ERRO]  esperado 25, encontrado $($files.Count)" -ForegroundColor Red; $Err++ }

if ($semFrontmatter.Count -eq 0) { Write-Host "  [OK]    frontmatter presente em todos" -ForegroundColor Green; $Ok++ }
else { Write-Host "  [ERRO]  sem frontmatter: $($semFrontmatter -join ', ')" -ForegroundColor Red; $Err++ }

if ($semName.Count -eq 0) { Write-Host "  [OK]    campo 'name' em todos" -ForegroundColor Green; $Ok++ }
else { Write-Host "  [ERRO]  sem name: $($semName -join ', ')" -ForegroundColor Red; $Err++ }

if ($semDesc.Count -eq 0) { Write-Host "  [OK]    campo 'description' em todos" -ForegroundColor Green; $Ok++ }
else { Write-Host "  [ERRO]  sem description: $($semDesc -join ', ')" -ForegroundColor Red; $Err++ }

if ($comModelo.Count -eq 0) {
    Write-Host "  [OK]    nenhum agente fixa 'model' (herdam da sessao)" -ForegroundColor Green; $Ok++
} else {
    Write-Host "  [ERRO]  fixam model (risco de 404): $($comModelo -join ', ')" -ForegroundColor Red; $Err++
}

# ── 2. Store do Ruflo ──
Write-Host ""
Write-Host "[ .claude-flow/agents/store.json ]" -ForegroundColor White
$store = "$Root\.claude-flow\agents\store.json"
if (Test-Path $store) {
    $j = Get-Content $store -Raw | ConvertFrom-Json
    $n = @($j.agents.PSObject.Properties).Count
    if ($n -eq 25) { Write-Host "  [OK]    $n agentes no store (Queen + 24 workers)" -ForegroundColor Green; $Ok++ }
    else { Write-Host "  [ERRO]  $n agentes (esperado 25)" -ForegroundColor Red; $Err++ }

    if ($j.agents.PSObject.Properties.Name -contains 'queen-coordinator') {
        Write-Host "  [OK]    queen-coordinator presente" -ForegroundColor Green; $Ok++
    } else { Write-Host "  [ERRO]  queen-coordinator ausente" -ForegroundColor Red; $Err++ }
} else {
    Write-Host "  [ERRO]  store.json nao encontrado" -ForegroundColor Red; $Err++
}

# ── 3. Listagem ──
Write-Host ""
Write-Host "[ Agentes disponiveis ]" -ForegroundColor White
$nomes.Keys | Sort-Object | ForEach-Object {
    $tag = if ($_ -eq 'queen-coordinator') { '[QUEEN] ' } else { '[worker]' }
    Write-Host "  $tag $_"
}

Write-Host ""
if ($Err -eq 0) { Write-Host "AGENTES: OK ($Ok checagens)" -ForegroundColor Green; exit 0 }
else { Write-Host "AGENTES: ERRO ($Err falha(s))" -ForegroundColor Red; exit 1 }
