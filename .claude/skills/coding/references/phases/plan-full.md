# Phase 2: Plan (Full Mode)

This phase creates a comprehensive implementation plan for the full `/code` workflow.

## Overview

Full mode planning includes:

- Use of `EnterPlanMode` tool for detailed planning
- Architecture decisions
- Potential risks assessment
- User approval required via `ExitPlanMode`
- Full plan report with all sections

## Confirmation (unless auto_mode)

If NOT auto_mode, use `AskUserQuestion` tool:

```
Question: "Do you want to create a plan before implementing?"
Header: "Planning"
Options:
  - label: "Plan (Recommended)"
    description: "Create detailed implementation plan for review before coding"
  - label: "Skip"
    description: "Skip planning and start implementing directly"
```

## Execution Steps

### 1. Mark Phase In Progress

- Update todo: mark Plan as `in_progress`
- Add sub-tasks:
  - `→ Analyze requirements`
  - `→ Identify files to modify`
  - `→ Design implementation approach`
  - `→ Create step-by-step plan`

### 2. Enter Plan Mode

Use `EnterPlanMode` tool to create comprehensive plan with:

- Overview of what will be implemented
- Architecture decisions
- Files to create/modify/delete
- Implementation steps
- Potential risks and mitigations

### 3. Wait for User Approval

Plan mode requires user to review and approve the plan via `ExitPlanMode`.

### 4. Write Report

After approval, create `{SESSION_PATH}/plan-report.md` using **full template** from [report-templates.md](../report-templates.md):

- Overview
- Architecture Decisions
- Files to Modify
- Implementation Steps
- Potential Risks

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

Mark Plan phase as `completed` in todo list.

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
