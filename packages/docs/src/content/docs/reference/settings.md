---
title: Settings Reference
description: Complete reference cho cấu hình ltvai-kit
---

import { Aside, Tabs, TabItem } from "@astrojs/starlight/components";

## Overview

ltvai-kit sử dụng 2 settings files:

| File | Purpose | Git |
|------|---------|-----|
| `settings.json` | Base settings, team-shared | Commit |
| `settings.local.json` | Personal overrides | Ignore |

## File Locations

```
.claude/
├── settings.json         # Base settings
├── settings.local.json   # Local overrides (gitignored)
└── rules/
    └── _global.md        # Global rules
```

## settings.json

### Schema

```json
{
  "model": "string",
  "permissions": {
    "allow": ["string"],
    "deny": ["string"]
  }
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `model` | string | Claude model identifier |
| `permissions.allow` | string[] | Allowed tool patterns |
| `permissions.deny` | string[] | Denied tool patterns |

### Example

```json
{
  "model": "claude-sonnet-4-20250514",
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(git:*)",
      "Read(*)",
      "Edit(*)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Write(.env*)"
    ]
  }
}
```

## settings.local.json

<Aside type="caution">
  Add `settings.local.json` to `.gitignore` to avoid committing personal settings.
</Aside>

### Schema

```json
{
  "permissions": {
    "allow": ["string"],
    "deny": ["string"]
  },
  "mcpServers": {
    "[server-name]": {
      "enabled": "boolean"
    }
  }
}
```

### Example

```json
{
  "permissions": {
    "allow": [
      "Bash(docker:*)",
      "Write(src/**/*.ts)"
    ]
  },
  "mcpServers": {
    "context7": {
      "enabled": true
    }
  }
}
```

## Permission Patterns

Permissions use glob-style patterns:

### Syntax

```
Tool(pattern)
```

| Component | Description | Examples |
|-----------|-------------|----------|
| `Tool` | Tool name | `Bash`, `Read`, `Write`, `Edit` |
| `pattern` | Glob pattern | `*`, `**/*.ts`, `npm:*` |

### Pattern Examples

<Tabs>
  <TabItem label="Bash">
    ```json
    {
      "allow": [
        "Bash(npm:*)",           // All npm commands
        "Bash(git:status)",      // Only git status
        "Bash(git:add *)",       // git add with any args
        "Bash(docker:*)",        // All docker commands
        "Bash(curl:*)"           // All curl commands
      ],
      "deny": [
        "Bash(rm -rf *)",        // No recursive delete
        "Bash(sudo:*)",          // No sudo
        "Bash(chmod:*)"          // No permission changes
      ]
    }
    ```
  </TabItem>

  <TabItem label="Read">
    ```json
    {
      "allow": [
        "Read(*)",               // Read any file
        "Read(src/**/*.ts)",     // Only TypeScript in src
        "Read(.claude/*)"        // Only .claude folder
      ],
      "deny": [
        "Read(.env*)",           // No env files
        "Read(secrets/*)"        // No secrets folder
      ]
    }
    ```
  </TabItem>

  <TabItem label="Write">
    ```json
    {
      "allow": [
        "Write(src/**/*.ts)",    // TypeScript in src
        "Write(tests/**/*)",     // Test files
        "Write(.claude/.specs/*)" // Spec files
      ],
      "deny": [
        "Write(.env*)",          // No env files
        "Write(*.json)",         // No JSON files
        "Write(package-lock.json)" // No lockfile
      ]
    }
    ```
  </TabItem>

  <TabItem label="Edit">
    ```json
    {
      "allow": [
        "Edit(*)",               // Edit any file
        "Edit(src/**/*)"         // Only src folder
      ],
      "deny": [
        "Edit(.env*)",           // No env files
        "Edit(*.lock)"           // No lock files
      ]
    }
    ```
  </TabItem>
</Tabs>

### Priority

1. `deny` patterns take precedence over `allow`
2. More specific patterns override general ones
3. Local settings override base settings

## MCP Server Configuration

### .mcp.json

```json
{
  "mcpServers": {
    "context7": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"]
    }
  }
}
```

### Server Types

| Type | Description |
|------|-------------|
| `stdio` | Standard I/O based server |
| `http` | HTTP-based server |

### Enable/Disable in Local

```json
// settings.local.json
{
  "mcpServers": {
    "context7": {
      "enabled": true
    },
    "expensive-server": {
      "enabled": false
    }
  }
}
```

## Global Rules

### _global.md Structure

```markdown
# Global Rules

## Skills & Commands Reference

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| /brainstorming | ... | ... |
| /debugging | ... | ... |

## Project-Specific Rules

[Custom rules for this project]
```

### Adding Project Rules

Create additional rule files in `.claude/rules/`:

```
.claude/rules/
├── _global.md        # Always loaded
├── frontend.md       # Frontend-specific
├── backend.md        # Backend-specific
└── security.md       # Security guidelines
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `CLAUDE_MODEL` | Override default model |
| `CLAUDE_DEBUG` | Enable debug logging |

```bash
export CLAUDE_MODEL="claude-opus-4-20250514"
export CLAUDE_DEBUG=true
```

## Recommended Configurations

### For Individual Developers

```json
// settings.local.json
{
  "permissions": {
    "allow": ["Bash(*)", "Read(*)", "Write(*)", "Edit(*)"]
  }
}
```

### For Teams (Restricted)

```json
// settings.json
{
  "permissions": {
    "allow": [
      "Bash(npm:*)",
      "Bash(git:*)",
      "Read(*)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo:*)",
      "Write(.env*)",
      "Write(*.lock)"
    ]
  }
}
```

### For CI/CD

```json
// settings.json
{
  "permissions": {
    "allow": [
      "Bash(npm:install)",
      "Bash(npm:run build)",
      "Bash(npm:test)",
      "Read(*)"
    ],
    "deny": [
      "Write(*)",
      "Edit(*)"
    ]
  }
}
```

## Troubleshooting

### Permission denied

1. Check deny patterns first
2. Verify allow pattern matches
3. Check both base và local settings

### MCP server not connecting

1. Verify command exists
2. Check network connectivity
3. Enable debug mode

### Settings not loading

1. Verify JSON syntax
2. Check file location
3. Restart Claude Code session

## Related

- [Configuration Guide](/getting-started/configuration/) - Setup guide
- [Agents Reference](/reference/agents/) - Agent configuration
- [Installation](/getting-started/installation/) - Initial setup
