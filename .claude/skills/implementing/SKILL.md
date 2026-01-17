---
name: implementing
description: |
  Consumer skill for Spec-Driven Development workflow.
  Reads and executes spec files from 4 producer skills (brainstorming, reviewing, refactoring, debugging).

  Use when: (1) User provides path to spec file, (2) User requests implementation of a feature/fix described
  by existing spec, (3) User wants quick direct execution for simple tasks.

  Supports 3 execution modes:
  - MODE 1 (File Reference): /implementing .claude/.specs/brainstorming-auth-*.md
  - MODE 2 (Natural Language): /implementing implement auth feature
  - MODE 3 (Direct Execution): /implementing fix typo in utils.ts (bypass spec workflow)

  CRITICAL: ALWAYS enters Plan Mode before code generation.
  CRITICAL: ALWAYS uses TodoWrite for detailed task tracking.
---

# Implementing Skill

## CRITICAL CONSTRAINTS

**YOU MUST FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **ALWAYS** enter Plan Mode BEFORE generating any code
2. **ALWAYS** use TodoWrite tool for detailed task tracking throughout execution
3. **ALWAYS** read and parse spec file FIRST before any implementation
4. **ALWAYS** validate spec status == `complete` before proceeding
5. **ALWAYS** update spec file status to `implemented` after completion
6. **ALWAYS** show execution summary at the end
7. **NEVER** implement without reading the spec file first (except MODE 3 with user confirmation)
8. **NEVER** skip Plan Mode even for simple implementations

---

## Workflow Overview

```
Phase 0: Mode Detection     → Detect execution mode from user input
Phase 1: Spec Parsing       → Read and parse YAML frontmatter, validate status
Phase 2: Strategy Selection → Select execution strategy based on spec_type
Phase 3: Plan Mode          → REQUIRED - Create implementation plan
Phase 4: Execution          → Execute strategy with TodoWrite tracking
Phase 5: Post-Execution     → Update spec status, show summary
```

---

## Phase 0: Mode Detection

### Entry Criteria

- User has invoked `/implementing` command with arguments

### Mode Detection Logic

```
INPUT: user_argument

IF user_argument matches ".claude/.specs/*.md" OR file_exists(user_argument):
    mode = "file_reference"
    spec_path = user_argument

ELIF scan_specs_for_match(user_argument) returns matches:
    IF matches.length == 1:
        mode = "file_reference"
        spec_path = matches[0].path
    ELSE:
        mode = "natural_language"
        matched_specs = matches

ELSE:
    mode = "direct_execution"
    task = user_argument
```

### MODE 1: File Reference

**Trigger**: User provides direct path to spec file

**Example**: `/implementing .claude/.specs/brainstorming-google-auth-1701262045.md`

**Actions**:
1. Validate file exists
2. Proceed to Phase 1 (Spec Parsing)

### MODE 2: Natural Language

**Trigger**: User provides keywords that match existing specs

**Example**: `/implementing implement authentication feature`

**Actions**:
1. Scan `.claude/.specs/` directory for matching specs
2. Match keywords against spec slugs and content
3. If multiple matches, show list for user selection:

```
Found multiple matching specs:

1. brainstorming-google-auth-1701262045.md
   - Type: brainstorming
   - Priority: HIGH
   - Created: 2024-01-15

2. debugging-auth-crash-1701262100.md
   - Type: debugging
   - Priority: CRITICAL
   - Created: 2024-01-15

Select spec number to implement (or 'cancel' to abort):
```

4. After user selection, proceed to Phase 1

### MODE 3: Direct Execution

**Trigger**: No spec file match found, appears to be small task

**Example**: `/implementing fix typo in README.md`

**REQUIRED**: Ask user to confirm bypass of spec workflow:

```
No matching spec file found for: "fix typo in README.md"

This appears to be a small task. Would you like to:

1. BYPASS spec workflow and execute directly
2. CANCEL and create a spec first using /brainstorming or /debugging

Select option (1 or 2):
```

If user selects 1, proceed to Phase 3 (Plan Mode) directly without spec parsing.

### Exit Criteria

- [ ] Mode detected (file_reference, natural_language, direct_execution)
- [ ] Spec path identified (for MODE 1 and 2)
- [ ] User confirmed bypass (for MODE 3)

