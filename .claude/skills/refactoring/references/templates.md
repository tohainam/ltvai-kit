# Refactoring Spec File Templates

## File Naming Convention

```
refactoring-{slug}-{ddmmyyHHMM}.md
```

**Components:**

- `refactoring`: Fixed prefix
- `{slug}`: Kebab-case summary of refactoring target (max 30 chars)
- `{ddmmyyHHMM}`: Timestamp from `date "+%d%m%y%H%M"`

**Examples:**

- `refactoring-auth-service-1701262045.md`
- `refactoring-payment-module-1701262130.md`
- `refactoring-api-controller-1701262215.md`

---

## YAML Frontmatter Schema

```yaml
---
spec_type: refactoring
version: 1.0
slug: { request-slug }
created_at: { ddmmyyHHMM }
updated_at: { ddmmyyHHMM }
priority: HIGH | MEDIUM | LOW
status: initializing | scoping | detecting | assessing | selecting | complete
mode: autonomous | collaborative
current_phase: 0 | 1 | 2 | 3 | 4 | 5
smell_type: structural | duplication | coupling | unnecessary | data
complexity: simple | complex
complexity_score: { 0-10 }
target_files: []
affected_files: []
related_files: []
tags: []
---
```

**Field Descriptions:**

| Field            | Required | Description                                            |
| ---------------- | -------- | ------------------------------------------------------ |
| spec_type        | Yes      | Always "refactoring"                                   |
| version          | Yes      | Schema version (currently 1.0)                         |
| slug             | Yes      | Kebab-case identifier                                  |
| created_at       | Yes      | Timestamp when created                                 |
| updated_at       | Yes      | Timestamp of last update                               |
| priority         | Yes      | HIGH, MEDIUM, or LOW                                   |
| status           | Yes      | Current phase status                                   |
| mode             | Yes      | autonomous or collaborative                            |
| current_phase    | Yes      | Current phase number (0-5)                             |
| smell_type       | Yes      | structural, duplication, coupling, unnecessary, data   |
| complexity       | Yes      | simple (< 4) or complex (>= 4)                         |
| complexity_score | Yes      | Calculated score (0-10)                                |
| target_files     | Yes      | Array of files to refactor                             |
| affected_files   | No       | Array of files affected by changes                     |
| related_files    | No       | Array of related file paths                            |
| tags             | No       | Array of categorization tags                           |

---

## Complete Spec File Template

