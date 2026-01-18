---
title: Configuration
description: Cấu hình và customize ltvai-kit
---

import { Tabs, TabItem, Aside } from "@astrojs/starlight/components";

## Configuration Files

ltvai-kit sử dụng các file cấu hình sau:

```
.claude/
├── settings.json         # Base settings (commit to git)
├── settings.local.json   # Local overrides (git-ignored)
├── rules/_global.md      # Global rules và skill mappings
└── .mcp.json             # MCP server configuration
```

## settings.json

File cấu hình chính, được commit vào git:

```json
{
  "model": "claude-sonnet-4-20250514",
  "permissions": {
    "allow": [],
    "deny": []
  }
}
```

### Options

| Key | Type | Description |
|-----|------|-------------|
| `model` | string | Claude model to use |
| `permissions.allow` | array | Allowed tool patterns |
| `permissions.deny` | array | Denied tool patterns |

## settings.local.json

Local overrides, **không** commit vào git:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(git:*)",
      "Read(*)",
      "Write(.claude/*)"
    ],
    "deny": [
      "Bash(rm -rf *)"
    ]
  },
  "mcpServers": {
    "context7": {
      "enabled": true
    }
  }
}
```

<Aside type="caution">
  Đảm bảo thêm `settings.local.json` vào `.gitignore` để tránh commit sensitive permissions.
</Aside>

## Permission Patterns

Permissions sử dụng glob-style patterns:

<Tabs>
  <TabItem label="Allow Examples">
    ```json
    {
      "allow": [
        "Bash(npm:*)",           // All npm commands
        "Bash(git:status)",      // Only git status
        "Read(.claude/*)",       // Read .claude folder
        "Write(src/**/*.ts)",    // Write TypeScript files in src
        "Edit(*)"                // Edit any file
      ]
    }
    ```
  </TabItem>

  <TabItem label="Deny Examples">
    ```json
    {
      "deny": [
        "Bash(rm -rf *)",        // No recursive delete
        "Write(.env*)",          // No writing env files
        "Bash(sudo:*)"           // No sudo commands
      ]
    }
    ```
  </TabItem>
</Tabs>

## MCP Servers

Configure MCP (Model Context Protocol) servers in `.mcp.json`:

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

### Available MCP Servers

| Server | Purpose |
|--------|---------|
| `context7` | Access real-time library documentation |
| `filesystem` | Enhanced file system operations |
| `github` | GitHub API integration |

## Global Rules

`.claude/rules/_global.md` định nghĩa skill mappings và global behaviors:

```markdown
# Global Rules

## Skills Reference

| Skill            | Purpose                       |
| ---------------- | ----------------------------- |
| `/brainstorming` | Ideation, feature design      |
| `/debugging`     | Bug analysis, find root cause |
| `/refactoring`   | Improve code quality          |
| `/reviewing`     | Code review, security audit   |
| `/implementing`  | Execute specs                 |
```

## Customizing Skills

### Modifying Existing Skills

Mỗi skill có structure:

```
.claude/skills/{skill-name}/
├── SKILL.md              # Main skill definition
└── references/           # Reference documents
    ├── templates.md
    └── gate-criteria.md
```

Để customize:

1. **Edit SKILL.md**: Thay đổi behavior, prompts
2. **Update references**: Thêm/sửa templates
3. **Adjust gates**: Modify gate criteria

### Adding New Skills

<Tabs>
  <TabItem label="1. Create Structure">
    ```bash
    mkdir -p .claude/skills/my-skill/references
    ```
  </TabItem>

  <TabItem label="2. Create SKILL.md">
    ```markdown
    ---
    name: my-skill
    description: Custom skill for specific task
    ---

    # My Custom Skill

    ## When to Use
    - Specific use case 1
    - Specific use case 2

    ## Workflow
    ...
    ```
  </TabItem>

  <TabItem label="3. Update Global Rules">
    Add to `.claude/rules/_global.md`:
    ```markdown
    | `/my-skill` | Custom purpose |
    ```
  </TabItem>
</Tabs>

## Environment Variables

Một số settings có thể override qua environment variables:

```bash
# Set default model
export CLAUDE_MODEL="claude-opus-4-20250514"

# Enable debug mode
export CLAUDE_DEBUG=true
```

## Project-Specific Config

Tạo config cho specific projects bằng cách thêm rules:

```
.claude/rules/
├── _global.md           # Applies to all
├── frontend.md          # Frontend-specific rules
└── backend.md           # Backend-specific rules
```

Ví dụ `frontend.md`:

```markdown
# Frontend Rules

When working on frontend code:
- Always use TypeScript
- Follow React best practices
- Use Tailwind for styling
```

## Troubleshooting Configuration

### Config không được load

1. Kiểm tra JSON syntax hợp lệ
2. Đảm bảo file ở đúng location
3. Restart Claude Code session

### Permissions không hoạt động

1. Verify pattern syntax
2. Check allow vs deny priority (deny wins)
3. Test với simpler patterns first

### MCP server không connect

1. Kiểm tra command có thể execute
2. Verify network connectivity
3. Check server logs

## Recommended Setup

### For Individual Developers

```json
// settings.local.json
{
  "permissions": {
    "allow": ["Bash(*)", "Read(*)", "Write(*)", "Edit(*)"]
  }
}
```

### For Teams

```json
// settings.json (committed)
{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(git:*)",
      "Read(*)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Write(.env*)"
    ]
  }
}
```

## Next Steps

- [Skills Overview](/skills/) - Explore all available skills
- [Agents Reference](/reference/agents/) - Learn about agents
- [Examples](/reference/examples/) - See configuration examples
