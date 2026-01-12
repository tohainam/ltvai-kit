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

### 3. Parse and Record Decision

Parse DISPATCH DECISION from delegating skill response.

**Write decision to spec file** (Technical Analysis > Dispatch Decision):

```markdown
### Dispatch Decision

Agent: scouter
Mode: [single | parallel]
Instances: [number]
Strategy: [strategy name]

Inputs:
[1] Focus: [focus] | Scope: [scope]
[2] Focus: [focus] | Scope: [scope]
...
```

### 4. Execute Scouting

Launch scouter agent(s) based on decision:

```
Task(
  subagent_type: "scouter",
  prompt: "[Scope from decision]",
  description: "Scout: [Focus]"
)
```

If parallel mode with multiple instances, launch all in parallel.

### 5. Collect Findings

Wait for scouter to complete. Extract:

- Related files and their purposes
- Existing patterns used
- Integration points
- Dependencies

### 6. Update Spec File

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

### 7. Log to Discussion

Add scouting summary:

```markdown
### Scouting Summary

- Found: path/to/file - description
- Found: path/to/file - description
- Pattern: existing pattern description
- Integration: suggested integration point
```

### 8. Present Findings

```
Scouting complete. Found {N} related files and {M} patterns.

Key findings:
- {summary of related files}
- {summary of patterns}
- {summary of integration points}

Ready to finalize the spec?
```

### 9. Mark Phase Complete

- Update spec frontmatter: `current_phase: finalize`
- Update todo: mark Scout as `completed`
- Proceed to Finalize phase