```markdown
---
spec_type: refactoring
version: 1.0
slug: {slug}
created_at: {ddmmyyHHMM}
updated_at: {ddmmyyHHMM}
priority: HIGH
status: initializing
mode: collaborative
current_phase: 0
smell_type: structural
complexity: simple
complexity_score: 0
target_files:
  - src/path/to/file1.ts
  - src/path/to/file2.ts
affected_files: []
related_files: []
tags:
  - refactoring
---

# Refactoring: {Title}

## Meta

| Field      | Value                     |
| ---------- | ------------------------- |
| Smell Type | {structural/duplication/coupling/unnecessary/data} |
| Complexity | {simple/complex}          |
| Score      | {0-10}                    |
| Priority   | {HIGH/MEDIUM/LOW}         |
| Status     | {current status}          |

---

## Progress

| Phase | Name              | Status     | Timestamp   |
| ----- | ----------------- | ---------- | ----------- |
| 0     | Initialization    | ✓ Complete | {timestamp} |
| 1     | Scope Analysis    | ○ Pending  | -           |
| 2     | Smell Detection   | ○ Pending  | -           |
| 3     | Impact Assessment | ○ Pending  | -           |
| 4     | Strategy Selection| ○ Pending  | -           |
| 5     | Plan Generation   | ○ Pending  | -           |

---

## Phase 1: Scope Analysis

### Target Files

| File | Purpose | Lines | Last Modified |
| ---- | ------- | ----- | ------------- |
| {path} | {description} | {count} | {date} |

### Smell Type Detection

**Detected Type**: {structural/duplication/coupling/unnecessary/data}

**Detection Rationale**:
{Why this smell type was identified}

### Complexity Assessment

| Factor                    | Score | Notes            |
| ------------------------- | ----- | ---------------- |
| Smell Count (>5 = +2)     | {n}   | {count} smells   |
| Affected Files (>10 = +2) | {n}   | {count} files    |
| External Dependencies     | {n}   | {yes/no}         |
| Database Schema Impact    | {n}   | {yes/no}         |
| Public API Impact         | {n}   | {yes/no}         |
| Test Coverage             | {n}   | {high/low}       |
| **Total Score**           | {n}   | {simple/complex} |

---

## Phase 2: Smell Detection

### STR Track (Structure)

| ID      | Severity | Smell | Location   | Description |
| ------- | -------- | ----- | ---------- | ----------- |
| STR-001 | {level}  | {name}| {file:line}| {desc}      |

### ABS Track (Abstraction)

| ID      | Severity | Smell | Location   | Description |
| ------- | -------- | ----- | ---------- | ----------- |
| ABS-001 | {level}  | {name}| {file:line}| {desc}      |

### NAM Track (Naming)

| ID      | Severity | Smell | Location   | Description |
| ------- | -------- | ----- | ---------- | ----------- |
| NAM-001 | {level}  | {name}| {file:line}| {desc}      |

### PAT Track (Pattern)

| ID      | Severity | Smell | Location   | Description |
| ------- | -------- | ----- | ---------- | ----------- |
| PAT-001 | {level}  | {name}| {file:line}| {desc}      |

### DEP Track (Dependency)

| ID      | Severity | Smell | Location   | Description |
| ------- | -------- | ----- | ---------- | ----------- |
| DEP-001 | {level}  | {name}| {file:line}| {desc}      |

### Findings Summary

| Track | Findings | Critical | High | Medium | Low |
| ----- | -------- | -------- | ---- | ------ | --- |
| STR   | {n}      | {n}      | {n}  | {n}    | {n} |
| ABS   | {n}      | {n}      | {n}  | {n}    | {n} |
| NAM   | {n}      | {n}      | {n}  | {n}    | {n} |
| PAT   | {n}      | {n}      | {n}  | {n}    | {n} |
| DEP   | {n}      | {n}      | {n}  | {n}    | {n} |
| **Total** | {n}  | {n}      | {n}  | {n}    | {n} |

---

## Phase 3: Impact Assessment

### Risk Matrix

| Risk Category      | Likelihood | Impact | Mitigation |
| ------------------ | ---------- | ------ | ---------- |
| Breaking Changes   | {level}    | {level}| {strategy} |
| Test Failures      | {level}    | {level}| {strategy} |
| Performance Impact | {level}    | {level}| {strategy} |
| Rollback Complexity| {level}    | {level}| {strategy} |

### Affected Components

| Component | Dependency Type | Impact Level |
| --------- | --------------- | ------------ |
| {name}    | {direct/indirect}| {HIGH/MEDIUM/LOW} |

### Breaking Change Analysis

**Public API Changes**: {yes/no}
- {list of API changes if any}

**Database Schema Changes**: {yes/no}
- {list of schema changes if any}

**External Contract Changes**: {yes/no}
- {list of contract changes if any}

---

## Phase 4: Strategy Selection

### Current Smells Summary

| Priority | ID      | Smell | Target Pattern |
| -------- | ------- | ----- | -------------- |
| 1        | {id}    | {smell}| {pattern}     |
| 2        | {id}    | {smell}| {pattern}     |
| 3        | {id}    | {smell}| {pattern}     |

### Refactoring Options

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

### Trade-off Evaluation

| Option | Effort | Risk | Benefit | Score |
| ------ | ------ | ---- | ------- | ----- |
| REFACTOR-001 | {est} | {level} | {benefit} | {1-10} |
| REFACTOR-002 | {est} | {level} | {benefit} | {1-10} |

---

## Phase 5: Migration Plan

### For Simple Refactoring (score < 4)

#### Direct Refactoring Steps

1. [ ] {Step 1 with specific action}
2. [ ] {Step 2 with specific action}
3. [ ] Run characterization tests (verify GREEN)
4. [ ] Apply refactoring
5. [ ] Run characterization tests again (verify still GREEN)
6. [ ] Run full test suite

### For Complex Refactoring (score >= 4)

#### Preparation Phase

- [ ] Document current behavior
- [ ] Add characterization tests for all affected paths
- [ ] Create feature flag for gradual rollout
- [ ] Set up monitoring/logging

#### Migration Phase

- [ ] Implement new structure alongside old
- [ ] Gradually redirect traffic via feature flag
- [ ] Monitor for regressions
- [ ] Complete migration when stable

#### Cleanup Phase

- [ ] Remove old code paths
- [ ] Remove feature flag
- [ ] Update documentation
- [ ] Archive migration artifacts

### Rollback Plan

**Trigger Conditions**:
- {condition 1 that requires rollback}
- {condition 2 that requires rollback}

**Rollback Steps**:
1. {Step to revert}
2. {Step to verify}

### Characterization Test Skeleton

```{language}
describe('{Component under test}', () => {
  describe('current behavior preservation', () => {
    it('should {behavior 1} when {condition 1}', () => {
      // Arrange
      {setup}

      // Act
      {action}

      // Assert - captures CURRENT behavior (must PASS)
      expect({actual}).toBe({expected});
    });

    it('should {behavior 2} when {condition 2}', () => {
      // Arrange
      {setup}

      // Act
      {action}

      // Assert - captures CURRENT behavior (must PASS)
      expect({actual}).toBe({expected});
    });
  });
});
```

**Test Status**: GREEN (should PASS before AND after refactoring)

---

## Decision Log

| Timestamp    | Phase | Decision           | Rationale              | Outcome |
| ------------ | ----- | ------------------ | ---------------------- | ------- |
| {ddmmyyHHMM} | 0     | Spec created       | Initialize refactoring | Proceed |
| {ddmmyyHHMM} | 0     | Mode: {mode}       | User selection         | Proceed |
| {ddmmyyHHMM} | 1     | Scope defined      | Files identified       | Proceed |
| {ddmmyyHHMM} | 2     | Smells detected    | 5 tracks complete      | Proceed |
| {ddmmyyHHMM} | 3     | Impact assessed    | Risk matrix complete   | Proceed |
| {ddmmyyHHMM} | 4     | Strategy selected  | REFACTOR-001 chosen    | Proceed |
| {ddmmyyHHMM} | 5     | Plan generated     | Migration ready        | Complete|

---

## Notes

### Open Questions

- {Any remaining questions or uncertainties}

### Future Considerations

- {Technical debt items discovered}
- {Related refactoring opportunities}

---

## Change History

| Date         | Phase | Changes           | Author |
| ------------ | ----- | ----------------- | ------ |
| {ddmmyyHHMM} | 0     | Initial creation  | AI     |
| {ddmmyyHHMM} | 5     | Spec complete     | AI     |
```

