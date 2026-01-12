---
description: Full coding workflow with research, planning, implementation, quality check, and review
allowed-tools: Skill
argument-hint: [task description] [--auto]
---

# /code - Full Workflow

Invoke the coding skill with full mode:

```
Skill(skill: "coding", args: "$ARGUMENTS --mode=full")
```

This command executes a comprehensive 6-phase workflow:

1. **Init**: Setup session folder and state tracking
2. **Research**: Full scope research with multiple agents
3. **Plan**: Detailed planning with EnterPlanMode (requires approval)
4. **Implement**: Execute implementation with sub-task tracking
5. **Quality**: Run format, lint, and typecheck
6. **Review**: Thorough code review with all criteria

Use `--auto` flag to skip confirmations between phases.
