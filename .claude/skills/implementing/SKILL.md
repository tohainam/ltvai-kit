---
name: implementing
description: |
  Consumer skill for Spec-Driven Development workflow.
  Reads and executes spec files from 4 producer skills (brainstorming, reviewing, refactoring, debugging).

  Two modes:
  - File Reference: /implementing .claude/.specs/brainstorming-auth-*.md
  - Natural Language: /implementing implement auth feature

  Workflow: Mode Detection → Plan Mode → Implement → Quality Check

  CRITICAL: Speed is priority. ALWAYS enters Plan Mode before code generation.
  CRITICAL: ALWAYS uses TodoWrite for detailed task tracking.
---

# Implementing Skill

## CRITICAL CONSTRAINTS

**YOU MUST FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **ALWAYS** enter Plan Mode BEFORE generating any code
2. **ALWAYS** use TodoWrite tool for detailed task tracking throughout execution
3. **ALWAYS** run Quality Check after implementation (format, lint, build)
4. **WORKFLOW**: Mode Detection → Plan Mode → Implement → Quality Check
5. **IF SPEC EXISTS**: Follow the spec file EXACTLY - do not deviate, add, or skip any requirements defined in the spec
6. **MANDATORY SPEC SYNC**: When implementing from a spec file, you MUST sync spec status at every major step (see Spec Sync Protocol below)

---

## Spec Sync Protocol (MANDATORY when spec exists)

**This protocol ensures implementation progress is tracked IN the spec file for resumability.**

### When to Sync

| Event | Action |
|-------|--------|
| Start implementation | Set `status: implementing`, add `implementation_started_at` |
| Before each step | Update `current_step` and `current_step_description` in frontmatter |
| After each step | Mark checkbox as done `- [x] ... ✅ {timestamp}` in spec body |
| Complete implementation | Set `status: implemented`, add `implemented_at` |

### Sync Locations by spec_type

| spec_type | Checklist Location in Spec Body |
|-----------|--------------------------------|
| brainstorming | `## Implementation Tasks` section |
| debugging | `### FIX-001` → Steps or Affected Files list |
| reviewing | `## Action Plan` section |
| refactoring | `## Migration Plan` section |

### Frontmatter Updates

**At Start**:
```yaml
status: implementing
implementation_started_at: {ddmmyyHHMM}
current_step: 0
total_steps: {count}
current_step_description: "Starting implementation"
```

**During Execution** (before each step):
```yaml
current_step: {N}
current_step_description: "{step_description}"
```

**At End**:
```yaml
status: implemented
implemented_at: {ddmmyyHHMM}
current_step: {total_steps}
current_step_description: "Implementation complete"
```

### Checkbox Updates in Spec Body

**Before**:
```markdown
- [ ] Task description (Est: 1h)
```

**After**:
```markdown
- [x] Task description (Est: 1h) ✅ 180126-1430
```

### Why This Matters

1. **Resumability**: If interrupted, implementation can resume from last completed step
2. **Visibility**: User can see progress in spec file at any time
3. **Audit Trail**: Timestamps show when each task was completed
4. **Single Source of Truth**: Spec file reflects actual implementation state

---

## Workflow Overview

```
┌─────────────────────────────────────────────────────────┐
│ Phase 0: Mode Detection                                 │
│ ├─ File Reference? → Go to Phase 1                      │
│ └─ Natural Language? → Scan specs                       │
│     ├─ Found matching spec? → Confirm with user         │
│     │   ├─ User confirms → Go to Phase 1                │
│     │   └─ User declines → Confirm proceed without spec │
│     └─ No match found → Confirm proceed without spec    │
│                                                         │
│ ⚠️  ALWAYS confirm before proceeding without spec       │
├─────────────────────────────────────────────────────────┤
│ Phase 1: Plan Mode (REQUIRED)                           │
│ ├─ Read spec (if available)                             │
│ ├─ Create implementation plan                           │
│ └─ Get user approval via ExitPlanMode                   │
├─────────────────────────────────────────────────────────┤
│ Phase 2: Implementation                                 │
│ ├─ Setup TodoWrite                                      │
│ ├─ Execute plan step by step                            │
│ └─ Update spec status to 'implemented' (if applicable) │
├─────────────────────────────────────────────────────────┤
│ Phase 3: Quality Check                                  │
│ ├─ Run formatter (prettier, biome, etc.)                │
│ ├─ Run linter (eslint, biome, etc.)                     │
│ ├─ Fix any issues                                       │
│ └─ Report results                                       │
└─────────────────────────────────────────────────────────┘
```

