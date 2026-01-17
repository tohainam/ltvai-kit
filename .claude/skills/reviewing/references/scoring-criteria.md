# Scoring Criteria Reference

## Overview

The reviewing skill uses a 100-point weighted scoring system across 5 dimensions, combined with traffic light indicators for quick visual assessment.

---

## Dimension Weights

| Dimension       | Max Points | Weight | Rationale                                    |
| --------------- | ---------- | ------ | -------------------------------------------- |
| Security        | 25         | 25%    | Highest priority - vulnerabilities are critical |
| Performance     | 20         | 20%    | Important for user experience and scalability |
| Maintainability | 20         | 20%    | Long-term code health and team productivity  |
| Readability     | 15         | 15%    | Code comprehension and onboarding            |
| Test Coverage   | 20         | 20%    | Quality assurance and regression prevention  |
| **TOTAL**       | **100**    | 100%   |                                              |

---

## Traffic Light Thresholds

| Dimension       | Max | GREEN (≥) | YELLOW Range | RED (<) |
| --------------- | --- | --------- | ------------ | ------- |
| Security        | 25  | 20 (80%)  | 15-19        | 15 (60%)|
| Performance     | 20  | 16 (80%)  | 12-15        | 12 (60%)|
| Maintainability | 20  | 16 (80%)  | 12-15        | 12 (60%)|
| Readability     | 15  | 12 (80%)  | 9-11         | 9 (60%) |
| Test Coverage   | 20  | 16 (80%)  | 12-15        | 12 (60%)|

**Status Indicators:**

- 🟢 **GREEN**: Score ≥ 80% of max - Healthy, minor improvements only
- 🟡 **YELLOW**: Score 60-79% of max - Needs attention, address before merge
- 🔴 **RED**: Score < 60% of max - Critical, must fix immediately

---

## Grade Mapping

| Grade | Score Range | Status | Interpretation                              |
| ----- | ----------- | ------ | ------------------------------------------- |
| A     | 90-100      | 🟢     | Excellent - Production ready                |
| B     | 80-89       | 🟢     | Good - Minor improvements recommended       |
| C     | 70-79       | 🟡     | Fair - Address issues before merge          |
| D     | 60-69       | 🟡     | Poor - Significant work needed              |
| F     | 0-59        | 🔴     | Fail - Major refactoring required           |

---

## Severity Deduction Rules

### Security Dimension (Max: 25)

| Severity | Deduction | Examples                                       |
| -------- | --------- | ---------------------------------------------- |
| Critical | -8        | SQL injection, RCE, auth bypass, data exposure |
| High     | -4        | XSS, CSRF, weak encryption, hardcoded secrets  |
| Medium   | -2        | Missing input validation, verbose errors       |
| Low      | -0.5      | Minor info disclosure, deprecated functions    |

**Formula**: `Security Score = max(0, 25 - (Critical×8 + High×4 + Medium×2 + Low×0.5))`

### Performance Dimension (Max: 20)

| Severity | Deduction | Examples                                       |
| -------- | --------- | ---------------------------------------------- |
| Critical | -7        | Infinite loops, memory leaks, deadlocks        |
| High     | -3        | N+1 queries, O(n²) algorithms on large data    |
| Medium   | -1.5      | Unnecessary re-renders, missing caching        |
| Low      | -0.5      | Minor inefficiencies, premature optimization   |

**Formula**: `Performance Score = max(0, 20 - (Critical×7 + High×3 + Medium×1.5 + Low×0.5))`

### Maintainability Dimension (Max: 20)

| Severity | Deduction | Examples                                       |
| -------- | --------- | ---------------------------------------------- |
| Critical | -7        | God classes, circular dependencies, no structure |
| High     | -3        | SOLID violations, tight coupling, code duplication |
| Medium   | -1.5      | Long methods, magic numbers, poor abstraction  |
| Low      | -0.5      | Minor naming issues, slight complexity         |

**Formula**: `Maintainability Score = max(0, 20 - (Critical×7 + High×3 + Medium×1.5 + Low×0.5))`

### Readability Dimension (Max: 15)

| Severity | Deduction | Examples                                       |
| -------- | --------- | ---------------------------------------------- |
| Critical | -5        | Obfuscated code, no comments on complex logic  |
| High     | -2        | Inconsistent naming, unclear control flow      |
| Medium   | -1        | Missing documentation, poor formatting         |
| Low      | -0.25     | Minor style issues, verbose expressions        |

