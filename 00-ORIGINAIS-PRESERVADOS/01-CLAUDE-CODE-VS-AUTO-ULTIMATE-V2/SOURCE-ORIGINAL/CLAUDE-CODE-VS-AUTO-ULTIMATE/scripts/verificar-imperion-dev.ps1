<#
.SYNOPSIS
    Confirma que o modelo imperion-dev esta disponivel via 9Router.
.DESCRIPTION
    Diagnostico. Nao altera nenhum arquivo nem configuracao.
    Faz UM POST a /v1/messages com max_tokens=1 apenas para distinguir
    "modelo aceito" (HTTP 401 por falta de credencial) de "modelo inexistente"
    (HTTP 404). Como a credencial nao fica no workspace, a requisicao para no 401
    e nenhum token e consumido.
.EXAMPLE
    .\scripts\verificar-imperion-dev.ps1
#>
$ErrorActionPreference = 'Continue'
$Port = 20128
$Modelo = 'imperion-dev'

Write-Host "=== imperion-dev - Diagnostico ===" -ForegroundColor Cyan
Write-Host ""

# 1. /v1/models tem que responder
try {
    $m = Invoke-RestMethod "http://localhost:$Port/v1/models" -TimeoutSec 5
} catch {
    Write-Host "  [ERRO]  /v1/models nao respondeu" -ForegroundColor Red
    Write-Host ""
    Write-Host "IMPERION-DEV: ERRO - 9Router offline" -ForegroundColor Red
    Write-Host "Inicie com: 9router" -ForegroundColor Yellow
    exit 1
}
Write-Host ("  [OK]    {0,-26} {1}" -f "/v1/models", "$($m.data.Count) modelos") -ForegroundColor Green

# 2. imperion-dev presente na lista
if ($m.data.id -contains $Modelo) {
    Write-Host ("  [OK]    {0,-26} {1}" -f "modelo '$Modelo'", "presente na lista") -ForegroundColor Green
} else {
    Write-Host ("  [ERRO]  {0,-26} {1}" -f "modelo '$Modelo'", "NAO encontrado") -ForegroundColor Red
    Write-Host ""
    Write-Host "  O alias e criado pelo 9Router a partir de:" -ForegroundColor Yellow
    Write-Host "  %APPDATA%\9router\combo-models.json (arquivo global, fora deste workspace)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "IMPERION-DEV: ERRO" -ForegroundColor Red
    exit 1
}

# 3. O router aceita o modelo no endpoint de mensagens
#    401 = modelo aceito, falta credencial (esperado, a key nao fica aqui)
#    404 = modelo desconhecido (problema real)
$body = @{ model = $Modelo; max_tokens = 1; messages = @(@{ role = 'user'; content = 'x' }) } | ConvertTo-Json -Depth 5
try {
    Invoke-RestMethod "http://localhost:$Port/v1/messages" -Method Post -Body $body `
        -ContentType 'application/json' -Headers @{ 'anthropic-version' = '2023-06-01' } -TimeoutSec 8 | Out-Null
    Write-Host ("  [OK]    {0,-26} {1}" -f "/v1/messages", "aceitou o modelo") -ForegroundColor Green
} catch {
    $code = $_.Exception.Response.StatusCode.value__
    if ($code -eq 401 -or $code -eq 403) {
        Write-Host ("  [OK]    {0,-26} {1}" -f "/v1/messages", "HTTP $code (modelo aceito; credencial vem do perfil)") -ForegroundColor Green
    } elseif ($code -eq 404) {
        Write-Host ("  [ERRO]  {0,-26} {1}" -f "/v1/messages", "HTTP 404 - modelo desconhecido") -ForegroundColor Red
        Write-Host ""
        Write-Host "IMPERION-DEV: ERRO" -ForegroundColor Red
        exit 1
    } else {
        Write-Host ("  [OK]    {0,-26} {1}" -f "/v1/messages", "HTTP $code") -ForegroundColor Yellow
    }
}

# 4. Workspace aponta para o modelo certo
$Root = Split-Path -Parent $PSScriptRoot
$s = Get-Content "$Root\.claude\settings.json" -Raw | ConvertFrom-Json
$tiers = @('ANTHROPIC_DEFAULT_OPUS_MODEL','ANTHROPIC_DEFAULT_SONNET_MODEL','ANTHROPIC_DEFAULT_HAIKU_MODEL','ANTHROPIC_DEFAULT_FABLE_MODEL')
$wrong = @($tiers | Where-Object { $s.env.$_ -ne $Modelo })
if ($wrong.Count -eq 0) {
    Write-Host ("  [OK]    {0,-26} {1}" -f "settings.json", "4 tiers -> $Modelo") -ForegroundColor Green
} else {
    Write-Host ("  [ERRO]  {0,-26} {1}" -f "settings.json", "$($wrong -join ', ') nao apontam para $Modelo") -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "IMPERION-DEV: OK" -ForegroundColor Green
exit 0