---

## Phase 0: Mode Detection

### Entry Criteria

- User has invoked `/implementing` command with arguments

### Actions

**STEP 1**: Initialize TodoWrite for phase tracking

```
TodoWrite([
  { content: "Phase 0: Mode Detection", status: "in_progress", activeForm: "Detecting mode" },
  { content: "Phase 1: Plan Mode", status: "pending", activeForm: "Creating plan" },
  { content: "Phase 2: Implementation", status: "pending", activeForm: "Implementing" },
  { content: "Phase 3: Quality Check", status: "pending", activeForm: "Running quality checks" }
])
```

**STEP 2**: Detect mode and process accordingly

### Mode Detection Logic

```
INPUT: user_argument

IF user_argument matches ".claude/.specs/*.md" OR file_exists(user_argument):
    mode = "file_reference"
    spec_path = user_argument
    → Proceed to Phase 1

ELSE:
    mode = "natural_language"
    → Scan .claude/.specs/ for matching specs
    → IF found: Confirm spec selection with user
        → IF user confirms: Use spec, proceed to Phase 1
        → IF user declines: Confirm proceed without spec
    → IF not found: Confirm proceed without spec

    ⚠️ CRITICAL: ALWAYS use AskUserQuestion to confirm before proceeding without spec
```

### Mode 1: File Reference

**Trigger**: User provides direct path to spec file

**Example**: `/implementing .claude/.specs/brainstorming-google-auth-1701262045.md`

**Actions**:
1. Validate file exists
2. Proceed directly to Phase 1

### Mode 2: Natural Language

**Trigger**: User provides keywords/description

**Example**: `/implementing implement authentication feature`

**Actions**:

1. Scan `.claude/.specs/` directory for matching specs (match keywords against filenames and content)

2. **IF matching spec found**:
   - Use AskUserQuestion to confirm with user:
   ```
   Found matching spec: {spec_filename}
   - Type: {spec_type}
   - Priority: {priority}

   Is this the correct spec to implement?
   ```
   - If user confirms → Use spec, proceed to Phase 1
   - If user declines → Go to step 4 (Confirm without spec)

3. **IF no matching spec found**:
   - Inform user: "No matching spec found for: '{query}'"
   - Go to step 4 (Confirm without spec)

4. **Confirm proceed without spec** (MANDATORY):
   - Use AskUserQuestion:
   ```
   question: "No spec will be used. Proceed with implementation based on your request?"
   header: "Confirm"
   options:
     - label: "Yes, proceed"
       description: "Implement without spec - I will explore codebase and create plan"
     - label: "No, cancel"
       description: "Cancel and create a spec first using /brainstorming"
   ```
   - If "Yes, proceed" → Continue to Phase 1 without spec
   - If "No, cancel" → Abort and suggest using /brainstorming to create spec first

### Exit Criteria

- [ ] Mode detected (file_reference or natural_language)
- [ ] Spec path identified (if available)
- [ ] User confirmed to proceed (with or without spec)
- [ ] Ready for Phase 1

### Gate 0→1 Decision

- **GO**: User confirmed spec selection OR confirmed to proceed without spec
- **HOLD**: Waiting for user confirmation
- **ABORT**: User selected "No, cancel" - suggest /brainstorming

---

## Phase 1: Plan Mode (REQUIRED)

### Entry Criteria

- Mode detection complete
- Spec file identified (optional)

### CRITICAL REQUIREMENT

**YOU MUST ENTER PLAN MODE BEFORE ANY CODE GENERATION**

### Actions

**STEP 1**: Use EnterPlanMode tool

