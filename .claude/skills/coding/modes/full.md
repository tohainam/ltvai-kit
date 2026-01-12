# Full Workflow Mode

This file orchestrates the full `/code` workflow with comprehensive research, planning, and review.

## Mode Identification

- **Workflow**: `/code` (Full)
- **Characteristics**: Thorough research, EnterPlanMode planning, comprehensive review

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
    "content": "Research: Gather context and information",
    "status": "pending",
    "activeForm": "Researching codebase and documentation"
  },
  {
    "content": "Plan: Create implementation plan",
    "status": "pending",
    "activeForm": "Planning implementation approach"
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
    "content": "Review: Review code changes",
    "status": "pending",
    "activeForm": "Reviewing code changes"
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
4. Initialize state.json
5. Ensure .gitignore
6. Store SESSION_PATH

### Phase 1: Research

Reference: [phases/research-full.md](references/phases/research-full.md)

Execute full scope research:

- Use delegating with full scope args
- Allow researcher + scouter agents
- Parallel agents for complex tasks
- Full report with detailed findings

### Phase 2: Plan

Reference: [phases/plan-full.md](references/phases/plan-full.md)

Execute comprehensive planning:

- Use `EnterPlanMode` tool
- Include architecture decisions
- Include potential risks
- Wait for user approval via `ExitPlanMode`

### Phase 3: Implement

Reference: [phases/implement.md](references/phases/implement.md)

Execute implementation:

- Create sub-tasks from plan
- Execute each sub-task with proper tracking
- Follow implementation guidelines

### Phase 4: Quality

Reference: [phases/quality.md](references/phases/quality.md)

Execute quality checks:

- Detect project commands
- Run format, lint, typecheck
- Fix auto-fixable issues

### Phase 5: Review

Reference: [phases/review-full.md](references/phases/review-full.md)

Execute thorough review:

- Use delegating with full review args
- All criteria: security, performance, quality, best practices
- Full report with suggestions section

### Completion

Reference: [completion.md](references/completion.md)

Execute completion:

- Update final state.json
- Provide comprehensive summary
- List all generated reports

## Error Handling

Reference: [error-handling.md](references/error-handling.md)

Apply error handling strategies for each phase as documented.

## BEGIN EXECUTION

Now execute the full workflow:

1. Parse arguments for `--auto` flag
2. Execute Phase 0: Init
3. Execute Phase 1: Research
4. Execute Phase 2: Plan
5. Execute Phase 3: Implement
6. Execute Phase 4: Quality
7. Execute Phase 5: Review
8. Execute Completion
