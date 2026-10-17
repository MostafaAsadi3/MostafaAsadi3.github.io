@echo off
setlocal
cd /d "%~dp0"
set "ASTRO_TELEMETRY_DISABLED=1"
echo.
echo Starting Mostafa Asadi's portfolio...
echo Keep this window open while viewing the website.
echo Open the Local URL printed by Astro in your browser.
echo.
call npm.cmd run dev -- --port 4321
echo.
echo The development server has stopped.
pause
