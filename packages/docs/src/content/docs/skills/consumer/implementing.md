---
title: Implementing
description: Consumer skill để execute specifications từ producer skills thành code
---

import { Aside, Steps, Tabs, TabItem } from "@astrojs/starlight/components";

## Overview

`/implementing` là Consumer Skill duy nhất - execute specifications từ producer skills thành working code.

<Aside type="tip">
  Sử dụng `/implementing` sau khi đã có spec file từ producer skills (brainstorming, debugging, refactoring, reviewing).
</Aside>

## When to Use

- Sau khi có **spec từ brainstorming** → implement new feature
- Sau khi có **spec từ debugging** → implement bug fix
- Sau khi có **spec từ refactoring** → apply migration plan
- Sau khi có **spec từ reviewing** → fix critical issues

## Quick Start

<Tabs>
  <TabItem label="Natural Language">
    ```
    /implementing dark mode feature
    ```

    Claude sẽ tìm spec file matching "dark mode" trong `.claude/.specs/`
  </TabItem>

  <TabItem label="File Reference">
    ```
    /implementing .claude/.specs/brainstorming-dark-mode-1801261400.md
    ```

    Reference trực tiếp spec file
  </TabItem>
</Tabs>

## Input Modes

### Mode 1: File Reference

Khi input chứa `.claude/.specs/` hoặc ends with `.md`:

```
/implementing .claude/.specs/brainstorming-auth-feature-1801261400.md
/implementing brainstorming-auth-*.md
```

### Mode 2: Natural Language

Khi input chứa keywords:

```
/implementing implement the auth feature
/implementing fix the login bug
/implementing apply payment refactoring
```

Claude sẽ:
1. Extract keywords
2. Scan `.claude/.specs/` for matches
3. Ask confirmation nếu multiple matches

## Phases

<Steps>

1. **Phase 0: Detection & Parse**

   - Detect input mode
   - Load spec file
   - **Confirm với user** (even if only 1 match)
   - Update status: `complete` → `implementing`
   - Determine strategy based on spec_type

2. **Phase 1: Plan**

   - Enter Plan Mode (EnterPlanMode)
   - Explore codebase
   - Write implementation plan
   - Exit Plan Mode (ExitPlanMode)
   - **Wait for user approval**

3. **Phase 2: Execute**

   - Execute approved plan
   - Apply strategy based on spec_type
   - Update checkboxes in spec file `[ ]` → `[x]`
   - Track progress với TodoWrite

4. **Phase 3: Verify**

   - Detect project language
   - Run quality checks (format, lint, build)
   - Update status: `implementing` → `implemented`
   - Display summary

</Steps>

## Strategy by Spec Type

<Tabs>
  <TabItem label="Brainstorming">
    **Focus**: Implementation Tasks, Architecture Diagram

    **Actions**:
    - Create directory structure
    - Write new files
    - Implement features theo task list

    **Output**: New code matching architecture
  </TabItem>

  <TabItem label="Debugging">
    **Focus**: Fix Strategy (FIX-001), Verification Criteria

    **Actions**:
    - Implement recommended fix
    - Run verification steps
    - Confirm bug is resolved

    **Output**: Bug fixed, tests passing
  </TabItem>

  <TabItem label="Refactoring">
    **Focus**: Migration Plan, Characterization Tests

    **Actions**:
    - Follow step-by-step migration
    - Preserve behavior
    - Run characterization tests after each step

    **Output**: Refactored code, tests GREEN
  </TabItem>

  <TabItem label="Reviewing">
    **Focus**: MUST FIX NOW, FIX BEFORE MERGE sections

    **Actions**:
    - Fix CRITICAL issues first
    - Fix HIGH issues
    - Skip MEDIUM and LOW

    **Output**: Critical issues resolved
  </TabItem>
</Tabs>

## Quality Checks

Phase 3 runs quality checks based on detected language:

