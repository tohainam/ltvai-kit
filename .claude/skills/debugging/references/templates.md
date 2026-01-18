# Debugging Spec File Templates

## File Naming Convention

```
debugging-{slug}-{ddmmyyHHMM}.md
```

**Components:**

- `debugging`: Fixed prefix
- `{slug}`: Kebab-case summary of bug (max 30 chars)
- `{ddmmyyHHMM}`: Timestamp from `date "+%d%m%y%H%M"`

**Examples:**

- `debugging-login-crash-1701262045.md`
- `debugging-payment-timeout-1701262130.md`
- `debugging-auth-bypass-1701262215.md`

---

## YAML Frontmatter Schema

```yaml
---
spec_type: debugging
version: 1.0
slug: { request-slug }
created_at: { ddmmyyHHMM }
updated_at: { ddmmyyHHMM }
priority: HIGH | MEDIUM | LOW
status: initializing | reproducing | investigating | analyzing | fixing | complete
mode: autonomous | collaborative
current_phase: 0 | 1 | 2 | 3 | 4 | 5
issue_type: runtime_error | logic_bug | performance | security | regression
severity: CRITICAL | HIGH | MEDIUM | LOW
bug_complexity: simple | complex
affected_files: []
related_files: []
tags: []
---
```

**Field Descriptions:**

| Field          | Required | Description                                                     |
| -------------- | -------- | --------------------------------------------------------------- |
| spec_type      | Yes      | Always "debugging"                                              |
| version        | Yes      | Schema version (currently 1.0)                                  |
| slug           | Yes      | Kebab-case identifier                                           |
| created_at     | Yes      | Timestamp when created                                          |
| updated_at     | Yes      | Timestamp of last update                                        |
| priority       | Yes      | HIGH, MEDIUM, or LOW                                            |
| status         | Yes      | Current phase status                                            |
| mode           | Yes      | autonomous or collaborative                                     |
| current_phase  | Yes      | Current phase number (0-5)                                      |
| issue_type     | Yes      | runtime_error, logic_bug, performance, security, or regression  |
| severity       | Yes      | CRITICAL, HIGH, MEDIUM, or LOW                                  |
| bug_complexity | Yes      | simple (5 Whys) or complex (Fishbone)                           |
| affected_files | Yes      | Array of files containing the bug                               |
| related_files  | No       | Array of related file paths                                     |
| tags           | No       | Array of categorization tags                                    |

---

## Complete Spec File Template

