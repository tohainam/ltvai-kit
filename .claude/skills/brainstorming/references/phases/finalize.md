# Phase 4: Finalize

Validate spec and transition to approved status.

## Steps

### 1. Mark Phase In Progress

- Update todo: mark Finalize as `in_progress`

### 2. Run Validation

Load and execute [validation.md](../validation.md) checklist.

Read spec file and check each validation item.

### 3. Handle Validation Result

**If validation FAILS**:

Display failed items:

```
Checking spec completeness...

✓ Overview: present
✓ Requirements: 3 items
✗ Scouting: missing
✗ Agreed Approach: missing

══════════════════════════════════════════════════
CANNOT APPROVE - Missing required sections:
- Scouting (run scout phase first)
- Agreed Approach (discuss implementation approach)

What would you like to do?
```

Use `AskUserQuestion`:

```
Question: "How would you like to proceed?"
Header: "Validation"
Options:
  - label: "Complete missing items"
    description: "Go back and fill in the missing sections"
  - label: "Discuss approach now"
    description: "Let's discuss and agree on the implementation approach"
```

If missing scouting -> Return to Scout phase
If missing approach -> Discuss and update spec

**If validation PASSES**:

Proceed to confirmation.

### 4. Present Summary

```
## Spec Summary

**Feature**: {feature_id}
**Status**: Ready for approval

### Overview
{brief description}

### Requirements ({count} items)
{list key requirements}

### Technical Context
- Related files: {count}
- Patterns identified: {list}

### Agreed Approach
{high-level approach}

### Out of Scope
{list exclusions if any}
```

### 5. Confirm Approval

Use `AskUserQuestion`:

```
Question: "Approve this spec for implementation?"
Header: "Approve"
Options:
  - label: "Yes, approve (Recommended)"
    description: "Mark spec as approved and ready for /code"
  - label: "Edit more"
    description: "Make additional changes before approving"
```

### 6. Approve Spec

On user confirmation:

1. Update spec frontmatter:

   ```yaml
   ---
   status: approved
   feature_id: { feature_id }
   created: { original timestamp }
   updated: { current ISO timestamp }
   ---
   ```

2. Log finalization to Discussion section:

   ```markdown
   ### Finalization

   User confirmed approach at {HH:MM}
   Status changed to: approved
   ```

3. Save spec file

### 7. Mark Phase Complete

- Update todo: mark Finalize as `completed`
- Display completion message:

```
Spec approved: .claude/.specs/{name}.md

To implement this feature, run:
/code "{brief description}"

The coding workflow will auto-detect this spec.
```

## If "Edit more" Selected

- Ask what the user wants to change
- Update spec accordingly
- Re-run validation
- Return to confirmation step
