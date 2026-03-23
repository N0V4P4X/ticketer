#!/bin/bash
# SPDX-License-Identifier: GPL-3.0-or-later
# Copyright (C) 2026 N0V4-N3XU5

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

# ── GPLv3 interactive notice ──────────────────────────────────────────────────

gplv3_notice() {
    echo "ticketer  Copyright (C) 2026  N0V4-N3XU5"
    echo "This program comes with ABSOLUTELY NO WARRANTY; for details type 'show w'."
    echo "This is free software, and you are welcome to redistribute it"
    echo "under certain conditions; type 'show c' for details."
}

# Returns 0 (true) if the argument was a license command, 1 otherwise.
# Usage:  gplv3_handle "$user_input" || normal_processing "$user_input"
gplv3_handle() {
    case "${1}" in
        [Ss][Hh][Oo][Ww]" "[Ww])
            cat <<'EOF'
THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT
WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE
OF THE PROGRAM IS WITH YOU.  (GPL-3.0-or-later §15)
EOF
            return 0 ;;
        [Ss][Hh][Oo][Ww]" "[Cc])
            cat <<'EOF'
You may convey verbatim copies of the Program's source code as you
receive it, in any medium, provided that you conspicuously and
appropriately publish on each copy an appropriate copyright notice and
disclaimer of warranty. (See GPL-3.0 §4-6 for full conditions.)
Full license: <https://www.gnu.org/licenses/gpl-3.0.html>
EOF
            return 0 ;;
        *)
            return 1 ;;
    esac
}

# ─────────────────────────────────────────────────────────────────────────────