---

## Phase 1: Spec Parsing (MODE 1 & 2 only)

### Entry Criteria

- Mode is `file_reference` or `natural_language`
- Spec path identified

### Actions

**STEP 1**: Read spec file

```
Use Read tool to read entire spec file content
```

**STEP 2**: Parse YAML frontmatter

Extract these required fields:

| Field | Required | Description |
|-------|----------|-------------|
| `spec_type` | Yes | brainstorming / reviewing / refactoring / debugging |
| `status` | Yes | Must be `complete` to proceed |
| `priority` | Yes | HIGH / MEDIUM / LOW |
| `slug` | Yes | Feature/bug identifier |
| `related_files` | No | Files to create/modify |
| `affected_files` | No | Files impacted (debugging) |

**STEP 3**: Validate spec status

```
IF spec.status != "complete":
    ERROR: "Spec status is '{status}'. Only 'complete' specs can be implemented."
    ABORT
```

**STEP 4**: Parse spec-type-specific sections

See references/strategies.md for section mappings per spec_type.

### Error Handling

**Malformed YAML**:
```
ERROR: Failed to parse spec file YAML frontmatter.
Details: {error_message}

Please fix the spec file and try again.
```

**Missing Required Fields**:
```
ERROR: Spec file is missing required field: {field_name}
Expected fields: spec_type, status, priority, slug

Please update the spec file and try again.
```

### Exit Criteria

- [ ] Spec file read successfully
- [ ] YAML frontmatter parsed
- [ ] All required fields present
- [ ] Status validated as `complete`

---

## Phase 2: Strategy Selection

### Entry Criteria

- Phase 1 complete (or MODE 3 confirmed)
- spec_type identified (or direct task for MODE 3)

### Strategy Factory Logic

```
SWITCH spec_type:
    CASE "brainstorming":
        strategy = BrainstormingStrategy
        input_sections = [
            "Phase 5 > Architecture Diagram",
            "Phase 5 > Data Models",
            "Phase 5 > API Contracts",
            "Phase 5 > Implementation Tasks"
        ]

    CASE "reviewing":
        strategy = ReviewingStrategy
        input_sections = [
            "Phase 3 > Critical Issues (MUST FIX NOW)",
            "Phase 4 > Action Plan"
        ]

    CASE "refactoring":
        strategy = RefactoringStrategy
        input_sections = [
            "Phase 5 > Migration Plan",
            "Phase 5 > Characterization Test"
        ]

    CASE "debugging":
        strategy = DebuggingStrategy
        input_sections = [
            "Phase 4 > FIX-001 (Recommended Fix)",
            "affected_files from frontmatter"
        ]

    DEFAULT:
        ERROR: "Unknown spec_type: {spec_type}"
        ABORT
```

### Exit Criteria

- [ ] Strategy selected based on spec_type
- [ ] Input sections identified for strategy

---

## Phase 3: Plan Mode (REQUIRED)

### Entry Criteria

- Strategy selected (or MODE 3 task identified)

### CRITICAL REQUIREMENT

**YOU MUST ENTER PLAN MODE BEFORE ANY CODE GENERATION**

### Actions

**STEP 1**: Use EnterPlanMode tool

```
Invoke EnterPlanMode to transition to plan mode.

In plan mode:
1. Thoroughly analyze the spec content
2. Identify all files to create/modify
3. Design implementation approach
4. Create step-by-step implementation plan
5. Present plan to user for approval
```

**STEP 2**: Generate Implementation Plan

The plan should include:

```markdown
## Implementation Plan

### Spec Reference
- File: {spec_path}
- Type: {spec_type}
- Priority: {priority}

### Files to Create
1. {file_path_1} - {description}
2. {file_path_2} - {description}

### Files to Modify
1. {file_path_1} - {change_description}
2. {file_path_2} - {change_description}

### Implementation Steps
1. {step_1_description}
2. {step_2_description}
3. {step_3_description}
...

### Risks and Mitigations
- {risk_1}: {mitigation}
- {risk_2}: {mitigation}
```

**STEP 3**: Use ExitPlanMode for user approval

### Exit Criteria

