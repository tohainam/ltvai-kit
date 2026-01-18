# Output Templates

This document contains templates for various outputs produced by the implementing skill.

---

## Spec Status Update Templates

### When Starting Implementation

```yaml
# YAML Frontmatter changes (start of Phase 2)
status: implementing  # Changed from 'complete'
implementation_started_at: {ddmmyyHHMM}
current_step: 0
total_steps: {number}
current_step_description: "Starting implementation"
```

### During Implementation (update after each step)

```yaml
# YAML Frontmatter changes (during execution)
current_step: {step_number}
current_step_description: "{what_is_being_done}"
```

### When Implementation Complete

```yaml
# YAML Frontmatter changes (end of Phase 2)
status: implemented  # Changed from 'implementing'
implemented_at: {ddmmyyHHMM}
current_step: {total_steps}  # All done
current_step_description: "Implementation complete"
```

---

## Spec Checklist Update Templates

### Mark Checkbox as Done

When completing a task, update the checkbox in spec file:

```markdown
BEFORE: - [ ] Task description (Est: 1h)
AFTER:  - [x] Task description (Est: 1h) ✅ {timestamp}
```

### Checklist Locations by Spec Type

**brainstorming** - Implementation Tasks section:
```markdown
## Implementation Tasks

### Setup
- [x] Create project structure ✅ 180126-1430
- [x] Configure dependencies ✅ 180126-1445

### Core Features
- [x] Implement data models ✅ 180126-1500
- [ ] Create API endpoints  ← CURRENT
- [ ] Add business logic
```

**debugging** - FIX section:
```markdown
### FIX-001: Fix null reference

**Steps**:
- [x] Read affected file ✅ 180126-1430
- [x] Locate problematic code ✅ 180126-1431
- [ ] Apply fix  ← CURRENT
- [ ] Verify syntax
```

**reviewing** - Action Plan section:
```markdown
## Action Plan

### Critical (MUST FIX)
- [x] SEC-001: Fix SQL injection ✅ 180126-1430
- [ ] QUAL-001: Fix null reference  ← CURRENT

### Deferred
- [ ] PERF-001: Add caching
```

**refactoring** - Migration Plan section:
```markdown
## Migration Plan

- [x] Create characterization test ✅ 180126-1430
- [x] Verify GREEN ✅ 180126-1431
- [x] Step 1: Extract method ✅ 180126-1440
- [ ] Step 2: Move to file  ← CURRENT
- [ ] Step 3: Update imports
```

### Status Markers

| Marker | Meaning |
|--------|---------|
| `- [ ]` | Pending - Not started |
| `- [x] ... ✅ {time}` | Done - Completed with timestamp |
| `← CURRENT` | Optional marker for current step (in comments) |

---

## Execution Summary Templates

### Standard Implementation (with spec)

```
========================================
IMPLEMENTATION COMPLETE
========================================

Spec: .claude/.specs/{spec_type}-{slug}-{timestamp}.md
Type: {spec_type}
Priority: {priority}

---

Files Created:
- {file_1}
- {file_2}
- {file_3}

Files Modified:
- {file_1}: {brief_change_description}
- {file_2}: {brief_change_description}

Tasks Completed: {completed}/{total}

---

Quality Check:
- Format: ✓ Passed
- Lint: ✓ Passed (X warnings)
- Build: ✓ Passed

Spec Status: Updated to 'implemented'

========================================
```

### Implementation without Spec

```
========================================
IMPLEMENTATION COMPLETE
========================================

Task: {original_task_description}

---

Files Created:
- {file_1}

Files Modified:
- {file_1}: {brief_change_description}

Tasks Completed: {completed}/{total}

---

Quality Check:
- Format: ✓ Passed
- Lint: ✓ Passed
- Build: ✓ Passed

Note: No spec file was used.

========================================
```

### Debugging Implementation

```
========================================
BUG FIX APPLIED
========================================

Spec: .claude/.specs/debugging-{slug}-{timestamp}.md
Severity: {severity}
Priority: {priority}

---

Root Cause: {RCA-001_title}

Fix Applied: {FIX-001_title}
- Approach: {patch|refactor|redesign}
- Files Modified: {count}

Modified Files:
- {file_1}: {change_description}
- {file_2}: {change_description}

Tasks Completed: {completed}/{total}

---

Quality Check:
- Format: ✓ Passed
- Lint: ✓ Passed

Spec Status: Updated to 'implemented'

Note: Consider running existing tests to verify fix.

========================================
```

### Reviewing Implementation

