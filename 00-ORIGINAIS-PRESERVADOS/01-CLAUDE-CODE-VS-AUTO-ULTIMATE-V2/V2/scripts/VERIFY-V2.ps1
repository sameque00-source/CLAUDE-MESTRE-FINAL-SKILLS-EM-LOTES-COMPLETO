Write-Host "Verificando estrutura V2..."
$required = @(
  ".claude\agents",
  ".claude\rules",
  ".claude\skills",
  "docs",
  "manifests",
  "tests",
  "scripts"
)
foreach ($p in $required) {
  if (!(Test-Path $p)) { throw "Ausente: $p" }
}
$agents = Get-ChildItem ".claude\agents\*.md"
$skills = Get-ChildItem ".claude\skills" -Recurse -Filter "SKILL.md"
if ($agents.Count -ne 25) { throw "Esperados 25 agentes; encontrados $($agents.Count)" }
if ($skills.Count -ne 275) { throw "Esperados 275 SKILL.md; encontrados $($skills.Count)" }
Write-Host "OK: 25 agentes e 275 SKILL.md."