| Language | Format | Lint | Build |
|----------|--------|------|-------|
| JavaScript/TypeScript | `prettier --write` | `eslint --fix` | `npm run build` |
| Python | `black` | `ruff --fix` | `python -m py_compile` |
| Go | `go fmt` | `golint` | `go build` |
| Rust | `cargo fmt` | `cargo clippy --fix` | `cargo build` |

## Status Flow

```
Spec File Status:
complete → implementing → implemented

TodoWrite Status:
pending → in_progress → completed
```

## Example Workflow

```
User: /implementing dark mode

═══════════════════════════════════════
📍 PHASE 0: Detection & Parse
═══════════════════════════════════════
- Mode: natural_language
- Keywords: dark, mode
- Found: brainstorming-dark-mode-1801261400.md

[AskUserQuestion]: "Confirm implement this spec?"
User: "Yes"

- Status updated: implementing
- Strategy: brainstorming (Create & Write)

═══════════════════════════════════════
📍 PHASE 1: Plan
═══════════════════════════════════════
- EnterPlanMode()
- Exploring codebase...
- Writing plan...
- ExitPlanMode()

[User approves plan]

═══════════════════════════════════════
📍 PHASE 2: Execute
═══════════════════════════════════════
- Task 1: Create ThemeContext... ✓
- Task 2: Create DarkModeToggle component... ✓
- Task 3: Update Settings page... ✓
- Task 4: Add CSS variables... ✓

═══════════════════════════════════════
📍 PHASE 3: Verify
═══════════════════════════════════════
- Language: typescript
- Format: PASS
- Lint: PASS (2 warnings auto-fixed)
- Build: PASS
- Status updated: implemented

========================================
IMPLEMENTATION COMPLETE
========================================
```

## Output Summary

```
========================================
IMPLEMENTATION COMPLETE
========================================

Spec File: brainstorming-dark-mode-1801261400.md
Spec Type: brainstorming
Input Mode: natural_language

---

Execution Summary:
- Tasks Completed: 4
- Files Created: 2
- Files Modified: 3

---

Quality Check Results:
- Format: PASS
- Lint: PASS
- Build: PASS

---

Status Transition: complete → implementing → implemented ✓
========================================
```

## Critical Rules

<Aside type="caution">
  Những rules này PHẢI được follow:
</Aside>

1. **ALWAYS** read spec file BEFORE implementation
2. **MUST confirm** spec file với user trước khi update status
3. **MUST use** EnterPlanMode at START of Phase 1
4. **MUST update** checkbox `[x]` IMMEDIATELY after each task
5. **NEVER** implement code not specified in spec
6. **ALWAYS** run quality checks (unless explicitly skipped)

## Troubleshooting

### Spec không tìm thấy

```
Error: No matching spec files found for: {keywords}
```

**Solution**: Kiểm tra `.claude/.specs/` có spec file với keywords đó không

### Build fails

```
Quality Check Failed: build

Error Output: ...
```

**Solution**:
1. Fix error manually
2. Re-run `/implementing` với same spec
3. Hoặc skip quality check nếu minor issue

### Multiple spec matches

```
Found 2 specs matching "payment":
1. brainstorming-payment-feature-1801261400.md
2. debugging-payment-bug-1801261500.md
```

**Solution**: Claude sẽ ask user chọn spec nào

## Best Practices

1. **Review spec trước**: Đọc kỹ spec trước khi `/implementing`
2. **Approve plan carefully**: Plan phase là cơ hội cuối để adjust
3. **Monitor execution**: Watch for errors during Phase 2
4. **Check quality results**: Ensure format/lint/build pass

## Related

- [Brainstorming](/skills/producer/brainstorming/) - Create feature specs
- [Debugging](/skills/producer/debugging/) - Create bug fix specs
- [Refactoring](/skills/producer/refactoring/) - Create migration specs
- [Reviewing](/skills/producer/reviewing/) - Create review specs
