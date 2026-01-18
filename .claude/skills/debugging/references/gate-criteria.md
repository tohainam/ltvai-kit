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

- [ ] User bug report, error message, or issue description
- [ ] Timestamp captured via `date "+%d%m%y%H%M"`
- [ ] Slug generated from bug description

### Must-Meet Criteria (Required for GO)

| # | Criterion | Verification |
| - | --------- | ------------ |
| 1 | Spec file created | File exists at `.claude/.specs/debugging-{slug}-{timestamp}.md` |
| 2 | Valid YAML frontmatter | Contains all required fields (spec_type, version, slug, etc.) |
| 3 | Issue type detected | runtime_error, logic_bug, performance, security, or regression |
| 4 | Mode selected | User responded with autonomous OR collaborative |
| 5 | Bug description captured | Initial problem statement documented |

### Should-Meet Criteria (Recommended)

| # | Criterion | Notes |
| - | --------- | ----- |
| 1 | Slug clearly represents bug | Max 30 chars, kebab-case |
| 2 | Initial severity estimated | Based on bug description |
| 3 | Affected files identified | If mentioned in report |
| 4 | Priority assessed | Based on impact/urgency |

### Gate Decisions

**GO Conditions:**

- All Must-Meet criteria satisfied
- User has selected mode
- Bug description is clear enough to proceed

**HOLD Conditions:**

- User did not respond to mode selection
- Bug description too vague to proceed
- Action: Wait for user response or ask clarifying questions

**RECYCLE Conditions:**

- None for this gate (first phase)

---

## Gate 1→2: Reproduction Complete

### Inputs Required

- [ ] Phase 0 completed (spec file, mode, type selected)
- [ ] Bug reproduction attempted
- [ ] Environment documented

### Must-Meet Criteria (Required for GO)

| # | Criterion | Verification |
| - | --------- | ------------ |
| 1 | Bug reproduction status known | Reproducible OR intermittent pattern documented |
| 2 | Reproduction steps documented | Step-by-step guide to trigger bug |
| 3 | Environment captured | OS, runtime, browser, dependencies |
| 4 | Expected vs Actual documented | Clear comparison of behavior |
| 5 | Complexity assessed | simple OR complex determined |

### Should-Meet Criteria (Recommended)

| # | Criterion | Notes |
| - | --------- | ----- |
| 1 | Minimal reproduction case | Smallest steps to reproduce |
| 2 | Reproducibility rate known | 100% or specific percentage |
| 3 | Initial affected files identified | Where bug manifests |
| 4 | Error message/stack trace captured | If available |

### Gate Decisions

**GO Conditions:**

- Bug confirmed reproducible (or intermittent pattern documented)
- Steps documented clearly
- Environment captured
- Ready for investigation

**HOLD Conditions:**

- Cannot reproduce bug at all
- Missing critical environment information
- Action: Ask user for more details, environment info, or logs

**RECYCLE Conditions:**

- User indicates different bug than initially described
- Reproduction reveals different issue
- Action: Return to Phase 0 with corrected bug description

---

## Gate 2→3: Investigation Complete

### Inputs Required

- [ ] Phase 1 completed (Reproduction documented)
- [ ] All 5 investigation tracks completed
- [ ] Agent results collected

### Must-Meet Criteria (Required for GO)

| # | Criterion | Verification |
| - | --------- | ------------ |
| 1 | Error Analysis Track complete | Stack trace analyzed, error origin identified |
| 2 | Code Context Track complete | Affected functions/methods reviewed |
| 3 | Git History Track complete | Recent changes analyzed (or N/A if no git) |
| 4 | Log Analysis Track complete | Related logs examined (or N/A if no logs) |
| 5 | Related Issues Track complete | Similar patterns searched |
| 6 | Probable cause areas identified | At least 1-3 areas with confidence levels |
| 7 | RCA technique selected | 5 Whys (simple) OR Fishbone (complex) confirmed |

### Should-Meet Criteria (Recommended)

| # | Criterion | Notes |
| - | --------- | ----- |
| 1 | Max 5 agents used | Not exceeding agent limit |
| 2 | Parallel execution | Agents ran concurrently |
| 3 | Code locations pinpointed | File:line for suspicious areas |
| 4 | Evidence documented | Supporting proof for each finding |
| 5 | Suspect commits identified | If regression |

### Gate Decisions

**GO Conditions:**

- All 5 tracks complete (or marked N/A with reason)
- Probable causes identified
- RCA technique selected
- Ready for root cause analysis

**HOLD Conditions:**

- One or more agents failed
- Incomplete track inspection
- No probable causes identified
- Action: Re-run failed agents or request additional information

**RECYCLE Conditions:**

- New information changes understanding of bug
- Reproduction steps found to be incorrect
- Action: Return to Phase 1 for re-reproduction

---

## Gate 3→4: Root Cause Analysis Complete

### Inputs Required

- [ ] Phase 2 completed (Investigation findings documented)
- [ ] RCA technique applied (5 Whys or Fishbone)
- [ ] Root cause(s) identified

### Must-Meet Criteria (Required for GO)

| # | Criterion | Verification |
| - | --------- | ------------ |
| 1 | RCA technique applied | 5 Whys OR Fishbone completed |
| 2 | Root cause identified | At least one RCA finding documented |
| 3 | Confidence level assigned | HIGH, MEDIUM, or LOW |
| 4 | Evidence documented | Supporting proof from investigation |
| 5 | Severity classified | CRITICAL, HIGH, MEDIUM, or LOW |
| 6 | Affected code pinpointed | File:line with code snippet |
| 7 | Causation chain explained | Why this causes the bug |

