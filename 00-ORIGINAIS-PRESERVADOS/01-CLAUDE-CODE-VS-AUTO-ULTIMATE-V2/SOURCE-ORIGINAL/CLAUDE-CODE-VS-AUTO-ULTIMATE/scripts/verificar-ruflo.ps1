<#
.SYNOPSIS
    Diagnostico do Ruflo / Claude Flow: config, Queen, Hive Mind, Swarm.
    SOMENTE LEITURA - nao inicializa, nao recria, nao altera estado.
.EXAMPLE
    .\scripts\verificar-ruflo.ps1
#>
$ErrorActionPreference = 'Continue'
$Root = Split-Path -Parent $PSScriptRoot
$CF = "$Root\.claude-flow"
$Ok = 0; $Err = 0; $Warn = 0

function G($l, $v) { Write-Host ("  [OK]    {0,-24} {1}" -f $l, $v) -ForegroundColor Green; $script:Ok++ }
function B($l, $v) { Write-Host ("  [ERRO]  {0,-24} {1}" -f $l, $v) -ForegroundColor Red;   $script:Err++ }
function W($l, $v) { Write-Host ("  [AVISO] {0,-24} {1}" -f $l, $v) -ForegroundColor Yellow; $script:Warn++ }

Write-Host "=== Ruflo / Claude Flow - Diagnostico ===" -ForegroundColor Cyan
Write-Host ""

# ── config.json ──
Write-Host "[ Configuracao ]" -ForegroundColor White
$cfgPath = "$CF\config.json"
if (Test-Path $cfgPath) {
    $cfg = Get-Content $cfgPath -Raw | ConvertFrom-Json
    G "config.json" "v$($cfg.version)"
    $p = $cfg.scopes.project
    if ($p.FREE_ONLY -eq $true) { G "FREE_ONLY" "true" } else { B "FREE_ONLY" "$($p.FREE_ONLY) (deve ser true)" }
    if ($p.'model.routing.enabled' -eq $true) { G "model.routing.enabled" "true" } else { B "model.routing.enabled" "$($p.'model.routing.enabled')" }
    G "topologia" "$($p.topology)"
    G "swarm.maxAgents" "$($p.'swarm.maxAgents')"
} else { B "config.json" "nao encontrado" }

# ── Hive Mind / Queen ──
Write-Host ""
Write-Host "[ Hive Mind / Queen ]" -ForegroundColor White
$hmPath = "$CF\hive-mind\state.json"
if (Test-Path $hmPath) {
    $hm = Get-Content $hmPath -Raw | ConvertFrom-Json
    G "state.json" "presente"
    if ($hm.queen) {
        $qid = if ($hm.queen.agentId) { $hm.queen.agentId } elseif ($hm.queen.id) { $hm.queen.id } else { 'queen' }
        G "Queen" "$qid"
    } else { W "Queen" "nao declarada no state (carrega no runtime)" }
    if ($hm.topology)  { G "topologia hive" "$($hm.topology)" }
    # consensus pode ser string (ex: "raft") ou objeto de estado — normalizar para exibir
    if ($hm.consensus) {
        $cons = if ($hm.consensus -is [string]) { $hm.consensus }
                elseif ($hm.consensus.pending -ne $null) { "ativo ($(@($hm.consensus.pending).Count) pendente(s))" }
                else { 'presente' }
        G "consenso" $cons
    }
    $wc = if ($hm.workers -is [array]) { $hm.workers.Count } elseif ($hm.workerCount) { $hm.workerCount } else { 0 }
    if ($wc -gt 0) { G "workers" "$wc" } else { W "workers" "0 no arquivo (registram no runtime)" }
} else { B "hive-mind/state.json" "nao encontrado" }

# ── Swarm ──
Write-Host ""
Write-Host "[ Swarm ]" -ForegroundColor White
$swPath = "$CF\swarm\swarm-state.json"
if (Test-Path $swPath) {
    $sw = Get-Content $swPath -Raw | ConvertFrom-Json
    G "swarm-state.json" "presente"
    if ($sw.topology) { G "topologia swarm" "$($sw.topology)" }
    if ($sw.agentCount) { G "agentCount" "$($sw.agentCount)" }
    # maxAgents menor que agentCount e conhecido e inofensivo (autoScaling)
    if ($sw.maxAgents -and $sw.agentCount -and $sw.maxAgents -lt $sw.agentCount) {
        W "maxAgents" "$($sw.maxAgents) < agentCount $($sw.agentCount) - normal (gravado na init, autoScaling ativo)"
    }
} else { B "swarm/swarm-state.json" "nao encontrado" }

# ── Memoria e MCP ──
Write-Host ""
Write-Host "[ Memoria / MCP ]" -ForegroundColor White
if (Test-Path "$CF\policy\state.json") { G "policy/state.json" "presente" } else { W "policy/state.json" "ausente" }
$mcp = "$Root\.mcp.json"
if (Test-Path $mcp) {
    $j = Get-Content $mcp -Raw | ConvertFrom-Json
    if ($j.mcpServers.'claude-flow') { G "MCP claude-flow" "declarado" } else { B "MCP claude-flow" "nao declarado" }
} else { B ".mcp.json" "nao encontrado" }
if (Get-Command npx -EA SilentlyContinue) { G "npx" "disponivel (roda o ruflo)" } else { B "npx" "ausente" }

Write-Host ""
if ($Err -eq 0) { Write-Host "RUFLO: OK ($Ok checagens, $Warn aviso(s))" -ForegroundColor Green; exit 0 }
else { Write-Host "RUFLO: ERRO ($Err falha(s))" -ForegroundColor Red; exit 1 }
