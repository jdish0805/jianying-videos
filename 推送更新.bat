@echo off
chcp 65001 >nul
cd /d "%~dp0"
git add js/app.js
git commit -m "Update video URL to Release v1.0"
git push origin master
pause
