@echo off
chcp 65001 >nul
cd /d "C:\Users\jdish\WorkBuddy\20260502104248\jianying-app"

echo Step 1: Set Git identity...
git config user.email "jdish0805@github.com"
git config user.name "jdish0805"
echo Done!
echo.

echo Step 2: Add all files...
git add .
echo Done!
echo.

echo Step 3: Commit files...
git commit -m "Add Jianying course app with videos"
echo.

echo Step 4: Push to GitHub...
git push -u origin master
echo.
echo Done!
pause
