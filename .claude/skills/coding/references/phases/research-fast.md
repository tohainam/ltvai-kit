# Phase 1: Research (Fast Mode)

This phase performs quick, focused research for the `/code:fast` workflow.

## Overview

Fast mode research includes:

- Primarily scouter agent (prefers codebase search over web research)
- Reduced scope: immediate codebase context only
- Single agent preferred
- Summarized findings in report

## Confirmation (unless auto_mode)

If NOT auto_mode, use `AskUserQuestion` tool:

```
Question: "Do you want to research before implementing?"
Header: "Research"
Options:
  - label: "Research (Recommended)"
    description: "Quick search of codebase for relevant context and patterns"
  - label: "Skip"
    description: "Skip research and proceed directly to planning"
```

## Execution Steps

### 1. Mark Phase In Progress

- Update todo: mark Research as `in_progress`
- Add sub-task: `→ Invoke delegating for quick research`

### 2. Call Dispatcher

```
Skill(
  skill: "delegating",
  args: "Quick research for task: [task_description]. Reduced scope: focus on immediate codebase context only, use scouter primarily, skip extensive web research, single agent preferred."
)
```

### 3. Parse DISPATCH DECISION

Extract from delegating response:

- **Agent**: Likely scouter
- **Mode**: Likely single
- **Instances**: Usually 1
- **Inputs**: Focused scope

### 4. Execute Decision

```
Task(
  subagent_type: "[agent from decision]",
  prompt: "[Scope from decision]",
  description: "Quick research: [Focus]"
)
```

### 5. Summarize Findings

- Wait for agent to complete
- Create brief summary of findings
- Keep it focused and actionable

### 6. Write Report

Create `{SESSION_PATH}/research-report.md` using **lite template** from [report-templates.md](../report-templates.md):

- Dispatcher decision (brief)
- Summarized findings
- Relevant files

### 7. Update State

Update `{SESSION_PATH}/state.json`:

```json
{
  "phases.research.status": "completed",
  "phases.research.report": "research-report.md",
  "phases.research.completed_at": "{timestamp}",
  "delegating_decisions.research": {
    "agent": "{agent}",
    "mode": "{mode}",
    "instances": {count},
    "inputs": ["{input}"]
  },
  "updated_at": "{timestamp}"
}
```

### 8. Mark Phase Complete

Mark Research phase as `completed` in todo list.

## If Skip Selected

- Mark Research phase as `completed` with note "Skipped by user"
- Update `state.json` with `phases.research.skipped = true`
- Proceed to Phase 2: Plan

## Post-Research Confirmation (unless auto_mode)

```
Question: "Research completed. Report: {SESSION_PATH}/research-report.md. How would you like to proceed?"
Header: "Continue"
Options:
  - label: "Continue to Planning (Recommended)"
    description: "Proceed to create quick task list"
  - label: "Skip Remaining Phases"
    description: "Skip all remaining phases and complete the task now"
```

**If "Continue":** Proceed to Phase 2: Plan
**If "Skip Remaining":** Mark remaining phases as skipped, go to Completion
**If "Other":** Process user's request, re-ask confirmation
