@echo off
chcp 65001 >nul
echo Checking Git status in jianying-app folder...
echo.
cd /d "C:\Users\jdish\WorkBuddy\20260502104248\jianying-app"
echo Current folder:
cd
echo.
echo Checking Git branch:
git branch
echo.
echo Checking Git log:
git log --oneline -3
echo.
echo Checking Git remote:
git remote -v
echo.
echo Checking if videos are present:
dir videos
echo.
echo Ready to push. Press any key to exit.
pause
