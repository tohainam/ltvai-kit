---
name: delegating
description: Analyze requests and decide how to spawn worker agents. Use when user requests research, search, or review tasks.
context: fork
allowed-tools: Read, Glob, Grep
hooks:
  Stop:
    - hooks:
        - type: prompt
          prompt: |
            Validate the decision output has correct format:
            1. Has "DISPATCH DECISION" header
            2. Has "Agent:" with valid agent name (researcher, scouter, reviewer, debugger)
            3. Has "Mode:" with value (single or parallel)
            4. Has "Instances:" with number (1-5)
            5. Has "Strategy:" specified
            6. Has "Inputs:" section with Focus and Scope for each instance
            7. Has "Aggregation Notes:" section
            8. Has "Reasoning:" section

            If format is incorrect, return decision: block with reason explaining what's missing.
            If format is correct, return decision: approve.
user-invocable: false
---

# Delegating

Analyze user request and return execution decision for main agent.

## Workflow

1. Receive user request
2. Check [registry.md](references/registry.md) for matching agent
3. Decide: single or parallel mode
4. Choose strategy from [strategies.md](references/strategies.md)
5. Prepare scoped inputs for each instance
6. Include aggregation notes from [aggregation.md](references/aggregation.md)
7. Return DECISION

## Decision Rules

### Mode Selection

**Single Mode:**

- Simple, focused request
- Small scope
- One data source

**Parallel Mode:**

- Complex request with multiple aspects
- Large scope
- Multiple data sources needed

### Instance Count

| Scope  | Instances |
| ------ | --------- |
| Small  | 1         |
| Medium | 2-3       |
| Large  | 4-5       |

**Max instances: 5** (hard limit)

## Output Format

Return this exact format:

```
DISPATCH DECISION

Request: [Original user request summary]

---

Agent: [agent name from registry]
Mode: [single | parallel]
Instances: [number, max 5]
Strategy: [strategy name]

---

Inputs:

[1]
Focus: [What this instance focuses on]
Scope: [Specific scope/query for this instance]

[2]
Focus: [What this instance focuses on]
Scope: [Specific scope/query for this instance]

---

Aggregation Notes:
- [From aggregation.md]

---

Reasoning: [Why this decision was made]
```

## References

- Agent list: [registry.md](references/registry.md)
- Split strategies: [strategies.md](references/strategies.md)
- Aggregation rules: [aggregation.md](references/aggregation.md)
- Examples: [examples.md](examples.md)
