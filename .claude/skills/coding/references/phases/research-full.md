# Phase 1: Research (Full Mode)

This phase performs comprehensive research for the full `/code` workflow.

## Overview

Full mode research includes:

- Both researcher and scouter agents
- Full scope: codebase patterns, existing implementations, documentation, best practices
- Multiple agents in parallel when needed
- Detailed agent responses in report

## Confirmation (unless auto_mode)

If NOT auto_mode, use `AskUserQuestion` tool:

```
Question: "Do you want to research before implementing?"
Header: "Research"
Options:
  - label: "Research (Recommended)"
    description: "Search codebase and web for relevant context, patterns, and documentation"
  - label: "Skip"
    description: "Skip research and proceed directly to planning"
```

## Execution Steps

### 1. Mark Phase In Progress

- Update todo: mark Research as `in_progress`
- Add sub-task: `→ Invoke delegating for research`

### 2. Call Dispatcher

```
Skill(
  skill: "delegating",
  args: "Research the following task for implementation: [task_description]. Use both researcher and scouter agents as needed. Full scope research including: codebase patterns, existing implementations, documentation, best practices, related files and dependencies."
)
```

### 3. Parse DISPATCH DECISION

Extract from delegating response:

- **Agent**: Agent name (scouter, researcher)
- **Mode**: single or parallel
- **Instances**: Number of agents to spawn
- **Inputs**: Scope/focus for each instance

### 4. Execute Decision

**For single mode (1 instance):**

```
Task(
  subagent_type: "[agent from decision]",
  prompt: "[Scope from decision Inputs[1]]",
  description: "Research: [Focus from decision]"
)
```

**For parallel mode (multiple instances):**
Launch ALL instances in a SINGLE message:

```
Task(subagent_type: "[agent]", prompt: "[Scope 1]", description: "Research 1")
Task(subagent_type: "[agent]", prompt: "[Scope 2]", description: "Research 2")
... (all instances in parallel)
```

### 5. Aggregate Results

- Wait for all agents to complete
- Compile findings from all responses
- Summarize key insights for implementation

### 6. Write Report

Create `{SESSION_PATH}/research-report.md` using **full template** from [report-templates.md](../report-templates.md):

- Dispatcher decision details
- Full agent responses
- Aggregated findings summary
- Relevant files list

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
    "inputs": ["{input1}", "{input2}"]
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
    description: "Proceed to create implementation plan"
  - label: "Skip Remaining Phases"
    description: "Skip all remaining phases and complete the task now"
```

**If "Continue":** Proceed to Phase 2: Plan
**If "Skip Remaining":** Mark remaining phases as skipped, go to Completion
**If "Other":** Process user's request, re-ask confirmation
