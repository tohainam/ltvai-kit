# State Schema Reference

This document defines the `state.json` schema for session tracking.

## Schema Definition

```json
{
  "id": "string",
  "task": "string",
  "workflow": "code | code:fast",
  "auto_mode": "boolean",
  "created_at": "ISO 8601 timestamp",
  "updated_at": "ISO 8601 timestamp",
  "spec": "SpecReference | null",
  "phases": {
    "init": "PhaseState",
    "research": "PhaseState",
    "plan": "PhaseState",
    "implement": "PhaseState",
    "quality": "PhaseState",
    "review": "PhaseState"
  },
  "dispatcher_decisions": {
    "research": "DispatcherDecision | null",
    "review": "DispatcherDecision | null"
  }
}
```

## PhaseState Object

```json
{
  "status": "pending | in_progress | completed",
  "skipped": "boolean",
  "report": "string | null",
  "started_at": "ISO 8601 timestamp | null",
  "completed_at": "ISO 8601 timestamp | null"
}
```

### Status Values

| Status        | Description                                     |
| ------------- | ----------------------------------------------- |
| `pending`     | Phase has not started                           |
| `in_progress` | Phase is currently executing                    |
| `completed`   | Phase has finished (either executed or skipped) |

### Skipped Flag

- `false`: Phase was executed normally
- `true`: Phase was skipped by user choice

## SpecReference Object

```json
{
  "id": "string",
  "path": "string",
  "status": "approved | done"
}
```

| Field    | Description                                   |
| -------- | --------------------------------------------- |
| `id`     | The feature_id from spec frontmatter          |
| `path`   | Path to spec file (e.g., .claude/.specs/x.md) |
| `status` | Spec status when linked                       |

This field is `null` if no spec was used for the session.

## DispatcherDecision Object

```json
{
  "agent": "scouter | researcher | reviewer",
  "mode": "single | parallel",
  "instances": "number",
  "inputs": ["string", "string"]
}
```

| Field       | Description                           |
| ----------- | ------------------------------------- |
| `agent`     | The agent type selected by dispatcher |
| `mode`      | Execution mode (single or parallel)   |
| `instances` | Number of agent instances spawned     |
| `inputs`    | Scope/focus for each instance         |

## Complete Example

```json
{
  "id": "260110-jwt-auth-refresh-token",
  "task": "Add JWT authentication with refresh token support",
  "workflow": "code",
  "auto_mode": false,
  "created_at": "2026-01-10T14:30:22Z",
  "updated_at": "2026-01-10T15:45:33Z",
  "spec": {
    "id": "jwt-auth-refresh-token",
    "path": ".claude/.specs/jwt-auth-refresh-token.md",
    "status": "approved"
  },
  "phases": {
    "init": {
      "status": "completed",
      "skipped": false,
      "report": null,
      "started_at": "2026-01-10T14:30:22Z",
      "completed_at": "2026-01-10T14:30:25Z"
    },
    "research": {
      "status": "completed",
      "skipped": false,
      "report": "research-report.md",
      "started_at": "2026-01-10T14:30:25Z",
      "completed_at": "2026-01-10T14:35:15Z"
    },
    "plan": {
      "status": "completed",
      "skipped": false,
      "report": "plan-report.md",
      "started_at": "2026-01-10T14:35:20Z",
      "completed_at": "2026-01-10T14:40:10Z"
    },
    "implement": {
      "status": "completed",
      "skipped": false,
      "report": null,
      "started_at": "2026-01-10T14:40:15Z",
      "completed_at": "2026-01-10T15:20:30Z"
    },
    "quality": {
      "status": "completed",
      "skipped": false,
      "report": null,
      "started_at": "2026-01-10T15:20:35Z",
      "completed_at": "2026-01-10T15:25:00Z"
    },
    "review": {
      "status": "completed",
      "skipped": false,
      "report": "review-report.md",
      "started_at": "2026-01-10T15:25:05Z",
      "completed_at": "2026-01-10T15:45:33Z"
    }
  },
  "dispatcher_decisions": {
    "research": {
      "agent": "scouter",
      "mode": "parallel",
      "instances": 2,
      "inputs": [
        "Search for existing authentication patterns and JWT implementations",
        "Find related API endpoints and middleware structure"
      ]
    },
    "review": {
      "agent": "reviewer",
      "mode": "single",
      "instances": 1,
      "inputs": [
        "Review all changes for security, performance, and code quality"
      ]
    }
  }
}
```

## State Update Operations

### When Phase Starts

```json
{
  "phases.{phase}.status": "in_progress",
  "phases.{phase}.started_at": "{current timestamp}",
  "updated_at": "{current timestamp}"
}
```

### When Phase Completes

```json
{
  "phases.{phase}.status": "completed",
  "phases.{phase}.completed_at": "{current timestamp}",
  "phases.{phase}.report": "{report filename or null}",
  "updated_at": "{current timestamp}"
}
```

### When Phase Skipped

```json
{
  "phases.{phase}.status": "completed",
  "phases.{phase}.skipped": true,
  "phases.{phase}.completed_at": "{current timestamp}",
  "updated_at": "{current timestamp}"
}
```

### When Dispatcher Decision Made

```json
{
  "dispatcher_decisions.{phase}": {
    "agent": "{agent}",
    "mode": "{mode}",
    "instances": "{count}",
    "inputs": ["{input1}", "{input2}"]
  },
  "updated_at": "{current timestamp}"
}
```

## File Location

The `state.json` file is located at:

```
.claude/.docs/{session-id}/state.json
```

Example:

```
.claude/.docs/260110-jwt-auth-refresh-token/state.json
```
