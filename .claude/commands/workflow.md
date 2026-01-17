---
description: Entry point for LTV AI Kit. Shows menu when no args, recommends workflow when with args.
argument-hint: "[your request or leave empty for menu]"
---

# Workflow - LTV AI Kit

## Instructions

IF $ARGUMENTS is empty:
  Show greeting menu with all available workflows
ELSE:
  Analyze $ARGUMENTS and recommend appropriate workflow with optimized prompt

## Mode 1: Greeting (No Arguments)

Show this menu:

```
========================================
           LTV AI KIT
========================================

Hello! I'm Workflow Assistant - your guide to using workflows.

AVAILABLE WORKFLOWS:

1. /brainstorming - Plan new features
   Example: "Add Google login"

2. /reviewing - Code review, quality checks
   Example: "Review PR #123"

3. /debugging - Investigate and fix bugs
   Example: "Login crashes on submit click"

4. /refactoring - Reduce technical debt
   Example: "This file is too large, needs splitting"

5. /implementing - Execute from spec file
   Example: "/implementing .claude/.specs/..."

----------------------------------------
Select a number (1-5) for details
Or enter your request for workflow recommendation
========================================
```

## Mode 2: Recommendation (With Arguments)

Analyze the user's request: $ARGUMENTS

### Workflow Matching Rules:

| Keywords | Recommended Workflow |
|----------|-------------------|
| "new", "add", "create", "feature", "build", "plan", "design" | /brainstorming |
| "review", "PR", "audit", "check", "quality", "merge" | /reviewing |
| "bug", "error", "crash", "fix", "broken", "fail", "exception" | /debugging |
| "smell", "refactor", "debt", "cleanup", "DRY", "duplicate", "messy" | /refactoring |
| file path ".claude/.specs/", "implement", "execute" | /implementing |

### Output Format:

```
========================================
WORKFLOW - RECOMMENDATION
========================================

Request: "{$ARGUMENTS}"

---

Recommended Workflow: /{recommended_workflow}

Reason: {explanation based on keywords matched}

---

Steps to Execute:
  Step 1: /{workflow} {optimized_prompt}
  Step 2: /implementing {spec_file} (after completion)

---

OPTIMIZED PROMPT:

/{workflow} {optimized_prompt_based_on_user_request}

---

Copy the prompt above and paste to start!

========================================
NOTE: /workflow does NOT auto-implement.
Run the recommended workflow to continue.
========================================
```

## Workflow Details (When User Selects Number)

### If user selects 1 (/brainstorming):
Explain: Creates spec files with architecture diagrams, data models, API contracts.
Best for: New features, system design, vague requirements.
Workflow: /brainstorming → creates spec → /implementing

### If user selects 2 (/reviewing):
Explain: Multi-dimension code review with scoring (Security, Performance, Quality).
Best for: PR review, security audit, code quality checks.
Workflow: /reviewing → creates findings → /implementing (to fix)

### If user selects 3 (/debugging):
Explain: Root cause analysis with 5 Whys or Fishbone technique.
Best for: Runtime errors, crashes, unexpected behavior.
Workflow: /debugging → creates fix spec → /implementing

### If user selects 4 (/refactoring):
Explain: Code smell detection across 5 tracks (STR, ABS, NAM, PAT, DEP).
Best for: Technical debt, code cleanup, pattern application.
Workflow: /refactoring → creates migration plan → /implementing

### If user selects 5 (/implementing):
Explain: Executes spec files from other skills.
Best for: After completing any producer workflow.
Usage: /implementing .claude/.specs/{spec-file}.md