---

## Minimal Template (For Quick Start)

Use this for initial spec file creation in Phase 0:

```yaml
---
spec_type: refactoring
version: 1.0
slug: {slug}
created_at: {ddmmyyHHMM}
updated_at: {ddmmyyHHMM}
priority: MEDIUM
status: initializing
mode: pending
current_phase: 0
smell_type: pending
complexity: pending
complexity_score: 0
target_files: []
affected_files: []
related_files: []
tags: []
---

# Refactoring: {Title}

## Meta

| Field      | Value                   |
| ---------- | ----------------------- |
| Smell Type | Pending assessment      |
| Complexity | Pending assessment      |
| Status     | Awaiting mode selection |

---

## Progress

| Phase | Name              | Status    | Timestamp   |
| ----- | ----------------- | --------- | ----------- |
| 0     | Initialization    | ▶ Active  | {timestamp} |
| 1     | Scope Analysis    | ○ Pending | -           |
| 2     | Smell Detection   | ○ Pending | -           |
| 3     | Impact Assessment | ○ Pending | -           |
| 4     | Strategy Selection| ○ Pending | -           |
| 5     | Plan Generation   | ○ Pending | -           |

---

## Request Description

{Initial request from user}

---

## Phase 1: Scope Analysis
{To be completed}

## Phase 2: Smell Detection
{To be completed}

## Phase 3: Impact Assessment
{To be completed}

## Phase 4: Strategy Selection
{To be completed}

## Phase 5: Migration Plan
{To be completed}

---

## Decision Log

| Timestamp   | Phase | Decision     | Rationale              |
| ----------- | ----- | ------------ | ---------------------- |
| {timestamp} | 0     | Spec created | Initialize refactoring |
```

---

## Finding ID Format

**Pattern**: `{TRACK}-{NUMBER}`

| Track Code | Track Name  | Focus Area                              | Example |
| ---------- | ----------- | --------------------------------------- | ------- |
| STR        | Structure   | God classes, circular deps, organization| STR-001 |
| ABS        | Abstraction | DRY violations, duplication, extraction | ABS-001 |
| NAM        | Naming      | Conventions, clarity, misleading names  | NAM-001 |
| PAT        | Pattern     | SOLID violations, anti-patterns         | PAT-001 |
| DEP        | Dependency  | Coupling, feature envy, tight coupling  | DEP-001 |

---

## Severity Levels

| Level    | Symbol | Description                               |
| -------- | ------ | ----------------------------------------- |
| CRITICAL | 🔴     | Blocking issues, must fix immediately     |
| HIGH     | 🟠     | Significant technical debt, fix soon      |
| MEDIUM   | 🟡     | Quality concerns, should fix              |
| LOW      | 🟢     | Minor improvements, nice to have          |

---

## Smell Type Classification

| Type        | Keywords                                  | Common Patterns to Apply       |
| ----------- | ----------------------------------------- | ------------------------------ |
| structural  | god class, large file, circular deps      | Extract Class, Move Method     |
| duplication | copy-paste, repeated code, DRY violation  | Extract Method, Template Method|
| coupling    | tight coupling, feature envy, intimacy    | Move Method, Inject Dependency |
| unnecessary | dead code, speculative, unused            | Remove Dead Code, Inline       |
| data        | data clumps, primitive obsession          | Introduce Parameter Object     |

---

## Complexity Scoring Reference

| Factor                         | Condition                | Score |
| ------------------------------ | ------------------------ | ----- |
| Smell Count                    | > 5 smells               | +2    |
| Affected Files                 | > 10 files               | +2    |
| External Dependencies          | Has external deps        | +2    |
| Database Schema                | Involves DB changes      | +2    |
| Public API                     | Affects public interface | +1    |
| Test Coverage                  | Low coverage (< 50%)     | +1    |

**Total Score Interpretation**:
- `score < 4`: Simple refactoring (direct implementation)
- `score >= 4`: Complex refactoring (migration plan required)
