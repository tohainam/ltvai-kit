# Gate Criteria Reference

## Gate Anatomy Pattern

Each gate follows this structure:

```
┌─────────────────────────────────────────┐
│              GATE N→N+1                 │
├─────────────────────────────────────────┤
│ INPUTS                                  │
│ - Deliverables from Phase N             │
│ - Updated spec file                     │
├─────────────────────────────────────────┤
│ CRITERIA                                │
│ - Must-Meet: Required for GO            │
│ - Should-Meet: Recommended, not blocking│
├─────────────────────────────────────────┤
│ REVIEW PROCESS                          │
│ - Autonomous: Auto-check criteria       │
│ - Collaborative: User confirmation      │
├─────────────────────────────────────────┤
│ DECISIONS                               │
│ - GO: Proceed to Phase N+1              │
│ - HOLD: Need more information           │
│ - RECYCLE: Return to earlier phase      │
└─────────────────────────────────────────┘
```

---

## Gate 0→1: Initialization Complete

### Inputs Required

- [ ] User request received
- [ ] Timestamp captured via `date "+%d%m%y%H%M"`
- [ ] Slug generated from request

### Must-Meet Criteria (Required for GO)

| #   | Criterion              | Verification                                                        |
| --- | ---------------------- | ------------------------------------------------------------------- |
| 1   | Spec file created      | File exists at `.claude/.specs/brainstorming-{slug}-{timestamp}.md` |
| 2   | Valid YAML frontmatter | Contains all required fields                                        |
| 3   | Mode selected          | User responded with autonomous OR collaborative                     |

### Should-Meet Criteria (Recommended)

| #   | Criterion                       | Notes                            |
| --- | ------------------------------- | -------------------------------- |
| 1   | Slug clearly represents request | Max 30 chars, kebab-case         |
| 2   | Priority assessed               | Based on request urgency         |
| 3   | Vague request flagged           | extended_discovery set if needed |

### Gate Decisions

**GO Conditions:**

- All Must-Meet criteria satisfied
- User has selected mode

**HOLD Conditions:**

- User did not respond to mode selection
- Action: Wait for user response

**RECYCLE Conditions:**

- None for this gate (first phase)

---

## Gate 1→2: Discovery Complete

### Inputs Required

- [ ] Phase 0 completed (spec file, mode selected)
- [ ] Discovery section populated in spec file

### Must-Meet Criteria (Required for GO)

| #   | Criterion                        | Verification                          |
| --- | -------------------------------- | ------------------------------------- |
| 1   | Problem statement documented     | Clear 1-2 sentence problem definition |
| 2   | At least one use case identified | Use case with actor, trigger, outcome |
| 3   | Basic constraints known          | At least 2 constraints documented     |
| 4   | User confirmed understanding     | Collaborative: explicit confirmation  |

### Should-Meet Criteria (Recommended)

| #   | Criterion                     | Notes                         |
| --- | ----------------------------- | ----------------------------- |
| 1   | User personas defined         | At least 1 persona with needs |
| 2   | Success criteria established  | Measurable criteria listed    |
| 3   | Integration points identified | Systems that will be affected |
| 4   | 5 Whys completed (if vague)   | Root cause identified         |

### Gate Decisions

**GO Conditions:**

- Problem is clearly articulated
- User needs are understood
- Constraints are known

**HOLD Conditions:**

- Problem statement is vague
- Missing critical user context
- Action: Ask clarifying questions

**RECYCLE Conditions:**

- Fundamental misunderstanding of request
- User indicates different intent
- Action: Restart Discovery with corrected understanding

---

## Gate 2→3: Research Complete

### Inputs Required

- [ ] Phase 1 completed (Discovery documented)
- [ ] Research section populated in spec file
- [ ] Agent results synthesized

### Must-Meet Criteria (Required for GO)

