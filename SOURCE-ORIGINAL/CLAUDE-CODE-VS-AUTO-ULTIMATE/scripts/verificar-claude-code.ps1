$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$settings = Get-Content (Join-Path $root ".claude\settings.json") -Raw | ConvertFrom-Json
$mcp = Get-Content (Join-Path $root ".mcp.json") -Raw | ConvertFrom-Json
$agents = @(Get-ChildItem (Join-Path $root ".claude\agents") -Filter *.md)
Write-Host "Workspace: $root"
Write-Host "Agentes .claude: $($agents.Count)"
Write-Host "9Router endpoint: $($settings.env.ANTHROPIC_BASE_URL)"
Write-Host "Modelo free routing: $($settings.env.ANTHROPIC_DEFAULT_SONNET_MODEL)"
Write-Host "MCPs: $($mcp.mcpServers.PSObject.Properties.Name -join ', ')"
try {
  $h = Invoke-RestMethod -Uri "http://127.0.0.1:20128/api/health" -TimeoutSec 3
  Write-Host "9Router health: $($h.ok)"
} catch {
  Write-Warning "9Router não está acessível. Inicie `9router` antes do Claude Code."
}