**STEP 2**: If spec available, read and parse it
- Read spec file content
- Parse YAML frontmatter (spec_type, status, priority, slug)
- **Check status**:
  - If `status == complete` → Normal implementation
  - If `status == implementing` → **Resume mode** (previous implementation interrupted)
  - Otherwise → Inform user and abort
- Extract relevant sections based on spec_type (see references/strategies.md)

**STEP 2.1**: Handle Resume Mode (if `status == implementing`)
- Read `current_step` and `total_steps` from frontmatter
- Read Implementation Progress section
- Identify last completed step
- Use AskUserQuestion to confirm:
  ```
  question: "Previous implementation was interrupted at Step {N}/{total}. Resume from where it left off?"
  header: "Resume"
  options:
    - label: "Yes, resume"
      description: "Continue from Step {N}"
    - label: "No, restart"
      description: "Start implementation from beginning"
  ```

**STEP 3**: Create implementation plan

```markdown
## Implementation Plan

### Spec Reference (if available)
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
```

**STEP 4**: Use ExitPlanMode to get user approval

### Exit Criteria

- [ ] Plan Mode entered
- [ ] Spec parsed (if available)
- [ ] Implementation plan created
- [ ] User approved plan

---

## Phase 2: Implementation

### Entry Criteria

- Plan approved by user
- Strategy determined (from spec_type or general implementation)

### CRITICAL REQUIREMENTS

1. **YOU MUST USE TodoWrite THROUGHOUT EXECUTION**
2. **IF SPEC EXISTS: Follow the spec EXACTLY**
   - Implement ALL requirements defined in the spec
   - Do NOT add features not specified in the spec
   - Do NOT skip any requirements from the spec
   - Do NOT deviate from the architecture/design in the spec
   - If something is unclear, refer back to the spec before proceeding
3. **IF SPEC EXISTS: Track progress IN the spec file**
   - Update spec status to `implementing` at start
   - Track current step in spec's Implementation Progress section
   - Update on each major step completion
   - This allows resuming if interrupted

### Actions

**STEP 1**: Update spec status to `implementing` (if spec exists)

```yaml
# Edit spec file YAML frontmatter:
status: implementing  # Changed from 'complete'
implementation_started_at: {timestamp}
current_step: 0
total_steps: {number_of_steps}
```

**STEP 2**: Setup TodoWrite

Convert implementation steps from plan to todo items:

```
TodoWrite with todos:
[
  { content: "Step 1: {description}", status: "pending", activeForm: "Working on step 1" },
  { content: "Step 2: {description}", status: "pending", activeForm: "Working on step 2" },
  ...
]
```

**STEP 3**: Execute plan step by step with spec tracking

For each step:
1. Mark todo as `in_progress`
2. **Update spec frontmatter** (if exists):
   ```yaml
   current_step: {step_number}
   current_step_description: "{step_description}"
   ```
3. Execute the step
4. Mark todo as `completed`
5. **Mark checkbox DONE in spec's existing checklist** (if exists):

   **Find checklist location by spec_type**:
   | spec_type | Checklist Location |
   |-----------|-------------------|
   | brainstorming | Phase 5 → Implementation Tasks |
   | debugging | Phase 4 → FIX-001 → Steps/Affected Files |
   | reviewing | Phase 4 → Action Plan |
   | refactoring | Phase 5 → Migration Plan |

   **Mark as done**:
   ```markdown
   BEFORE: - [ ] Task description
   AFTER:  - [x] Task description ✅ {timestamp}
   ```

**STEP 4**: Update spec status to `implemented` (if spec was used)

```yaml
# Edit spec file YAML frontmatter:
status: implemented  # Changed from 'implementing'
implemented_at: {timestamp}
current_step: {total_steps}  # All steps done
```

### Strategy-Specific Execution

See references/strategies.md for detailed execution logic per strategy.

#### Quick Reference

| spec_type | Key Actions |
|-----------|-------------|
| brainstorming | Create structure from Architecture, generate code from Data Models, implement APIs |
| reviewing | Fix Critical severity issues only, document deferred issues |
| refactoring | Create characterization test (GREEN), apply migration steps, verify GREEN after each |
| debugging | Apply FIX-001 directly to affected files |

