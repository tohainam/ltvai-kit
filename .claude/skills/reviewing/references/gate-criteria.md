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

- [ ] User request received (files, PR, or code reference)
- [ ] Timestamp captured via `date "+%d%m%y%H%M"`
- [ ] Slug generated from request

### Must-Meet Criteria (Required for GO)

| # | Criterion | Verification |
| - | --------- | ------------ |
| 1 | Spec file created | File exists at `.claude/.specs/reviewing-{slug}-{timestamp}.md` |
| 2 | Valid YAML frontmatter | Contains all required fields (spec_type, version, slug, etc.) |
| 3 | Review type detected | pr_review, security_audit, or general_review |
| 4 | Mode selected | User responded with autonomous OR collaborative |
| 5 | Target files identified | At least 1 file path in target_files |

### Should-Meet Criteria (Recommended)

| # | Criterion | Notes |
| - | --------- | ----- |
| 1 | Slug clearly represents target | Max 30 chars, kebab-case |
| 2 | Priority assessed | Based on review urgency |
| 3 | Related files identified | Dependencies, tests |

### Gate Decisions

**GO Conditions:**

- All Must-Meet criteria satisfied
- User has selected mode
- Files are accessible

**HOLD Conditions:**

- User did not respond to mode selection
- Files cannot be located
- Action: Wait for user response or clarification

**RECYCLE Conditions:**

- None for this gate (first phase)

---

## Gate 1→2: Context Discovery Complete

### Inputs Required

- [ ] Phase 0 completed (spec file, mode, type selected)
- [ ] Context Discovery section populated in spec file
- [ ] Target files read and analyzed

### Must-Meet Criteria (Required for GO)

| # | Criterion | Verification |
| - | --------- | ------------ |
| 1 | All target files read | Each file examined, purpose documented |
| 2 | Dependencies mapped | Internal and external dependencies listed |
| 3 | File complexity assessed | Size, complexity level documented |
| 4 | Git history analyzed (if available) | Recent changes summarized |

### Should-Meet Criteria (Recommended)

| # | Criterion | Notes |
| - | --------- | ----- |
| 1 | Integration points identified | Where code connects to other systems |
| 2 | Test files identified | Related test files found |
| 3 | Configuration reviewed | Environment, config files noted |
| 4 | Tech stack confirmed | Languages, frameworks documented |

### Gate Decisions

**GO Conditions:**

- All target files successfully read
- Context documented in spec
- Ready for multi-track inspection

**HOLD Conditions:**

- Cannot read some files (permissions, not found)
- Context unclear
- Action: Ask user for clarification or alternative files

**RECYCLE Conditions:**

- Wrong files identified
- User indicates different target
- Action: Return to Phase 0 with corrected targets

---

## Gate 2→3: Multi-Track Inspection Complete

### Inputs Required

- [ ] Phase 1 completed (Context Discovery documented)
- [ ] All inspection tracks completed
- [ ] Agent results collected

### Must-Meet Criteria (Required for GO)

| # | Criterion | Verification |
| - | --------- | ------------ |
| 1 | Security Track complete | Security findings documented (or "none found") |
| 2 | Performance Track complete | Performance findings documented (or "none found") |
| 3 | Quality Track complete | Quality findings documented (or "none found") |
| 4 | Coverage Track complete | Coverage findings documented (or "none found") |
| 5 | Findings have severity | Each finding has critical/high/medium/low |
| 6 | Findings have location | File:line reference for each |

### Should-Meet Criteria (Recommended)

| # | Criterion | Notes |
| - | --------- | ----- |
| 1 | Max 5 agents used | Not exceeding agent limit |
| 2 | Parallel execution | Agents ran concurrently |
| 3 | Documentation Track complete | Optional 5th track |
| 4 | Findings have recommendations | Fix suggestions provided |
| 5 | Code snippets included | Problematic code shown |

### Gate Decisions

**GO Conditions:**

- All 4 required tracks complete
- Findings documented with severity and location
- Ready for consolidation

**HOLD Conditions:**

- One or more agents failed
- Incomplete track inspection
- Action: Re-run failed agents

**RECYCLE Conditions:**

- None typically - inspection is comprehensive

---

## Gate 3→4: Findings Consolidation Complete

### Inputs Required

- [ ] Phase 2 completed (All tracks inspected)
- [ ] Findings merged into single list
- [ ] Duplicates removed

### Must-Meet Criteria (Required for GO)

| # | Criterion | Verification |
| - | --------- | ------------ |
| 1 | All findings merged | Single consolidated list |
| 2 | Unique IDs assigned | Format: {TRACK}-{NUMBER} (e.g., SEC-001) |
| 3 | Severity categorized | Findings grouped by critical/high/medium/low |
| 4 | No duplicates | Same issue not listed twice |
| 5 | Spec file updated | Consolidation section populated |

### Should-Meet Criteria (Recommended)

| # | Criterion | Notes |
| - | --------- | ----- |
| 1 | Findings sorted by severity | Critical first |
| 2 | Related findings grouped | Same root cause linked |
| 3 | Effort estimates added | Trivial/small/medium/large per finding |
| 4 | References included | Links to docs, OWASP, etc. |

### Gate Decisions

**GO Conditions:**

- All findings consolidated with unique IDs
- Severity categories assigned
- Ready for risk assessment

