---
title: Agents Reference
description: Reference cho agents trong ltvai-kit
---

import { Aside, Tabs, TabItem } from "@astrojs/starlight/components";

## Overview

ltvai-kit includes 2 specialized agents được invoke automatically bởi skills khi cần.

<Aside type="note">
  Agents được managed internally - bạn không invoke trực tiếp mà skills sẽ sử dụng chúng.
</Aside>

## Available Agents

| Agent | Purpose | Used By |
|-------|---------|---------|
| `researcher` | Research external best practices | brainstorming, debugging |
| `scouter` | Search và map codebase patterns | All producer skills |

## Researcher Agent

### Purpose

Research external documentation, best practices, và patterns từ web.

### Capabilities

- Web search for documentation
- Fetch và analyze external resources
- Query library documentation (via context7 MCP)
- Synthesize findings

### Tools Available

| Tool | Purpose |
|------|---------|
| `Bash` | Execute commands |
| `Glob` | Find files |
| `Grep` | Search content |
| `Read` | Read files |
| `WebFetch` | Fetch web content |
| `WebSearch` | Search the web |
| `mcp__context7__*` | Query library docs |

### Use Cases

<Tabs>
  <TabItem label="Library Research">
    ```
    Research best practices for React Query caching
    ```

    Agent will:
    - Search React Query documentation
    - Find recommended patterns
    - Identify common pitfalls
    - Summarize findings
  </TabItem>

  <TabItem label="Pattern Research">
    ```
    Research authentication patterns for Next.js App Router
    ```

    Agent will:
    - Search Next.js auth documentation
    - Compare NextAuth vs Clerk vs Auth0
    - Find implementation examples
    - Recommend approach
  </TabItem>

  <TabItem label="Best Practices">
    ```
    Research database indexing strategies for PostgreSQL
    ```

    Agent will:
    - Search PostgreSQL documentation
    - Find indexing best practices
    - Identify common mistakes
    - Provide optimization tips
  </TabItem>
</Tabs>

### Response Format

```markdown
## Research Findings: [Topic]

### Summary
[Key takeaways]

### Detailed Findings

#### Source 1: [Name]
- [Finding 1]
- [Finding 2]

#### Source 2: [Name]
- [Finding 1]
- [Finding 2]

### Recommendations
1. [Recommendation 1]
2. [Recommendation 2]

### References
- [URL 1]
- [URL 2]
```

## Scouter Agent

### Purpose

Search và analyze patterns within the codebase.

### Capabilities

- Search code for patterns
- Trace dependencies
- Map component relationships
- Analyze git history
- Find related files

### Tools Available

| Tool | Purpose |
|------|---------|
| `Bash` | Execute git commands |
| `Glob` | Find files by pattern |
| `Grep` | Search code content |
| `Read` | Read file contents |

### Use Cases

<Tabs>
  <TabItem label="Pattern Search">
    ```
    Find all places where UserService is used
    ```

    Agent will:
    - Search imports
    - Find usages
    - Map dependencies
    - Report locations
  </TabItem>

  <TabItem label="Code Context">
    ```
    Analyze the authentication flow in this codebase
    ```

    Agent will:
    - Find auth-related files
    - Trace authentication path
    - Map middleware chain
    - Document flow
  </TabItem>

  <TabItem label="Git History">
    ```
    Find recent changes to payment processing
    ```

    Agent will:
    - Search git log for payment changes
    - Identify authors
    - Find related commits
    - Highlight breaking changes
  </TabItem>

  <TabItem label="Related Files">
    ```
    Find all files related to the Order model
    ```

    Agent will:
    - Find Order definition
    - Search for imports
    - Find tests
    - Map relationships
  </TabItem>
</Tabs>

### Response Format

```markdown
## Codebase Analysis: [Topic]

### Files Found
| File | Relevance | Description |
|------|-----------|-------------|
| path/to/file1.ts | HIGH | Main component |
| path/to/file2.ts | MEDIUM | Related utility |

### Patterns Identified
1. [Pattern 1]
2. [Pattern 2]

### Dependencies
```
ComponentA
  └── ComponentB
        └── ServiceC
```

### Recommendations
- [Recommendation based on findings]
```

## Agent Usage by Skills

### /brainstorming

Uses both agents in Phase 2:

```
┌─────────────────────────────────────┐
│         Phase 2: Research           │
├─────────────────────────────────────┤
│  Researcher (5 parallel):           │
│  - Library best practices           │
│  - Industry patterns                │
│  - Similar implementations          │
├─────────────────────────────────────┤
│  Scouter (5 parallel):              │
│  - Existing patterns                │
│  - Code conventions                 │
│  - Related components               │
└─────────────────────────────────────┘
```

### /debugging

Uses scouter in Phase 2:

```
┌─────────────────────────────────────┐
│       Phase 2: Investigation        │
├─────────────────────────────────────┤
│  Scouter tracks (5 parallel):       │
│  - Error Analysis                   │
│  - Code Context                     │
│  - Git History                      │
│  - Log Analysis                     │
│  - Related Issues                   │
└─────────────────────────────────────┘
```

### /refactoring

Uses scouter in Phase 2:

```
┌─────────────────────────────────────┐
│      Phase 2: Smell Detection       │
├─────────────────────────────────────┤
│  Scouter tracks (5 parallel):       │
│  - STR (Structure)                  │
│  - ABS (Abstraction)                │
│  - NAM (Naming)                     │
│  - PAT (Pattern)                    │
│  - DEP (Dependency)                 │
└─────────────────────────────────────┘
```

### /reviewing

Uses scouter in Phase 2:

```
┌─────────────────────────────────────┐
│    Phase 2: Multi-Track Inspection  │
├─────────────────────────────────────┤
│  Scouter tracks (5 parallel):       │
│  - Security                         │
│  - Performance                      │
│  - Quality                          │
│  - Coverage                         │
│  - Documentation                    │
└─────────────────────────────────────┘
```

## Agent Configuration

Agents are defined in `.claude/agents/`:

```
.claude/agents/
├── researcher.md
└── scouter.md
```

### researcher.md Structure

```markdown
---
name: researcher
description: Research external best practices
---

# Researcher Agent

## Purpose
[Description]

## Tools
[Available tools]

## Response Format
[Expected output structure]
```

### scouter.md Structure

```markdown
---
name: scouter
description: Search and map codebase
---

# Scouter Agent

## Purpose
[Description]

## Tools
[Available tools]

## Response Format
[Expected output structure]
```

## Performance Considerations

<Aside type="tip">
  Agents run in parallel khi possible để maximize efficiency.
</Aside>

| Scenario | Agents | Parallelism |
|----------|--------|-------------|
| Brainstorming Phase 2 | 5 researcher + 5 scouter | 10 parallel |
| Debugging Phase 2 | 5 scouter | 5 parallel |
| Refactoring Phase 2 | 5 scouter | 5 parallel |
| Reviewing Phase 2 | 5 scouter | 5 parallel |

## Troubleshooting

### Agent not returning results

- Check network connectivity (for researcher)
- Verify file permissions (for scouter)
- Ensure patterns are correct

### Slow agent execution

- Check for large file scans
- Limit search scope if possible
- Consider splitting requests

### Incomplete findings

- Provide more specific search criteria
- Check if relevant files exist
- Verify search patterns

## Related

- [Skills Overview](/skills/) - How skills use agents
- [Settings Reference](/reference/settings/) - Configure permissions
- [Workflow](/getting-started/workflow/) - Understand agent role in workflow
