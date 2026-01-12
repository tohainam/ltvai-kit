# Spec Template

Use this template when creating new spec files.

## Template

```markdown
---
status: draft
feature_id: {feature-id}
created: {ISO 8601 timestamp}
updated: {ISO 8601 timestamp}
---

# {Feature Name}

## Overview

{Brief description of what this feature does and why it's needed.}

## Requirements

### Functional Requirements

- [ ] FR1: {Description}

### Non-functional Requirements

- [ ] NFR1: {Description}

## References

- {Link type}: {URL or description}

## Technical Analysis (from scouting)

### Related Files

{To be filled during scouting phase}

### Existing Patterns

{To be filled during scouting phase}

## Agreed Approach

{High-level implementation approach agreed upon during discussion.}

## Out of Scope

- {What will NOT be done in this feature}

---

# Discussion Log

{Sessions and exchanges logged here}
```

## Usage Notes

### Frontmatter Fields

| Field      | Description                        | Values                        |
| ---------- | ---------------------------------- | ----------------------------- |
| status     | Current spec status                | draft, approved, done         |
| feature_id | Unique identifier (kebab-case)     | e.g., social-login            |
| created    | Creation timestamp                 | ISO 8601 format               |
| updated    | Last update timestamp              | ISO 8601 format               |

### Status Flow

```
draft → approved → done
  │         │        │
  │         │        └── After implementation complete
  │         └── Ready for /code command
  └── In progress, can resume
```

### Requirements Format

Use checkbox format for tracking:

```markdown
- [ ] FR1: User can log in with Google OAuth
- [ ] FR2: Session persists across browser refresh
- [ ] NFR1: Login response time < 500ms
```

### Discussion Log Format

```markdown
## Session 1 - 2026-01-11 10:30

### Initial Input

> User's original request here
> Including any links (Figma, Wiki, etc.)

### Clarification Round 1

**Claude**: Question about X?
**User**: Answer about X

### Scouting Summary

- Found: path/to/file - description
- Pattern: description

### Finalization

User confirmed approach at 11:45
Status changed to: approved
```
