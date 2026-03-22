#!/bin/bash
set -e

# Read current version from sw.js or default to 1
CURRENT=$(grep -oP "cat-ticket-v\K[0-9]+" sw.js 2>/dev/null || echo "0")
NEXT=$((CURRENT + 1))

echo "Bumping cache version: v$CURRENT -> v$NEXT"

# Update version in sw.js
sed -i "s/cat-ticket-v$CURRENT/cat-ticket-v$NEXT/g" sw.js

# Stage, commit, push
git add .
git commit -m "deploy: bump cache to v$NEXT"
git push

echo "Done! Cloudflare will redeploy shortly with cache v$NEXT."
