---
name: reviewing
description: Standalone code review workflow with 4 phases - Init, Analyze, Review, Report. Supports multiple review scopes (staged, branch, commit, PR, files). Outputs structured reports to .claude/.reviews/.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task, Skill, AskUserQuestion, TodoWrite
user-invocable: false
---

# Reviewing Skill

Standalone code review workflow for comprehensive code analysis.

## Workflow Overview

```
INIT → ANALYZE → REVIEW → REPORT
```

1. **Init**: Parse request, determine review scope
2. **Analyze**: Estimate size, apply chunking if needed, determine scaling
3. **Review**: Execute review via delegating + reviewer agent
4. **Report**: Aggregate results, format with conventional comments, save to `.claude/.reviews/`

## Phase References

| Phase   | Reference                                       | Description                          |
| ------- | ----------------------------------------------- | ------------------------------------ |
| Init    | [phases/init.md](references/phases/init.md)     | Parse request, determine scope       |
| Analyze | [phases/analyze.md](references/phases/analyze.md) | Size estimation, chunking, scaling |
| Review  | [phases/review.md](references/phases/review.md) | Execute review via reviewer agent    |
| Report  | [phases/report.md](references/phases/report.md) | Generate and save report             |

## Shared References

| Reference                                         | When to Load                |
| ------------------------------------------------- | --------------------------- |
| [report-template.md](references/report-template.md) | When generating report     |
| [comment-labels.md](references/comment-labels.md) | When formatting findings    |

## Argument Parsing

Skill receives `args` from Skill tool (passed by command wrapper).

Parse `args` to extract review scope using natural language:

```
Parse args:
  if contains "staged" or "staging":
    scope = "staged"
    git_cmd = "git diff --staged"
  else if contains "PR" or "pull request" followed by number:
    scope = "pr"
    pr_number = extract number
    git_cmd = "gh pr diff {pr_number}"
  else if contains "commit" followed by hash:
    scope = "commit"
    commit_hash = extract hash
    git_cmd = "git show {commit_hash}"
  else if contains "branch" or "compare" or "vs":
    scope = "branch"
    base_branch = extract branch name (default: "main")
    git_cmd = "git diff {base_branch}...HEAD"
  else if contains file paths:
    scope = "files"
    file_paths = extract paths
  else:
    scope = "working"
    git_cmd = "git diff HEAD"
```

### Scope Examples

| User Input                          | Detected Scope | Git Command                |
| ----------------------------------- | -------------- | -------------------------- |
| "review my staged changes"          | staged         | `git diff --staged`        |
| "review PR #42"                     | pr             | `gh pr diff 42`            |
| "review commit abc123"              | commit         | `git show abc123`          |
| "review changes vs main"            | branch         | `git diff main...HEAD`     |
| "review src/auth/"                  | files          | Read files directly        |
| "review my changes"                 | working        | `git diff HEAD`            |

## Initialize Todo List

```json
[
  {
    "content": "Init: Parse request and determine scope",
    "status": "pending",
    "activeForm": "Parsing review request"
  },
  {
    "content": "Analyze: Estimate size and plan chunking",
    "status": "pending",
    "activeForm": "Analyzing review scope"
  },
  {
    "content": "Review: Execute code review",
    "status": "pending",
    "activeForm": "Executing code review"
  },
  {
    "content": "Report: Generate and save report",
    "status": "pending",
    "activeForm": "Generating review report"
  }
]
```

## Review Categories

All reviews evaluate code against these 8 categories:

| Category       | Description                                |
| -------------- | ------------------------------------------ |
| Functionality  | Does the code work as intended?            |
| Readability    | Is the code clear and understandable?      |
| Security       | Are there vulnerabilities or risks?        |
| Performance    | Are there inefficiencies or bottlenecks?   |
| Testing        | Are tests adequate and meaningful?         |
| Documentation  | Are comments and docs sufficient?          |
| Architecture   | Does the design follow best practices?     |
| Error Handling | Are errors properly caught and handled?    |

## BEGIN EXECUTION

1. Initialize todo list
2. Read [phases/init.md](references/phases/init.md)
3. Execute Init phase (parse request, determine scope)
4. Read [phases/analyze.md](references/phases/analyze.md)
5. Execute Analyze phase (size estimation, chunking decision)
6. Read [phases/review.md](references/phases/review.md)
7. Execute Review phase (call delegating + reviewer agent)
8. Read [phases/report.md](references/phases/report.md)
9. Execute Report phase (aggregate, format, save)
