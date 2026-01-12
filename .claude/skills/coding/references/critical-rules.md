# Critical Rules

These rules are MANDATORY for both `/code` and `/code:fast` workflows.

## MANDATORY: USE DISPATCHER + TASK FOR RESEARCH AND REVIEW

**THIS IS THE MOST IMPORTANT RULE. VIOLATION IS NOT ACCEPTABLE.**

For **Research phase** and **Review phase**, you **MUST** follow this 2-step process:

**Step 1: Call delegating to get execution plan**

```
Skill(skill: "delegating", args: "your research/review request here")
```

**Step 2: Execute the plan by spawning agents**

```
Task(subagent_type: "[agent from decision]", prompt: "[scope]", description: "...")
```

**FORBIDDEN during Research/Review phases:**

- DO NOT use Glob directly to search
- DO NOT use Grep directly to search
- DO NOT use Read directly to research
- DO NOT search/read files yourself
- DO NOT skip spawning agents after delegating returns decision

**REQUIRED:**

1. Call `Skill(delegating)` to get DISPATCH DECISION
2. Parse the decision (Agent, Mode, Instances, Inputs)
3. Spawn agents using `Task` tool based on decision
4. Wait for agents and aggregate results

## FORCE WORKFLOW ORDER

**THIS IS MANDATORY. NO EXCEPTIONS.**

1. **Never skip phases** without user confirmation
2. **Never change phase order** - Always: Init → Research → Plan → Implement → Quality → Review
3. **Never combine phases** - Each phase is distinct
4. **Never shortcut the process** - Even for "simple" tasks, follow the workflow
5. **If confused, ask user** - Don't assume or skip

## ALWAYS UPDATE TODO IMMEDIATELY

**After EVERY task completion, IMMEDIATELY update TodoWrite:**

1. **Finish sub-task** → Mark sub-task as `completed` RIGHT AWAY
2. **Finish phase** → Mark phase as `completed` RIGHT AWAY
3. **Skip phase** → Mark as `completed` with "Skipped by user" RIGHT AWAY
4. **Start new task** → Mark as `in_progress` BEFORE starting work
5. **NEVER batch updates** - Update one task at a time, immediately
