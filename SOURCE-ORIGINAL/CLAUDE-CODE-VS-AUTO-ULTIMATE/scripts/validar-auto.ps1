$ErrorActionPreference = 'Stop'
Write-Host '== Claude Code VS AUTO ULTIMATE ==' -ForegroundColor Cyan
$rows = @()
try { $r = Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:20128/api/health' -TimeoutSec 3; $rows += [pscustomobject]@{Item='9Router health';Ok=($r.StatusCode -eq 200)} } catch { $rows += [pscustomobject]@{Item='9Router health';Ok=$false} }
try { $m=(Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:20128/v1/models' -TimeoutSec 3).Content; $rows += [pscustomobject]@{Item='imperion-dev';Ok=($m -match 'imperion-dev')} } catch { $rows += [pscustomobject]@{Item='imperion-dev';Ok=$false} }
$rows += [pscustomobject]@{Item='Inteligencia claude';Ok=(Test-Path 'C:\Users\Administrator\Documents\Inteligencia claude')}
$rows += [pscustomobject]@{Item='MCP config';Ok=(Test-Path '.mcp.json')}
$rows += [pscustomobject]@{Item='Ruflo skill bundle';Ok=(Test-Path '.\tools\ruflo\.agents\skills')}
$rows | Format-Table -AutoSize
if ($rows.Ok -contains $false) { exit 1 }
