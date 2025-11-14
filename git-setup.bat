@echo off
echo Setting up Git repository and pushing to GitHub...

REM Initialize git if not already done
git init

REM Add all files
git add .

REM Commit changes
git commit -m "Initial commit: QuickBite Food Delivery Application - Complete MERN Stack Project"

REM Add remote origin - REPLACE 'YOUR_GITHUB_USERNAME' with your actual username
set /p username="Enter your GitHub username: "
git remote add origin https://github.com/%username%/quickbite-food-delivery.git

REM Push to GitHub
git branch -M main
git push -u origin main

echo.
echo Repository pushed to GitHub successfully!
echo Your project is now available at: https://github.com/%username%/quickbite-food-delivery
pause