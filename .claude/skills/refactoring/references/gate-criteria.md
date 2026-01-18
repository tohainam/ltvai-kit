# Refactoring Skill Gate Criteria

This document defines the criteria for transitioning between phases in the Refactoring skill workflow.

---

## Gate Anatomy

Each gate follows this structure:

```
Gate N→N+1
├── Inputs (from Phase N)
├── Must-Meet Criteria (blocking - cannot proceed without)
├── Should-Meet Criteria (recommended - proceed with caution if missing)
├── Review Process
│   ├── Autonomous Mode: Automated check
│   └── Collaborative Mode: User review
└── Decisions
    ├── GO: Proceed to next phase
    ├── HOLD: Wait for missing criteria
    └── RECYCLE: Return to previous phase
```

---

## Gate 0→1: Initialization → Scope Analysis

### Inputs from Phase 0

- Spec file created at `.specs/refactoring-{slug}-{timestamp}.md`
- YAML frontmatter initialized
- Mode selected (autonomous/collaborative)
- User request captured

### Must-Meet Criteria

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Spec file exists | File path valid |
| 2 | YAML frontmatter valid | All required fields present |
| 3 | Mode selected | mode != 'pending' |
| 4 | Request captured | Request description non-empty |

### Should-Meet Criteria

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Target files identified | target_files.length > 0 |
| 2 | Priority assigned | priority != 'MEDIUM' (explicit) |

### Review Process

**Autonomous Mode**:
```
IF all Must-Meet criteria pass:
    → GO to Phase 1
ELSE:
    → HOLD, display missing criteria
```

**Collaborative Mode**:
```
Display spec summary
Ask: "Spec file created. Ready to proceed to Scope Analysis?"
IF user confirms:
    → GO to Phase 1
ELSE:
    → HOLD for user input
```

### Decisions

| Decision | Condition | Action |
|----------|-----------|--------|
| GO | All must-meet criteria pass | Proceed to Phase 1 |
| HOLD | Missing spec file or mode | Wait for completion |

---

## Gate 1→2: Scope Analysis → Smell Detection

### Inputs from Phase 1

- Target files read and analyzed
- Smell type detected
- Complexity score calculated
- simple/complex branching determined

### Must-Meet Criteria

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Target files read | All files accessible |
| 2 | Smell type detected | smell_type in valid values |
| 3 | Complexity scored | complexity_score calculated (0-10) |
| 4 | Branching determined | complexity = 'simple' or 'complex' |

### Should-Meet Criteria

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | File metadata captured | Lines, last modified recorded |
| 2 | Dependencies identified | Internal/external deps listed |
| 3 | Test coverage assessed | Coverage level known |

### Complexity Scoring Validation

```
Score components verified:
□ smell_count assessment (+2 if > 5)
□ affected_files assessment (+2 if > 10)
□ external_dependencies assessment (+2 if present)
□ database_schema assessment (+2 if involved)
□ public_api assessment (+1 if affected)
□ test_coverage assessment (+1 if low)

Total: {0-10}
Branching: score >= 4 → complex, else → simple
```

### Review Process

**Autonomous Mode**:
```
IF all Must-Meet criteria pass:
    Display scope summary:
    - Target: {N} files
    - Smell Type: {type}
    - Complexity: {score} ({simple/complex})
    → GO to Phase 2
ELSE:
    → RECYCLE to Phase 1 with missing items
```

**Collaborative Mode**:
```
Display detailed scope analysis
Ask: "Scope analysis complete. Detected {smell_type} with complexity {score}. Proceed to Smell Detection?"
IF user confirms:
    → GO to Phase 2
ELIF user requests changes:
    → RECYCLE to Phase 1
ELSE:
    → HOLD for user input
```

### Decisions

| Decision | Condition | Action |
|----------|-----------|--------|
| GO | Scope complete, complexity determined | Proceed to Phase 2 |
| HOLD | Files unreadable | Wait for access |
| RECYCLE | Wrong files identified | Return to Phase 1 |

---

## Gate 2→3: Smell Detection → Impact Assessment

### Inputs from Phase 2

- 5 parallel track results (STR, ABS, NAM, PAT, DEP)
- Merged findings with IDs
- Findings summary by severity

### Must-Meet Criteria

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | All 5 tracks complete | Each track has results |
| 2 | Findings have IDs | All findings follow {TRACK}-{N} format |
| 3 | Findings have severity | All findings have CRITICAL/HIGH/MEDIUM/LOW |
| 4 | Findings summary exists | Count by track and severity |

### Should-Meet Criteria

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Findings have locations | file:line specified |
| 2 | Findings have descriptions | Non-empty description |
| 3 | Related patterns identified | Each smell linked to pattern |

### Track Completion Checklist

