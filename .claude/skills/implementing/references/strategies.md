# Execution Strategies

This document contains detailed execution logic for each spec_type strategy.

---

## Strategy Overview

| Strategy | spec_type | Input Sections | Key Actions |
|----------|-----------|----------------|-------------|
| Brainstorming | `brainstorming` | Architecture, Data Models, API, Tasks | Create structure, generate code |
| Reviewing | `reviewing` | Critical Issues, Action Plan | Fix critical issues only |
| Refactoring | `refactoring` | Migration Plan, Characterization Test | Behavior-preserving changes |
| Debugging | `debugging` | FIX-001, affected_files | Direct fix application |

---

## Brainstorming Strategy

### Input Sections to Parse

```
Phase 5: Specification
├── Architecture Diagram (Mermaid)
├── Data Models (TypeScript interfaces)
├── API Contracts (YAML/OpenAPI)
└── Implementation Tasks (Checklist)
```

### Execution Flow

**STEP 1**: Parse Architecture Diagram

```
1. Extract component names from Mermaid graph
2. Identify directory structure from subgraphs
3. Map connections to determine dependencies
```

**STEP 2**: Parse Data Models

```
1. Extract all interface definitions
2. Identify entity types (core entities, DTOs, enums)
3. Determine file locations based on naming:
   - Core entities → src/models/ or src/entities/
   - DTOs → src/dtos/ or src/types/
   - Shared types → src/types/
```

**STEP 3**: Parse API Contracts

```
1. Extract endpoint definitions
2. Identify HTTP methods, paths, request/response types
3. Map to controller/route files:
   - Routes → src/routes/ or src/api/
   - Controllers → src/controllers/
   - Services → src/services/
```

**STEP 4**: Parse Implementation Tasks

```
1. Extract task list from spec
2. Create TodoWrite items for each task
3. Execute tasks in order
```

### Code Generation Guidelines

**Data Models**:
```typescript
// Generate interfaces exactly as specified in spec
// Add JSDoc comments for documentation
// Export all types

/**
 * {Description from spec}
 */
export interface EntityName {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  // ... fields from spec
}
```

**API Routes**:
```typescript
// Follow existing patterns in codebase
// Use framework-appropriate syntax (Express, Fastify, etc.)
// Include error handling

router.post('/api/v1/resource', async (req, res) => {
  try {
    // Implementation from spec
  } catch (error) {
    // Error handling
  }
});
```

### TodoWrite Setup Example

```json
[
  { "content": "Create project structure from Architecture Diagram", "status": "pending", "activeForm": "Creating project structure" },
  { "content": "Generate data model interfaces", "status": "pending", "activeForm": "Generating data models" },
  { "content": "Create API route files", "status": "pending", "activeForm": "Creating API routes" },
  { "content": "Implement service layer", "status": "pending", "activeForm": "Implementing services" },
  { "content": "Add database integration", "status": "pending", "activeForm": "Adding database integration" }
]
```

### Checklist Tracking (in spec file)

After completing each task, mark it done in spec's Implementation Tasks section:

```markdown
## Implementation Tasks

### Setup
- [x] Task 1: Create project structure (Est: 1h) ✅ 180126-1430
- [x] Task 2: Configure dependencies (Est: 30m) ✅ 180126-1445

### Core Features
- [x] Task 3: Implement data models (Est: 2h) ✅ 180126-1500
- [ ] Task 4: Create API endpoints (Est: 3h)  ← IN PROGRESS
- [ ] Task 5: Add business logic (Est: 4h)
```

---

## Reviewing Strategy

### Input Sections to Parse

```
Phase 3: Findings
├── Critical Issues (MUST FIX NOW)
└── High/Medium/Low Priority Issues

Phase 4: Action Plan
└── Remediation Steps
```

### Execution Flow

**CRITICAL**: Only fix Critical severity issues. Leave others for future.

**STEP 1**: Parse Critical Issues Section

