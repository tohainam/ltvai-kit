---
name: planning
description: |
  Structured planning skill for implementation task breakdown and todo creation.
  Use when: (1) User wants to plan before implementing, (2) User has a spec file
  to convert to todos, (3) User explicitly invokes /planning command.

  Outputs structured plan directly in conversation (NO spec file).
  On user approval, creates TodoWrite items with task sequencing.
  Supports Standalone (text input) and Spec Reader (file path) modes.
argument-hint: "[task description OR path to spec file]"
---

# Planning Skill

## CRITICAL CONSTRAINTS

**YOU MUST FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **NEVER** create spec files - output plan DIRECTLY in conversation
2. **NEVER** implement code - produce ONLY structured plans and TodoWrite
3. **ALWAYS** detect input mode first (standalone vs spec-reader)
4. **ALWAYS** show plan to user BEFORE creating TodoWrite
5. **ALWAYS** wait for explicit user approval before creating todos
6. **ALWAYS** use two-step flow: Show Plan → Approve → Create TodoWrite
7. **NEVER** skip the approval step
8. **ALWAYS** apply WBS principles for task breakdown
9. **MUST** limit visible TodoWrite items to 5 (sliding window)
10. **NEVER** mark checklist items as done - ALL checkboxes MUST remain unchecked `[ ]`
11. **ALWAYS** use AskUserQuestion tool for approval - NEVER use text-based "yes/no" prompts

---

## Workflow Overview

```
Phase 0: Mode Detection → Detect standalone vs spec-reader mode
Phase 1: Analysis      → Analyze input (text or spec file)
Phase 2: Plan Generation → Generate structured plan with WBS
Phase 3: Approval & Output → Show plan → Approve → Create TodoWrite
```

---

## Phase 0: Mode Detection

### Entry Criteria

- User has provided input (task description or file path)

### Actions

**STEP 1**: Analyze $ARGUMENTS to determine mode

**Spec Reader Mode Detection:**
```
IF ($ARGUMENTS contains ".claude/.specs/" OR ends with ".md"):
  AND file exists at path:
  → mode = "spec-reader"
  → source_file = $ARGUMENTS
```

**Standalone Mode Detection:**
```
ELSE:
  → mode = "standalone"
  → task_description = $ARGUMENTS
```

**STEP 2**: Validate input

- Spec Reader: Verify file exists and is readable
- Standalone: Verify task description is provided

### Exit Criteria

- [ ] Mode detected (standalone OR spec-reader)
- [ ] Input validated
- [ ] Ready for Phase 1

### Gate 0→1 Decision

- **GO**: Mode detected, input valid
- **HOLD**: No input provided or file not found

---

## Phase 1: Analysis

### Entry Criteria

- Phase 0 complete
- Mode detected and input validated

### Actions by Mode

**Standalone Mode:**

1. Parse task description for key requirements
2. Assess complexity level:
   - **Simple**: Single component, < 5 tasks
   - **Moderate**: Multiple components, 5-15 tasks
   - **Complex**: Multiple systems, > 15 tasks
3. Identify implicit requirements and dependencies
4. Extract success criteria from description

**Spec Reader Mode:**

1. Read spec file using Read tool
2. Detect spec type from filename/frontmatter:
   - `brainstorming-*` → Extract Implementation Tasks section
   - `debugging-*` → Extract Fix Strategy section
   - `refactoring-*` → Extract Migration Plan section
   - `reviewing-*` → Extract Recommended Actions section
3. Parse relevant sections for plannable items
4. Map dependencies between items

### Spec Type Extraction Guide

| Spec Type | Primary Section | Secondary Sections |
|-----------|-----------------|-------------------|
| brainstorming | Implementation Tasks | Architecture, Data Models |
| debugging | Fix Strategy | Root Cause, Reproduction Steps |
| refactoring | Migration Plan | Target Patterns, Characterization Tests |
| reviewing | Recommended Actions | Severity Issues, Quality Findings |

### Exit Criteria

- [ ] Requirements extracted
- [ ] Complexity assessed
- [ ] Dependencies identified
- [ ] Ready for Phase 2

### Gate 1→2 Decision

- **GO**: Requirements clear, ready to generate plan
- **HOLD**: Need clarification from user (use AskUserQuestion)
- **RECYCLE**: Input fundamentally unclear

