# Phase 3: Review

Execute code review via reviewer agent based on dispatch decision.

## Steps

### 1. Mark Phase In Progress

- Update todo: mark Review as `in_progress`

### 2. Get Code for Review

Execute the git command to retrieve actual code changes:

**For diff-based scopes:**
```bash
{REVIEW_CONTEXT.git_cmd}
```

**For files scope:**
Read each file using Read tool.

Store the diff/code content for passing to reviewer.

### 3. Execute Review Based on Mode

#### Single Mode

Launch one reviewer agent with full scope:

```
Task(
  subagent_type: "reviewer",
  prompt: "Review the following code changes:\n\nScope: {REVIEW_CONTEXT.description}\n\nChanges:\n```\n{diff_content}\n```\n\nFocus: {DISPATCH_DECISION.inputs[0].focus}\nScope: {DISPATCH_DECISION.inputs[0].scope}",
  description: "Review: {REVIEW_CONTEXT.description}"
)
```

#### Parallel Mode

Launch ALL reviewer instances in a SINGLE message:

```
Task(
  subagent_type: "reviewer",
  prompt: "Review the following code changes:\n\nScope: {description}\n\nChanges:\n```\n{relevant_diff}\n```\n\nFocus: {inputs[0].focus}\nScope: {inputs[0].scope}",
  description: "Review 1: {inputs[0].focus}"
)
Task(
  subagent_type: "reviewer",
  prompt: "Review the following code changes:\n\nScope: {description}\n\nChanges:\n```\n{relevant_diff}\n```\n\nFocus: {inputs[1].focus}\nScope: {inputs[1].scope}",
  description: "Review 2: {inputs[1].focus}"
)
```

**IMPORTANT**: All Task calls MUST be in a single message to enable parallel execution.

### 4. Collect Reviewer Responses

Wait for all reviewer agents to complete.

Each reviewer returns:
- Summary
- Issues (CRITICAL, WARNING, INFO)
- Statistics
- Checklist
- Verdict

### 5. Aggregate Results (if parallel)

Apply aggregation rules from delegating/references/aggregation.md:

**Merge Issues by Severity**
- Combine all CRITICAL issues (highest priority)
- Combine all WARNING issues
- Combine all INFO issues

**Dedupe Same File:Line Issues**
- If multiple reviewers flag same file:line, keep most severe
- Merge descriptions if different aspects

**Sum Statistics**
- Total Critical = sum of all Critical counts
- Total Warning = sum of all Warning counts
- Total Info = sum of all Info counts

**Determine Final Verdict**
- Any CRITICAL issue → REQUEST CHANGES
- Only WARNING issues → PASS WITH WARNINGS
- Only INFO issues → APPROVE

### 6. Convert to Conventional Comments

Transform reviewer findings to conventional comment format:

| Reviewer Category | Conventional Label    |
| ----------------- | --------------------- |
| CRITICAL          | `issue (blocking):`   |
| WARNING           | `issue (non-blocking):` or `suggestion:` |
| INFO (style)      | `nitpick:`            |
| INFO (good code)  | `praise:`             |
| Questions         | `question:`           |

Reference: [comment-labels.md](../comment-labels.md)

### 7. Store Review Results

```
REVIEW_RESULTS = {
  reviewers: {count},
  findings: {
    critical: [...],
    warning: [...],
    info: [...]
  },
  statistics: {
    critical: {n},
    warning: {n},
    info: {n}
  },
  checklist: {
    functionality: "pass" | "issues",
    readability: "pass" | "issues",
    security: "pass" | "issues",
    performance: "pass" | "issues",
    testing: "pass" | "issues",
    documentation: "pass" | "issues",
    architecture: "pass" | "issues",
    error_handling: "pass" | "issues"
  },
  verdict: "APPROVE" | "PASS WITH WARNINGS" | "REQUEST CHANGES"
}
```

### 8. Inform User

```
Code review complete:
- Critical Issues: {critical_count}
- Warnings: {warning_count}
- Info/Suggestions: {info_count}

Verdict: {verdict}

Generating detailed report...
```

### 9. Mark Phase Complete

- Update todo: mark Review as `completed`
- Proceed to Report phase

## Error Handling

**If reviewer agent fails:**
1. Log the error
2. Retry once with same parameters
3. If still fails, continue with available results
4. Note partial review in report

**If no changes to review:**
1. Inform user: "No changes found to review."
2. Skip Report phase
3. End workflow

**If scope validation fails:**
1. Inform user of specific error
2. Ask for clarification or alternative scope
3. Restart from Init phase
