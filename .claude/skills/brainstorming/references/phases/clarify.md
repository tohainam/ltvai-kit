# Phase 2: Clarify

Interactive Q&A loop to gather complete requirements.

## Steps

### 1. Mark Phase In Progress

- Update todo: mark Clarify as `in_progress`

### 2. Analyze Current Spec

- Read spec file
- Identify gaps in requirements
- Prepare targeted questions

### 3. Interactive Loop

**CRITICAL: Update spec IMMEDIATELY after EVERY user response**

```
while (requirements unclear) {
  - Ask targeted questions (max 3 at a time)
  - Wait for user response
  - IMMEDIATELY update spec file:
    1. Log Q&A to Discussion section
    2. Update relevant spec sections (Overview, Requirements, etc.)
    3. Save file before asking next question
  - Check if requirements are complete
}
```

**DO NOT** batch updates or wait until the end of clarification. Each user answer must be written to spec file RIGHT AWAY.

Use `AskUserQuestion` tool for structured questions:

```
Question: "[Your question]"
Header: "[Category: Scope/Tech/UX/etc]"
Options:
  - label: "Option A"
    description: "Description of option A"
  - label: "Option B"
    description: "Description of option B"
```

### 4. Question Categories

Ask about (prioritize based on gaps):

**Functional**:
- What should it do? Core functionality?
- Edge cases? Error scenarios?
- User flows?

**Non-functional**:
- Performance requirements?
- Security considerations?
- Accessibility needs?

**Constraints**:
- Tech stack limitations?
- Dependencies on other features?
- External integrations?

**Scope**:
- What's in scope vs out of scope?
- MVP vs full feature?
- Phases or milestones?

**References**:
- Existing examples to follow?
- Design specs (Figma, etc.)?
- Related documentation?

### 5. Logging Format

**IMMEDIATELY after each user response**, update the spec file:

```markdown
### Clarification Round {N}

**Claude**: Question about X?
**User**: Answer about X

**Claude**: Question about Y?
**User**: Answer about Y
```

### 6. Update Spec Sections

**IMMEDIATELY after logging**, update relevant sections:

- **Overview**: Refine if clearer understanding
- **Functional Requirements**: Add specific items
- **Non-functional Requirements**: Add constraints
- **Out of Scope**: Add explicit exclusions

Format requirements as checkboxes:
```markdown
- [ ] FR1: User can log in with Google OAuth
- [ ] FR2: User can log in with Facebook OAuth
```

### 7. Completion Check

Requirements are considered complete when:

- [ ] Core functionality is clearly defined
- [ ] At least 1 FR or NFR exists
- [ ] Scope boundaries are clear
- [ ] No major ambiguities remain
- [ ] User confirms requirements are complete

### 8. Transition to Scout

When requirements are clear:

```
Requirements look complete. Here's a summary:

**Core functionality**: {brief}
**Requirements**: {count} items
**Out of scope**: {list if any}

Ready to scout the codebase for related context?
```

Use `AskUserQuestion`:
```
Question: "Ready to scout codebase for context?"
Header: "Scout"
Options:
  - label: "Yes, scout (Recommended)"
    description: "Find related files and patterns in the codebase"
  - label: "Skip scouting"
    description: "Skip to finalization"
  - label: "More questions"
    description: "I have more requirements to discuss"
```

### 9. Mark Phase Complete

- Update todo: mark Clarify as `completed`
- If "Yes, scout":
  - Update spec frontmatter: `current_phase: scout`
  - Proceed to Scout phase
- If "Skip scouting":
  - Update spec frontmatter: `current_phase: finalize`
  - Proceed to Finalize phase
- If "More questions": Continue clarification loop
