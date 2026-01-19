---
name: refactoring
description: |
  Structured refactoring skill for code smell detection, pattern application, and migration planning.
  Use when: (1) Code smells detected, (2) Technical debt reduction needed, (3) Design pattern application,
  (4) Performance optimization required, (5) User explicitly invokes /refactoring command.

  Produces refactoring specification files in .specs/ containing Current Smells,
  Target Patterns, and Step-by-step Migration Plan with Characterization Tests.
  Supports Autonomous and Collaborative modes with numbered phases (0-5) and explicit gate criteria.
disable-model-invocation: true
---

# Refactoring Skill

## CRITICAL CONSTRAINTS

**YOU MUST FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **NEVER** implement refactoring - produce ONLY specification documents
2. **ALWAYS** create spec file FIRST before any phase work
3. **ALWAYS** use `date "+%d%m%y%H%M"` command for timestamps (format: ddmmyyHHMM)
4. **ALWAYS** follow numbered phases sequentially (0 → 1 → 2 → 3 → 4 → 5)
5. **ALWAYS** use AskUserQuestion tool for ALL user interactions in collaborative mode
6. **ALWAYS** update spec file after completing EACH phase
7. **NEVER** skip smell detection phase even if refactoring seems obvious
8. **NEVER** implement automatically - always show output summary at the end
9. **ALWAYS** generate characterization tests (must be GREEN before AND after refactoring)
10. **MUST** assess complexity to determine Simple/Complex branching
11. **NEVER** mark checklist items as done - ALL checkboxes MUST remain unchecked `[ ]`

---

## Workflow Overview

```
Phase 0: Initialization    → Create spec file, detect smell type, select mode
Phase 1: Scope Analysis    → Read target files, calculate complexity score
Phase 2: Smell Detection   → 5 parallel scouter agents (STR, ABS, NAM, PAT, DEP)
Phase 3: Impact Assessment → Risk matrix, breaking change analysis
Phase 4: Strategy Selection → Generate options, evaluate trade-offs, select recommended
Phase 5: Plan Generation   → Migration plan, characterization tests, output summary
```

---

## Phase 0: Initialization

### Entry Criteria

- User has provided refactoring request (code smells, technical debt, optimization)

### Actions

**STEP 1**: Get current timestamp

```bash
date "+%d%m%y%H%M"
```

**STEP 2**: Generate slug from request

- Extract key concepts from user request
- Convert to kebab-case (max 30 characters)
- Example: "refactor auth service" → "auth-service"

**STEP 3**: Detect smell type

```
IF request mentions "god class" OR "large file" OR "circular":
    smell_type = "structural"
ELIF request mentions "duplicate" OR "copy" OR "DRY":
    smell_type = "duplication"
ELIF request mentions "coupling" OR "dependency" OR "envy":
    smell_type = "coupling"
ELIF request mentions "dead code" OR "unused" OR "speculative":
    smell_type = "unnecessary"
ELIF request mentions "data clump" OR "primitive" OR "parameter":
    smell_type = "data"
ELSE:
    smell_type = "structural" (default)
```

**STEP 4**: Create spec file

- Path: `.specs/refactoring-{slug}-{timestamp}.md`
- Initialize with YAML frontmatter (see references/templates.md)
- Set status: `initializing`

**STEP 5**: Select mode using AskUserQuestion

```
Spec file created at: .specs/refactoring-{slug}-{timestamp}.md
Smell type detected: {smell_type}

Select your preferred refactoring mode:

AUTONOMOUS:
- I proceed through phases with minimal interruption
- Check in at Phase 2 (smell detection summary) and Phase 4 (strategy selection)
- Faster, comprehensive analysis

COLLABORATIVE:
- After EACH phase, we discuss findings
- You provide input and direction at every step
- More interactive, higher control
```

### Exit Criteria

- [ ] Spec file exists with valid frontmatter
- [ ] Smell type detected
- [ ] Mode selected (autonomous/collaborative)
- [ ] Request description captured

### Gate 0→1 Decision

- **GO**: Spec file created, mode selected, smell type identified
- **HOLD**: User did not respond to mode selection

---

## Phase 1: Scope Analysis

### Entry Criteria

- Phase 0 complete
- Spec file created
- Smell type and mode selected

### Actions

**STEP 1**: Read target files

- Identify files from user request
- Read file contents and structure
- Document file metadata (lines, last modified)

**STEP 2**: Identify dependencies

