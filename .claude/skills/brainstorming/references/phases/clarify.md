# Phase 2: Clarify

Interactive Q&A loop to gather complete requirements.

## Minimum Requirements

- **Minimum 5 clarification questions per round** - Each round must have at least 5 requirement questions (e.g., State Mgmt, UI Library, Routing, Out of Scope, etc.)
- **Submit question does NOT count** - The "Submit" option to proceed is separate and not part of the 5 questions
- **Minimum 3 rounds** - Must complete at least 3 clarification rounds before allowing transition to scout
- Track round count in spec file frontmatter: `clarify_rounds: N`

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
round_count = 0

loop {
  round_count++

  - Ask AT LEAST 5 targeted questions (minimum 5, can ask more if needed)
  - Wait for user response
  - IMMEDIATELY update spec file:
    1. Log Q&A to Discussion section (as "Round {round_count}")
    2. Update relevant spec sections (Overview, Requirements, etc.)
    3. Update frontmatter: clarify_rounds: {round_count}
    4. Save file before asking next question
  - If round_count >= 3 AND requirements seem complete:
    - Offer transition (see Section 8)
  - ONLY exit loop when user EXPLICITLY selects "Yes, scout" or "Skip scouting"
}
```

**MINIMUM ROUND ENFORCEMENT:**
- DO NOT offer transition to scout until at least 3 rounds are completed
- Each round MUST have at least 5 clarification questions (Submit does NOT count)
- If fewer than 3 rounds completed, continue asking questions even if requirements seem clear

**CRITICAL LOOP CONTINUATION RULES:**

The clarify loop **CONTINUES** when user:
- Selects any option from a clarification question
- Types custom text (always means they want to add more info)
- Selects "More questions" in transition prompt
- Provides ANY input that is not explicit transition confirmation

The clarify loop **ONLY ENDS** when user:
- Explicitly selects "Yes, scout (Recommended)"
- Explicitly selects "Skip scouting"

**DO NOT** assume requirements are complete just because user answered a question. **DO NOT** automatically transition to scout phase. Always ask the transition question (Section 8) before moving on.

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

Requirements are considered complete when ALL conditions are met:

- [ ] **Minimum 3 rounds completed** (clarify_rounds >= 3)
- [ ] **Minimum 15 clarification questions asked total** (5 questions × 3 rounds, Submit does NOT count)
- [ ] Core functionality is clearly defined
- [ ] At least 3 FRs or NFRs exist
- [ ] Scope boundaries are clear
- [ ] No major ambiguities remain
- [ ] User confirms via Submit

**If fewer than 3 rounds completed:** Continue asking questions regardless of other conditions.

### 8. Transition to Scout

**PREREQUISITE:** Only offer transition after completing minimum 3 rounds (check `clarify_rounds` in frontmatter).

When `clarify_rounds >= 3` AND requirements seem complete, **offer** transition:

```
We've completed {N} clarification rounds with {total} questions.
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

### 9. Handle Transition Response

**CRITICAL: Only these responses exit the clarify loop:**

| User Response | Action |
|---------------|--------|
| Selects "Yes, scout (Recommended)" | Exit loop → Scout phase |
| Selects "Skip scouting" | Exit loop → Finalize phase |
| Selects "More questions" | **CONTINUE LOOP** - ask more questions |
| Types ANY custom text | **CONTINUE LOOP** - treat as new input, log it, update spec |

**When exiting loop:**
- Update todo: mark Clarify as `completed`
- Update spec frontmatter: `current_phase: scout` or `current_phase: finalize`
- Proceed to next phase

**When continuing loop:**
- DO NOT mark Clarify as completed
- DO NOT update current_phase
- Process user input as additional requirements
- Log to Discussion section
- Update spec sections as needed
- Continue asking questions or offer transition again later