- [ ] Plan Mode entered
- [ ] Implementation plan created
- [ ] User approved plan

---

## Phase 4: Execution

### Entry Criteria

- Plan approved by user
- Strategy selected

### CRITICAL REQUIREMENT

**YOU MUST USE TodoWrite THROUGHOUT EXECUTION**

### Common Execution Flow

**STEP 1**: Setup TodoWrite

Convert implementation steps from plan to todo items:

```
TodoWrite with todos:
[
  { content: "Step 1: {description}", status: "pending", activeForm: "Working on step 1" },
  { content: "Step 2: {description}", status: "pending", activeForm: "Working on step 2" },
  ...
]
```

**STEP 2**: Execute strategy actions

Mark each todo as `in_progress` before starting, `completed` after finishing.

### Strategy-Specific Execution

See references/strategies.md for detailed execution logic per strategy.

#### Quick Reference

**Brainstorming Strategy**:
- Create project structure from Architecture Diagram
- Generate code from Data Models
- Implement API endpoints from API Contracts
- Follow Implementation Tasks checklist

**Reviewing Strategy**:
- Fix only Critical severity issues
- Follow Action Plan for HIGH priority items
- Leave MEDIUM/LOW for future

**Refactoring Strategy**:
- Create characterization test (must PASS - GREEN)
- Run test to verify GREEN
- Apply migration steps sequentially
- Run test after each step (must stay GREEN)

**Debugging Strategy**:
- Read FIX-001 recommendation from spec
- Apply fix directly to affected_files
- Verify fix is applied correctly
- **NO test generation, NO TDD workflow**

### Exit Criteria

- [ ] All todos completed
- [ ] Files created/modified as planned
- [ ] No errors during execution

---

## Phase 5: Post-Execution

### Entry Criteria

- Phase 4 execution complete
- All todos completed

### Actions

**STEP 1**: Update spec file status

```
Edit spec file YAML frontmatter:
- Change status: "complete" → "implemented"
- Add implemented_at: {current_timestamp}
```

**STEP 2**: Display execution summary

### Execution Summary Format

```
========================================
IMPLEMENTATION COMPLETE
========================================

Spec: {spec_path}
Type: {spec_type}
Priority: {priority}

---

Plan: {plan_file_path} (if created)

Files Created:
- {file_1}
- {file_2}
...

Files Modified:
- {file_1}
- {file_2}
...

Tasks Completed: {completed_count}/{total_count}

---

Spec Status: Updated to 'implemented'

========================================
```

### Exit Criteria

- [ ] Spec status updated
- [ ] Summary displayed
- [ ] Implementation complete

---

## Mode 3: Direct Execution Flow

For small tasks without spec files:

```
Phase 0: User confirms bypass
Phase 3: Enter Plan Mode, create simple plan
Phase 4: Execute with TodoWrite tracking
Phase 5: Show summary (no spec to update)
```

### Summary Format for MODE 3

```
========================================
DIRECT EXECUTION COMPLETE
========================================

Task: {task_description}

---

Files Created:
- {file_1}
...

Files Modified:
- {file_1}
...

Tasks Completed: {completed_count}/{total_count}

---

Note: No spec file was used or updated.
Consider creating a spec for documentation purposes.

========================================
```

---

## Error Handling

### Spec File Not Found

```
ERROR: Spec file not found at: {path}

Please check:
1. The file path is correct
2. The spec file exists in .claude/.specs/

Use /brainstorming or /debugging to create a new spec.
```

### Spec Not Complete

```
ERROR: Cannot implement spec with status '{status}'.

Only specs with status 'complete' can be implemented.
The spec is currently in phase {current_phase}.

Please complete the spec first before implementing.
```

### Unknown Spec Type

```
ERROR: Unknown spec_type: {spec_type}

Supported spec types:
- brainstorming
- reviewing
- refactoring
- debugging

Please check the spec file frontmatter.
```

### Plan Rejected

```
Implementation plan was not approved.

Options:
1. Modify the plan and try again
2. Review the spec file for issues
3. Cancel implementation

What would you like to do?
```

---

## Reference Files

- **references/strategies.md**: Detailed execution logic for each strategy
- **references/templates.md**: Summary and output templates