- Internal dependencies (imports within project)
- External dependencies (npm packages, libraries)
- Circular dependencies (if any)

**STEP 3**: Calculate complexity score

```
complexity_score = 0

IF smell_count > 5:
    complexity_score += 2    # Multiple smells indicate systemic issue

IF affected_files_count > 10:
    complexity_score += 2    # Wide impact

IF has_external_dependencies:
    complexity_score += 2    # API contracts may change

IF involves_database_schema:
    complexity_score += 2    # Migration required

IF affects_public_api:
    complexity_score += 1    # Breaking change risk

IF has_low_test_coverage:
    complexity_score += 1    # Regression risk

RESULT:
    complexity_score >= 4 → complexity = "complex"
    complexity_score < 4  → complexity = "simple"
```

**STEP 4**: Determine branching

- Simple: Direct refactoring, quick patterns
- Complex: Full migration plan with feature flags and rollback

**STEP 5**: Update spec file with scope findings

### Exit Criteria

- [ ] Target files read and documented
- [ ] Dependencies identified
- [ ] Complexity score calculated
- [ ] simple/complex branching determined

### Gate 1→2 Decision

- **GO**: Scope complete, complexity determined
- **HOLD**: Files unreadable or inaccessible
- **RECYCLE**: Wrong files identified, restart scope

---

## Phase 2: Smell Detection (5 Parallel Tracks)

### Entry Criteria

- Phase 1 complete
- Scope analysis documented
- Target files accessible

### CRITICAL: PARALLEL SMELL DETECTION

**MUST** use up to 5 scouter agents in parallel:

```
Launch Task with subagent_type="scouter":

  Agent 1: "STR Track (Structure) - Analyze {target_files} for:
    - God classes (too many responsibilities)
    - Circular dependencies
    - File organization issues
    - Module boundary violations
    Return: Structural findings with file:line locations"

  Agent 2: "ABS Track (Abstraction) - Analyze {target_files} for:
    - Duplicate code blocks
    - DRY violations
    - Extraction opportunities
    - Missing abstractions
    Return: Abstraction findings with file:line locations"

  Agent 3: "NAM Track (Naming) - Analyze {target_files} for:
    - Naming convention violations
    - Unclear/misleading names
    - Inconsistent naming patterns
    - Magic numbers/strings
    Return: Naming findings with file:line locations"

  Agent 4: "PAT Track (Pattern) - Analyze {target_files} for:
    - SOLID principle violations
    - Anti-patterns present
    - Design pattern opportunities
    - Switch statement smells
    Return: Pattern findings with file:line locations"

  Agent 5: "DEP Track (Dependency) - Analyze {target_files} for:
    - Tight coupling issues
    - Feature envy
    - Inappropriate intimacy
    - Dependency injection needs
    Return: Dependency findings with file:line locations"
```

### Finding Format

Each finding must follow this format:

````markdown
### {TRACK}-{NUMBER}: {Smell Name}

**Severity**: CRITICAL | HIGH | MEDIUM | LOW
**Location**: {file}:{line}

