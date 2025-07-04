@echo off
echo Starting School CMS Application...
echo.

echo Stopping any existing servers...
taskkill /f /im node.exe >nul 2>&1

echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d d:\project\server && node index.js"

echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d d:\project && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5001
echo Frontend: http://localhost:5173
echo Secret Admin: http://localhost:5173/secret
echo.
echo Press any key to continue...
pause > nul
