@echo off
chcp 65001 >nul
cd /d "%~dp0jianying-app"
echo Step 1: Initialize Git repository...
git init
echo.
echo Step 2: Configure Git LFS for mp4 files...
git lfs track "*.mp4"
echo.
echo Step 3: Copy videos from D:\hope to videos folder...
if not exist "videos" mkdir videos
copy /Y D:\hope\1.mp4 videos\1.mp4
copy /Y D:\hope\2.mp4 videos\2.mp4
copy /Y D:\hope\3.mp4 videos\3.mp4
copy /Y D:\hope\4.mp4 videos\4.mp4
copy /Y D:\hope\5.mp4 videos\5.mp4
echo.
echo Step 4: Add all files and commit...
git add .
git commit -m "Add Jianying course app with videos"
echo.
echo Current LFS tracking config:
type .gitattributes
echo.
echo Step 5: Set GitHub remote...
git remote remove origin 2>nul
git remote add origin https://github.com/jdish0805/jianying-videos.git
echo.
echo All local setup done!
echo.
echo NEXT STEP: Run the script to PUSH to GitHub.
pause
