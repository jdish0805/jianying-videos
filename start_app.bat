@echo off
chcp 65001 > nul
cd /d "%~dp0"
start "PythonServer" /min "C:\Python314\python.exe" -m http.server 8080
timeout /t 3 >nul
start "" "http://localhost:8080/index.html"