```markdown
---
spec_type: debugging
version: 1.0
slug: {slug}
created_at: {ddmmyyHHMM}
updated_at: {ddmmyyHHMM}
priority: HIGH
status: initializing
mode: collaborative
current_phase: 0
issue_type: runtime_error
severity: HIGH
bug_complexity: simple
affected_files:
  - src/path/to/file1.ts
  - src/path/to/file2.ts
related_files: []
tags:
  - debugging
  - rca
---

# Debugging: {Bug Title}

## Meta

| Field      | Value                                      |
| ---------- | ------------------------------------------ |
| Issue Type | {runtime_error/logic_bug/performance/etc}  |
| Severity   | {CRITICAL/HIGH/MEDIUM/LOW}                 |
| Complexity | {simple/complex}                           |
| RCA Method | {5 Whys / Fishbone}                        |
| Priority   | {HIGH/MEDIUM/LOW}                          |
| Status     | {current status}                           |

---

## Progress

| Phase | Name               | Status     | Timestamp   |
| ----- | ------------------ | ---------- | ----------- |
| 0     | Initialization     | ✓ Complete | {timestamp} |
| 1     | Reproduction       | ○ Pending  | -           |
| 2     | Investigation      | ○ Pending  | -           |
| 3     | Root Cause Analysis| ○ Pending  | -           |
| 4     | Fix Strategy       | ○ Pending  | -           |
| 5     | Specification      | ○ Pending  | -           |

---

## Phase 1: Reproduction

### Bug Description

{Clear description of the observed bug behavior}

### Reproduction Steps

1. {Precondition/setup}
2. {Action step 1}
3. {Action step 2}
4. {Trigger action}
5. **Observed**: {What happens}
6. **Expected**: {What should happen}

### Environment

- **OS**: {operating system and version}
- **Runtime**: {Node/Python/Java version}
- **Browser**: {if applicable}
- **Dependencies**: {relevant package versions}
- **Configuration**: {relevant config values}
- **Data State**: {relevant data conditions}

### Reproducibility

- **Rate**: {100% / intermittent with frequency}
- **Conditions**: {specific conditions required}

### Complexity Assessment

| Factor                    | Score | Notes       |
| ------------------------- | ----- | ----------- |
| Symptom Count             | {n}   | {details}   |
| Affected Files            | {n}   | {details}   |
| Reproduction Rate         | {%}   | {details}   |
| Async/Race Condition      | {y/n} | {details}   |
| Multiple Components       | {y/n} | {details}   |
| **Total Complexity Score**| {n}   | {simple/complex} |

---

## Phase 2: Investigation

### Agent Findings

#### Agent 1: Error Analysis Track

| Aspect               | Finding            |
| -------------------- | ------------------ |
| Exception Type       | {type}             |
| Error Message        | {message}          |
| Error Origin         | {file:line}        |
| Call Chain           | {stack trace summary} |
| Related Patterns     | {patterns found}   |

#### Agent 2: Code Context Track

| File         | Function/Method   | Issue             | Severity |
| ------------ | ----------------- | ----------------- | -------- |
| {file:line}  | {function name}   | {issue found}     | {level}  |

#### Agent 3: Git History Track

| Commit       | Date       | Author   | Change Summary      | Suspect? |
| ------------ | ---------- | -------- | ------------------- | -------- |
| {hash}       | {date}     | {author} | {summary}           | {yes/no} |

#### Agent 4: Log Analysis Track

| Timestamp    | Level   | Message           | Correlation |
| ------------ | ------- | ----------------- | ----------- |
| {time}       | {level} | {log message}     | {related?}  |

#### Agent 5: Related Issues Track

| Source       | Finding             | Relevance |
| ------------ | ------------------- | --------- |
| TODO/FIXME   | {location: content} | {level}   |
| Similar Bug  | {reference}         | {level}   |
| Test Status  | {test file: status} | {level}   |

### Probable Cause Areas

1. {Area 1} - Confidence: {HIGH/MEDIUM/LOW}
2. {Area 2} - Confidence: {HIGH/MEDIUM/LOW}
3. {Area 3} - Confidence: {HIGH/MEDIUM/LOW}

---

## Phase 3: Root Cause Analysis

### RCA Method: {5 Whys / Fishbone}

{Include appropriate analysis based on complexity}

### 5 Whys Analysis (if simple)

**Problem**: {observed bug behavior}

**Why 1**: Why does {problem} occur?
- Answer: {first level cause}

**Why 2**: Why does {first level cause} happen?
- Answer: {second level cause}

**Why 3**: Why does {second level cause} happen?
- Answer: {third level cause}

**Why 4**: Why does {third level cause} happen?
- Answer: {fourth level cause}

**Why 5**: Why does {fourth level cause} happen?
- Answer: {root cause}

### Fishbone Analysis (if complex)

**Effect**: {observed bug behavior}

#### Method (Process/Logic)
- {cause related to algorithm/logic}

#### Machine (Infrastructure/Environment)
- {cause related to server/runtime}

#### Material (Data/Input)
- {cause related to data quality}

#### Man (Human/Code)
- {cause related to implementation}

#### Measurement (Monitoring/Logging)
- {cause related to observability}

#### Mother Nature (External/Timing)
- {cause related to race conditions}

### Root Cause Findings

#### RCA-001: {Root Cause Title}

**Severity**: {CRITICAL/HIGH/MEDIUM/LOW}
**Confidence**: {HIGH/MEDIUM/LOW}

**Description**:
{Clear description of the root cause}

**Evidence**:
- {Evidence 1 from investigation}
- {Evidence 2 from investigation}

**Affected Code**:
```{language}
// File: {path}
// Line: {number}
{code snippet showing the issue}
```

**Why This Causes the Bug**:
{Explanation of causation chain}

---

## Phase 4: Fix Strategy

### Fix Options

#### FIX-001: {Fix Title} (Recommended)

- **Approach**: {patch/refactor/redesign}
- **Description**: {What to change}
- **Affected Files**:
  - {file1}: {change description}
  - {file2}: {change description}
- **Estimated Effort**: {hours/days}
- **Risk Level**: {LOW/MEDIUM/HIGH}
- **Pros**: {advantages}
- **Cons**: {disadvantages}

#### FIX-002: {Alternative Fix Title}

- **Approach**: {type}
- **Description**: {What to change}
- **Affected Files**: {list}
- **Estimated Effort**: {hours/days}
- **Risk Level**: {level}
- **Pros**: {advantages}
- **Cons**: {disadvantages}

### Risk Assessment

| Risk           | Likelihood   | Impact       | Mitigation   |
| -------------- | ------------ | ------------ | ------------ |
| {risk 1}       | {LOW/MED/HI} | {LOW/MED/HI} | {mitigation} |
| {risk 2}       | {LOW/MED/HI} | {LOW/MED/HI} | {mitigation} |

**Overall Fix Risk**: {LOW/MEDIUM/HIGH}

### Verification Test Case

**Test Name**: test_{bug_description}_should_{expected_behavior}

**Description**: Verify that {bug} is fixed by confirming {expected behavior}

**Preconditions**:
1. {setup step 1}
2. {setup step 2}

**Test Steps**:
1. {action 1}
2. {action 2}
3. {trigger action}

**Assertions** (CRITICAL: ALL checkboxes MUST remain UNCHECKED `[ ]` - this is a specification, NOT implementation):
- [ ] {assertion 1}: expect({actual}).to{matcher}({expected})
- [ ] {assertion 2}: expect({actual}).to{matcher}({expected})

**Expected Result (After Fix)**: {what should happen}
**Actual Result (Before Fix)**: {what currently happens - FAILS}

**Framework-Agnostic Code Skeleton**:
```{language}
describe('{Component/Function under test}', () => {
  it('should {expected behavior} when {condition}', () => {
    // Arrange
    {setup code}

    // Act
    {action code}

    // Assert
    expect({actual}).toBe({expected});
  });
});
```

**TDD Status**: RED (Test should FAIL before fix is applied)

---

## Phase 5: Specification Summary

### Bug Summary

{2-3 sentence description of the bug, its root cause, and recommended fix}

### Recommended Action

- **Fix**: FIX-001 - {fix title}
- **Approach**: {patch/refactor/redesign}
- **Risk**: {LOW/MEDIUM/HIGH}
- **Effort**: {estimate}

### TDD Handoff

The Implementing skill should:
1. Create the failing test case from skeleton
2. Run test (should FAIL - RED)
3. Apply FIX-001
4. Run test (should PASS - GREEN)
5. Run regression tests

---

## Decision Log

| Timestamp    | Phase | Decision               | Rationale               | Outcome |
| ------------ | ----- | ---------------------- | ----------------------- | ------- |
| {ddmmyyHHMM} | 0     | Spec created           | Initialize debugging    | Proceed |
| {ddmmyyHHMM} | 0     | Mode: {mode}           | User selection          | Proceed |
| {ddmmyyHHMM} | 1     | Bug reproduced         | Steps documented        | Proceed |
| {ddmmyyHHMM} | 2     | Investigation complete | 5 agents deployed       | Proceed |
| {ddmmyyHHMM} | 3     | RCA: {method}          | Complexity: {level}     | Proceed |
| {ddmmyyHHMM} | 4     | Fix selected: FIX-001  | Best risk/effort ratio  | Proceed |

---

## Notes

### Open Questions

- {Any remaining questions or uncertainties}

### Future Considerations

- {Improvements to prevent similar bugs}

---

## Change History

| Date         | Phase | Changes              | Author |
| ------------ | ----- | -------------------- | ------ |
| {ddmmyyHHMM} | 0     | Initial creation     | AI     |
| {ddmmyyHHMM} | 5     | Spec complete        | AI     |
```

