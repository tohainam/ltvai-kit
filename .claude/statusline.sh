#!/usr/bin/env bash
# =============================================================================
# Claude Code Statusline Script
# =============================================================================
# Compatible with: macOS, Linux, Windows (Git Bash/WSL)
# Requirements: bash 3.2+, jq (optional but recommended)
# =============================================================================

set -o pipefail

# -----------------------------------------------------------------------------
# Configuration
# -----------------------------------------------------------------------------
BAR_WIDTH=10
CHAR_FILLED="▰"
CHAR_EMPTY="▱"

# Colors (ANSI)
COLOR_RESET="\033[0m"
COLOR_GRAY="\033[90m"
COLOR_BLUE="\033[94m"
COLOR_DARK_BLUE="\033[34m"
COLOR_CYAN="\033[36m"
COLOR_MAGENTA="\033[95m"
COLOR_GREEN="92"
COLOR_YELLOW="93"
COLOR_RED="91"

# -----------------------------------------------------------------------------
# Helper Functions
# -----------------------------------------------------------------------------

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Parse JSON value (fallback if jq not available)
parse_json() {
    local json="$1"
    local key="$2"

    if command_exists jq; then
        echo "$json" | jq -r "$key" 2>/dev/null
    else
        # Basic fallback parser (limited functionality)
        echo "$json" | grep -o "\"${key}\"[[:space:]]*:[[:space:]]*[^,}]*" | \
            sed 's/.*:[[:space:]]*//; s/"//g; s/[[:space:]]*$//'
    fi
}

# Get numeric JSON value
parse_json_num() {
    local json="$1"
    local key="$2"

    if command_exists jq; then
        echo "$json" | jq "$key" 2>/dev/null
    else
        echo "0"
    fi
}

# Cross-platform home directory replacement
get_short_path() {
    local full_path="$1"
    local home_dir="${HOME:-$USERPROFILE}"

    if [[ -n "$home_dir" ]]; then
        echo "${full_path/#$home_dir/~}"
    else
        echo "$full_path"
    fi
}

# Generate progress bar with spacing
generate_bar() {
    local percent="$1"
    local width="$2"
    local filled=$((percent * width / 100))
    local empty=$((width - filled))

    local bar_filled=""
    local bar_empty=""

    for ((i=0; i<filled; i++)); do
        bar_filled+="${CHAR_FILLED}"
    done

    for ((i=0; i<empty; i++)); do
        bar_empty+="${CHAR_EMPTY}"
    done

    echo "${bar_filled}|${bar_empty}"
}

# -----------------------------------------------------------------------------
# Main Script
# -----------------------------------------------------------------------------

# Read input from stdin
input=$(cat)

# Get current path
current_path=$(get_short_path "$(pwd)")

# -----------------------------------------------------------------------------
# Git Information (branch only)
# -----------------------------------------------------------------------------
git_info=""
if command_exists git && git rev-parse --git-dir >/dev/null 2>&1; then
    # Git options to skip fsmonitor for performance
    GIT_OPTS="-c core.useBuiltinFSMonitor=false -c core.fsmonitor=false"

    # Get branch name
    branch=$(git $GIT_OPTS symbolic-ref --short HEAD 2>/dev/null || \
             git $GIT_OPTS rev-parse --short HEAD 2>/dev/null)

    if [[ -n "$branch" ]]; then
        git_info=$(printf " ${COLOR_GRAY}on${COLOR_RESET} \033[${COLOR_GREEN}m%s${COLOR_RESET}" "$branch")
    fi
fi

# -----------------------------------------------------------------------------
# Model & Style
# -----------------------------------------------------------------------------
if command_exists jq; then
    model=$(echo "$input" | jq -r '.model.display_name // "Claude"')
    style=$(echo "$input" | jq -r '.output_style.name // "default"')
else
    model="Claude"
    style="default"
fi

# -----------------------------------------------------------------------------
# Time (cross-platform)
# -----------------------------------------------------------------------------
current_time=$(date +%H:%M:%S 2>/dev/null || date +%T)

# -----------------------------------------------------------------------------
# Context Window Progress Bar
# -----------------------------------------------------------------------------
ctx_info=""

if command_exists jq; then
    # Get percentage directly from Claude Code (correct field name)
    pct=$(echo "$input" | jq '.context_window.used_percentage // 0' 2>/dev/null)

    # Convert to integer (remove decimal)
    pct=${pct%.*}
    pct=${pct:-0}

    # Ensure valid range
    [[ "$pct" -gt 100 ]] && pct=100
    [[ "$pct" -lt 0 ]] && pct=0

    if [[ "$pct" -ge 0 ]]; then

        # Color based on percentage
        if [[ "$pct" -gt 85 ]]; then
            color_code="$COLOR_RED"
        elif [[ "$pct" -gt 70 ]]; then
            color_code="$COLOR_YELLOW"
        else
            color_code="$COLOR_GREEN"
        fi

        # Generate progress bar
        bar_result=$(generate_bar "$pct" "$BAR_WIDTH")
        bar_filled="${bar_result%%|*}"
        bar_empty="${bar_result##*|}"

        ctx_info=$(printf " \033[%sm%s${COLOR_GRAY}%s${COLOR_RESET} \033[%sm%d%%${COLOR_RESET}" \
            "$color_code" "$bar_filled" "$bar_empty" "$color_code" "$pct")
    fi
fi

# Default context info if not available
if [[ -z "$ctx_info" ]]; then
    empty_bar=$(printf '%*s' "$BAR_WIDTH" '' | tr ' ' "$CHAR_EMPTY")
    ctx_info=$(printf " ${COLOR_GRAY}%s${COLOR_RESET} \033[%sm0%%${COLOR_RESET}" \
        "$empty_bar" "$COLOR_GREEN")
fi

# -----------------------------------------------------------------------------
# Style Info
# -----------------------------------------------------------------------------
style_info=""
if [[ "$style" != "default" && -n "$style" ]]; then
    style_info=$(printf " ${COLOR_MAGENTA}[%s]${COLOR_RESET}" "$style")
fi

# -----------------------------------------------------------------------------
# Output Final Statusline
# -----------------------------------------------------------------------------
printf "${COLOR_GRAY}%s${COLOR_RESET} ${COLOR_BLUE}%s${COLOR_RESET}%s%s ${COLOR_GRAY}→${COLOR_RESET} ${COLOR_DARK_BLUE}%s${COLOR_RESET}%s" \
    "$current_time" "$model" "$ctx_info" "$style_info" "$current_path" "$git_info"