| #   | Criterion                             | Verification                                     |
| --- | ------------------------------------- | ------------------------------------------------ |
| 1   | Codebase analysis performed           | Scouter agent(s) launched and results documented |
| 2   | Relevant existing patterns documented | At least 1 pattern OR explicit "none found"      |
| 3   | Key technical constraints identified  | Constraints that affect design decisions         |

### Should-Meet Criteria (Recommended)

| #   | Criterion                        | Notes                               |
| --- | -------------------------------- | ----------------------------------- |
| 1   | External best practices gathered | Researcher agent results documented |
| 2   | Dependency risks assessed        | Known dependencies listed           |
| 3   | Security considerations noted    | Security implications identified    |
| 4   | Performance patterns documented  | Relevant performance considerations |
| 5   | Multiple agents used             | Parallel research for thoroughness  |

### Gate Decisions

**GO Conditions:**

- Codebase context understood
- Technical constraints documented
- Sufficient information for ideation

**HOLD Conditions:**

- Research incomplete
- Key questions unanswered
- Action: Launch additional agents

**RECYCLE Conditions:**

- Foundational assumption invalid
- Discovery findings need revision
- Action: Return to Phase 1 with new information

---

## Gate 3→4: Ideation Complete

### Inputs Required

- [ ] Phase 2 completed (Research documented)
- [ ] Ideation section populated with all 4 tracks
- [ ] SCAMPER or Mind Mapping applied

### Must-Meet Criteria (Required for GO)

| #   | Criterion                   | Verification                                       |
| --- | --------------------------- | -------------------------------------------------- |
| 1   | Minimum 3 options per track | Track A: 3+, Track B: 3+, Track C: 3+, Track D: 3+ |
| 2   | All 4 tracks explored       | Architecture, UX, Integration, Value               |
| 3   | No premature filtering      | All ideas documented, none rejected yet            |
| 4   | Options are distinct        | Each option offers different approach              |

### Should-Meet Criteria (Recommended)

| #   | Criterion                                | Notes                            |
| --- | ---------------------------------------- | -------------------------------- |
| 1   | SCAMPER technique applied                | Documented in spec               |
| 2   | Creative/unconventional options included | At least 1 "wild" idea per track |
| 3   | Trade-offs preliminary noted             | Basic pros/cons for each option  |
| 4   | Mind Map created                         | Visual organization of ideas     |
| 5   | More than minimum options                | 4-5 options per track is better  |

### Gate Decisions

**GO Conditions:**

- All tracks have sufficient options
- Divergent thinking complete
- Ready for convergent evaluation

**HOLD Conditions:**

- Insufficient options in any track
- Track unexplored
- Action: Continue ideation for weak areas

**RECYCLE Conditions:**

- Scope changed significantly
- Research revealed blocking issue
- Action: Return to Phase 2 or Phase 1

---

## Gate 4→5: Synthesis Complete

### Inputs Required

- [ ] Phase 3 completed (Ideation documented)
- [ ] Synthesis section populated
- [ ] ADRs documented

### Must-Meet Criteria (Required for GO)

| #   | Criterion                          | Verification                         |
| --- | ---------------------------------- | ------------------------------------ |
| 1   | One approach selected per track    | Clear selection with rationale       |
| 2   | Key ADRs documented                | At least 1 ADR for major decision    |
| 3   | Six Thinking Hats analysis applied | Or equivalent evaluation             |
| 4   | User confirmed selections          | Collaborative: explicit confirmation |

### Should-Meet Criteria (Recommended)

| #   | Criterion                             | Notes                                  |
| --- | ------------------------------------- | -------------------------------------- |
| 1   | All ADRs have consequences documented | Both positive and negative             |
| 2   | Rejected options documented           | Why not selected                       |
| 3   | No blocking unknowns remain           | All critical questions answered        |
| 4   | Evaluation criteria explicit          | How options were scored                |
| 5   | Design Thinking prototype mindset     | Considered "what can be built fastest" |

### Gate Decisions

**GO Conditions:**