```
1. Locate "Critical Issues" or "MUST FIX NOW" section
2. Extract each issue:
   - Issue ID (e.g., SEC-001, QUAL-001)
   - Description
   - Affected file and line numbers
   - Recommended fix
```

**STEP 2**: Parse Action Plan

```
1. Extract action items marked as CRITICAL or HIGH priority
2. Map to specific file changes
```

**STEP 3**: Apply Fixes

```
FOR each critical_issue:
    1. Read affected file
    2. Locate problematic code section
    3. Apply recommended fix
    4. Verify fix doesn't break existing functionality
    5. Mark issue as resolved in todos
```

### What to Fix vs What to Skip

| Severity | Action |
|----------|--------|
| CRITICAL | **FIX NOW** - Security vulnerabilities, data loss risks |
| HIGH | Fix if straightforward, otherwise document for follow-up |
| MEDIUM | Skip - Document for future iteration |
| LOW | Skip - Document for future iteration |

### TodoWrite Setup Example

```json
[
  { "content": "Fix SEC-001: SQL injection in user query", "status": "pending", "activeForm": "Fixing SQL injection vulnerability" },
  { "content": "Fix QUAL-001: Unhandled null reference", "status": "pending", "activeForm": "Fixing null reference issue" },
  { "content": "Document skipped medium/low issues", "status": "pending", "activeForm": "Documenting deferred issues" }
]
```

### Checklist Tracking (in spec file)

Mark issues as fixed in spec's Action Plan section:

```markdown
## Action Plan

### Critical (MUST FIX NOW)
- [x] SEC-001: Fix SQL injection in user query ✅ 180126-1430
- [x] QUAL-001: Fix unhandled null reference ✅ 180126-1445

### High Priority (Fix if time permits)
- [ ] PERF-001: Add caching for repeated queries
- [ ] QUAL-002: Refactor duplicate validation

### Deferred to next iteration
- [ ] STYLE-001: Inconsistent naming
- [ ] DOC-001: Missing JSDoc
```

### Output Notes

After fixing, document what was NOT fixed:

```markdown
## Deferred Issues (for future iteration)

### Medium Priority
- PERF-001: Consider caching for repeated queries
- QUAL-002: Refactor duplicate validation logic

### Low Priority
- STYLE-001: Inconsistent naming convention
- DOC-001: Missing JSDoc for public API
```

---

## Refactoring Strategy

### Input Sections to Parse

```
Phase 5: Specification
├── Migration Plan (Step-by-step)
└── Characterization Test
```

### Execution Flow

**CRITICAL**: Behavior MUST be preserved. Run tests after each step.

**STEP 1**: Parse Characterization Test

```
1. Extract test code skeleton from spec
2. Adapt to project's test framework (Jest/Vitest/pytest)
3. Create test file
```

**STEP 2**: Run Characterization Test (Must PASS - GREEN)

```bash
# Detect test framework and run
npm test -- --testPathPattern={test_file}
# OR
pytest {test_file}
```

**VERIFY**: Test MUST pass before proceeding. If test fails:
- The characterization test is wrong
- Fix the test, not the code
- Re-run until GREEN

**STEP 3**: Parse Migration Plan

```
1. Extract numbered migration steps
2. Each step should be atomic and testable
```

**STEP 4**: Execute Migration Steps

```
FOR each migration_step:
    1. Apply code changes for this step
    2. Run characterization test
    3. VERIFY: Test MUST still PASS (GREEN)
    4. If test fails:
       - STOP immediately
       - Rollback this step
       - Investigate issue
    5. Mark step as complete
```

### Migration Step Format

```markdown
### Step 1: Extract method {name}

**Before**:
```{language}
{code before refactoring}
```

**After**:
```{language}
{code after refactoring}
```

**Verification**: Run test, expect GREEN
```

### TodoWrite Setup Example

