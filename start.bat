@echo off
REM Double-click to serve the bank and open it. Close this window to stop.
cd /d "%~dp0"
start "" "http://localhost:8000"
python -m http.server 8000
