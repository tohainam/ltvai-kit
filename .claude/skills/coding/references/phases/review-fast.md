# Phase 5: Review (Fast Mode)

This phase performs a quick code review for the `/code:fast` workflow.

## Overview

Fast mode review includes:

- Focus on critical issues only: bugs, security vulnerabilities
- Skip style suggestions and minor improvements
- Brief feedback
- Lite report without suggestions section

## Confirmation (unless auto_mode)

If NOT auto_mode, use `AskUserQuestion` tool:

```
Question: "Do you want a quick review of the code changes?"
Header: "Review"
Options:
  - label: "Review (Recommended)"
    description: "Quick review focusing on critical issues only"
  - label: "Skip"
    description: "Skip review and complete the task"
```

## Execution Steps

### 1. Mark Phase In Progress

- Update todo: mark Review as `in_progress`
- Add sub-task: `→ Invoke delegating for quick review`

### 2. Call Dispatcher

```
Skill(
  skill: "delegating",
  args: "Quick code review of recent changes. Focus on critical issues only: bugs, security vulnerabilities. Skip style suggestions and minor improvements. Brief feedback."
)
```

### 3. Parse DISPATCH DECISION

Extract from delegating response:

- **Agent**: reviewer
- **Mode**: likely single
- **Instances**: usually 1
- **Inputs**: focused scope

### 4. Execute Decision

```
Task(
  subagent_type: "reviewer",
  prompt: "[Scope from decision]",
  description: "Quick review"
)
```

### 5. Summarize Findings

- Wait for reviewer to complete
- Focus on critical issues and warnings
- Skip minor suggestions

### 6. Write Report

Create `{SESSION_PATH}/review-report.md` using **lite template** from [report-templates.md](../report-templates.md):

- Dispatcher decision (brief)
- Critical issues only
- Warnings only
- Summary and verdict (no suggestions section)

### 7. Update State

Update `{SESSION_PATH}/state.json`:

```json
{
  "phases.review.status": "completed",
  "phases.review.report": "review-report.md",
  "phases.review.completed_at": "{timestamp}",
  "delegating_decisions.review": {
    "agent": "reviewer",
    "mode": "{mode}",
    "instances": {count},
    "inputs": ["{scope}"]
  },
  "updated_at": "{timestamp}"
}
```

### 8. Mark Phase Complete

Mark Review phase as `completed` in todo list.

## If Skip Selected

- Mark Review phase as `completed` with note "Skipped by user"
- Update `state.json` with `phases.review.skipped = true`
- Proceed to Completion

## Post-Review Confirmation (unless auto_mode)

```
Question: "Review completed. Report: {SESSION_PATH}/review-report.md. How would you like to proceed?"
Header: "Continue"
Options:
  - label: "Complete Task (Recommended)"
    description: "Finish the task and show summary"
  - label: "Add More Changes"
    description: "Make additional changes before completing"
```

**If "Complete Task":** Go to Completion
**If "Add More Changes" or "Other":** Process request, re-ask confirmation