```
□ STR Track (Structure)
  - God classes checked
  - Circular dependencies checked
  - File organization checked

□ ABS Track (Abstraction)
  - Duplication checked
  - DRY violations checked
  - Extraction opportunities identified

□ NAM Track (Naming)
  - Convention consistency checked
  - Clarity issues identified
  - Misleading names flagged

□ PAT Track (Pattern)
  - SOLID violations checked
  - Anti-patterns identified
  - Design pattern opportunities noted

□ DEP Track (Dependency)
  - Coupling issues identified
  - Feature envy detected
  - Dependency injection needs assessed
```

### Review Process

**Autonomous Mode**:
```
IF all 5 tracks complete AND findings have IDs/severity:
    Display detection summary:
    ----------------------------------------
    PHASE 2: SMELL DETECTION - SUMMARY

    Agents Deployed: 5/5

    | Track | Findings | Critical | High | Medium | Low |
    |-------|----------|----------|------|--------|-----|
    | STR   | {n}      | {n}      | {n}  | {n}    | {n} |
    | ...   | ...      | ...      | ...  | ...    | ... |

    Total: {N} smells detected
    Primary Concern: {most severe category}
    ----------------------------------------
    → Checkpoint: Present summary, wait for acknowledgment
    → GO to Phase 3
ELSE:
    → HOLD, list incomplete tracks
```

**Collaborative Mode**:
```
Display all findings by track
Ask: "Smell detection found {N} issues. Review the findings?"
IF user approves findings:
    → GO to Phase 3
ELIF user questions findings:
    → Discuss specific findings
    → HOLD until resolved
ELSE:
    → RECYCLE if tracks need re-run
```

### Decisions

| Decision | Condition | Action |
|----------|-----------|--------|
| GO | All tracks complete with findings | Proceed to Phase 3 |
| HOLD | Some tracks incomplete | Wait for completion |
| RECYCLE | Wrong smell type assumed | Return to Phase 1 |

---

## Gate 3→4: Impact Assessment → Strategy Selection

### Inputs from Phase 3

- Risk matrix completed
- Breaking change analysis done
- Affected components mapped
- Complexity-based assessment (simple/complex)

### Must-Meet Criteria

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Risk matrix complete | All risk categories assessed |
| 2 | Breaking changes analyzed | Public API/DB/contracts checked |
| 3 | Affected components listed | Component impact documented |

### Should-Meet Criteria

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Mitigation strategies defined | Each risk has mitigation |
| 2 | Rollback complexity assessed | Difficulty level known |
| 3 | Dependency graph created | For complex refactoring |

### Risk Matrix Validation

```
Required risk categories:
□ Breaking Changes - Likelihood & Impact assessed
□ Test Failures - Likelihood & Impact assessed
□ Performance Impact - Likelihood & Impact assessed
□ Rollback Complexity - Likelihood & Impact assessed

Breaking Change Analysis:
□ Public API Changes documented
□ Database Schema Changes documented
□ External Contract Changes documented
```

### Review Process

**Autonomous Mode**:
```
IF risk matrix complete AND breaking changes analyzed:
    → GO to Phase 4
ELSE:
    → HOLD, list missing assessments
```

**Collaborative Mode**:
```
Display risk assessment
Ask: "Impact assessment shows {risk_level} overall risk. Accept and proceed to Strategy Selection?"
IF user accepts:
    → GO to Phase 4
ELIF user wants more analysis:
    → HOLD for additional assessment
ELSE:
    → RECYCLE if fundamental issues found
```

### Decisions

| Decision | Condition | Action |
|----------|-----------|--------|
| GO | Risk assessed, impacts documented | Proceed to Phase 4 |
| HOLD | Risk matrix incomplete | Wait for assessment |
| RECYCLE | Scope changed significantly | Return to Phase 1 |

---

## Gate 4→5: Strategy Selection → Plan Generation

### Inputs from Phase 4

- Current smells summary
- Refactoring options generated (REFACTOR-001, etc.)
- Trade-off evaluation complete
- Recommended option selected

### Must-Meet Criteria

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | At least 2 options generated | options.length >= 2 |
| 2 | Options have required fields | approach, pattern, files, risk |
| 3 | Trade-offs evaluated | Effort/Risk/Benefit scored |
| 4 | Recommended option identified | One option marked recommended |

### Should-Meet Criteria

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | All high-severity smells addressed | CRITICAL/HIGH mapped to options |
| 2 | Alternative options documented | Pros/cons for non-recommended |
| 3 | User preferences considered | In collaborative mode |

### Option Validation

```
Each REFACTOR-{N} must have:
□ Approach: extract | rename | move | redesign
□ Pattern: Target refactoring pattern name
□ Description: Clear change description
□ Affected Files: List with change descriptions
□ Effort: Time/complexity estimate
□ Risk: LOW | MEDIUM | HIGH
□ Pros: Advantages list
□ Cons: Disadvantages list
```

