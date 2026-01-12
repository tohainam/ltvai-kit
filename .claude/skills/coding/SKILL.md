---
name: coding
description: Full coding workflow with 6 phases - Init, Research, Plan, Implement, Quality, Review. Supports two modes via /code (full) and /code:fast (fast). Use for structured development tasks requiring research, planning, and code review.
allowed-tools: Read, Edit, Write, Bash, Glob, Grep, Task, Skill, AskUserQuestion, EnterPlanMode, TodoWrite
user-invocable: false
---

# Coding Skill

Unified coding workflow for structured development tasks.

## Argument Parsing

Parse from args:

1. `--mode=full` or `--mode=fast` (required, from command wrapper)
2. `--auto` flag (optional, from user)
3. `task_description` (remaining args after flags)

```
Parse "$ARGUMENTS":
  if contains "--auto":
    auto_mode = true
    remove "--auto" from args
  else:
    auto_mode = false

  if contains "--mode=fast":
    mode = "fast"
    remove "--mode=fast" from args
  else:
    mode = "full"  # default
    remove "--mode=full" from args if present

  task_description = remaining args
```

## Critical Rules

**MUST READ BEFORE PROCEEDING:**

Reference: [references/critical-rules.md](references/critical-rules.md)

Key rules:

1. **USE DELEGATING + TASK** for Research and Review phases
2. **FORCE WORKFLOW ORDER**: Init → Research → Plan → Implement → Quality → Review
3. **UPDATE TODO IMMEDIATELY** after every task completion

## Phase Overview

| #   | Phase     | Description                                 |
| --- | --------- | ------------------------------------------- |
| 0   | Init      | Setup session folder, initialize state.json |
| 1   | Research  | Gather context via delegating + agents      |
| 2   | Plan      | Create implementation plan                  |
| 3   | Implement | Write code changes                          |
| 4   | Quality   | Run format, lint, typecheck                 |
| 5   | Review    | Review code via delegating + reviewer       |

## Mode Differences

| Aspect   | Full Mode                         | Fast Mode                      |
| -------- | --------------------------------- | ------------------------------ |
| Research | Full scope (researcher + scouter) | Reduced scope (prefer scouter) |
| Plan     | EnterPlanMode (approval required) | TodoWrite only (no approval)   |
| Review   | Thorough (all criteria)           | Quick (critical issues only)   |
| Reports  | Full templates                    | Lite templates                 |

## Mode Routing

Based on parsed mode, execute the appropriate workflow:

**If mode = "full":**
→ Execute [modes/full.md](modes/full.md)

**If mode = "fast":**
→ Execute [modes/fast.md](modes/fast.md)

## Reference Links

Load references as needed during execution:

### Shared References (Both Modes)

| Reference                                             | When to Load              |
| ----------------------------------------------------- | ------------------------- |
| [critical-rules.md](references/critical-rules.md)     | Always (before any phase) |
| [state-schema.md](references/state-schema.md)         | When updating state.json  |
| [report-templates.md](references/report-templates.md) | When writing reports      |
| [completion.md](references/completion.md)             | After all phases          |
| [error-handling.md](references/error-handling.md)     | On errors                 |

### Phase References (Shared)

| Reference                                             | Phase              |
| ----------------------------------------------------- | ------------------ |
| [phases/init.md](references/phases/init.md)           | Phase 0: Init      |
| [phases/implement.md](references/phases/implement.md) | Phase 3: Implement |
| [phases/quality.md](references/phases/quality.md)     | Phase 4: Quality   |

### Phase References (Full Mode)

| Reference                                                     | Phase             |
| ------------------------------------------------------------- | ----------------- |
| [phases/research-full.md](references/phases/research-full.md) | Phase 1: Research |
| [phases/plan-full.md](references/phases/plan-full.md)         | Phase 2: Plan     |
| [phases/review-full.md](references/phases/review-full.md)     | Phase 5: Review   |

### Phase References (Fast Mode)

| Reference                                                     | Phase             |
| ------------------------------------------------------------- | ----------------- |
| [phases/research-fast.md](references/phases/research-fast.md) | Phase 1: Research |
| [phases/plan-fast.md](references/phases/plan-fast.md)         | Phase 2: Plan     |
| [phases/review-fast.md](references/phases/review-fast.md)     | Phase 5: Review   |

## BEGIN EXECUTION

1. Parse arguments (mode, auto_mode, task_description)
2. Read critical-rules.md
3. Route to appropriate mode file
4. Execute workflow as specified in mode file
