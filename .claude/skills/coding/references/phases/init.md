# Phase 0: Init

This phase initializes the session before any other phases execute.

## Overview

Phase 0 is responsible for:

0. Detecting matching specs from `.claude/.specs/`
1. Generating feature name from task description (or using spec's feature_id)
2. Asking user confirmation for feature name
3. Creating session folder
4. Initializing state.json (with spec reference if applicable)
5. Ensuring .gitignore includes session folder
6. Storing SESSION_PATH for workflow use

## 0. Spec Auto-Detection

Before generating feature name, check for matching specs in `.claude/.specs/`.

### Scan Specs

```bash
glob: .claude/.specs/*.md
```

For each spec file found:

1. Read frontmatter to get `status` and `feature_id`
2. Read Overview section for semantic matching

### Matching Algorithm

1. Extract keywords from task description
2. For each spec file:
   - Compare keywords with `feature_id`
   - Compare semantic meaning with Overview section
   - Calculate confidence score (keyword overlap + semantic similarity)

### Detection Cases

**Case A: High confidence match (status: approved)**

```
"Found spec '{feature_id}' that matches your request. Use it?"
Options:
  - label: "Yes, use spec (Recommended)"
    description: "Use requirements from this spec"
  - label: "No, start fresh"
    description: "Ignore spec and proceed normally"
```

If yes:

- Use spec's `feature_id` as session name
- Store spec reference in state.json
- Spec requirements will inform Research phase

**Case B: Match found (status: draft)**

```
"Found draft spec '{feature_id}' that matches your request."
"Resume brainstorm to finalize it first?"
Options:
  - label: "Yes, resume brainstorm (Recommended)"
    description: "Finalize spec before coding"
  - label: "No, continue without spec"
    description: "Proceed with coding workflow"
```

If yes:

- Switch to brainstorming skill: `Skill(skill: "brainstorming", args: "--resume {feature_id}")`

**Case C: No match found**

```
"No matching spec found."
Options:
  - label: "Continue without spec (Recommended)"
    description: "Proceed with coding workflow"
  - label: "Create spec first"
    description: "Run /brainstorm to create a spec"
```

If "Create spec first":

- Switch to brainstorming skill: `Skill(skill: "brainstorming", args: "{task_description}")`

**Case D: Multiple potential matches**

```
"Found multiple specs that might match:"
Options:
  - label: "1. social-login (approved)"
    description: "Social login with OAuth providers"
  - label: "2. oauth-integration (approved)"
    description: "OAuth integration for third-party APIs"
  - label: "None of these"
    description: "Proceed without spec"
```

### Store Spec Reference

If spec selected, remember for later:

```
SELECTED_SPEC = {
  "id": "{feature_id}",
  "path": ".claude/.specs/{feature_id}.md",
  "status": "approved"
}
```

This will be added to state.json in step 4.

## 1. Generate Feature Name

### If Spec Selected

Use spec's `feature_id` as the feature name (already validated and formatted).

### If No Spec

From task description, extract 3-5 key words:

- **Focus on**: action verbs, main features, technologies
- **Ignore**: filler words (the, a, with, and, for, to, in, of, etc.)
- **Format**: lowercase, kebab-case
- **Max length**: 30 characters

### Examples

| Task Description                            | Generated Name                |
| ------------------------------------------- | ----------------------------- |
| "Add JWT authentication with refresh token" | `add-jwt-auth-refresh-token`  |
| "Fix bug in user login flow"                | `fix-user-login-bug`          |
| "Implement dark mode toggle in settings"    | `impl-dark-mode-toggle`       |
| "Refactor database connection pooling"      | `refactor-db-connection-pool` |
| "Update API endpoint for user profile"      | `update-api-user-profile`     |
| "Create pagination component"               | `create-pagination-component` |

## 2. Ask User Confirmation

Use `AskUserQuestion` tool:

```
Question: "Feature name for this session?"
Header: "Session"
Options:
  - label: "{generated-name} (Recommended)"
    description: "Auto-generated from task description"
```

**If user types custom name:** Use the custom name they provide (convert to kebab-case if needed).

## 3. Create Session Folder

Create folder at:

```bash
mkdir -p .claude/.docs/{YYMMDD}-{feature-name}
```

Where:

- `YYMMDD` = Current date (2-digit year, 2-digit month, 2-digit day)
- `{feature-name}` = Confirmed feature name from step 2

Example: `.claude/.docs/260110-jwt-auth-refresh-token/`

## 4. Initialize state.json

Create `state.json` with initial structure:

```json
{
  "id": "{YYMMDD}-{feature-name}",
  "task": "{original task description}",
  "workflow": "code | code:fast",
  "auto_mode": false,
  "created_at": "{ISO 8601 timestamp}",
  "updated_at": "{ISO 8601 timestamp}",
  "spec": SELECTED_SPEC or null,
  "phases": {
    "init": {
      "status": "completed",
      "skipped": false,
      "report": null,
      "started_at": "{timestamp}",
      "completed_at": "{timestamp}"
    },
    "research": {
      "status": "pending",
      "skipped": false,
      "report": null,
      "started_at": null,
      "completed_at": null
    },
    "plan": {
      "status": "pending",
      "skipped": false,
      "report": null,
      "started_at": null,
      "completed_at": null
    },
    "implement": {
      "status": "pending",
      "skipped": false,
      "report": null,
      "started_at": null,
      "completed_at": null
    },
    "quality": {
      "status": "pending",
      "skipped": false,
      "report": null,
      "started_at": null,
      "completed_at": null
    },
    "review": {
      "status": "pending",
      "skipped": false,
      "report": null,
      "started_at": null,
      "completed_at": null
    }
  },
  "dispatcher_decisions": {}
}
```

Reference: [state-schema.md](../state-schema.md) for full schema details.

## 5. Ensure .gitignore

Check if `.gitignore` includes `.claude/.docs/`. If not, add it:

```
# Claude Code session reports
.claude/.docs/
```

## 6. Store Session Path

Store the session folder path for use throughout the workflow:

```
SESSION_PATH = ".claude/.docs/{YYMMDD}-{feature-name}"
```

This path will be used:

- In confirmation messages
- When writing reports
- When updating state.json

## Completion

After init phase completes:

1. Session folder exists with `state.json`
2. `SESSION_PATH` variable is available
3. Init phase is marked as `completed` in state.json
4. Proceed to Phase 1: Research
