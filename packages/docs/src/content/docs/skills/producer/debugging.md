---
title: Debugging
description: Structured debugging skill cho bug investigation, root cause analysis, và fix specification
---

import { Aside, Steps, Tabs, TabItem } from "@astrojs/starlight/components";

## Overview

`/debugging` là Producer Skill cho structured bug investigation - từ runtime errors đến logic bugs.

<Aside type="tip">
  Sử dụng `/debugging` khi bạn gặp bug và cần phân tích root cause trước khi fix.
</Aside>

## When to Use

- User reports **runtime errors** hoặc crashes
- Cần **bug investigation**
- Muốn **root cause analysis** (RCA)
- **Regression** - feature worked before

## Quick Start

```
/debugging Users cannot reset password on mobile devices
```

Claude sẽ:
1. Reproduce và validate bug
2. Investigate code và logs
3. Perform root cause analysis
4. Generate fix options
5. Output specification file

## Output

Spec file tại `.claude/.specs/debugging-{slug}-{timestamp}.md`:

```yaml
---
spec_type: debugging
status: complete
issue_type: logic_bug
severity: HIGH
---

# Debugging Spec: Password Reset Mobile Bug

## Root Cause Analysis
[5 Whys hoặc Fishbone analysis]

## Fix Options
- Option 1: [description, risk, effort]
- Option 2: [description, risk, effort]

## Recommended Fix
FIX-001: [detailed fix strategy]

## Verification Criteria
- [ ] Test case 1
- [ ] Test case 2
```

## Issue Type Detection

Claude tự động detect issue type:

| Type | Indicators |
|------|------------|
| `runtime_error` | Stack traces, exceptions, crashes |
| `logic_bug` | Incorrect output, wrong behavior |
| `performance` | Slow, timeout, memory issues |
| `security` | Auth bypass, injection, data exposure |
| `regression` | Worked before, post-update failures |

## Phases

<Steps>

1. **Phase 0: Initialization**

   - Tạo spec file
   - Detect issue type
   - Assess initial severity
   - Chọn mode

2. **Phase 1: Reproduction**

   - Validate bug exists
   - Document reproduction steps
   - Capture environment details
   - Assess complexity

3. **Phase 2: Investigation**

   5 parallel scouter agents:
   - **Error Analysis**: Stack traces, error messages
   - **Code Context**: Related code paths
   - **Git History**: Recent changes
   - **Log Analysis**: Application logs
   - **Related Issues**: Similar bugs

4. **Phase 3: Root Cause Analysis**

   Adaptive RCA based on complexity:

   - **Simple bugs** (< 4 points): 5 Whys technique
   - **Complex bugs** (≥ 4 points): Fishbone/Ishikawa analysis

5. **Phase 4: Fix Strategy**

   - Generate minimum 2 fix options
   - Assess risk và effort
   - Define verification criteria
   - Select recommended fix

6. **Phase 5: Specification**

   Final deliverables:
   - Complete RCA
   - Fix options với trade-offs
   - Recommended approach
   - Verification checklist

</Steps>

## Complexity Scoring

| Factor | Points |
|--------|--------|
| Multiple symptoms | +2 |
| Wide impact (> 10 files) | +2 |
| External dependencies | +2 |
| Database involvement | +2 |
| Security implications | +1 |
| Low test coverage | +1 |

**Score < 4**: Simple bug → 5 Whys
**Score ≥ 4**: Complex bug → Fishbone analysis

## RCA Techniques

<Tabs>
  <TabItem label="5 Whys">
    For simple bugs:

    ```
    Problem: Users cannot reset password on mobile

    Why 1: Form submission fails
    Why 2: API returns 403 error
    Why 3: CSRF token not included
    Why 4: Token cookie not accessible
    Why 5: Cookie set without SameSite=None for mobile webview

    Root Cause: Cookie configuration incompatible với mobile webview
    ```
  </TabItem>

  <TabItem label="Fishbone">
    For complex bugs with multiple factors:

    ```
                          ┌─ Code ─────────────────┐
                          │ - Logic error          │
                          │ - Missing validation   │
                          │                        │
    ┌─ Environment ───────┤                        ├─ Data ─────────┐
    │ - Version mismatch  │      BUG               │ - Corrupt data │
    │ - Config error      │                        │ - Edge case    │
    │                     │                        │                │
                          │                        │
                          ├─ Process ─────────────┤
                          │ - Race condition      │
                          │ - Timing issue        │
                          └───────────────────────┘
    ```
  </TabItem>
</Tabs>

## Examples

### Example 1: Runtime Error

```
/debugging App crashes when uploading large images
```

RCA: Memory limit exceeded khi processing images > 10MB client-side
Fix: Add file size validation + server-side processing

### Example 2: Logic Bug

```
/debugging Discount code applies twice when user refreshes checkout page
```

RCA: Missing idempotency check trong apply discount endpoint
Fix: Add discount_applied flag và check before applying

### Example 3: Performance Issue

```
/debugging Dashboard loads very slowly after adding new charts
```

RCA: N+1 query problem trong chart data fetching
Fix: Implement batch loading với Promise.all

## Fix Options Format

```markdown
## Fix Options

### Option 1: Quick Fix
**Description**: Patch specific case
**Risk**: LOW
**Effort**: 2 hours
**Trade-offs**: May not cover all edge cases

### Option 2: Proper Fix
**Description**: Refactor underlying logic
**Risk**: MEDIUM
**Effort**: 1 day
**Trade-offs**: More thorough but needs testing

### Recommendation
Option 2 - proper fix provides long-term stability
```

## Integration with /implementing

Sau khi debugging complete:

```
/implementing password reset bug
```

Claude sẽ:
1. Read debugging spec
2. Implement recommended fix (FIX-001)
3. Run verification criteria
4. Update spec status

## Best Practices

1. **Provide Error Details**: Include stack traces, error messages
2. **Describe Expected vs Actual**: What should happen vs what happens
3. **Mention Environment**: Browser, device, version
4. **Note Recent Changes**: Có deploy mới không?

## Troubleshooting

### RCA không đủ sâu

- Cung cấp thêm logs
- Enable verbose mode trong investigation
- Use Collaborative mode để guide analysis

### Fix không address root cause

- Review RCA carefully
- Consider Option 2 (proper fix)
- Request additional investigation

## Related

- [Implementing](/skills/consumer/implementing/) - Execute debugging specs
- [Reviewing](/skills/producer/reviewing/) - Find potential bugs before they occur
- [Refactoring](/skills/producer/refactoring/) - Improve code quality to prevent bugs
