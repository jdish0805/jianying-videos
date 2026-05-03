@echo off
chcp 65001 >nul
cd /d "C:\Users\jdish\WorkBuddy\20260502104248\jianying-app"

echo Step 1: Check LFS config...
type .gitattributes
echo.

echo Step 2: Add all files to Git...
git add .
echo.

echo Step 3: Commit files...
git commit -m "Add Jianying course app with videos"
echo.

echo Step 4: Push to GitHub...
echo Please enter your GitHub username when asked.
echo When asked for password, use your GitHub password or Personal Access Token.
echo.
git push -u origin master
echo.
echo Done!
pause
