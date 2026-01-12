# Phase 3: Scout

Overview codebase analysis - NO implementation details.

## Scope

**DO**:

- Find related files and directories
- Identify existing patterns
- Note integration points
- Document dependencies

**DO NOT**:

- Write any code
- Provide implementation steps
- Analyze code logic in depth
- Make architectural decisions

## Steps

### 1. Mark Phase In Progress

- Update todo: mark Scout as `in_progress`

### 2. Use Delegating Skill

```
Skill(
  skill: "delegating",
  args: "Scout codebase for context related to: {feature description from spec}.
         Find related files, existing patterns, and integration points.
         Overview only - no implementation details."
)
```

### 3. Execute Scouting

Parse DISPATCH DECISION from delegating skill.

Launch scouter agent(s) based on decision:

```
Task(
  subagent_type: "scouter",
  prompt: "[Scope from decision]",
  description: "Scout: [Focus]"
)
```

### 4. Collect Findings

Wait for scouter to complete. Extract:

- Related files and their purposes
- Existing patterns used
- Integration points
- Dependencies

### 5. Update Spec File

Add findings to Technical Analysis section:

```markdown
## Technical Analysis (from scouting)

### Related Files

- `src/path/to/file` - Brief description of relevance
- `src/another/file` - Brief description

### Existing Patterns

- Pattern 1: Description of how it's used
- Pattern 2: Description of how it's used

### Integration Points

- Where new code should connect
- Existing hooks or extension points
```

### 6. Log to Discussion

Add scouting summary:

```markdown
### Scouting Summary

- Found: path/to/file - description
- Found: path/to/file - description
- Pattern: existing pattern description
- Integration: suggested integration point
```

### 7. Present Findings

```
Scouting complete. Found {N} related files and {M} patterns.

Key findings:
- {summary of related files}
- {summary of patterns}
- {summary of integration points}

Ready to finalize the spec?
```

### 8. Mark Phase Complete

- Update todo: mark Scout as `completed`
- Proceed to Finalize phase
