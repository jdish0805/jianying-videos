@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo 正在启动剪映教学APP服务器...
start "" "C:\Python314\python.exe" -m http.server 8080
timeout /t 3 >nul
start http://localhost:8080/index.html
echo.
echo 服务器已启动！
echo 请在浏览器中访问: http://localhost:8080/index.html
echo.
pause
