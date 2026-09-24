<#
.SYNOPSIS
    Diagnostico do 9Router local. SOMENTE LEITURA - nao inicia nem para nada.
.EXAMPLE
    .\scripts\verificar-9router.ps1
#>
$ErrorActionPreference = 'Continue'
$Port = 20128
$Ok = 0; $Err = 0

function Chk($label, $val, $good = $true) {
    if ($good) { Write-Host ("  [OK]    {0,-26} {1}" -f $label, $val) -ForegroundColor Green; $script:Ok++ }
    else       { Write-Host ("  [ERRO]  {0,-26} {1}" -f $label, $val) -ForegroundColor Red;   $script:Err++ }
}

Write-Host "=== 9Router - Diagnostico ===" -ForegroundColor Cyan
Write-Host ""

# Comando instalado
$cmd = Get-Command 9router -EA SilentlyContinue
if ($cmd) {
    $v = (& 9router --version 2>$null | Select-Object -First 1)
    Chk "comando 9router" "v$v"
} else {
    Chk "comando 9router" "nao encontrado no PATH" $false
}

# Porta escutando
$conn = Get-NetTCPConnection -LocalPort $Port -State Listen -EA SilentlyContinue
if ($conn) { Chk "porta $Port" "LISTENING (PID $($conn[0].OwningProcess))" }
else       { Chk "porta $Port" "sem listener" $false }

# Health
try {
    $h = Invoke-RestMethod "http://localhost:$Port/api/health" -TimeoutSec 3
    if ($h.ok) { Chk "/api/health" "ok:true" } else { Chk "/api/health" "resposta inesperada" $false }
} catch {
    Chk "/api/health" "sem resposta" $false
}

# /v1/models responde
try {
    $m = Invoke-RestMethod "http://localhost:$Port/v1/models" -TimeoutSec 5
    Chk "/v1/models" "$($m.data.Count) modelos"
} catch {
    Chk "/v1/models" "falhou" $false
}

Write-Host ""
if ($Err -eq 0) {
    Write-Host "9ROUTER: OK" -ForegroundColor Green
    exit 0
} else {
    Write-Host "9ROUTER: ERRO ($Err falha(s))" -ForegroundColor Red
    Write-Host "Para iniciar, abra outro terminal e rode: 9router" -ForegroundColor Yellow
    exit 1
}
