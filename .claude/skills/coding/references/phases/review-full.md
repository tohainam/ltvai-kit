# Phase 5: Review (Full Mode)

This phase performs a thorough code review for the full `/code` workflow.

## Overview

Full mode review includes:

- All review criteria: security, performance, code quality, best practices
- Detailed feedback with fix suggestions
- Full report with suggestions section
- May use multiple reviewers for complex changes

## Confirmation (unless auto_mode)

If NOT auto_mode, use `AskUserQuestion` tool:

```
Question: "Do you want to review the code changes?"
Header: "Review"
Options:
  - label: "Review (Recommended)"
    description: "Review code changes for quality, security, and best practices"
  - label: "Skip"
    description: "Skip review and complete the task"
```

## Execution Steps

### 1. Mark Phase In Progress

- Update todo: mark Review as `in_progress`
- Add sub-task: `→ Invoke delegating for review`

### 2. Call Dispatcher

```
Skill(
  skill: "delegating",
  args: "Thorough code review of recent changes. Review all criteria: security, performance, code quality, best practices. Provide detailed feedback with fix suggestions."
)
```

### 3. Parse DISPATCH DECISION

Extract from delegating response:

- **Agent**: reviewer
- **Mode**: single or parallel
- **Instances**: Number of reviewers
- **Inputs**: Review scope for each

### 4. Execute Decision

**For single mode:**

```
Task(
  subagent_type: "reviewer",
  prompt: "[Scope from decision]",
  description: "Review: [Focus from decision]"
)
```

**For parallel mode:**
Launch ALL instances in a SINGLE message:

```
Task(subagent_type: "reviewer", prompt: "[Scope 1]", description: "Review 1")
Task(subagent_type: "reviewer", prompt: "[Scope 2]", description: "Review 2")
```

### 5. Compile Findings

- Wait for reviewer(s) to complete
- Compile all findings
- Categorize into Critical Issues, Warnings, Suggestions
- If critical issues found, highlight for user attention

### 6. Write Report

Create `{SESSION_PATH}/review-report.md` using **full template** from [report-templates.md](../report-templates.md):

- Dispatcher decision details
- Critical issues
- Warnings
- Suggestions
- Summary and verdict

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
