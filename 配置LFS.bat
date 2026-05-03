@echo off
chcp 65001 >nul
cd /d "%~dp0jianying-app"
echo Configuring Git LFS for mp4 files...
git lfs track "*.mp4"
echo.
echo Current LFS tracking config:
type .gitattributes
echo.
echo Done!
pause
