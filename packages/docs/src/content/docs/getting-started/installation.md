---
title: Installation
description: Hướng dẫn cài đặt ltvai-kit vào dự án của bạn
---

## Prerequisites

Trước khi cài đặt ltvai-kit, đảm bảo bạn đã có:

- **Claude Code CLI** - Cài đặt theo hướng dẫn tại [claude.ai/code](https://claude.ai/code)
- **Git** - Để clone repository
- Một dự án software development để áp dụng

## Installation Methods

### Method 1: Clone và Copy (Recommended)

```bash
# Clone repository
git clone https://github.com/ltvai/ltvai-kit.git

# Copy .claude folder vào project của bạn
cp -r ltvai-kit/.claude your-project/

# Hoặc sử dụng rsync để preserve structure
rsync -av ltvai-kit/.claude/ your-project/.claude/
```

### Method 2: Download ZIP

1. Truy cập [GitHub Releases](https://github.com/ltvai/ltvai-kit/releases)
2. Download phiên bản mới nhất
3. Extract và copy `.claude` folder vào project

### Method 3: Git Subtree (Advanced)

```bash
# Thêm subtree
git subtree add --prefix=.claude https://github.com/ltvai/ltvai-kit.git main --squash

# Update khi có version mới
git subtree pull --prefix=.claude https://github.com/ltvai/ltvai-kit.git main --squash
```

## Verify Installation

Sau khi cài đặt, kiểm tra structure:

```bash
ls -la .claude/
```

Expected output:

```
.claude/
├── agents/           # Agent definitions
├── commands/         # Command definitions
├── skills/           # Skill implementations
├── rules/            # Global rules
├── settings.json     # Base settings
└── settings.local.json  # Local settings (git-ignored)
```

## Post-Installation

### 1. Configure Local Settings

Tạo file `.claude/settings.local.json` nếu chưa có:

```json
{
  "permissions": {
    "allow": [],
    "deny": []
  }
}
```

### 2. Add to .gitignore

```bash
# Add local settings to gitignore
echo ".claude/settings.local.json" >> .gitignore
echo ".claude/.specs/" >> .gitignore
```

### 3. Test Skills

Mở Claude Code và thử một skill:

```
/brainstorming Create a user authentication feature
```

## Troubleshooting

### Skills không hoạt động

1. Đảm bảo Claude Code CLI đã được cài đặt và update
2. Kiểm tra path: `.claude/skills/` phải ở root của project
3. Restart Claude Code session

### Permission errors

Kiểm tra và update `.claude/settings.local.json`:

```json
{
  "permissions": {
    "allow": ["Bash(*)", "Read(*)", "Write(*)"]
  }
}
```

### MCP server issues

Nếu sử dụng MCP servers, kiểm tra `.mcp.json`:

```json
{
  "mcpServers": {
    "context7": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

## Next Steps

- [Quick Start Guide](/getting-started/quick-start/) - Bắt đầu với workflow đầu tiên
- [Workflow Overview](/getting-started/workflow/) - Hiểu spec-driven development
- [Configuration](/getting-started/configuration/) - Customize theo nhu cầu
