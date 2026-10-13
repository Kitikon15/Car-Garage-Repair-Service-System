@echo off
title CarGarage PRO Launcher
echo ===================================================================
echo   CarGarage PRO - Car Garage ^& Repair Service Management System
echo   Architecture: FastAPI (Backend) + React Bootstrap (Frontend)
echo   Repository:   Kitikon15/Car-Garage-Repair-Service-System
echo ===================================================================
echo.

cd /d "%~dp0"

echo [1/2] Starting FastAPI Backend (Port 8000)...
start "CarGarage PRO Backend (FastAPI)" cmd /k "cd /d "%~dp0" && .\venv\Scripts\uvicorn.exe backend.main:app --reload --port 8000"

echo [2/2] Starting React Frontend (Port 3000)...
start "CarGarage PRO Frontend (React + Vite)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ===================================================================
echo   System servers launched successfully!
echo   - Web UI (React):  http://localhost:3000
echo   - API Docs:        http://localhost:8000/docs
echo ===================================================================
timeout /t 5