### Review Process

**Autonomous Mode**:
```
IF options valid AND recommended selected:
    Display strategy summary:
    ----------------------------------------
    RECOMMENDED: REFACTOR-001 - {title}
    Approach: {approach}
    Risk: {level}
    Effort: {estimate}

    Alternatives:
    - REFACTOR-002: {title} (Risk: {level})
    - REFACTOR-003: {title} (Risk: {level})
    ----------------------------------------
    → Checkpoint: Present selection, wait for acknowledgment
    → GO to Phase 5
ELSE:
    → HOLD, list missing criteria
```

**Collaborative Mode**:
```
Present all options with trade-offs
Ask: "Recommended approach is REFACTOR-001: {title}. Accept this strategy?"
IF user accepts:
    → GO to Phase 5
ELIF user prefers different option:
    → Update recommendation
    → GO to Phase 5
ELSE:
    → HOLD or RECYCLE as needed
```

### Decisions

| Decision | Condition | Action |
|----------|-----------|--------|
| GO | Strategy selected with rationale | Proceed to Phase 5 |
| HOLD | Options incomplete | Wait for evaluation |
| RECYCLE | Need more smell analysis | Return to Phase 2 |

---

## Gate 5→Complete: Plan Generation → Completion

### Inputs from Phase 5

- Migration plan generated (simple or complex)
- Characterization test skeleton created
- Rollback plan documented
- Output summary prepared

### Must-Meet Criteria

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Migration plan complete | All steps documented |
| 2 | Test skeleton provided | Characterization tests defined |
| 3 | Test status is GREEN | Tests designed to PASS |
| 4 | Output summary ready | All sections populated |

### For Simple Refactoring (score < 4)

```
□ Direct refactoring steps listed
□ Pre-refactoring test step included
□ Post-refactoring verification step included
□ Full test suite step included
```

### For Complex Refactoring (score >= 4)

```
Preparation Phase:
□ Document current behavior step
□ Add characterization tests step
□ Create feature flag step
□ Set up monitoring step

Migration Phase:
□ Implement new structure step
□ Gradual traffic migration step
□ Monitor for regressions step
□ Complete migration step

Cleanup Phase:
□ Remove old code step
□ Remove feature flag step
□ Update documentation step
```

### Should-Meet Criteria

| # | Criterion | Verification |
|---|-----------|--------------|
| 1 | Rollback plan complete | Trigger conditions + steps |
| 2 | Test cases specific | Concrete assertions defined |
| 3 | Decision log complete | All phases documented |

### Final Validation

```
Spec file completeness:
□ All phases documented
□ status = 'complete'
□ Decision log updated
□ Output summary ready

Implementing skill compatibility:
□ spec_type: refactoring
□ Characterization tests GREEN status
□ Migration steps actionable
```

### Review Process

**Autonomous Mode**:
```
IF all criteria pass:
    Update status to 'complete'
    Display Output Summary
    → Complete
ELSE:
    → HOLD, list missing items
```

**Collaborative Mode**:
```
Present complete migration plan
Ask: "Migration plan ready. Any changes before finalizing?"
IF user approves:
    → Complete with Output Summary
ELIF user requests changes:
    → HOLD for modifications
ELSE:
    → RECYCLE to appropriate phase
```

### Decisions

| Decision | Condition | Action |
|----------|-----------|--------|
| Complete | All criteria pass | Display output summary, mark complete |
| HOLD | Missing plan sections | Wait for completion |
| RECYCLE | Strategy needs revision | Return to Phase 4 |

---

## Gate Summary Matrix

| Gate | From | To | Key Criteria | Primary Risk |
|------|------|----|--------------|--------------|
| 0→1 | Init | Scope | Spec exists, mode selected | Missing request |
| 1→2 | Scope | Smell | Files read, complexity scored | Wrong scope |
| 2→3 | Smell | Impact | 5 tracks complete, IDs assigned | Incomplete analysis |
| 3→4 | Impact | Strategy | Risk matrix, breaking changes | Underestimated risk |
| 4→5 | Strategy | Plan | Options evaluated, recommended selected | Wrong strategy |
| 5→Done | Plan | Complete | Migration plan, tests ready | Incomplete plan |

---

## Quick Reference: Gate Decisions

```
GO:     All must-meet criteria pass, proceed to next phase
HOLD:   Waiting for criteria, stay at current phase
RECYCLE: Fundamental issue, return to earlier phase
```

### Common HOLD Reasons

- Files not accessible
- User input needed
- Risk assessment incomplete
- Options not fully evaluated

### Common RECYCLE Reasons

- Wrong files identified (→ Phase 1)
- Wrong smell type (→ Phase 1)
- Missing smells discovered (→ Phase 2)
- Strategy doesn't address key smells (→ Phase 4)
