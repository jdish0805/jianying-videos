@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ================================
echo   剪映教学APP - 启动中...
echo ================================
echo.

REM 杀掉之前可能占着8080端口的python进程
taskkill //F //IM python.exe >nul 2>&1

REM 启动HTTP服务器（后台运行）
start "" "C:\Python314\python.exe" -m http.server 8080

REM 等3秒让服务器启动
timeout /t 3 >nul

REM 打开浏览器
start http://localhost:8080/index.html

echo.
echo ✅ 服务器已启动！
echo 🌐 浏览器已打开
echo.
echo 如果浏览器没打开，请手动访问：
echo http://localhost:8080/index.html
echo.
echo 关闭此窗口将停止服务器...
pause >nul