---

## Phase 2: Plan Generation

### Entry Criteria

- Phase 1 complete
- Requirements extracted and analyzed

### Actions

**STEP 1**: Apply WBS Decomposition

```
Level 1: Phases (major milestones)
  └── Level 2: Tasks (actionable items)
        └── Level 3: Subtasks (if needed for complex tasks)
```

**WBS Principles:**
- 100% Rule: WBS must capture 100% of work
- Mutually Exclusive: No overlap between tasks
- Deliverable-Oriented: Focus on outcomes, not activities
- 8/80 Rule: Tasks between 8 hours (1 day) and 80 hours (2 weeks)

**STEP 2**: Apply INVEST Criteria for Each Task

- **I**ndependent: Can be worked on separately
- **N**egotiable: Flexible in implementation
- **V**aluable: Delivers user/business value
- **E**stimable: Can estimate effort
- **S**mall: Fits in reasonable timeframe
- **T**estable: Has clear completion criteria

**STEP 3**: Map Dependencies

```
Types of dependencies:
- Finish-to-Start (FS): Task B starts after Task A finishes
- Start-to-Start (SS): Task B starts when Task A starts
- Finish-to-Finish (FF): Task B finishes when Task A finishes
```

**STEP 4**: Sequence Tasks

1. Order by dependency chain (critical path first)
2. Group by phase for logical flow
3. Consider parallel execution where possible

**STEP 5**: Generate Plan Structure

Use template from `references/plan-templates.md`

### Exit Criteria

- [ ] All tasks decomposed using WBS
- [ ] Dependencies mapped
- [ ] Tasks sequenced
- [ ] Plan structure complete
- [ ] Ready for Phase 3

### Gate 2→3 Decision

- **GO**: Plan complete and well-structured
- **HOLD**: Need to refine task breakdown
- **RECYCLE**: Scope changed significantly

---

## Phase 3: Approval & Output

### Entry Criteria

- Phase 2 complete
- Plan generated

### Actions

**STEP 1**: Display Plan

Show plan in conversation using format from `references/plan-templates.md`

**CRITICAL**: Do NOT use text-based "yes/no" prompts. Plan display ends with summary section, then IMMEDIATELY use AskUserQuestion.

**STEP 2**: Request Approval via AskUserQuestion

**MANDATORY**: Always use AskUserQuestion tool for approval. NEVER use text-based prompts.

```yaml
question: "Bạn muốn tạo todos từ plan này không?"
header: "Plan Approval"
multiSelect: false
options:
  - label: "Yes, create todos"
    description: "Convert plan to TodoWrite items and start working"
  - label: "No, revise plan"
    description: "I have changes or want to discuss first"
```

**STEP 3**: Handle Response

**If Approved:**
1. Convert plan to TodoWrite items (see `references/todowrite-patterns.md`)
2. Apply sliding window: max 5 items visible
3. First task status = `in_progress`, rest = `pending`
4. Display confirmation message

**If Not Approved:**
1. Ask what changes are needed
2. Return to Phase 2 with modifications
3. Regenerate plan with adjustments

### TodoWrite Conversion Rules

1. Prefix each task with phase: `[Phase X] Task description`
2. Use activeForm as present participle: `Working on: Task description`
3. Limit to 5 visible items (sliding window pattern)
4. First item `in_progress`, remaining `pending`

### Sliding Window Pattern

```
IF total_tasks > 5:
  Show only first 5 tasks in TodoWrite
  As tasks complete, slide window forward
  Maintain: 1 in_progress + up to 4 pending visible
```

### Exit Criteria

- [ ] Plan shown to user
- [ ] User approval received
- [ ] TodoWrite items created (if approved)

### Gate 3→Complete Decision

- **GO**: User approved, todos created
- **HOLD**: User requested revisions
- **EXIT**: User cancelled planning

---

## Output Format Reference

### Plan Display Format