```json
[
  { "content": "Create characterization test", "status": "pending", "activeForm": "Creating characterization test" },
  { "content": "Verify characterization test passes (GREEN)", "status": "pending", "activeForm": "Verifying test passes" },
  { "content": "Step 1: Extract method validateInput", "status": "pending", "activeForm": "Extracting validateInput method" },
  { "content": "Verify test still GREEN after Step 1", "status": "pending", "activeForm": "Verifying test after step 1" },
  { "content": "Step 2: Introduce parameter object", "status": "pending", "activeForm": "Introducing parameter object" },
  { "content": "Verify test still GREEN after Step 2", "status": "pending", "activeForm": "Verifying test after step 2" }
]
```

### Checklist Tracking (in spec file)

Mark migration steps as done in spec's Migration Plan section:

```markdown
## Migration Plan

### Characterization Test
- [x] Create test file ✅ 180126-1430
- [x] Verify GREEN ✅ 180126-1431

### Migration Steps
- [x] Step 1: Extract method validateInput ✅ 180126-1440
  - [x] Verify GREEN after step ✅ 180126-1441
- [x] Step 2: Introduce parameter object ✅ 180126-1450
  - [x] Verify GREEN after step ✅ 180126-1451
- [ ] Step 3: Move to separate file  ← IN PROGRESS
  - [ ] Verify GREEN after step
```

### Safety Rules

1. **Never skip characterization test** - It's your safety net
2. **Run test after EVERY step** - Catch issues immediately
3. **One step at a time** - Don't batch multiple changes
4. **Rollback on red** - If test fails, undo last change

---

## Debugging Strategy

### Input Sections to Parse

```
Phase 4: Fix Strategy
├── FIX-001 (Recommended Fix)
│   ├── Approach
│   ├── Description
│   ├── Affected Files
│   └── Code Changes
└── affected_files (from frontmatter)
```

### CRITICAL: NO TDD WORKFLOW

**This strategy does NOT generate tests or follow TDD.**

The debugging spec already contains:
- Root cause analysis
- Recommended fix
- (Optional) Verification test case for reference

The implementing skill's job is to **apply the fix directly**.

### Execution Flow

**STEP 1**: Parse FIX-001 Section

```
1. Locate "FIX-001" or "Recommended Fix" section
2. Extract:
   - Approach: patch | refactor | redesign
   - Description: what to change
   - Affected Files: list with change descriptions
   - Code Changes: before/after snippets
```

**STEP 2**: Parse affected_files from Frontmatter

```yaml
affected_files:
  - src/services/auth.ts
  - src/utils/validation.ts
```

**STEP 3**: Apply Fix

```
FOR each affected_file in FIX-001:
    1. Read current file content
    2. Locate the code section to change
    3. Apply the fix as specified in spec
    4. Verify syntax is correct
    5. Save file
```

**STEP 4**: Verify Fix Applied

```
1. Re-read modified files
2. Confirm changes match spec
3. Check no syntax errors introduced
```

### What This Strategy Does NOT Do

| Action | Do? | Reason |
|--------|-----|--------|
| Generate test files | NO | Not part of this strategy |
| Run TDD workflow | NO | Direct fix only |
| Create characterization tests | NO | That's for refactoring |
| Run existing tests | OPTIONAL | User can request separately |

### TodoWrite Setup Example

```json
[
  { "content": "Parse FIX-001 from debugging spec", "status": "pending", "activeForm": "Parsing fix recommendation" },
  { "content": "Apply fix to src/services/auth.ts", "status": "pending", "activeForm": "Fixing auth.ts" },
  { "content": "Apply fix to src/utils/validation.ts", "status": "pending", "activeForm": "Fixing validation.ts" },
  { "content": "Verify fixes applied correctly", "status": "pending", "activeForm": "Verifying fixes" }
]
```

### Checklist Tracking (in spec file)

Mark fix steps as done in spec's Fix Strategy section:

```markdown
## FIX-001: Fix null reference in auth validation

**Approach**: patch

**Steps**:
- [x] Read affected file src/services/auth.ts ✅ 180126-1430
- [x] Locate line 45 with problematic code ✅ 180126-1431
- [x] Apply null check: `user?.email?.toLowerCase()` ✅ 180126-1432
- [x] Verify syntax correct ✅ 180126-1433

**Affected Files**:
- [x] `src/services/auth.ts`: Add null check ✅ 180126-1432
- [ ] `src/utils/validation.ts`: Add validation  ← IN PROGRESS
```