**HOLD Conditions:**

- Conflicting findings between tracks
- Unclear severity classification
- Action: Re-analyze specific findings

**RECYCLE Conditions:**

- Major area missed during inspection
- User identifies gap
- Action: Return to Phase 2 for additional inspection

---

## Gate 4→5: Risk Assessment Complete

### Inputs Required

- [ ] Phase 3 completed (Findings consolidated)
- [ ] All dimension scores calculated
- [ ] Overall grade determined

### Must-Meet Criteria (Required for GO)

| # | Criterion | Verification |
| - | --------- | ------------ |
| 1 | Security score calculated | 0-25 with formula |
| 2 | Performance score calculated | 0-20 with formula |
| 3 | Maintainability score calculated | 0-20 with formula |
| 4 | Readability score calculated | 0-15 with formula |
| 5 | Test Coverage score calculated | 0-20 with formula |
| 6 | Overall grade assigned | A/B/C/D/F based on total |
| 7 | Traffic lights assigned | GREEN/YELLOW/RED per dimension |
| 8 | Priority matrix built | MUST FIX / FIX BEFORE MERGE / SHOULD FIX / NICE TO HAVE |

### Should-Meet Criteria (Recommended)

| # | Criterion | Notes |
| - | --------- | ----- |
| 1 | Score interpretation documented | What grade means |
| 2 | Trend analysis (if previous review) | Comparison with prior |
| 3 | Risk assessment summary | Overall risk level |
| 4 | User confirmed scores (collaborative) | Explicit confirmation |

### Gate Decisions

**GO Conditions:**

- All 5 dimension scores calculated
- Overall grade determined
- Priority matrix complete
- Ready for report generation

**HOLD Conditions:**

- Scoring appears incorrect
- User disputes classification
- Action: Recalculate specific dimension

**RECYCLE Conditions:**

- Major findings discovered during review
- Severity assessment significantly wrong
- Action: Return to Phase 3 for re-consolidation

---

## Gate 5→Complete: Report Generation Complete

### Inputs Required

- [ ] Phase 4 completed (Scores and priority matrix ready)
- [ ] Report section populated
- [ ] Summary written

### Must-Meet Criteria (Required for GO)

| # | Criterion | Verification |
| - | --------- | ------------ |
| 1 | Summary section complete | 2-3 sentence overview |
| 2 | Action plan present | Prioritized action items with finding IDs |
| 3 | Scores displayed | All dimension scores in table |
| 4 | Overall grade shown | A/B/C/D/F with interpretation |
| 5 | Output summary displayed | Formatted summary shown to user |
| 6 | Status set to complete | Spec file status: complete |
| 7 | No auto-implementation | Explicitly stated that fixes NOT implemented |

### Should-Meet Criteria (Recommended)

| # | Criterion | Notes |
| - | --------- | ----- |
| 1 | Recommendations section | Additional improvement suggestions |
| 2 | Next steps documented | Clear path forward |
| 3 | Decision log complete | All phase decisions recorded |
| 4 | Change history updated | All phases logged |

### Gate Decisions

**COMPLETE Conditions:**

- All deliverables present
- Output summary displayed to user
- User informed that implementation NOT started
- Spec file marked as complete

**HOLD Conditions:**

- Missing sections in report
- Summary incomplete
- Action: Complete missing items

---

## Stage-Gate Decision Summary

| Decision | Meaning | Action |
| -------- | ------- | ------ |
| **GO** | All criteria met | Proceed to next phase |
| **HOLD** | Missing information | Pause and gather what's needed |
| **RECYCLE** | Fundamental issue | Return to earlier phase |
| **COMPLETE** | Review finished | Display summary, await user action |

---

## Mode-Specific Gate Behavior

### Autonomous Mode

```
Gate Check Process:
1. Auto-evaluate Must-Meet criteria
2. If all pass → GO (proceed)
3. If any fail → attempt to resolve
4. If cannot resolve → HOLD (notify user)

User Notification Points (Checkpoints):
- After Gate 2→3 (inspection summary with preliminary findings)
- After Gate 4→5 (scores confirmation before final report)
- At completion (final output summary)
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
- Present key findings/decisions
- Highlight any concerns
- Ask clarifying questions if needed
- Request confirmation to proceed
```

---

## Quick Gate Checklist

### Phase 0→1 Quick Check

- [ ] Spec file exists
- [ ] Review type detected
- [ ] Mode selected
- [ ] Target files identified
      → If all: **GO**

### Phase 1→2 Quick Check

- [ ] Files read
- [ ] Dependencies mapped
- [ ] Context documented
      → If all: **GO**

### Phase 2→3 Quick Check

- [ ] Security Track done
- [ ] Performance Track done
- [ ] Quality Track done
- [ ] Coverage Track done
- [ ] All findings have severity + location
      → If all: **GO**

### Phase 3→4 Quick Check

- [ ] Findings merged
- [ ] IDs assigned
- [ ] Severity categorized
- [ ] No duplicates
      → If all: **GO**

### Phase 4→5 Quick Check

- [ ] All scores calculated
- [ ] Grade assigned
- [ ] Priority matrix built
      → If all: **GO**

### Phase 5→Complete Quick Check

- [ ] Summary written
- [ ] Action plan present
- [ ] Output summary displayed
- [ ] Status: complete
      → If all: **COMPLETE**
