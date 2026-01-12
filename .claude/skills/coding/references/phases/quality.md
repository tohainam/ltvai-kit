# Phase 4: Quality (Shared)

This phase runs quality checks on the code. Used by both full and fast workflows.

## Overview

Quality check phase:

- Detects project-specific commands
- Runs format, lint, and type checks
- Auto-fixes fixable issues
- Reports unfixable issues

## Confirmation (unless auto_mode)

If NOT auto_mode, use `AskUserQuestion` tool:

```
Question: "Do you want to run quality checks (format, lint, typecheck)?"
Header: "Quality"
Options:
  - label: "Run Quality Checks (Recommended)"
    description: "Run format, lint, and typecheck to ensure code quality"
  - label: "Skip"
    description: "Skip quality checks and proceed to review"
```

## Execution Steps

### 1. Mark Phase In Progress

- Update todo: mark Quality as `in_progress`
- Add sub-tasks:
  - `→ Detect project commands`
  - `→ Run formatter`
  - `→ Run linter`
  - `→ Run type checker`
  - `→ Fix auto-fixable issues`

### 2. Detect Project Commands

Check for available tools:

| Check                         | Tools                                    |
| ----------------------------- | ---------------------------------------- |
| `package.json`                | npm/yarn/pnpm scripts                    |
| `Makefile`                    | make commands                            |
| `pyproject.toml` / `setup.py` | Python tools                             |
| Config files                  | .eslintrc, .prettierrc, biome.json, etc. |

### 3. Execute Quality Checks

Run in order (skip if command not available):

**Format:**

```bash
npm run format / yarn format / pnpm format
# or: prettier --write . / biome format --write
```

**Lint:**

```bash
npm run lint / yarn lint / pnpm lint
# or: eslint . --fix / biome lint --apply
```

**Type Check:**

```bash
npm run typecheck / yarn typecheck / tsc --noEmit
# or: pyright / mypy
```

### 4. Handle Errors

| Error Type               | Action                       |
| ------------------------ | ---------------------------- |
| Format/lint auto-fixable | Fix and continue             |
| Type errors              | Attempt to fix before review |
| Unfixable issues         | Report to user, continue     |

### 5. Update State

Update `{SESSION_PATH}/state.json`:

```json
{
  "phases.quality.status": "completed",
  "phases.quality.completed_at": "{timestamp}",
  "updated_at": "{timestamp}"
}
```

Note: Quality phase does not generate a report file.

### 6. Mark Phase Complete

Mark Quality phase as `completed` in todo list.

## If Skip Selected

Mark Quality phase as `completed` with note "Skipped by user".

## Post-Quality Confirmation (unless auto_mode)

```
Question: "Quality check phase completed. How would you like to proceed?"
Header: "Continue"
Options:
  - label: "Continue to Review (Recommended)"
    description: "Review code changes for quality, security, and best practices"
  - label: "Skip Remaining Phases"
    description: "Skip review and complete the task now"
```

**If "Continue":** Proceed to Phase 5: Review
**If "Skip Remaining":** Mark Review as skipped, go to Completion
**If "Other":** Process user's request, re-ask confirmation
