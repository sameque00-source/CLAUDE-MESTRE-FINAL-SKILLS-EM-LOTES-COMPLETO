<#
.SYNOPSIS
    Inicia o 9Router local (backend de modelos gratuitos do Claude Code).
.DESCRIPTION
    Verifica se o 9Router ja esta rodando na porta 20128. Se estiver, avisa e sai.
    Se nao estiver, inicia o processo. Nao contem nenhum secret.
.EXAMPLE
    .\scripts\start-9router.ps1
#>

$ErrorActionPreference = 'Stop'
$Port = 20128
$HealthUrl = "http://localhost:$Port/api/health"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  9Router - Inicializacao" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar se ja esta rodando
Write-Host "[1/3] Verificando se o 9Router ja esta ativo..." -ForegroundColor Yellow
try {
    $resp = Invoke-RestMethod -Uri $HealthUrl -TimeoutSec 3 -ErrorAction Stop
    if ($resp.ok -eq $true) {
        Write-Host "      OK: 9Router JA ESTA RODANDO na porta $Port" -ForegroundColor Green
        Write-Host ""
        Write-Host "Nada a fazer. Abra outro terminal e rode: claude" -ForegroundColor Cyan
        exit 0
    }
} catch {
    Write-Host "      9Router offline - iniciando..." -ForegroundColor Gray
}

# 2. Localizar o binario
Write-Host "[2/3] Localizando o 9Router..." -ForegroundColor Yellow
$router = Get-Command 9router -ErrorAction SilentlyContinue
if (-not $router) {
    Write-Host "      ERRO: comando '9router' nao encontrado no PATH." -ForegroundColor Red
    Write-Host "      Instale com: npm install -g 9router" -ForegroundColor Red
    exit 1
}
Write-Host "      OK: $($router.Source)" -ForegroundColor Green

# 3. Iniciar
Write-Host "[3/3] Iniciando o 9Router (porta $Port)..." -ForegroundColor Yellow
Write-Host ""
Write-Host "-----------------------------------------" -ForegroundColor DarkGray
Write-Host "Deixe ESTE terminal aberto." -ForegroundColor Cyan
Write-Host "Abra OUTRO terminal e rode: claude" -ForegroundColor Cyan
Write-Host "-----------------------------------------" -ForegroundColor DarkGray
Write-Host ""

& 9router
