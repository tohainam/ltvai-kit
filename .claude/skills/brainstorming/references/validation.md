# Spec Validation

Strict checklist that must pass before `draft -> approved` transition.

## Validation Checklist

```
SPEC VALIDATION CHECKLIST
═════════════════════════════════════════════════

☐ Overview
  └── Feature description is present and clear
      Criteria: Non-empty, >= 20 characters

☐ Requirements (minimum 1)
  └── At least one FR or NFR defined
      Criteria: Contains "- [ ] FR" or "- [ ] NFR"

☐ Scouting Complete
  └── Codebase has been scouted
  └── Related files documented
      Criteria: "### Related Files" section is not empty
               OR explicitly marked as "N/A - greenfield"

☐ Agreed Approach
  └── Implementation approach confirmed
      Criteria: "## Agreed Approach" section is not empty

═════════════════════════════════════════════════
```

## Validation Logic

```
function validate_spec(spec_content):
  errors = []

  # Check Overview
  overview = extract_section("## Overview", spec_content)
  if empty(overview) or len(overview) < 20:
    errors.append("Overview: Missing or too brief")

  # Check Requirements
  requirements = extract_section("## Requirements", spec_content)
  if not contains_pattern(requirements, r"- \[ \] (FR|NFR)"):
    errors.append("Requirements: At least 1 FR or NFR required")

  # Check Scouting
  related_files = extract_section("### Related Files", spec_content)
  if empty(related_files) and not contains("N/A"):
    errors.append("Scouting: Related files not documented")

  # Check Agreed Approach
  approach = extract_section("## Agreed Approach", spec_content)
  if empty(approach):
    errors.append("Agreed Approach: Not defined")

  return errors
```

## Output Format

**On failure**:

```
Checking spec completeness...

✓ Overview: present
✓ Requirements: 3 items
✗ Scouting: missing
✗ Agreed Approach: missing

══════════════════════════════════════════════════
CANNOT APPROVE - Missing required sections:
- Scouting
- Agreed Approach

Let's complete these first.
```

**On success**:

```
Checking spec completeness...

✓ Overview: present
✓ Requirements: 3 items
✓ Scouting: 5 related files
✓ Agreed Approach: defined

══════════════════════════════════════════════════
VALIDATION PASSED - Ready for approval
```

## Handling Missing Items

| Missing Item    | Action                                        |
| --------------- | --------------------------------------------- |
| Overview        | Return to Intake, ask for description         |
| Requirements    | Return to Clarify, ask for requirements       |
| Scouting        | Run Scout phase                               |
| Agreed Approach | Discuss with user, propose approach           |

## Special Cases

### Greenfield Project

If no related files exist (new project):

```markdown
### Related Files

N/A - greenfield project
```

This passes validation.

### Minimal Spec

For very simple features, minimal valid spec:

- Overview: 1-2 sentences (>= 20 chars)
- Requirements: 1 FR
- Related Files: At least 1 file or "N/A"
- Agreed Approach: 1-2 sentences
