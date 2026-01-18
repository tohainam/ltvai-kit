---
title: Reviewing
description: Structured code review skill cho PR reviews, security audits, và code quality checks
---

import { Aside, Steps, Tabs, TabItem } from "@astrojs/starlight/components";

## Overview

`/reviewing` là Producer Skill cho structured code review - từ PR review đến security audit.

<Aside type="tip">
  Sử dụng `/reviewing` để có comprehensive review với prioritized findings.
</Aside>

## When to Use

- **PR/code review** requested
- Cần **security audit**
- Muốn **code quality assessment**
- Pre-merge **verification**

## Quick Start

```
/reviewing Review the authentication module for security issues
```

Claude sẽ:
1. Analyze code context
2. Multi-track inspection
3. Consolidate findings
4. Calculate scores
5. Output review report

## Output

Spec file tại `.claude/.specs/reviewing-{slug}-{timestamp}.md`:

```yaml
---
spec_type: reviewing
status: complete
review_type: security_audit
grade: B
score: 82/100
---

# Review Report: Authentication Module

## Dimension Scores
[5 dimensions với scores]

## Findings
[Categorized by severity]

## Priority Matrix
[MUST FIX NOW, FIX BEFORE MERGE, etc.]

## Action Plan
[Checklist of fixes]
```

## Review Types

Claude auto-detect review type:

| Type | Trigger Keywords |
|------|------------------|
| `pr_review` | PR, pull request, merge request |
| `security_audit` | Security, vulnerability, audit |
| `general_review` | Default |

## Phases

<Steps>

1. **Phase 0: Initialization**

   - Tạo spec file
   - Detect review type
   - Chọn mode

2. **Phase 1: Context Discovery**

   - Read target files
   - Analyze git history
   - Map dependencies

3. **Phase 2: Multi-Track Inspection**

   5 parallel scouter agents:
   - **Security**: Vulnerabilities, data protection
   - **Performance**: N+1, algorithms, bottlenecks
   - **Quality**: Code smells, SOLID, error handling
   - **Coverage**: Unit tests, edge cases
   - **Documentation**: Comments, API docs

4. **Phase 3: Findings Consolidation**

   - Merge findings from all tracks
   - Categorize by severity
   - Deduplicate overlaps

5. **Phase 4: Risk Assessment**

   - Calculate dimension scores
   - Determine overall grade
   - Build priority matrix

6. **Phase 5: Report Generation**

   Final deliverables:
   - Dimension scores
   - All findings với severity
   - Priority matrix
   - Action plan

</Steps>

## 5-Dimension Scoring

| Dimension | Max Points | Focus Areas |
|-----------|------------|-------------|
| Security | 25 | Vulnerabilities, injection, data protection |
| Performance | 20 | N+1 queries, algorithms, memory, bottlenecks |
| Maintainability | 20 | Code smells, SOLID, error handling, naming |
| Readability | 15 | Code clarity, comments, documentation |
| Test Coverage | 20 | Unit tests, edge cases, integration |

**Total**: 100 points

## Grade Scale

| Grade | Score | Meaning |
|-------|-------|---------|
| A | 90-100 | Excellent - Production ready |
| B | 80-89 | Good - Minor improvements needed |
| C | 70-79 | Fair - Address issues before merge |
| D | 60-69 | Poor - Significant work needed |
| F | < 60 | Fail - Major refactoring required |

## Severity Levels

<Tabs>
  <TabItem label="CRITICAL">
    **Impact**: Security breach, data loss, crashes

    **Examples**:
    - SQL injection vulnerability
    - Exposed API keys
    - Unhandled null pointer

    **Action**: MUST FIX NOW
  </TabItem>

  <TabItem label="HIGH">
    **Impact**: Bugs, performance issues, poor UX

    **Examples**:
    - N+1 query problem
    - Missing input validation
    - Race condition

    **Action**: FIX BEFORE MERGE
  </TabItem>

  <TabItem label="MEDIUM">
    **Impact**: Tech debt, maintenance burden

    **Examples**:
    - Code duplication
    - Missing tests
    - Unclear naming

    **Action**: SHOULD FIX
  </TabItem>

  <TabItem label="LOW">
    **Impact**: Minor improvements

    **Examples**:
    - Style inconsistencies
    - Missing comments
    - Optimization opportunities

    **Action**: NICE TO HAVE
  </TabItem>
</Tabs>

## Priority Matrix

```markdown
## Priority Matrix

### MUST FIX NOW (CRITICAL)
- [ ] SEC-001: SQL injection in user search
- [ ] SEC-002: Exposed database credentials

### FIX BEFORE MERGE (HIGH)
- [ ] PERF-001: N+1 query in order listing
- [ ] QUAL-001: Missing error handling in payment

### SHOULD FIX (MEDIUM)
- [ ] QUAL-002: Duplicate validation logic
- [ ] TEST-001: Missing edge case tests

### NICE TO HAVE (LOW)
- [ ] DOC-001: Add JSDoc to public methods
- [ ] STYLE-001: Inconsistent naming convention
```

## Examples

### Example 1: PR Review

```
/reviewing Review PR #123 adding user registration
```

Output:
- Grade: B (85/100)
- CRITICAL: None
- HIGH: 2 issues (validation, error handling)
- MEDIUM: 3 issues (tests, naming)

### Example 2: Security Audit

```
/reviewing Security audit the payment processing module
```

Output:
- Security Score: 18/25
- Findings: Input sanitization, token handling, logging PII
- Priority: 1 CRITICAL, 3 HIGH

### Example 3: General Review

```
/reviewing Check code quality of the new dashboard feature
```

Output:
- Overall Grade: C (74/100)
- Main issues: Low test coverage, code smells
- Recommendations: Add tests, extract components

## Traffic Light Status

Mỗi dimension có status:

| Status | Condition | Action |
|--------|-----------|--------|
| 🟢 GREEN | > 80% max | Good to go |
| 🟡 YELLOW | 60-80% max | Review needed |
| 🔴 RED | < 60% max | Block merge |

Example:
```
Security:      18/25 🟡 YELLOW
Performance:   16/20 🟢 GREEN
Maintainability: 12/20 🟡 YELLOW
Readability:   12/15 🟢 GREEN
Test Coverage: 10/20 🔴 RED

Overall: 68/100 - Grade D
```

## Integration with /implementing

Sau khi reviewing complete:

```
/implementing auth security review
```

Claude sẽ:
1. Read reviewing spec
2. Fix CRITICAL issues first
3. Fix HIGH issues
4. Skip MEDIUM and LOW (optional)
5. Update spec status

<Aside type="note">
  By default, `/implementing` chỉ fix CRITICAL và HIGH. MEDIUM và LOW có thể fix manually hoặc trong separate pass.
</Aside>

## Best Practices

1. **Review Early**: Đừng đợi đến cuối sprint
2. **Focus on High Impact**: CRITICAL và HIGH trước
3. **Be Constructive**: Provide solutions, not just problems
4. **Consider Context**: Deadline, team capacity, risk tolerance

## Troubleshooting

### Score quá thấp

- Review specific findings
- Prioritize CRITICAL first
- Consider partial fixes

### Too many findings

- Focus on CRITICAL/HIGH only
- Request summarized view
- Break into multiple reviews

### Findings không relevant

- Provide more context
- Specify review focus
- Use security_audit type nếu chỉ cần security

## Related

- [Implementing](/skills/consumer/implementing/) - Fix review findings
- [Refactoring](/skills/producer/refactoring/) - Address code smells
- [Debugging](/skills/producer/debugging/) - Investigate bugs found
