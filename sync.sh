#!/bin/bash
# ============================================
# Auto Git Sync Script for LegalCRM
# This script will pull and push changes automatically
# ============================================

echo ""
echo "========================================"
echo "  LegalCRM - Auto Git Sync"
echo "========================================"
echo ""

# Get current branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "Current branch: $BRANCH"
echo ""

# Check if there are any changes
git status --short
echo ""

# Add all changes (excluding .claude/ and credentials.md which should be in .gitignore)
echo "Adding changes..."
git add .
echo ""

# Check if there's anything to commit
if git diff --cached --quiet; then
    echo "No changes to commit"
else
    echo "Committing changes..."
    git commit -m "Auto-sync: Updates from local - $(date)"
    echo ""
fi

# Pull latest changes from remote
echo "Pulling latest changes from GitHub..."
if ! git pull origin "$BRANCH" --no-rebase; then
    echo ""
    echo "ERROR: Pull failed! Please resolve conflicts manually."
    exit 1
fi
echo ""

# Push changes to remote
echo "Pushing changes to GitHub..."
if ! git push origin "$BRANCH"; then
    echo ""
    echo "ERROR: Push failed! Check your connection and credentials."
    exit 1
fi
echo ""

echo "========================================"
echo "  Sync completed successfully!"
echo "========================================"
echo ""
