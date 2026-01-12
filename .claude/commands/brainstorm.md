---
description: Interactive discovery and specification creation. Creates spec files for use with /code command.
allowed-tools: Skill
argument-hint: [request or spec description]
---

# /brainstorm - Discovery & Specification

Invoke the brainstorming skill:

```
Skill(skill: "brainstorming", args: "$ARGUMENTS")
```

This command facilitates interactive discovery and specification creation:

1. **Check Drafts**: Find and optionally resume draft specs
2. **Intake**: Receive input, create draft spec file
3. **Clarify**: Interactive Q&A to gather requirements
4. **Scout**: Overview codebase analysis (no implementation details)
5. **Finalize**: Validate and approve spec

Approved specs are auto-detected by `/code` command.
