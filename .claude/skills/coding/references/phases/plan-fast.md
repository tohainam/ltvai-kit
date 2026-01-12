# Phase 2: Plan (Fast Mode)

This phase creates a lightweight task list for the `/code:fast` workflow.

## Overview

Fast mode planning includes:

- **DO NOT use EnterPlanMode** - Use TodoWrite directly
- Quick inline plan with main tasks
- No detailed architecture analysis
- No user approval required
- Lite plan report

## Confirmation (unless auto_mode)

If NOT auto_mode, use `AskUserQuestion` tool:

```
Question: "Do you want to create a quick plan before implementing?"
Header: "Planning"
Options:
  - label: "Plan (Recommended)"
    description: "Create quick task list for implementation"
  - label: "Skip"
    description: "Skip planning and start implementing directly"
```

## Execution Steps

### 1. Mark Phase In Progress

Update todo: mark Plan as `in_progress`

### 2. Create Quick Plan

**DO NOT use EnterPlanMode** - Create a quick inline plan directly:

1. Identify main tasks needed
2. List files to modify
3. Brief implementation steps
4. No detailed architecture analysis
5. No waiting for user approval

### 3. Update Todo List

Add implementation sub-tasks to todo list based on quick plan.

### 4. Write Report

Create `{SESSION_PATH}/plan-report.md` using **lite template** from [report-templates.md](../report-templates.md).

### 5. Update State

Update `{SESSION_PATH}/state.json`:

```json
{
  "phases.plan.status": "completed",
  "phases.plan.report": "plan-report.md",
  "phases.plan.completed_at": "{timestamp}",
  "updated_at": "{timestamp}"
}
```

### 6. Mark Phase Complete

Mark Plan phase as `completed` in todo list immediately.

## If Skip Selected

- Mark Plan phase as `completed` with note "Skipped by user"
- Update `state.json` with `phases.plan.skipped = true`
- Proceed to Phase 3: Implement

## Post-Planning Confirmation (unless auto_mode)

```
Question: "Planning completed. Report: {SESSION_PATH}/plan-report.md. How would you like to proceed?"
Header: "Continue"
Options:
  - label: "Continue to Implementation (Recommended)"
    description: "Start implementing the code changes"
  - label: "Skip Remaining Phases"
    description: "Skip all remaining phases and complete the task now"
```

**If "Continue":** Proceed to Phase 3: Implement
**If "Skip Remaining":** Mark remaining phases as skipped, go to Completion
**If "Other":** Process user's request, re-ask confirmation
