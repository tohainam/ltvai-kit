---
name: brainstorming
description: Interactive discovery workflow for creating detailed specifications. Outputs spec files to .claude/.specs/ for use with coding workflow. Use when users want to clarify requirements, explore ideas, or create a spec before coding.
allowed-tools: Read, Write, Edit, Glob, Grep, Task, Skill, AskUserQuestion, TodoWrite
user-invocable: false
---

# Brainstorming

Interactive discovery and specification creation workflow.

## Workflow Overview

```
CHECK DRAFTS → INTAKE → CLARIFY → SCOUT → FINALIZE
```

1. Check for existing draft specs
2. Receive input, create draft spec
3. Interactive Q&A clarification loop
4. Scout codebase for context (overview only)
5. Validate and finalize spec

## Phase References

| Phase        | Reference                                           | Description                  |
| ------------ | --------------------------------------------------- | ---------------------------- |
| Check/Resume | [resume-logic.md](references/resume-logic.md)       | Draft detection, resume flow |
| Intake       | [phases/intake.md](references/phases/intake.md)     | Create draft spec from input |
| Clarify      | [phases/clarify.md](references/phases/clarify.md)   | Interactive Q&A loop         |
| Scout        | [phases/scout.md](references/phases/scout.md)       | Overview codebase analysis   |
| Finalize     | [phases/finalize.md](references/phases/finalize.md) | Validation and approval      |

## Shared References

| Reference                                       | When to Load                |
| ----------------------------------------------- | --------------------------- |
| [spec-template.md](references/spec-template.md) | When creating/updating spec |
| [validation.md](references/validation.md)       | Before finalization         |

## Argument Parsing

Skill receives `args` from Skill tool (passed by command wrapper).

Parse `args` to extract:

- `request` - User's initial request or description
- `--resume {feature_id}` - Resume a specific draft spec

```
Parse args:
  if contains "--resume":
    resume_mode = true
    feature_id = extract value after "--resume"
  else:
    resume_mode = false
    request = full args text
```

## Initialize Todo List

```json
[
  {
    "content": "Check for draft specs",
    "status": "pending",
    "activeForm": "Checking for drafts"
  },
  {
    "content": "Intake: Create draft spec",
    "status": "pending",
    "activeForm": "Creating draft spec"
  },
  {
    "content": "Clarify: Interactive Q&A",
    "status": "pending",
    "activeForm": "Clarifying requirements"
  },
  {
    "content": "Scout: Analyze codebase",
    "status": "pending",
    "activeForm": "Scouting codebase"
  },
  {
    "content": "Finalize: Validate and approve",
    "status": "pending",
    "activeForm": "Finalizing spec"
  }
]
```

## BEGIN EXECUTION

1. Read [resume-logic.md](references/resume-logic.md)
2. Check for draft specs in `.claude/.specs/`
3. If `resume_mode`, load specified spec and continue
4. If drafts found (and not resume_mode), offer resume option
5. If new or no drafts, proceed to Intake phase
6. Execute phases in order until finalized
