@echo off
chcp 65001 >nul
cd /d "C:\Users\jdish\WorkBuddy\20260502104248\jianying-app"
echo.
echo Step 1: Check current branch name...
git branch
echo.
echo Step 2: Push to GitHub...
git push -u origin master
echo.
echo Done!
pause
