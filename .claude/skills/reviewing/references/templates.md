# Review Spec File Templates

## File Naming Convention

```
reviewing-{slug}-{ddmmyyHHMM}.md
```

**Components:**

- `reviewing`: Fixed prefix
- `{slug}`: Kebab-case summary of review target (max 30 chars)
- `{ddmmyyHHMM}`: Timestamp from `date "+%d%m%y%H%M"`

**Examples:**

- `reviewing-auth-module-pr-1701262045.md`
- `reviewing-payment-security-1701262130.md`
- `reviewing-api-endpoints-1701262215.md`

---

## YAML Frontmatter Schema

```yaml
---
spec_type: reviewing
version: 1.0
slug: { request-slug }
created_at: { ddmmyyHHMM }
updated_at: { ddmmyyHHMM }
priority: HIGH | MEDIUM | LOW
status: initializing | context | inspecting | consolidating | assessing | complete
mode: autonomous | collaborative
current_phase: 0 | 1 | 2 | 3 | 4 | 5
review_type: pr_review | security_audit | general_review
target_files: []
related_files: []
tags: []
---
```

**Field Descriptions:**

| Field        | Required | Description                                        |
| ------------ | -------- | -------------------------------------------------- |
| spec_type    | Yes      | Always "reviewing"                                 |
| version      | Yes      | Schema version (currently 1.0)                     |
| slug         | Yes      | Kebab-case identifier                              |
| created_at   | Yes      | Timestamp when created                             |
| updated_at   | Yes      | Timestamp of last update                           |
| priority     | Yes      | HIGH, MEDIUM, or LOW                               |
| status       | Yes      | Current phase status                               |
| mode         | Yes      | autonomous or collaborative                        |
| current_phase| Yes      | Current phase number (0-5)                         |
| review_type  | Yes      | pr_review, security_audit, or general_review       |
| target_files | Yes      | Array of files being reviewed                      |
| related_files| No       | Array of related file paths                        |
| tags         | No       | Array of categorization tags                       |

---

## Complete Spec File Template

```markdown
---
spec_type: reviewing
version: 1.0
slug: {slug}
created_at: {ddmmyyHHMM}
updated_at: {ddmmyyHHMM}
priority: HIGH
status: initializing
mode: collaborative
current_phase: 0
review_type: pr_review
target_files:
  - src/path/to/file1.ts
  - src/path/to/file2.ts
related_files: []
tags:
  - code-review
---

# Review: {Title}

## Meta

| Field       | Value                      |
| ----------- | -------------------------- |
| Review Type | {pr_review/security_audit/general_review} |
| Target      | {Brief description}        |
| Files       | {N} files, ~{lines} lines  |
| Priority    | {HIGH/MEDIUM/LOW}          |
| Status      | {current status}           |

---

## Progress

| Phase | Name                  | Status      | Timestamp    |
| ----- | --------------------- | ----------- | ------------ |
| 0     | Initialization        | ✓ Complete  | {timestamp}  |
| 1     | Context Discovery     | ○ Pending   | -            |
| 2     | Multi-Track Inspection| ○ Pending   | -            |
| 3     | Findings Consolidation| ○ Pending   | -            |
| 4     | Risk Assessment       | ○ Pending   | -            |
| 5     | Report Generation     | ○ Pending   | -            |

---

## Phase 1: Context Discovery

### Target Files

| File | Purpose | Lines | Complexity |
| ---- | ------- | ----- | ---------- |
| {path} | {description} | {count} | {low/medium/high} |

### Dependencies

- **Internal**: {list internal dependencies}
- **External**: {list external packages}

### Git History Summary

{Recent changes summary}

---

## Phase 2: Multi-Track Inspection

### Security Track

| ID | Severity | Issue | Location | Description |
| -- | -------- | ----- | -------- | ----------- |
| SEC-001 | {severity} | {title} | {file:line} | {description} |

### Performance Track

| ID | Severity | Issue | Location | Description |
| -- | -------- | ----- | -------- | ----------- |
| PERF-001 | {severity} | {title} | {file:line} | {description} |

### Quality Track

| ID | Severity | Issue | Location | Description |
| -- | -------- | ----- | -------- | ----------- |
| QUAL-001 | {severity} | {title} | {file:line} | {description} |

### Coverage Track

| ID | Severity | Issue | Location | Description |
| -- | -------- | ----- | -------- | ----------- |
| COV-001 | {severity} | {title} | {file:line} | {description} |

---

## Phase 3: Findings Consolidation

### Critical Issues (MUST FIX NOW)

| ID | Track | Issue | Location | Recommendation |
| -- | ----- | ----- | -------- | -------------- |
| {id} | {track} | {title} | {file:line} | {fix suggestion} |

### High Priority Issues (FIX BEFORE MERGE)

| ID | Track | Issue | Location | Recommendation |
| -- | ----- | ----- | -------- | -------------- |
| {id} | {track} | {title} | {file:line} | {fix suggestion} |

### Medium Priority Issues (SHOULD FIX)

| ID | Track | Issue | Location | Recommendation |
| -- | ----- | ----- | -------- | -------------- |
| {id} | {track} | {title} | {file:line} | {fix suggestion} |

### Low Priority Issues (NICE TO HAVE)

| ID | Track | Issue | Location | Recommendation |
| -- | ----- | ----- | -------- | -------------- |
| {id} | {track} | {title} | {file:line} | {fix suggestion} |

---

## Phase 4: Risk Assessment

### Dimension Scores

| Dimension       | Score | Max | %    | Status |
| --------------- | ----- | --- | ---- | ------ |
| Security        | -     | 25  | -    | -      |
| Performance     | -     | 20  | -    | -      |
| Maintainability | -     | 20  | -    | -      |
| Readability     | -     | 15  | -    | -      |
| Test Coverage   | -     | 20  | -    | -      |
| **TOTAL**       | -     | 100 | -    | -      |

### Overall Grade: {A/B/C/D/F}

### Grade Interpretation

{Description based on grade}

---

## Phase 5: Report

### Summary

{2-3 sentence summary of review findings and overall assessment}

### Action Plan

**CRITICAL: ALL checkboxes MUST remain UNCHECKED `[ ]`. NEVER mark items as done `[x]`.**
**This is a specification document - implementation has NOT been done yet.**

#### Must Fix Now (Critical)

1. [ ] {Action item with finding ID}
2. [ ] {Action item with finding ID}

#### Fix Before Merge (High)

1. [ ] {Action item with finding ID}
2. [ ] {Action item with finding ID}

#### Should Fix (Medium)

1. [ ] {Action item with finding ID}
2. [ ] {Action item with finding ID}

#### Nice to Have (Low)

1. [ ] {Action item with finding ID}
2. [ ] {Action item with finding ID}

### Recommendations

{Additional recommendations for improvement}

---

## Decision Log

| Timestamp    | Phase | Decision         | Rationale            |
| ------------ | ----- | ---------------- | -------------------- |
| {ddmmyyHHMM} | 0     | Spec created     | Initialize review    |
| {ddmmyyHHMM} | 0     | Mode: {mode}     | User selection       |

---

## Change History

| Date         | Phase | Changes           | Author |
| ------------ | ----- | ----------------- | ------ |
| {ddmmyyHHMM} | 0     | Initial creation  | AI     |
```

