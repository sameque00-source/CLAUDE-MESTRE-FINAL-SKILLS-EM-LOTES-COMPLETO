@echo off
REM ============================================================
REM  AI-ORCHESTRATOR — inicializacao do gateway (porta 20130)
REM
REM  O Claude Code aponta para http://localhost:20130 via
REM  %USERPROFILE%\.claude\settings.json. Se este gateway nao
REM  estiver rodando, o Claude Code nao responde — por isso ele
REM  e iniciado automaticamente no logon (tarefa agendada
REM  "AI-Orchestrator-Gateway").
REM
REM  Para voltar ao 9Router como rota principal, rode o ROLLBACK.sh em
REM  Documents\Imperiom Fivem\BACKUPS_AMBIENTE_LOCAL\CLAUDE_SETTINGS_SWITCH_*
REM ============================================================

REM se a porta 20130 ja estiver ocupada, nao sobe outra instancia
netstat -ano | findstr ":20130" | findstr "LISTENING" >nul
if %errorlevel%==0 (
  echo [AI-ORCHESTRATOR] Gateway ja esta rodando na porta 20130.
  exit /b 0
)

echo [AI-ORCHESTRATOR] Iniciando gateway na porta 20130...

REM Start-Process desanexa de verdade: o processo filho sobrevive ao fim
REM deste .cmd e nao prende o terminal que o chamou (o "start /b" puro
REM mantinha o stdout preso e travava quem chamasse o script de forma sincrona).
powershell -NoProfile -WindowStyle Hidden -Command ^
  "Start-Process -FilePath 'node' -ArgumentList 'server.js' -WorkingDirectory '%~dp0gateway' -WindowStyle Hidden -RedirectStandardOutput '%~dp0logs\gateway-stdout.log' -RedirectStandardError '%~dp0logs\gateway-stderr.log'"

exit /b 0
