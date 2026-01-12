# Error Handling

This document defines error handling strategies for each phase.

## Research Phase Errors

| Error                | Handling                             |
| -------------------- | ------------------------------------ |
| Dispatcher fails     | Continue without research, warn user |
| Agents timeout       | Report partial results, continue     |
| No relevant findings | Note in report, continue             |

**Example recovery:**

```
Warning: Research phase encountered issues.
- Dispatcher returned error: {error message}
- Proceeding without research context.
- Consider running research manually if needed.
```

## Plan Phase Errors

| Error                            | Handling                        |
| -------------------------------- | ------------------------------- |
| EnterPlanMode fails (full mode)  | Fall back to TodoWrite planning |
| User rejects plan                | Ask for feedback, revise plan   |
| Cannot determine files to modify | Ask user for clarification      |

**Example recovery for EnterPlanMode failure:**

```
Note: EnterPlanMode encountered an issue.
- Falling back to quick planning with TodoWrite.
- Creating inline task list instead of full plan mode.
```

## Quality Check Errors

| Error               | Handling                                  |
| ------------------- | ----------------------------------------- |
| Command not found   | Skip that check, report which was skipped |
| Auto-fixable errors | Fix automatically, continue               |
| Type errors         | Attempt to fix, if fail report for review |
| Unfixable errors    | Report to user, continue to review        |

**Example recovery:**

```
Quality check results:
- Format: Passed (auto-fixed 3 issues)
- Lint: Passed with 2 warnings
- Typecheck: 1 error found (could not auto-fix)
  - src/utils.ts:42 - Type 'string' is not assignable to type 'number'

Proceeding to review. Please address type error manually if needed.
```

## Review Phase Errors

| Error                 | Handling                         |
| --------------------- | -------------------------------- |
| Reviewer fails        | Report completion without review |
| Reviewer times out    | Use partial review results       |
| Critical issues found | Highlight for user attention     |

**Example recovery for reviewer failure:**

```
Warning: Review phase encountered issues.
- Reviewer agent did not complete.
- Task completing without code review.
- Recommend running manual review before deployment.
```

## General Recovery Strategies

### 1. Graceful Degradation

When a phase fails:

1. Log the error with details
2. Attempt recovery if possible
3. If recovery fails, skip the phase with warning
4. Continue workflow with remaining phases
5. Note skipped phase in final summary

### 2. User Notification

Always inform user about:

- What failed
- What was skipped
- What action was taken
- What they might need to do manually

### 3. State Consistency

Even on error:

- Update state.json with current status
- Mark failed phase appropriately
- Preserve partial results if available

### 4. Never Block

Workflow should never completely stop due to:

- Agent failures
- Tool unavailability
- Partial results

Instead, continue with available functionality and report limitations.