**Description**:
{What the smell is and why it's problematic}

**Code Example**:

```{language}
{relevant code snippet}
```
````

**Recommended Pattern**: {pattern name from references/refactoring-patterns.md}

```

### Smell Detection Summary Format

**ALWAYS display detection summary using this format:**

```

---

PHASE 2: SMELL DETECTION - SUMMARY

Agents Deployed: 5/5

| Track | Findings | Critical | High | Medium | Low |
| ----- | -------- | -------- | ---- | ------ | --- |
| STR   | {n}      | {n}      | {n}  | {n}    | {n} |
| ABS   | {n}      | {n}      | {n}  | {n}    | {n} |
| NAM   | {n}      | {n}      | {n}  | {n}    | {n} |
| PAT   | {n}      | {n}      | {n}  | {n}    | {n} |
| DEP   | {n}      | {n}      | {n}  | {n}    | {n} |
| Total | {n}      | {n}      | {n}  | {n}    | {n} |

Top Priority Smells:

1. {TRACK-ID}: {smell name} [{severity}]
2. {TRACK-ID}: {smell name} [{severity}]
3. {TRACK-ID}: {smell name} [{severity}]

## Complexity Confirmation: {simple/complex}

````

### Exit Actions

1. Collect and synthesize all agent results
2. Display Smell Detection Summary (format above)
3. Update spec file with all findings
4. Set status: `detecting`

### Gate 2→3 Decision

- **GO**: All tracks complete, findings documented
- **HOLD**: Some tracks incomplete, need more analysis
- **RECYCLE**: Scope was incorrect, return to Phase 1

---

## Phase 3: Impact Assessment

### Entry Criteria

- Phase 2 complete
- Smell detection documented
- All tracks have findings

### Actions

**STEP 1**: Generate risk matrix

```markdown
### Risk Matrix

| Risk Category      | Likelihood | Impact | Mitigation |
| ------------------ | ---------- | ------ | ---------- |
| Breaking Changes   | {level}    | {level}| {strategy} |
| Test Failures      | {level}    | {level}| {strategy} |
| Performance Impact | {level}    | {level}| {strategy} |
| Rollback Complexity| {level}    | {level}| {strategy} |
````

**STEP 2**: Analyze breaking changes

- Public API changes
- Database schema changes
- External contract changes

**STEP 3**: Map affected components

- Direct dependencies
- Indirect dependencies
- Component impact level (HIGH/MEDIUM/LOW)

**STEP 4**: Apply complexity-based branching

```
IF complexity == "simple":
    → Quick assessment (risk overview only)
ELSE:
    → Full impact analysis (detailed risk matrix, dependency graph)
```

**STEP 5**: Update spec file with impact assessment

### Exit Criteria

- [ ] Risk matrix complete
- [ ] Breaking changes analyzed
- [ ] Affected components mapped
- [ ] Mitigation strategies defined

### Gate 3→4 Decision

- **GO**: Impact assessed, risks documented
- **HOLD**: Risk matrix incomplete
- **RECYCLE**: Scope changed significantly

---

## Phase 4: Strategy Selection

### Entry Criteria

- Phase 3 complete
- Impact assessment documented
- Risks understood

### Actions

**STEP 1**: Summarize current smells

Map each significant smell to a target pattern:

```markdown
### Current Smells Summary

| Priority | ID   | Smell        | Target Pattern |
| -------- | ---- | ------------ | -------------- |
| 1        | {id} | {smell name} | {pattern}      |
| 2        | {id} | {smell name} | {pattern}      |
| 3        | {id} | {smell name} | {pattern}      |
```

**STEP 2**: Generate refactoring options (minimum 2)

```markdown
#### REFACTOR-001: {Title} (Recommended)

- **Approach**: extract | rename | move | redesign
- **Pattern**: {target pattern name}
- **Description**: {what to change}
- **Affected Files**:
  - {file1}: {change description}
  - {file2}: {change description}
- **Effort**: {estimate}
- **Risk**: LOW | MEDIUM | HIGH
- **Pros**: {advantages}
- **Cons**: {disadvantages}

#### REFACTOR-002: {Alternative Title}

- **Approach**: {type}
- **Description**: {what to change}
- **Effort**: {estimate}
- **Risk**: {level}
- **Pros**: {advantages}
- **Cons**: {disadvantages}
```

**STEP 3**: Evaluate trade-offs

| Option       | Effort | Risk    | Benefit   | Score (1-10) |
| ------------ | ------ | ------- | --------- | ------------ |
| REFACTOR-001 | {est}  | {level} | {benefit} | {score}      |
| REFACTOR-002 | {est}  | {level} | {benefit} | {score}      |

**STEP 4**: Select recommended option

- Highest score based on effort/risk/benefit
- Document why others were not selected

**STEP 5**: Update spec file with strategy

### Exit Criteria

- [ ] At least 2 options documented
- [ ] Trade-offs evaluated
- [ ] Recommended option selected
- [ ] Selection rationale documented

### Gate 4→5 Decision

- **GO**: Strategy selected with rationale
- **HOLD**: Options incomplete
- **RECYCLE**: Need more smell analysis (return to Phase 2)

---

## Phase 5: Plan Generation

### Entry Criteria

- Phase 4 complete
- Strategy selected
- Trade-offs documented

### Actions

**For Simple Refactoring (complexity_score < 4)**:

```markdown
### Direct Refactoring Steps

1. [ ] Add characterization tests for current behavior
2. [ ] Run tests (verify GREEN - all pass)
3. [ ] Apply refactoring step by step:
   - {specific action 1}
   - {specific action 2}
   - {specific action 3}
4. [ ] Run tests after each step (verify still GREEN)
5. [ ] Run full test suite
6. [ ] Review and commit
```

**For Complex Refactoring (complexity_score >= 4)**:

```markdown
### Preparation Phase

- [ ] Document current behavior thoroughly
- [ ] Add characterization tests for all affected code paths
- [ ] Create feature flag for gradual rollout
- [ ] Set up monitoring and logging for affected areas

### Migration Phase

- [ ] Implement new structure alongside old
- [ ] Redirect traffic gradually via feature flag
- [ ] Monitor for regressions
- [ ] Complete migration when stable (100% traffic)

### Cleanup Phase

- [ ] Remove old code paths
- [ ] Remove feature flag
- [ ] Update documentation
- [ ] Archive migration artifacts
```

**STEP 2**: Generate rollback plan

```markdown
### Rollback Plan

**Trigger Conditions**:

- Test failures > threshold
- Performance degradation detected
- Critical bugs in production

**Rollback Steps**:

1. {Step to disable/revert changes}
2. {Step to restore old behavior}
3. {Step to verify rollback}
```

**STEP 3**: Generate characterization test skeleton

````markdown
### Characterization Test Skeleton

```{language}
describe('{Component under test}', () => {
  describe('current behavior preservation', () => {
    it('should {behavior 1} when {condition 1}', () => {
      // Arrange
      {setup code}

      // Act
      {action code}

      // Assert - captures CURRENT behavior (must PASS)
      expect({actual}).toBe({expected});
    });

    it('should {behavior 2} when {condition 2}', () => {
      // Arrange
      {setup code}

      // Act
      {action code}

      // Assert - captures CURRENT behavior (must PASS)
      expect({actual}).toBe({expected});
    });
  });
});
```
````

**Test Status**: GREEN (should PASS before AND after refactoring)

```

**STEP 4**: Update spec file status to `complete`

**STEP 5**: Display Output Summary

### Exit Criteria

- [ ] Migration plan complete (simple or complex)
- [ ] Rollback plan documented
- [ ] Characterization tests generated
- [ ] Output summary displayed

---

## Output Summary Format

**ALWAYS display this summary after Phase 5 completion:**

```

========================================
REFACTORING COMPLETE: {Smell Type} Analysis
========================================

Spec File: .specs/refactoring-{slug}-{timestamp}.md

---

Summary:
{2-3 sentence description of the refactoring scope, primary smells found, and recommended approach}

---

Smells Detected:
| Track | Count | Critical | High |
|-------|-------|----------|------|
| STR | {n} | {n} | {n} |
| ABS | {n} | {n} | {n} |
| NAM | {n} | {n} | {n} |
| PAT | {n} | {n} | {n} |
| DEP | {n} | {n} | {n} |

Complexity: {simple/complex} (Score: {0-10})

---

Recommended Strategy:

- REFACTOR-001: {title}
  Approach: {extract/move/rename/redesign}
  Pattern: {target pattern}
  Risk: {LOW/MEDIUM/HIGH}
  Effort: {estimate}

---

Migration Plan:

- Type: {Direct Refactoring / 3-Phase Migration}
- Steps: {N} total
- Characterization Tests: Provided (GREEN status)

---

Next Steps:

Option A - Implement refactoring:
/implementing .specs/refactoring-{slug}-{timestamp}.md

Option B - Review specification:
Open the spec file for detailed analysis

Option C - Request changes:
Ask for alternative strategies or more analysis

========================================
IMPORTANT: Refactoring NOT implemented.
This is a specification document only.
Review the spec file before proceeding.
========================================

```

---

## Mode Behavior Reference

### Autonomous Mode

```

Phase 0: Create spec, ask mode selection → wait for response
Phase 1: Complete scope analysis → proceed automatically
Phase 2: Launch agents, synthesize → checkpoint: present smell detection summary
Phase 3: Complete impact assessment → proceed automatically
Phase 4: Complete strategy selection → checkpoint: present recommended strategy
Phase 5: Generate plan → show final summary

```

### Collaborative Mode

```

After EVERY phase:

1. Summarize what was accomplished
2. Present key findings
3. Ask clarifying questions if needed
4. Wait for user confirmation: "Ready to proceed to Phase {N+1}?"
5. Only proceed after user confirms

```

---

## Reference Files

- **references/templates.md**: Refactoring spec YAML schema and body structure
- **references/smell-catalog.md**: Code smell categories and detection criteria
- **references/refactoring-patterns.md**: Pattern catalog with application guides
- **references/gate-criteria.md**: Detailed gate requirements for each phase
```