```
========================================
REVIEW FIXES APPLIED
========================================

Spec: .claude/.specs/reviewing-{slug}-{timestamp}.md
Review Type: {pr_review|security_audit|general_review}

---

Critical Issues Fixed: {count}
- {ISSUE-001}: {title}
- {ISSUE-002}: {title}

Deferred Issues (Medium/Low):
- {count} issues documented for future iteration

Modified Files:
- {file_1}: {change_description}
- {file_2}: {change_description}

Tasks Completed: {completed}/{total}

---

Quality Check:
- Format: ✓ Passed
- Lint: ✓ Passed

Spec Status: Updated to 'implemented'

========================================
```

### Refactoring Implementation

```
========================================
REFACTORING COMPLETE
========================================

Spec: .claude/.specs/refactoring-{slug}-{timestamp}.md
Smell Type: {structural|duplication|coupling|unnecessary|data}

---

Migration Steps Completed: {completed}/{total}

Characterization Test: PASSING (GREEN)

Modified Files:
- {file_1}: {refactoring_description}
- {file_2}: {refactoring_description}

Behavior: PRESERVED (all tests passing)

---

Quality Check:
- Format: ✓ Passed
- Lint: ✓ Passed

Spec Status: Updated to 'implemented'

========================================
```

---

## Quality Check Output Templates

### All Passed

```
Quality Check:
- Format: ✓ Passed
- Lint: ✓ Passed
- Build: ✓ Passed
```

### With Warnings

```
Quality Check:
- Format: ✓ Passed
- Lint: ✓ Passed (3 warnings)
  - src/utils.ts: Unexpected any
  - src/api.ts: Unused variable 'temp'
  - src/index.ts: Missing return type
- Build: ✓ Passed
```

### With Fixes Applied

```
Quality Check:
- Format: ✓ Passed (5 files formatted)
- Lint: ✓ Passed (2 auto-fixed)
- Build: ✓ Passed
```

### Partial Failure

```
Quality Check:
- Format: ✓ Passed
- Lint: ✗ Failed (1 error, 2 warnings)
  - ERROR: src/api.ts:15 - Parsing error
- Build: ✗ Skipped (lint failed)

Note: Please fix linting errors manually.
```

### Build Failure

```
Quality Check:
- Format: ✓ Passed
- Lint: ✓ Passed
- Build: ✗ Failed
  - ERROR: src/types.ts:42 - Type 'string' is not assignable to 'number'

Note: Please fix build errors.
```

---

## Error Message Templates

### File Not Found

```
ERROR: Spec file not found
========================================

Path: {attempted_path}

Possible causes:
1. File path is incorrect
2. Spec file was deleted or moved
3. Typo in file name

Suggestions:
- List available specs: ls .claude/.specs/
- Create new spec: /brainstorming {feature} OR /debugging {bug}

========================================
```

### Invalid Status

```
ERROR: Cannot implement incomplete spec
========================================

File: {spec_path}
Current Status: {current_status}
Current Phase: {current_phase}

Only specs with status 'complete' can be implemented.

Suggestions:
- Complete the spec first using the appropriate skill
- Check if spec was interrupted during creation

========================================
```

### Malformed YAML

```
ERROR: Failed to parse spec file
========================================

File: {spec_path}

YAML Parse Error:
{error_message}

Common issues:
1. Missing '---' delimiters around frontmatter
2. Invalid YAML syntax (indentation, quotes)
3. Special characters not escaped

Suggestions:
- Open the file and check YAML syntax
- Validate with an online YAML validator

========================================
```

### No Matching Spec Found

```
No matching spec found for: "{query}"
========================================

Searched in: .claude/.specs/

Tip: Use /brainstorming or /debugging to create a spec first.

========================================
```

---

## AskUserQuestion Templates

### Confirm Spec Selection (when matching spec found)

```yaml
question: "Found matching spec: {spec_filename}. Is this the correct spec to implement?"
header: "Confirm Spec"
multiSelect: false
options:
  - label: "Yes, use this spec"
    description: "Implement using {spec_type} spec with priority {priority}"
  - label: "No, wrong spec"
    description: "This is not the spec I want to implement"
```

### Confirm Proceed Without Spec (MANDATORY)

```yaml
question: "No spec will be used. Proceed with implementation based on your request?"
header: "Confirm"
multiSelect: false
options:
  - label: "Yes, proceed"
    description: "Implement without spec - I will explore codebase and create plan"
  - label: "No, cancel"
    description: "Cancel and create a spec first using /brainstorming"
```

### Abort Message (when user selects "No, cancel")

```
========================================
IMPLEMENTATION CANCELLED
========================================

You chose to not proceed without a spec.

Suggested next steps:
1. Create a spec using /brainstorming {your_feature}
2. Or use /debugging if this is a bug fix
3. Then run /implementing with the spec file

========================================
```