**Formula**: `Readability Score = max(0, 15 - (Critical×5 + High×2 + Medium×1 + Low×0.25))`

### Test Coverage Dimension (Max: 20)

| Severity | Deduction | Examples                                       |
| -------- | --------- | ---------------------------------------------- |
| Critical | -7        | No tests for critical paths, broken tests      |
| High     | -3        | Missing edge case coverage, no integration tests |
| Medium   | -1.5      | Low coverage (<50%), poor test quality         |
| Low      | -0.5      | Minor test improvements, missing mocks         |

**Formula**: `Test Coverage Score = max(0, 20 - (Critical×7 + High×3 + Medium×1.5 + Low×0.5))`

---

## Scoring Calculation Example

### Input Findings

```
Security Track:
- 1 Critical (SQL injection)
- 2 High (XSS, hardcoded API key)
- 1 Medium (verbose errors)

Performance Track:
- 0 Critical
- 1 High (N+1 query)
- 3 Medium (missing caching)

Maintainability Track:
- 0 Critical
- 2 High (code duplication, tight coupling)
- 2 Medium (long methods)

Readability Track:
- 0 Critical
- 1 High (inconsistent naming)
- 2 Medium (missing documentation)

Coverage Track:
- 0 Critical
- 1 High (missing integration tests)
- 2 Medium (low coverage)
```

### Score Calculation

```
Security:        25 - (1×8 + 2×4 + 1×2 + 0×0.5) = 25 - 18 = 7  🔴
Performance:     20 - (0×7 + 1×3 + 3×1.5 + 0×0.5) = 20 - 7.5 = 12.5 🟡
Maintainability: 20 - (0×7 + 2×3 + 2×1.5 + 0×0.5) = 20 - 9 = 11 🔴
Readability:     15 - (0×5 + 1×2 + 2×1 + 0×0.25) = 15 - 4 = 11 🟡
Test Coverage:   20 - (0×7 + 1×3 + 2×1.5 + 0×0.5) = 20 - 6 = 14 🟡

TOTAL: 7 + 12.5 + 11 + 11 + 14 = 55.5 → Grade: F 🔴
```

---

## Quick Reference Card

### Severity Identification

| Severity | Question to Ask                                        |
| -------- | ------------------------------------------------------ |
| Critical | Could this cause a security breach or system crash?    |
| High     | Would this significantly impact users or performance?  |
| Medium   | Does this affect code quality or maintainability?      |
| Low      | Is this a nice-to-have improvement?                    |

### Score Interpretation

| Score Range | Action Required                                        |
| ----------- | ------------------------------------------------------ |
| 90-100      | Ready to merge with optional minor improvements        |
| 80-89       | Address recommended items before merge                 |
| 70-79       | Fix high-priority issues before merge                  |
| 60-69       | Significant rework required before merge               |
| 0-59        | Do not merge - major refactoring needed                |

---

## Adjustment Guidelines

### Context-Specific Adjustments

**For Security Audits:**
- Double the weight of Security dimension (50% of total)
- Reduce other dimensions proportionally

**For Performance Reviews:**
- Increase Performance weight to 30%
- Reduce Readability to 10%

**For Code Quality Reviews:**
- Increase Maintainability and Readability weights
- May reduce Performance weight if not performance-critical

---

## Reporting Format

```
========================================
DIMENSION SCORES
========================================

| Dimension       | Score  | Max  | %    | Status |
|-----------------|--------|------|------|--------|
| Security        | 7/25   | 25   | 28%  | 🔴 RED |
| Performance     | 12.5/20| 20   | 62%  | 🟡 YELLOW |
| Maintainability | 11/20  | 20   | 55%  | 🔴 RED |
| Readability     | 11/15  | 15   | 73%  | 🟡 YELLOW |
| Test Coverage   | 14/20  | 20   | 70%  | 🟡 YELLOW |
|-----------------|--------|------|------|--------|
| **TOTAL**       | 55.5   | 100  | 55%  | 🔴 RED |

========================================
OVERALL GRADE: F (55.5/100)
========================================

Interpretation: Major refactoring required.
Do not merge without addressing critical issues.
```