### Resume Implementation (if interrupted)

When spec has `status: implementing`, this indicates a previous implementation was interrupted.

**Detection**:
```
IF spec.status == "implementing":
    → Resume mode activated
    → Read current_step from frontmatter
    → Parse spec checklist to find completed items `- [x]`
    → Resume from first uncompleted item `- [ ]`
```

**Actions**:
1. Read spec's checklist (location depends on spec_type)
2. Identify completed steps (marked with `- [x]`)
3. Resume from first uncompleted step (marked with `- [ ]`)
4. Inform user: "Resuming implementation from Step {N}: {description}"

**Example Resume Detection**:
```markdown
## Implementation Tasks
- [x] Task 1: Create structure ✅ 180126-1430
- [x] Task 2: Add models ✅ 180126-1445
- [ ] Task 3: Create APIs  ← RESUME FROM HERE
- [ ] Task 4: Add tests
```

### Exit Criteria

- [ ] All todos completed
- [ ] Files created/modified as planned
- [ ] Spec status updated to `implemented`
- [ ] All checklist items marked as done `- [x]`

---

## Phase 3: Quality Check

### Entry Criteria

- Phase 2 implementation complete
- All todos completed

### Actions

**STEP 1**: Detect project language and tools

```
# Detect primary language from:
- package.json → JavaScript/TypeScript
- pyproject.toml / requirements.txt → Python
- go.mod → Go
- Cargo.toml → Rust
- composer.json → PHP
- Gemfile → Ruby
```

**STEP 2**: Run formatter (by language)

| Language | Formatter Commands (priority order) |
|----------|-------------------------------------|
| **JS/TS** | `npm run format` → `npx prettier --write .` → `npx biome format --write .` |
| **Python** | `ruff format .` → `black .` → `autopep8 --in-place` |
| **Go** | `gofmt -w .` → `go fmt ./...` |
| **Rust** | `cargo fmt` |
| **PHP** | `composer run format` → `php-cs-fixer fix` |
| **Ruby** | `bundle exec rubocop -a` |

**STEP 3**: Run linter (by language)

| Language | Linter Commands (priority order) |
|----------|----------------------------------|
| **JS/TS** | `npm run lint` → `npx eslint --fix .` → `npx biome lint --apply .` |
| **Python** | `ruff check --fix .` → `pylint` → `flake8` |
| **Go** | `golangci-lint run --fix` → `go vet ./...` |
| **Rust** | `cargo clippy --fix` |
| **PHP** | `composer run lint` → `phpstan analyse` |
| **Ruby** | `bundle exec rubocop` |

**STEP 4**: Run build (by language)

| Language | Build Commands (priority order) |
|----------|--------------------------------|
| **JS/TS** | `npm run build` → `npx tsc --noEmit` |
| **Python** | `python -m py_compile` → `mypy .` |
| **Go** | `go build ./...` |
| **Rust** | `cargo build` |
| **PHP** | `composer run build` |
| **Ruby** | `bundle exec rake build` |

**STEP 5**: Fix any issues

- If formatter/linter/build reports errors, fix them
- Re-run until clean or only warnings remain

**STEP 6**: Report results

```
Quality Check:
- Format: ✓ Passed
- Lint: ✓ Passed (X warnings)
- Build: ✓ Passed
```

### Exit Criteria

- [ ] Formatter ran successfully
- [ ] Linter ran successfully
- [ ] Build passed
- [ ] No blocking errors

---

## Post-Execution Summary

After all phases complete, display execution summary:

```
========================================
IMPLEMENTATION COMPLETE
========================================

Spec: {spec_path} (or "No spec used")
Type: {spec_type}
Priority: {priority}

---

Files Created:
- {file_1}
- {file_2}

Files Modified:
- {file_1}: {change_description}
- {file_2}: {change_description}

Tasks Completed: {completed}/{total}

---

Quality Check:
- Format: ✓ Passed
- Lint: ✓ Passed
- Build: ✓ Passed

Spec Status: Updated to 'implemented' (if applicable)

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