### Resume Implementation (when status == implementing)

```yaml
question: "Previous implementation was interrupted at Step {N}/{total}. Resume from where it left off?"
header: "Resume"
multiSelect: false
options:
  - label: "Yes, resume"
    description: "Continue from Step {N}: {step_description}"
  - label: "No, restart"
    description: "Reset and start implementation from beginning"
```

### Resume Message

```
========================================
RESUMING IMPLEMENTATION
========================================

Spec: {spec_path}
Type: {spec_type}
Previous session started: {implementation_started_at}

Progress from checklist:
- Completed: {count_of_checked_items}/{total_items} tasks
- Last completed: {last_checked_item_description}
- Resuming from: {first_unchecked_item_description}

Continuing...
========================================
```

### Resume Detection Pattern

```
# Parse spec checklist
completed = []
pending = []

FOR line in spec_content:
    IF line matches "- [x]":
        completed.append(line)
    ELIF line matches "- [ ]":
        pending.append(line)

resume_from = pending[0] if pending else None
```

---

## Plan Mode Templates

### Implementation Plan Header

```markdown
# Implementation Plan

**Generated from**: {spec_path}
**Spec Type**: {spec_type}
**Priority**: {priority}
**Generated at**: {timestamp}

---
```

### Files Section

```markdown
## Files to Create

| # | File Path | Description |
|---|-----------|-------------|
| 1 | {path} | {description} |
| 2 | {path} | {description} |

## Files to Modify

| # | File Path | Changes |
|---|-----------|---------|
| 1 | {path} | {change_description} |
| 2 | {path} | {change_description} |
```

### Implementation Steps

```markdown
## Implementation Steps

### Phase 1: Setup
- [ ] Step 1.1: {description}
- [ ] Step 1.2: {description}

### Phase 2: Core Implementation
- [ ] Step 2.1: {description}
- [ ] Step 2.2: {description}

### Phase 3: Integration
- [ ] Step 3.1: {description}

### Phase 4: Quality Check
- [ ] Run formatter
- [ ] Run linter
- [ ] Fix any issues
```

### Risks Section

```markdown
## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| {risk_description} | LOW/MED/HIGH | LOW/MED/HIGH | {mitigation_strategy} |
```

---

## TodoWrite Item Templates

### Phase Tracking (Initialize at Phase 0)

```json
[
  { "content": "Phase 0: Mode Detection", "status": "in_progress", "activeForm": "Detecting mode" },
  { "content": "Phase 1: Plan Mode", "status": "pending", "activeForm": "Creating plan" },
  { "content": "Phase 2: Implementation", "status": "pending", "activeForm": "Implementing" },
  { "content": "Phase 3: Quality Check", "status": "pending", "activeForm": "Running quality checks" }
]
```

**Update pattern as phases progress**:
- When completing Phase 0: Mark Phase 0 `completed`, mark Phase 1 `in_progress`
- When completing Phase 1: Mark Phase 1 `completed`, mark Phase 2 `in_progress`
- etc.

### Standard Task

```json
{
  "content": "{Action verb} {target} {context}",
  "status": "pending",
  "activeForm": "{Present participle} {target}"
}
```

**Examples**:

```json
{ "content": "Create user model interface", "status": "pending", "activeForm": "Creating user model" }
{ "content": "Implement login endpoint", "status": "pending", "activeForm": "Implementing login endpoint" }
{ "content": "Fix null reference in auth.ts", "status": "pending", "activeForm": "Fixing null reference" }
{ "content": "Run characterization tests", "status": "pending", "activeForm": "Running tests" }
```

### Verification Task

```json
{
  "content": "Verify {what} is {expected_state}",
  "status": "pending",
  "activeForm": "Verifying {what}"
}
```

**Examples**:

```json
{ "content": "Verify tests pass after migration step 1", "status": "pending", "activeForm": "Verifying tests pass" }
{ "content": "Verify fix applied correctly in auth.ts", "status": "pending", "activeForm": "Verifying fix applied" }
```

### Quality Check Task

```json
{ "content": "Run formatter on modified files", "status": "pending", "activeForm": "Running formatter" }
{ "content": "Run linter and fix issues", "status": "pending", "activeForm": "Running linter" }
{ "content": "Run build to verify compilation", "status": "pending", "activeForm": "Running build" }
```

---

## Decision Log Entry Template

When making implementation decisions, add to spec's Decision Log:

```markdown
| {timestamp} | impl | {decision_made} | {rationale} |
```

**Example**:

```markdown
| 1701262400 | impl | Used existing UserDTO instead of creating new | Avoid duplication |
| 1701262405 | impl | Added null check as defensive measure | Prevent edge case crashes |
```