### Code Change Format in Spec

The debugging spec typically contains:

```markdown
### FIX-001: Fix null reference in auth validation

**Affected Files**:
- `src/services/auth.ts`: Add null check before accessing user.email

**Code Changes**:

**Before** (src/services/auth.ts:45):
```typescript
const email = user.email.toLowerCase();
```

**After**:
```typescript
const email = user?.email?.toLowerCase() ?? '';
```
```

The implementing skill should locate line 45 in auth.ts and apply this exact change.

---

## Common Patterns Across Strategies

### Spec Progress Tracking (MANDATORY when spec exists)

**When to update spec**:
1. At start of implementation → status: `implementing`
2. After each task completion → mark checkbox in spec's existing checklist
3. At end of implementation → status: `implemented`

**Spec Checklist Locations by Type**:

| spec_type | Checklist Location | Format |
|-----------|-------------------|--------|
| brainstorming | Phase 5 → Implementation Tasks | `- [ ] Task description` |
| debugging | Phase 4 → Fix Strategy → Steps | `- [ ] Step description` |
| reviewing | Phase 4 → Action Plan | `- [ ] Action item` |
| refactoring | Phase 5 → Migration Plan | `- [ ] Migration step` |

**Update Pattern - USE EXISTING CHECKLISTS**:

```
FOR each task in spec_checklist:
    1. Update frontmatter:
       current_step: {task_number}
       current_step_description: "{task_description}"

    2. Execute the task

    3. Mark checkbox DONE in spec file:
       BEFORE: - [ ] Task description
       AFTER:  - [x] Task description ✅ {timestamp}

    4. Update TodoWrite to match
```

**Example - Brainstorming Spec Checklist**:

```markdown
## Implementation Tasks

### Setup
- [x] Task 1: Create project structure ✅ 180126-1430
- [x] Task 2: Configure dependencies ✅ 180126-1445

### Core Features
- [x] Task 3: Implement data models ✅ 180126-1500
- [ ] Task 4: Create API endpoints  ← CURRENT
- [ ] Task 5: Add business logic

### Testing
- [ ] Task 6: Write unit tests
```

**Example - Debugging Spec Checklist**:

```markdown
### FIX-001: Fix null reference

**Steps**:
- [x] Read affected file src/auth.ts ✅ 180126-1430
- [x] Locate problematic code at line 45 ✅ 180126-1431
- [ ] Apply null check fix  ← CURRENT
- [ ] Verify syntax correct
```

**Resume Logic**:
```
IF spec.status == "implementing":
    # Parse spec checklist
    FOR item in spec_checklist:
        IF item starts with "- [x]":
            mark as completed
        ELIF item starts with "- [ ]":
            resume_from = this item
            BREAK

    # Inform user
    print("Resuming from: {resume_from.description}")

    # Continue execution
```

### File Operations

**Reading Files**:
```
Use Read tool with absolute path
Handle file not found gracefully
```

**Editing Files**:
```
Use Edit tool with old_string and new_string
Ensure old_string is unique (add context if needed)
```

**Creating Files**:
```
Use Write tool for new files
Follow existing project structure
```

### Test Framework Detection

```bash
# Check package.json for test framework
IF has "jest" in devDependencies:
    framework = "jest"
    run_cmd = "npm test"
ELIF has "vitest" in devDependencies:
    framework = "vitest"
    run_cmd = "npm run test"
ELIF has "pytest" in pyproject.toml OR requirements.txt:
    framework = "pytest"
    run_cmd = "pytest"
```

### Progress Tracking

Always use TodoWrite to track progress:

```
1. Create initial todo list at start
2. Mark task "in_progress" before starting
3. Mark task "completed" immediately after finishing
4. Never batch completions
```

---

## Quick Reference

