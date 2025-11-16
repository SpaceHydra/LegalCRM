# Git Sync Guide for LegalCRM

## Quick Sync

Instead of running `git pull` and `git push` manually every time, you can now use the automated sync scripts!

### Windows Users

Simply double-click or run:
```bash
sync.bat
```

### Linux/Mac Users

Run in terminal:
```bash
./sync.sh
```

## What the Sync Script Does

1. ✅ Shows your current branch
2. ✅ Displays what files have changed
3. ✅ Automatically adds all changes
4. ✅ Commits changes with timestamp
5. ✅ Pulls latest changes from GitHub
6. ✅ Pushes your changes to GitHub
7. ✅ Shows success/error messages

## Protected Files

The following files are automatically excluded from commits (via `.gitignore`):
- `.claude/` - Claude Code configuration
- `credentials.md` - Your credentials file
- `*.env` - Environment files
- `*.key`, `*.pem` - Security keys

## Manual Sync (Alternative)

If you prefer manual control:

### Pull changes from GitHub:
```bash
git pull origin main
```

### Push changes to GitHub:
```bash
git add .
git commit -m "Your message here"
git push origin main
```

## Troubleshooting

**If sync fails:**
1. Check your internet connection
2. Verify you're authenticated with GitHub
3. If there are conflicts, you may need to resolve them manually
4. Run `git status` to see what's happening

**To check sync status:**
```bash
git status
```

**To view recent commits:**
```bash
git log --oneline -5
```

## Tips

- Run sync before starting work to get latest changes
- Run sync after completing a feature to backup your work
- The script is safe to run multiple times
- If no changes are detected, it will just pull and push without committing

---

*Happy syncing! 🚀*