### Should-Meet Criteria (Recommended)

| # | Criterion | Notes |
| - | --------- | ----- |
| 1 | Multiple root causes considered | If complex bug |
| 2 | Contributing factors identified | Secondary causes |
| 3 | User confirmed analysis (collaborative) | Explicit confirmation |
| 4 | RCA finding ID assigned | RCA-001, RCA-002, etc. |

### Gate Decisions

**GO Conditions:**

- Root cause identified with evidence
- Confidence level assigned
- Causation chain explained
- Ready for fix strategy

**HOLD Conditions:**

- Root cause unclear despite analysis
- Low confidence with no supporting evidence
- Action: Request additional investigation or user input

**RECYCLE Conditions:**

- Investigation missed key area
- Evidence contradicts initial hypothesis
- Action: Return to Phase 2 for additional investigation

---

## Gate 4→5: Fix Strategy Complete

### Inputs Required

- [ ] Phase 3 completed (Root cause documented)
- [ ] Fix options proposed
- [ ] Risk assessment done
- [ ] Test case generated

### Must-Meet Criteria (Required for GO)

| # | Criterion | Verification |
| - | --------- | ------------ |
| 1 | At least 2 fix options | FIX-001, FIX-002 documented |
| 2 | Recommended fix identified | One option marked as recommended |
| 3 | Approach type specified | patch, refactor, or redesign |
| 4 | Affected files listed | What needs to change |
| 5 | Risk level assessed | LOW, MEDIUM, or HIGH |
| 6 | Verification criteria defined | How to verify fix works |

### Should-Meet Criteria (Recommended)

| # | Criterion | Notes |
| - | --------- | ----- |
| 1 | Effort estimated | Hours or days |
| 2 | Pros/cons documented | For each option |
| 3 | Risk mitigation identified | How to reduce risk |
| 4 | Verification steps clear | What to verify |
| 5 | User confirmed strategy (collaborative) | Explicit confirmation |

### Gate Decisions

**GO Conditions:**

- At least 2 fix options documented
- Risk assessment complete
- Verification criteria ready
- Ready for specification

**HOLD Conditions:**

- Cannot define verification criteria
- Risk too high without mitigation
- Action: Refine fix strategy or request user guidance

**RECYCLE Conditions:**

- Root cause reassessment needed
- Fix strategy reveals additional issues
- Action: Return to Phase 3 for re-analysis

---

## Gate 5→Complete: Specification Complete

### Inputs Required

- [ ] Phase 4 completed (Fix strategy and test case ready)
- [ ] All spec sections populated
- [ ] Summary written

### Must-Meet Criteria (Required for GO)

| # | Criterion | Verification |
| - | --------- | ------------ |
| 1 | Bug summary complete | 2-3 sentence overview |
| 2 | Recommended fix documented | Clear action plan |
| 3 | Verification criteria ready | How to verify fix |
| 4 | Output summary displayed | Formatted summary shown to user |
| 5 | Status set to complete | Spec file status: complete |
| 6 | No auto-implementation | Explicitly stated that fix NOT implemented |

### Should-Meet Criteria (Recommended)

| # | Criterion | Notes |
| - | --------- | ----- |
| 1 | Decision log complete | All phase decisions recorded |
| 2 | Change history updated | All phases logged |
| 3 | Notes section populated | Open questions, future considerations |
| 4 | Next steps clear | Options A, B, C provided |

### Gate Decisions

**COMPLETE Conditions:**

- All deliverables present
- Output summary displayed to user
- User informed that implementation NOT started
- Spec file marked as complete

**HOLD Conditions:**

- Missing sections in spec
- Summary incomplete
- Verification criteria invalid
- Action: Complete missing items

---

## Stage-Gate Decision Summary

| Decision | Meaning | Action |
| -------- | ------- | ------ |
| **GO** | All criteria met | Proceed to next phase |
| **HOLD** | Missing information | Pause and gather what's needed |
| **RECYCLE** | Fundamental issue | Return to earlier phase |
| **COMPLETE** | Debugging finished | Display summary, await user action |

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
- After Gate 2→3 (investigation summary with probable causes)
- After Gate 4→5 (fix strategy and test case confirmation)
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
- [ ] Issue type detected
- [ ] Mode selected
- [ ] Bug description captured
      → If all: **GO**

### Phase 1→2 Quick Check

- [ ] Bug reproducible (or pattern documented)
- [ ] Steps documented
- [ ] Environment captured
- [ ] Complexity assessed
      → If all: **GO**

### Phase 2→3 Quick Check

- [ ] Error Analysis Track done
- [ ] Code Context Track done
- [ ] Git History Track done
- [ ] Log Analysis Track done
- [ ] Related Issues Track done
- [ ] Probable causes identified
- [ ] RCA technique selected
      → If all: **GO**

### Phase 3→4 Quick Check

- [ ] RCA technique applied
- [ ] Root cause identified
- [ ] Confidence level assigned
- [ ] Evidence documented
- [ ] Severity classified
      → If all: **GO**

### Phase 4→5 Quick Check

- [ ] At least 2 fix options
- [ ] Risk assessed
- [ ] Verification criteria defined
- [ ] Recommended fix identified
      → If all: **GO**

### Phase 5→Complete Quick Check

- [ ] Bug summary written
- [ ] Verification criteria ready
- [ ] Output summary displayed
- [ ] Status: complete
      → If all: **COMPLETE**
