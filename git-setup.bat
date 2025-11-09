@echo off
echo Setting up Git repository and pushing to GitHub...

REM Initialize git if not already done
git init

REM Add all files
git add .

REM Commit changes
git commit -m "Enhanced QuickBite app: Fixed images, added more food items, working wishlist, and functional website links"

REM Add remote origin (replace YOUR_USERNAME with your GitHub username)
echo.
echo Please replace YOUR_USERNAME in the next command with your actual GitHub username
echo Example: git remote add origin https://github.com/yourusername/quickbite-food-delivery.git
echo.
pause

REM Push to GitHub
git branch -M main
git push -u origin main

echo.
echo Repository pushed to GitHub successfully!
pause