| User Request | Detected Mode | Strategy |
|--------------|---------------|----------|
| `/implementing .claude/.specs/brainstorming-*.md` | File Reference | Use spec directly |
| `/implementing auth feature` | Natural Language | Find matching spec or continue without |
| `/implementing implement login` | Natural Language | Find matching spec or continue without |

| spec_type | Key Actions |
|-----------|-------------|
| brainstorming | Create new code from spec |
| reviewing | Fix critical issues only |
| refactoring | Behavior-preserving changes with tests |
| debugging | Direct fix application |

---

## Phase 0: Mode Detection Details

### Phase 0 Actions

```
1. Initialize TodoWrite with all 4 phases
2. Detect mode (file_reference or natural_language)
3. If natural_language:
   a. Scan .claude/.specs/ for matching specs
   b. If found → AskUserQuestion to confirm spec
   c. If not found OR user declines → AskUserQuestion to confirm proceed without spec
4. Mark Phase 0 complete, Phase 1 in_progress
```

### Confirmation Flow (MANDATORY for Natural Language mode)

```
┌─────────────────────────────────────┐
│ User provides natural language      │
│ query (not a spec file path)        │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│ Scan .claude/.specs/ for matches    │
└──────────────────┬──────────────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
         ▼                   ▼
┌─────────────────┐ ┌─────────────────┐
│ Match found     │ │ No match found  │
└────────┬────────┘ └────────┬────────┘
         │                   │
         ▼                   │
┌─────────────────┐          │
│ AskUserQuestion │          │
│ "Is this the    │          │
│ correct spec?"  │          │
└────────┬────────┘          │
         │                   │
    ┌────┴────┐              │
    │         │              │
    ▼         ▼              │
┌───────┐ ┌───────┐          │
│  Yes  │ │  No   │          │
└───┬───┘ └───┬───┘          │
    │         │              │
    │         └──────────────┼──────┐
    │                        │      │
    ▼                        ▼      ▼
┌─────────────────┐ ┌─────────────────┐
│ Use spec        │ │ AskUserQuestion │
│ → Phase 1       │ │ "Proceed        │
└─────────────────┘ │ without spec?"  │
                    └────────┬────────┘
                             │
                        ┌────┴────┐
                        │         │
                        ▼         ▼
                    ┌───────┐ ┌───────┐
                    │  Yes  │ │  No   │
                    └───┬───┘ └───┬───┘
                        │         │
                        ▼         ▼
                    ┌───────┐ ┌───────┐
                    │Phase 1│ │ ABORT │
                    │no spec│ │suggest│
                    └───────┘ │/brain │
                              └───────┘
```

### Key Rules

1. **ALWAYS initialize TodoWrite at start of Phase 0**
2. **ALWAYS use AskUserQuestion before proceeding without spec**
3. **NEVER auto-proceed without user confirmation in natural language mode**
4. **If user aborts, suggest /brainstorming or /debugging**

---

## Progress Tracking Decision Tree

```
┌─────────────────────────────────────┐
│ Has spec file?                      │
└──────────────────┬──────────────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
         ▼                   ▼
    ┌─────────┐         ┌─────────┐
    │   YES   │         │   NO    │
    └────┬────┘         └────┬────┘
         │                   │
         ▼                   ▼
┌─────────────────┐ ┌─────────────────┐
│ Track progress  │ │ Use TodoWrite   │
│ IN spec file:   │ │ ONLY (no spec   │
│ - frontmatter   │ │ to update)      │
│ - progress tbl  │ │                 │
│ + TodoWrite     │ │ Can't resume    │
└─────────────────┘ └─────────────────┘
```

### With Spec File
- Update `status: implementing` at start
- Track `current_step` in frontmatter
- Maintain Implementation Progress table
- Update `status: implemented` at end
- **Resume capability**: YES

### Without Spec File
- Use TodoWrite for task tracking only
- No persistent progress storage
- **Resume capability**: NO (must restart if interrupted)

**Recommendation**: For complex implementations, create a spec first using /brainstorming to enable resume capability.
