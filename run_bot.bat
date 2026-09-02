@echo off
title NexusLink Pro - Autonomous Backlink Engine Runner
echo =====================================================================
echo ⚡ NEXUSLINK PRO - MONEYROBOT-CLASS SEO AUTOMATION ENGINE
echo =====================================================================
echo.
echo Installing Python requirements...
python -m pip install -r requirements.txt
echo.
echo Starting Autonomous Backlink Matrix...
python nexus_bot.py
echo.
echo Mission Complete! Check verified_backlinks_report.json for details.
pause
