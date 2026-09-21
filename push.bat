@echo off
chcp 65001 > nul
title Git Push to GitHub (bible1309)
echo ========================================================
echo  GitHub 저장소(bible1309)로 푸시를 시작합니다...
echo ========================================================
set PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%

cd /d "c:\helder2026"
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo  [성공] 모든 파일이 GitHub에 성공적으로 푸시되었습니다!
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo  [안내] 브라우저 로그인 창이 뜨면 승인(Authorize)해 주세요.
    echo ========================================================
)
pause
