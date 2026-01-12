# Fast Workflow Mode

This file orchestrates the fast `/code:fast` workflow with reduced research and quick review.

## Mode Identification

- **Workflow**: `/code:fast` (Fast)
- **Characteristics**: Quick research, TodoWrite-only planning, critical-issues-only review

## Key Differences from Full Mode

| Aspect   | Full Mode                         | Fast Mode                      |
| -------- | --------------------------------- | ------------------------------ |
| Research | Full scope (researcher + scouter) | Reduced scope (prefer scouter) |
| Planning | EnterPlanMode (approval required) | TodoWrite only (no approval)   |
| Review   | Thorough (all criteria)           | Quick (critical issues only)   |
| Reports  | Full templates                    | Lite templates                 |

## Initialize Todo List

IMMEDIATELY create the initial todo list with all 6 phases:

```json
[
  {
    "content": "Init: Setup session",
    "status": "pending",
    "activeForm": "Setting up session"
  },
  {
    "content": "Research: Quick context gathering",
    "status": "pending",
    "activeForm": "Quick research"
  },
  {
    "content": "Plan: Lightweight planning",
    "status": "pending",
    "activeForm": "Quick planning"
  },
  {
    "content": "Implement: Write code changes",
    "status": "pending",
    "activeForm": "Implementing code changes"
  },
  {
    "content": "Quality: Run format, lint, typecheck",
    "status": "pending",
    "activeForm": "Running quality checks"
  },
  {
    "content": "Review: Quick code review",
    "status": "pending",
    "activeForm": "Quick review"
  }
]
```

## Phase Orchestration

Execute phases in order. Each phase:

1. Mark as `in_progress` before starting
2. Execute phase logic (see phase reference)
3. Mark as `completed` when done
4. Ask confirmation before next phase (unless auto_mode)

### Phase 0: Init

Reference: [phases/init.md](references/phases/init.md)

Execute all steps from init phase reference:

1. Generate feature name
2. Ask user confirmation
3. Create session folder
4. Initialize state.json (workflow: "code:fast")
5. Ensure .gitignore
6. Store SESSION_PATH

### Phase 1: Research

Reference: [phases/research-fast.md](references/phases/research-fast.md)

Execute reduced scope research:

- Use delegating with reduced scope args
- Prefer scouter over researcher
- Single agent preferred
- Lite report with summarized findings

### Phase 2: Plan

Reference: [phases/plan-fast.md](references/phases/plan-fast.md)

Execute lightweight planning:

- **DO NOT use EnterPlanMode**
- Use TodoWrite directly
- Quick inline task list
- No waiting for approval
- Lite report without architecture/risks

### Phase 3: Implement

Reference: [phases/implement.md](references/phases/implement.md)

Execute implementation:

- Create sub-tasks from quick plan
- Execute each sub-task with proper tracking
- Follow implementation guidelines

### Phase 4: Quality

Reference: [phases/quality.md](references/phases/quality.md)

Execute quality checks:

- Detect project commands
- Run format, lint, typecheck
- Fix auto-fixable issues

### Phase 5: Review

Reference: [phases/review-fast.md](references/phases/review-fast.md)

Execute quick review:

- Use delegating with quick review args
- Critical issues only: bugs, security vulnerabilities
- Skip style suggestions
- Lite report without suggestions section

### Completion

Reference: [completion.md](references/completion.md)

Execute completion:

- Update final state.json
- Provide brief summary (keep concise)
- List generated reports

## Error Handling

Reference: [error-handling.md](references/error-handling.md)

Apply error handling strategies for each phase as documented.

## BEGIN EXECUTION

Now execute the fast workflow:

1. Parse arguments for `--auto` flag
2. Execute Phase 0: Init
3. Execute Phase 1: Research (reduced scope)
4. Execute Phase 2: Plan (lightweight)
5. Execute Phase 3: Implement
6. Execute Phase 4: Quality
7. Execute Phase 5: Review (quick)
8. Execute Completion (brief summary)