---

## Minimal Template (For Quick Start)

Use this for initial spec file creation in Phase 0:

```yaml
---
spec_type: reviewing
version: 1.0
slug: {slug}
created_at: {ddmmyyHHMM}
updated_at: {ddmmyyHHMM}
priority: MEDIUM
status: initializing
mode: pending
current_phase: 0
review_type: {review_type}
target_files: []
related_files: []
tags: []
---

# Review: {Title}

## Meta

| Field       | Value                      |
| ----------- | -------------------------- |
| Review Type | {review_type}              |
| Target      | {Brief description}        |
| Status      | Awaiting mode selection    |

---

## Progress

| Phase | Name                  | Status    | Timestamp |
| ----- | --------------------- | --------- | --------- |
| 0     | Initialization        | ▶ Active  | {timestamp} |
| 1     | Context Discovery     | ○ Pending | -         |
| 2     | Multi-Track Inspection| ○ Pending | -         |
| 3     | Findings Consolidation| ○ Pending | -         |
| 4     | Risk Assessment       | ○ Pending | -         |
| 5     | Report Generation     | ○ Pending | -         |

---

## Phase 1: Context Discovery
{To be completed}

## Phase 2: Multi-Track Inspection
{To be completed}

## Phase 3: Findings Consolidation
{To be completed}

## Phase 4: Risk Assessment
{To be completed}

## Phase 5: Report
{To be completed}

---

## Decision Log

| Timestamp | Phase | Decision | Rationale |
| --------- | ----- | -------- | --------- |
| {timestamp} | 0 | Spec created | Initialize review |
```

---

## Finding ID Format

**Pattern**: `{TRACK}-{NUMBER}`

| Track Code | Track Name      | Example |
| ---------- | --------------- | ------- |
| SEC        | Security        | SEC-001 |
| PERF       | Performance     | PERF-001 |
| QUAL       | Quality         | QUAL-001 |
| COV        | Coverage        | COV-001 |
| DOC        | Documentation   | DOC-001 |

---

## Severity Levels

| Level    | Symbol | Description                              |
| -------- | ------ | ---------------------------------------- |
| CRITICAL | 🔴     | Must fix immediately, security/crash risk |
| HIGH     | 🟠     | Fix before merge, significant issues     |
| MEDIUM   | 🟡     | Should fix, quality concerns             |
| LOW      | 🟢     | Nice to have, minor improvements         |
