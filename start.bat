@echo off
cd /d "%~dp0"
start "Server" /min "C:\Python314\python.exe" -m http.server 8080
ping 127.0.0.1 -n 3 > nul
start "" "http://localhost:8080/index.html"
echo Server is running in background.
echo Close this window to stop the server.
pause
