---
description: Standalone code review workflow with 4 phases - Init, Analyze, Review, Report. Outputs structured reports to .claude/.reviews/.
allowed-tools: Skill
argument-hint: [staged | PR | commit | branch | files | changes]
---

# /code-review - Code Review Workflow

Invoke the reviewing skill:

```
Skill(skill: "reviewing", args: "$ARGUMENTS")
```

This command executes a comprehensive 4-phase review workflow:

1. **Init**: Parse request and determine review scope
2. **Analyze**: Estimate size, apply chunking strategy, determine scaling
3. **Review**: Execute review via delegating + reviewer agent
4. **Report**: Generate structured report with conventional comments

## Supported Scopes

| Scope   | Example                      | Description                |
| ------- | ---------------------------- | -------------------------- |
| Staged  | `/code-review staged`        | Review staged changes      |
| PR      | `/code-review PR #42`        | Review a pull request      |
| Commit  | `/code-review commit abc123` | Review a specific commit   |
| Branch  | `/code-review vs main`       | Compare current branch     |
| Files   | `/code-review src/auth/`     | Review specific files      |
| Working | `/code-review` (default)     | Review uncommitted changes |

## Output

Reports are saved to `.claude/.reviews/{timestamp}-{scope}.md` with:

- Summary and verdict
- Categorized findings (Critical, Warning, Info)
- 8-category checklist
- Conventional comment labels
- Review history tracking