---

## Minimal Template (For Quick Start)

Use this for initial spec file creation in Phase 0:

```yaml
---
spec_type: debugging
version: 1.0
slug: {slug}
created_at: {ddmmyyHHMM}
updated_at: {ddmmyyHHMM}
priority: MEDIUM
status: initializing
mode: pending
current_phase: 0
issue_type: {issue_type}
severity: MEDIUM
bug_complexity: pending
affected_files: []
related_files: []
tags: []
---

# Debugging: {Bug Title}

## Meta

| Field      | Value                     |
| ---------- | ------------------------- |
| Issue Type | {issue_type}              |
| Severity   | Pending assessment        |
| Status     | Awaiting mode selection   |

---

## Progress

| Phase | Name               | Status    | Timestamp   |
| ----- | ------------------ | --------- | ----------- |
| 0     | Initialization     | ▶ Active  | {timestamp} |
| 1     | Reproduction       | ○ Pending | -           |
| 2     | Investigation      | ○ Pending | -           |
| 3     | Root Cause Analysis| ○ Pending | -           |
| 4     | Fix Strategy       | ○ Pending | -           |
| 5     | Specification      | ○ Pending | -           |

---

## Bug Description

{Initial bug description from user}

---

## Phase 1: Reproduction
{To be completed}

## Phase 2: Investigation
{To be completed}

## Phase 3: Root Cause Analysis
{To be completed}

## Phase 4: Fix Strategy
{To be completed}

## Phase 5: Specification Summary
{To be completed}

---

## Decision Log

| Timestamp   | Phase | Decision     | Rationale           |
| ----------- | ----- | ------------ | ------------------- |
| {timestamp} | 0     | Spec created | Initialize debugging|
```

---

## Finding ID Format

**Pattern**: `{TYPE}-{NUMBER}`

| Type Code | Type Name         | Example |
| --------- | ----------------- | ------- |
| RCA       | Root Cause        | RCA-001 |
| FIX       | Fix Option        | FIX-001 |
| RISK      | Risk Item         | RISK-001|
| TEST      | Test Case         | TEST-001|

---

## Issue Type Classification

| Type          | Trigger Keywords                              | Typical Severity |
| ------------- | --------------------------------------------- | ---------------- |
| runtime_error | exception, crash, stack trace, error          | HIGH-CRITICAL    |
| logic_bug     | wrong output, incorrect behavior, unexpected  | MEDIUM-HIGH      |
| performance   | slow, timeout, memory, CPU, lag               | MEDIUM           |
| security      | auth, injection, exposure, bypass, leak       | HIGH-CRITICAL    |
| regression    | worked before, after update, broke            | HIGH             |

---

## Severity Levels

| Level    | Symbol | Description                                     | Response Time |
| -------- | ------ | ----------------------------------------------- | ------------- |
| CRITICAL | 🔴     | Security breach, data loss, system down         | Immediate     |
| HIGH     | 🟠     | Major functionality broken, significant impact  | Same day      |
| MEDIUM   | 🟡     | Feature degraded, workaround available          | This sprint   |
| LOW      | 🟢     | Minor inconvenience, cosmetic issues            | Backlog       |
