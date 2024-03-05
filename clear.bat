@echo off
setlocal enabledelayedexpansion

rem Read the .env file and set the WATCH_DIR variable
for /F "tokens=1,* delims==" %%A in (.env) do (
    if "%%A"=="WATCH_DIR" (
        set WATCH_DIR=%%B
    )
)

echo Deleting all .dds files in %WATCH_DIR%

rem Use the WATCH_DIR variable in your forfiles command
forfiles /S /P "%WATCH_DIR%" /M "*.dds" /C "cmd /c del @path"
