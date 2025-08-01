#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    
    # Deploy to GitHub Pages using gh-pages
    echo "Deploying to GitHub Pages..."
    npx gh-pages -d dist
    
    echo "Deployment complete!"
    echo "Your site will be available at: https://reihand81.github.io/pemilu/"
else
    echo "Build failed. Please fix the errors and try again."
    exit 1
fi