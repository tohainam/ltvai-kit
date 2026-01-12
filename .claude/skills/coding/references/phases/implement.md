# Phase 3: Implement (Shared)

This phase implements the code changes. Used by both full and fast workflows.

## Overview

Implementation phase:

- Creates sub-tasks based on plan (or task description if plan skipped)
- Executes each sub-task sequentially
- Follows project conventions
- Keeps changes minimal and focused

## Execution Steps

### 1. Mark Phase In Progress

Update todo: mark Implement as `in_progress`

### 2. Create Sub-tasks

Based on the plan (or task description if plan skipped), create sub-tasks:

- `→ [Task 1 from plan]`
- `→ [Task 2 from plan]`
- `→ [Task 3 from plan]`
- etc.

### 3. For Each Sub-task

Execute each sub-task following this pattern:

1. **Mark as `in_progress` BEFORE starting**
2. **Read existing code before modifying** - Never modify code you haven't read
3. **Follow project conventions** - Match existing patterns, naming, style
4. **Keep changes minimal and focused** - Only change what's necessary
5. **Mark as `completed` IMMEDIATELY after finishing**

### 4. Implementation Guidelines

- Prefer editing existing files over creating new ones
- Don't add features beyond what was asked
- Don't add unnecessary error handling for impossible scenarios
- Don't add comments unless logic isn't self-evident
- Don't add documentation files unless explicitly requested
- Avoid backwards-compatibility hacks

### 5. Update State

Update `{SESSION_PATH}/state.json`:

```json
{
  "phases.implement.status": "completed",
  "phases.implement.completed_at": "{timestamp}",
  "updated_at": "{timestamp}"
}
```

Note: Implementation phase does not generate a report file.

### 6. Mark Phase Complete

Mark Implement phase as `completed` in todo list.

## Post-Implementation Confirmation (unless auto_mode)

```
Question: "Implementation phase completed. How would you like to proceed?"
Header: "Continue"
Options:
  - label: "Continue to Quality Check (Recommended)"
    description: "Run format, lint, and typecheck"
  - label: "Skip Remaining Phases"
    description: "Skip all remaining phases and complete the task now"
```

**If "Continue":** Proceed to Phase 4: Quality
**If "Skip Remaining":** Mark remaining phases as skipped, go to Completion
**If "Other":** Process user's request, re-ask confirmation
