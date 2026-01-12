---
description: Fast coding workflow with reduced research, lightweight planning, and quick review
allowed-tools: Skill
argument-hint: [task description] [--auto]
---

# /code:fast - Fast Workflow

Invoke the coding skill with fast mode:

```
Skill(skill: "coding", args: "$ARGUMENTS --mode=fast")
```

This command executes a streamlined 6-phase workflow:

1. **Init**: Setup session folder and state tracking
2. **Research**: Quick codebase search (prefer scouter)
3. **Plan**: Lightweight TodoWrite planning (no approval needed)
4. **Implement**: Execute implementation with sub-task tracking
5. **Quality**: Run format, lint, and typecheck
6. **Review**: Quick review focusing on critical issues only

Use `--auto` flag to skip confirmations between phases.
