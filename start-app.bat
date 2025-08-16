@echo off
echo Starting AI Meeting Summarizer...
echo.

echo Starting backend server...
cd server
start "Backend Server" cmd /k "npm run dev"

echo.
echo Starting frontend...
cd ..\client
start "Frontend" cmd /k "npm run dev"

echo.
echo Application starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window...
pause > nul
