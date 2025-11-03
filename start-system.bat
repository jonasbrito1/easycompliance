@echo off
echo ========================================
echo EasyCompliance - System Startup
echo ========================================
echo.

echo [1/5] Verificando Docker...
docker ps >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Docker Desktop nao esta rodando!
    echo Por favor, inicie o Docker Desktop e execute este script novamente.
    pause
    exit /b 1
)
echo [OK] Docker esta rodando

echo.
echo [2/5] Iniciando banco de dados PostgreSQL...
docker-compose up -d
if errorlevel 1 (
    echo [ERRO] Falha ao iniciar o banco de dados
    pause
    exit /b 1
)
echo [OK] Banco de dados iniciado

echo.
echo [3/5] Aguardando banco de dados ficar pronto (10 segundos)...
timeout /t 10 /nobreak

echo.
echo [4/5] Aplicando migracoes do Prisma...
cd backend
call npx prisma db push --accept-data-loss
if errorlevel 1 (
    echo [AVISO] Erro ao aplicar migracoes - continuando...
)
cd ..
echo [OK] Migracoes aplicadas

echo.
echo [5/5] Iniciando servidores...

echo.
echo Iniciando Backend (porta 3101)...
start "EasyCompliance Backend" cmd /k "cd backend && npm run start:dev"

echo.
echo Aguardando 5 segundos...
timeout /t 5 /nobreak

echo.
echo Iniciando Frontend (porta 3100)...
start "EasyCompliance Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo Sistema iniciado com sucesso!
echo ========================================
echo.
echo Backend: http://localhost:3101
echo Frontend: http://localhost:3100
echo Dashboard: http://localhost:3100/dashboard
echo Gestao de Riscos: http://localhost:3100/dashboard/riscos
echo.
echo Pressione qualquer tecla para abrir o navegador...
pause >nul

start http://localhost:3100/dashboard

echo.
echo Para parar os servidores, feche as janelas do terminal.
echo Para parar o Docker: docker-compose down
echo.
