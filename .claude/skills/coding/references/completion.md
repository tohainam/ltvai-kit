# Completion

This section handles workflow completion after all phases are done.

## When to Execute

Execute completion when:

- All phases have completed (either executed or skipped)
- User selects "Complete Task" after review
- User selects "Skip Remaining Phases" at any point

## Steps

### 1. Update Final state.json

Ensure all completed timestamps are set:

```json
{
  "updated_at": "{final timestamp}"
}
```

### 2. Provide Summary

Generate summary including:

**For Full Mode (/code):**

- Session path: `{SESSION_PATH}`
- What was researched (if applicable)
- What was planned (if applicable)
- What was implemented
- Quality check results
- Review findings (if applicable)
- Any outstanding issues or recommendations

**For Fast Mode (/code:fast):**

- Session path: `{SESSION_PATH}`
- What was done (brief)
- Quality check results
- Critical issues found (if any)
- Next steps (if any)

Keep fast mode summary concise.

### 3. List Generated Reports

Show which reports were generated:

```
Reports generated in {SESSION_PATH}:
- research-report.md (if research executed)
- plan-report.md (if plan executed)
- review-report.md (if review executed)
```

Only list reports that were actually created (phases not skipped).

## Summary Format

### Full Mode Summary

```
## Task Completed

**Session**: {SESSION_PATH}
**Workflow**: /code (Full)

### Summary

- **Research**: {brief summary of findings}
- **Plan**: {what was planned}
- **Implementation**: {what was implemented}
- **Quality**: {format/lint/typecheck results}
- **Review**: {critical issues, warnings, verdict}

### Reports

- `{SESSION_PATH}/research-report.md`
- `{SESSION_PATH}/plan-report.md`
- `{SESSION_PATH}/review-report.md`

### Outstanding Items

{Any unresolved issues or recommendations}
```

### Fast Mode Summary

```
## Task Completed

**Session**: {SESSION_PATH}
**Workflow**: /code:fast (Fast)

### Summary

- Implemented: {brief description}
- Quality: {pass/fail status}
- Critical Issues: {count or "None"}

### Reports

- `{SESSION_PATH}/research-report.md` (if created)
- `{SESSION_PATH}/plan-report.md` (if created)
- `{SESSION_PATH}/review-report.md` (if created)
```

## Skipped Phases

If phases were skipped, note which ones:

```
Note: The following phases were skipped by user request:
- Research (skipped)
- Review (skipped)
```
