# Phase 1: Intake

Receive input and create draft spec file immediately.

## Steps

### 1. Mark Phase In Progress

- Update todo: mark Intake as `in_progress`

### 2. Analyze Input

- Parse user request from args
- Identify key concepts, goals, context
- Note any provided links (Figma, Wiki, etc.)

### 3. Generate Spec Name

Use naming skill to generate spec filename:

```
Skill(skill: "naming", args: "{user_request}")
```

The naming skill will:

- Extract 2-3 key concepts from the request
- Format: kebab-case, lowercase
- Max 30 characters

**IMPORTANT**: After receiving the generated name from naming skill, display it to the user:

```
Generated spec name: {generated_name}
```

Then check uniqueness in `.claude/.specs/`.
If name already exists, append numeric suffix (`-2`, `-3`, etc.) and inform user of the final name used.

### 4. Create Draft Spec

Create file at `.claude/.specs/{name}.md` using [spec-template.md](../spec-template.md):

```yaml
---
status: draft
feature_id: { name }
current_phase: intake
created: { ISO timestamp }
updated: { ISO timestamp }
---
```

Fill in initial Overview based on user input.

### 5. Log Initial Input

Add to Discussion Log section:

```markdown
## Session 1 - {YYYY-MM-DD HH:MM}

### Initial Input

> {Original user request}
> {Any links provided}
```

### 6. Inform User

```
Created draft spec: .claude/.specs/{name}.md
Status: draft

Let's clarify the requirements. I'll ask some questions to make sure we have everything covered.
```

### 7. Mark Phase Complete

- Update spec frontmatter: `current_phase: clarify`
- Update todo: mark Intake as `completed`
- Proceed to Clarify phase