- Approach selected for all tracks
- Decisions documented with rationale
- Ready for specification

**HOLD Conditions:**

- User disagrees with selection
- More evaluation needed
- Action: Revisit specific decisions

**RECYCLE Conditions:**

- Need to revisit ideation with new constraints
- Major gap discovered
- Action: Return to Phase 3 with guidance

---

## Gate 5→Complete: Specification Complete

### Inputs Required

- [ ] Phase 4 completed (Synthesis documented)
- [ ] Specification section populated
- [ ] All deliverables present

### Must-Meet Criteria (Required for GO)

| #   | Criterion                    | Verification                        |
| --- | ---------------------------- | ----------------------------------- |
| 1   | Architecture diagram present | Valid Mermaid diagram               |
| 2   | Data models defined          | TypeScript interfaces or equivalent |
| 3   | API contracts specified      | OpenAPI or equivalent format        |
| 4   | Task list created            | Numbered tasks with descriptions    |

### Should-Meet Criteria (Recommended)

| #   | Criterion                        | Notes                        |
| --- | -------------------------------- | ---------------------------- |
| 1   | Estimates on tasks               | Time estimates included      |
| 2   | Dependencies between tasks noted | Task ordering clear          |
| 3   | Risk mitigation tasks included   | Address identified risks     |
| 4   | Decision log complete            | All phase decisions recorded |
| 5   | Change history updated           | All phases logged            |

### Gate Decisions

**GO (COMPLETE) Conditions:**

- All deliverables present
- Spec is actionable for implementation
- Output summary displayed

**HOLD Conditions:**

- Missing deliverables
- Incomplete sections
- Action: Complete missing items

---

## Stage-Gate Decision Summary

| Decision    | Meaning                   | Action                                                |
| ----------- | ------------------------- | ----------------------------------------------------- |
| **GO**      | All criteria met, proceed | Move to next phase                                    |
| **HOLD**    | Missing information       | Pause and gather what's needed                        |
| **RECYCLE** | Fundamental issue         | Return to earlier phase                               |
| **KILL**    | Project not viable        | Archive spec, document learnings (user decision only) |

---

## Mode-Specific Gate Behavior

### Autonomous Mode

```
Gate Check Process:
1. Auto-evaluate Must-Meet criteria
2. If all pass → GO (proceed)
3. If any fail → attempt to resolve
4. If cannot resolve → HOLD (notify user)

User Notification Points:
- After Gate 2→3 (research summary)
- After Gate 4→5 (ADR confirmation)
- At completion (output summary)
```

### Collaborative Mode

```
Gate Check Process:
1. Evaluate Must-Meet criteria
2. Present summary to user
3. Ask: "Ready to proceed to Phase {N+1}?"
4. Wait for explicit confirmation
5. Only proceed after user confirms

User Interaction at EVERY Gate:
- Summarize phase accomplishments
- Highlight key findings/decisions
- Ask clarifying questions if needed
- Request confirmation to proceed
```

---

## Quick Gate Checklist

### Phase 0→1 Quick Check

- [ ] Spec file exists
- [ ] Mode selected
      → If both: GO

### Phase 1→2 Quick Check

- [ ] Problem clear
- [ ] Use case documented
- [ ] Constraints known
      → If all three: GO

### Phase 2→3 Quick Check

- [ ] Codebase analyzed
- [ ] Patterns documented
- [ ] Constraints updated
      → If all three: GO

### Phase 3→4 Quick Check

- [ ] 3+ options per track
- [ ] All 4 tracks done
- [ ] No filtering applied
      → If all three: GO

### Phase 4→5 Quick Check

- [ ] Selections made
- [ ] ADRs documented
- [ ] User confirmed (collaborative)
      → If applicable: GO

### Phase 5→Complete Quick Check

- [ ] Diagram present
- [ ] Models defined
- [ ] API specified
- [ ] Tasks listed
      → If all four: COMPLETE
