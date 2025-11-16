@echo off
REM ============================================
REM Auto Git Sync Script for LegalCRM
REM This script will pull and push changes automatically
REM ============================================

echo.
echo ========================================
echo   LegalCRM - Auto Git Sync
echo ========================================
echo.

REM Get current branch name
for /f "tokens=*" %%a in ('git rev-parse --abbrev-ref HEAD') do set BRANCH=%%a
echo Current branch: %BRANCH%
echo.

REM Check if there are any changes
git status --short
echo.

REM Add all changes (excluding .claude/ and credentials.md which should be in .gitignore)
echo Adding changes...
git add .
echo.

REM Check if there's anything to commit
git diff --cached --quiet
if %errorlevel% equ 0 (
    echo No changes to commit
) else (
    echo Committing changes...
    git commit -m "Auto-sync: Updates from local - %date% %time%"
    echo.
)

REM Pull latest changes from remote
echo Pulling latest changes from GitHub...
git pull origin %BRANCH% --no-rebase
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Pull failed! Please resolve conflicts manually.
    pause
    exit /b 1
)
echo.

REM Push changes to remote
echo Pushing changes to GitHub...
git push origin %BRANCH%
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Push failed! Check your connection and credentials.
    pause
    exit /b 1
)
echo.

echo ========================================
echo   Sync completed successfully!
echo ========================================
echo.
pause
