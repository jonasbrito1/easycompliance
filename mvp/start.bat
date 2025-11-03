@echo off
REM EasyCompliance MVP - Script de Inicialização Rápida (Windows)

echo.
echo ================================
echo  EasyCompliance MVP - Starting
echo ================================
echo.

REM Verificar se o Docker está rodando
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not running. Please start Docker Desktop.
    pause
    exit /b 1
)

echo [OK] Docker is running
echo.

REM Criar arquivos .env se não existirem
if not exist backend\.env (
    echo [INFO] Creating backend\.env...
    copy backend\.env.example backend\.env >nul
)

if not exist frontend\.env (
    echo [INFO] Creating frontend\.env...
    copy frontend\.env.example frontend\.env >nul
)

echo.
echo [INFO] Starting Docker containers...
docker-compose up -d

echo.
echo [INFO] Waiting for services to start...
echo       This may take up to 2 minutes...
timeout /t 60 /nobreak >nul

echo.
echo ================================
echo  System started successfully!
echo ================================
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║                PORTAS ATUALIZADAS (LIVRES)             ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo   ┌─ Frontend:    http://localhost:4000
echo   ├─ Backend API: http://localhost:4001/api
echo   ├─ Swagger:     http://localhost:4001/api/docs
echo   ├─ phpMyAdmin:  http://localhost:8081
echo   ├─ MySQL:       localhost:3307
echo   └─ Redis:       localhost:6381
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║                LOGIN CREDENTIALS                       ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo   Email:    admin@easycompliance.com
echo   Password: Admin@2024
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║                USEFUL COMMANDS                         ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo   View logs:         docker-compose logs -f
echo   Stop containers:   docker-compose down
echo.
pause