```
## PLAN: {Title}

**Objective**: {clear statement of what will be achieved}
**Source**: {Standalone | Spec: path/to/file.md}
**Complexity**: {simple | moderate | complex}

---

### Phase 1: {Phase Name}

| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 1.1 | {task description} | High | 1h | - |
| 1.2 | {task description} | Medium | 2h | 1.1 |

### Phase 2: {Phase Name}

| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 2.1 | {task description} | High | 3h | 1.2 |
| 2.2 | {task description} | Medium | 2h | 2.1 |

---

### Summary

- **Total Tasks**: N
- **Phases**: X
- **Critical Path**: 1.1 → 1.2 → 2.1 → ...

### Risks

- {Risk description}: {Mitigation strategy}
```

**AFTER displaying plan**: Immediately use AskUserQuestion tool for approval (see Phase 3 STEP 2).

### TodoWrite Output Format

```javascript
TodoWrite([
  {
    content: "[Phase 1] Setup project structure",
    status: "in_progress",
    activeForm: "Setting up project structure"
  },
  {
    content: "[Phase 1] Configure dependencies",
    status: "pending",
    activeForm: "Configuring dependencies"
  },
  // ... max 5 items
])
```

---

## Key Differences from Producer Skills

| Aspect | Producer Skills | Planning Skill |
|--------|-----------------|----------------|
| Output | Spec file in `.claude/.specs/` | Conversation + TodoWrite |
| Phases | 6 phases (0-5) | 4 phases (0-3) |
| Mode Selection | Autonomous/Collaborative | N/A - always interactive |
| Research | Uses scouter/researcher agents | No research phase |
| Timestamps | Required for spec naming | Not needed |
| Approval | At gates | Single approval before todos |

---

## Error Handling

### File Not Found (Spec Reader Mode)
```
Error: Could not find spec file at: {path}

Available spec files:
{list files in .claude/.specs/}

Please provide a valid spec file path.
```

### Empty Input
```
No input provided. Please specify:
- A task description to plan, OR
- A path to a spec file

Example:
/planning Create a REST API for user authentication
/planning .claude/.specs/brainstorming-auth-feature.md
```

### Invalid Spec Format
```
Warning: Could not parse spec file as expected format.

Detected sections:
{list found sections}

Proceeding with available information...
```

---

## Reference Files

- **references/plan-templates.md**: Complete plan output format with examples
- **references/todowrite-patterns.md**: TodoWrite conversion rules and sliding window

---

## Examples

### Example 1: Standalone Mode

```
User: /planning Create a REST API for user authentication

Claude:
Phase 0: Detected standalone mode
Phase 1: Analyzing requirements...
Phase 2: Generating plan...

## PLAN: REST API for User Authentication

**Objective**: Implement secure user authentication API with login, register, and token refresh
**Source**: Standalone
**Complexity**: Moderate

### Phase 1: Setup
| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 1.1 | Create auth module structure | High | 1h | - |
| 1.2 | Configure JWT dependencies | High | 30m | 1.1 |

### Phase 2: Core Implementation
| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 2.1 | Implement user registration | High | 2h | 1.2 |
| 2.2 | Implement login endpoint | High | 2h | 2.1 |
| 2.3 | Add token refresh logic | Medium | 1h | 2.2 |

### Phase 3: Security & Testing
| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 3.1 | Add password hashing | High | 1h | 2.1 |
| 3.2 | Write unit tests | Medium | 2h | 2.3 |
| 3.3 | Add integration tests | Medium | 2h | 3.2 |

---

### Summary
- **Total Tasks**: 8
- **Phases**: 3
- **Critical Path**: 1.1 → 1.2 → 2.1 → 2.2 → 2.3 → 3.2 → 3.3

### Risks
- Token security: Use industry-standard JWT libraries
- Password storage: Use bcrypt with proper salt rounds

[Claude uses AskUserQuestion tool with options: "Yes, create todos" / "No, revise plan"]

User selects: "Yes, create todos"

[Claude creates TodoWrite items and begins implementation]
```

### Example 2: Spec Reader Mode

```
User: /planning .claude/.specs/brainstorming-auth-feature-1801261458.md

Claude:
Phase 0: Detected spec-reader mode
Phase 1: Reading spec file...
Phase 2: Extracting implementation tasks...

## PLAN: Auth Feature Implementation

**Objective**: Implement OAuth2 authentication as specified in brainstorming spec
**Source**: Spec: .claude/.specs/brainstorming-auth-feature-1801261458.md
**Complexity**: Complex

[... plan based on spec content ...]

[Claude uses AskUserQuestion tool for approval]
```
