# Output Templates

This document contains templates for various outputs produced by the implementing skill.

---

## Spec Status Update Template

When updating spec file after implementation:

```yaml
# YAML Frontmatter changes
status: implemented  # Changed from 'complete'
implemented_at: {ddmmyyHHMM}  # New field
implemented_by: claude  # New field (optional)
```

---

## Execution Summary Templates

### Standard Implementation (MODE 1 & 2)

```
========================================
IMPLEMENTATION COMPLETE
========================================

Spec: .claude/.specs/{spec_type}-{slug}-{timestamp}.md
Type: {spec_type}
Priority: {priority}

---

Plan: {plan_file_path}

Files Created:
- {file_1}
- {file_2}
- {file_3}

Files Modified:
- {file_1}: {brief_change_description}
- {file_2}: {brief_change_description}

Tasks Completed: {completed}/{total}

---

Spec Status: Updated to 'implemented'

========================================
```

### Direct Execution (MODE 3)

```
========================================
DIRECT EXECUTION COMPLETE
========================================

Task: {original_task_description}

---

Files Created:
- {file_1}

Files Modified:
- {file_1}: {brief_change_description}

Tasks Completed: {completed}/{total}

---

Note: No spec file was used or updated.
Consider creating a spec for documentation purposes.

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

Spec Status: Updated to 'implemented'

========================================
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

### Multi-Match Selection

```
Found multiple matching specs for: "{query}"
========================================

Select a spec to implement:

{number}. {spec_filename}
   Type: {spec_type}
   Priority: {priority}
   Created: {created_at}
   Summary: {first_50_chars_of_slug}

{number}. {spec_filename}
   ...

Enter number (1-{count}) or 'cancel' to abort:
========================================
```

### Bypass Confirmation

```
No matching spec found
========================================

Query: "{user_input}"

This appears to be a simple task without an existing spec.

Options:
1. BYPASS spec workflow - Execute directly
   (Recommended for: typos, small fixes, one-file changes)

2. CANCEL - Create a spec first
   (Recommended for: new features, complex changes, multi-file edits)

Enter option (1 or 2):
========================================
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

### Phase 4: Verification
- [ ] Step 4.1: Run tests
- [ ] Step 4.2: Verify functionality
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

