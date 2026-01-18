---
name: reviewing
description: |
  Structured code review skill for PR reviews, security audits, and general code quality checks.
  Use when: (1) User requests PR/code review, (2) User needs security audit,
  (3) User wants code quality assessment, (4) User explicitly invokes /reviewing command.

  Produces review reports in .specs/ with multi-dimension scoring,
  severity-categorized findings, and actionable recommendations. Supports Autonomous
  and Collaborative modes with numbered phases (0-5) and explicit gate criteria.
---

# Reviewing Skill

## CRITICAL CONSTRAINTS

**YOU MUST FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **NEVER** implement fixes - produce ONLY review specification documents
2. **ALWAYS** create spec file FIRST before any phase work
3. **ALWAYS** use `date "+%d%m%y%H%M"` command for timestamps (format: ddmmyyHHMM)
4. **ALWAYS** follow numbered phases sequentially (0 → 1 → 2 → 3 → 4 → 5)
5. **ALWAYS** use AskUserQuestion tool for ALL user interactions in collaborative mode
6. **ALWAYS** update spec file after completing EACH phase
7. **NEVER** skip inspection phase even if code looks simple
8. **NEVER** implement automatically - always show output summary at the end
9. **ALWAYS** categorize findings by severity (critical/high/medium/low)
10. **MUST** use maximum 5 scouter agents for parallel inspection
11. **NEVER** mark action plan checklist items as done - ALL checkboxes MUST remain unchecked `[ ]`

---

## Workflow Overview

```
Phase 0: Initialization    → Create spec file, detect review type, select mode
Phase 1: Context Discovery → Read files, analyze dependencies, git history
Phase 2: Multi-Track Inspection → Parallel: Security/Performance/Quality/Coverage
Phase 3: Findings Consolidation → Merge findings, categorize by severity
Phase 4: Risk Assessment   → Calculate scores, build priority matrix
Phase 5: Report Generation → Generate deliverables, show summary
```

---

## Phase 0: Initialization

### Entry Criteria

- User has provided review request (files, PR, or code reference)

### Actions

**STEP 1**: Get current timestamp

```bash
date "+%d%m%y%H%M"
```

**STEP 2**: Generate slug from request

- Extract key concepts from review target
- Convert to kebab-case (max 30 characters)
- Example: "review auth module PR" → "auth-module-pr"

**STEP 3**: Detect review type

```
IF request mentions "PR" OR "pull request" OR "merge request":
    review_type = "pr_review"
ELIF request mentions "security" OR "audit" OR "vulnerability":
    review_type = "security_audit"
ELSE:
    review_type = "general_review"
```

**STEP 4**: Create spec file

- Path: `.specs/reviewing-{slug}-{timestamp}.md`
- Initialize with YAML frontmatter (see references/templates.md)
- Set status: `initializing`

**STEP 5**: Select mode using AskUserQuestion

```
Spec file created at: .specs/reviewing-{slug}-{timestamp}.md
Review type detected: {review_type}

Select your preferred review mode:

AUTONOMOUS:
- I proceed through phases with minimal interruption
- Check in at Phase 2 (inspection summary) and Phase 4 (scores)
- Faster, comprehensive analysis

COLLABORATIVE:
- After EACH phase, we discuss findings
- You provide input and direction at every step
- More interactive, higher control
```

### Exit Criteria

- [ ] Spec file exists with valid frontmatter
- [ ] Review type detected
- [ ] Mode selected (autonomous/collaborative)
- [ ] Target files identified

### Gate 0→1 Decision

- **GO**: Spec file created, mode selected, files identified
- **HOLD**: User did not respond to mode selection

---

## Phase 1: Context Discovery

### Entry Criteria

- Phase 0 complete
- Spec file created
- Review type and mode selected

### Actions

**STEP 1**: Read target files

- Use Read tool to examine each target file
- Document file purpose, size, complexity

**STEP 2**: Analyze git history (if available)

```bash
git log --oneline -10 -- {file_path}
git diff HEAD~5 -- {file_path}
```

**STEP 3**: Map dependencies

- Identify imports and exports
- Note external dependencies
- Document integration points

**STEP 4**: Update spec file with context

### Exit Criteria

- [ ] All target files read and understood
- [ ] Dependencies mapped
- [ ] Git history analyzed (if applicable)
- [ ] Spec file updated with context

### Gate 1→2 Decision

- **GO**: Context understood, ready for inspection
- **HOLD**: Files cannot be read, need clarification
- **RECYCLE**: Wrong files identified, restart

---

## Phase 2: Multi-Track Inspection

### Entry Criteria

- Phase 1 complete
- Context documented

### CRITICAL: PARALLEL INSPECTION

**MUST** use up to 5 scouter agents in parallel:

```
Launch Task with subagent_type="scouter":
  Agent 1: "Security Track - Review {files} for:
    - Input validation vulnerabilities
    - Authentication/authorization issues
    - Sensitive data exposure
    - Injection vulnerabilities (SQL, XSS, etc.)
    Return: Findings with severity and line numbers"

  Agent 2: "Performance Track - Review {files} for:
    - N+1 query patterns
    - Inefficient algorithms
    - Memory leaks
    - Resource bottlenecks
    Return: Findings with severity and line numbers"

  Agent 3: "Quality Track - Review {files} for:
    - Code smells (long methods, duplicates)
    - SOLID principle violations
    - Error handling issues
    - Naming conventions
    Return: Findings with severity and line numbers"

  Agent 4: "Coverage Track - Review {files} for:
    - Missing unit tests
    - Edge cases not covered
    - Integration test gaps
    - Test quality issues
    Return: Findings with severity and line numbers"

  Agent 5 (optional): "Documentation Track - Review {files} for:
    - Missing/outdated comments
    - API documentation gaps
    - README updates needed
    Return: Findings with severity and line numbers"
```

### Exit Actions

1. Collect all agent findings
2. Update spec file with track findings
3. Set status: `inspecting`

### Gate 2→3 Decision

- **GO**: All tracks complete, findings documented
- **HOLD**: Agent(s) failed, need retry

---

## Phase 3: Findings Consolidation

### Entry Criteria

- Phase 2 complete
- All track findings collected

### Actions

**STEP 1**: Merge all findings

- Combine findings from all tracks
- Remove duplicates
- Assign unique IDs: `{TRACK}-{NUMBER}` (e.g., SEC-001, PERF-002)

**STEP 2**: Categorize by severity

```
CRITICAL: Security vulnerabilities, data loss risk, crash bugs
HIGH: Major bugs, significant performance issues, security weaknesses
MEDIUM: Code quality issues, minor bugs, maintainability concerns
LOW: Style issues, minor improvements, nice-to-have changes
```

**STEP 3**: Update spec file with consolidated findings

### Exit Criteria

- [ ] All findings merged with unique IDs
- [ ] Findings categorized by severity
- [ ] No duplicates
- [ ] Spec file updated

### Gate 3→4 Decision

- **GO**: Findings consolidated, ready for scoring
- **HOLD**: Need to re-analyze specific areas

---

## Phase 4: Risk Assessment

### Entry Criteria

- Phase 3 complete
- Findings consolidated

### Actions

**STEP 1**: Calculate dimension scores

See references/scoring-criteria.md for detailed rubrics.

```
Security Score     = 25 - (Critical×8 + High×4 + Medium×2 + Low×0.5)
Performance Score  = 20 - (Critical×7 + High×3 + Medium×1.5 + Low×0.5)
Maintainability    = 20 - (Critical×7 + High×3 + Medium×1.5 + Low×0.5)
Readability Score  = 15 - (Critical×5 + High×2 + Medium×1 + Low×0.25)
Test Coverage      = 20 - (Critical×7 + High×3 + Medium×1.5 + Low×0.5)

Floor all scores at 0 (no negative scores)
```

**STEP 2**: Determine traffic light status per dimension

```
GREEN:  Score ≥ 80% of max
YELLOW: Score ≥ 60% and < 80% of max
RED:    Score < 60% of max
```

**STEP 3**: Calculate overall score and grade

```
Total = Security + Performance + Maintainability + Readability + Test Coverage

A (90-100): Excellent - production ready
B (80-89):  Good - minor improvements recommended
C (70-79):  Fair - address issues before merge
D (60-69):  Poor - significant work needed
F (<60):    Fail - major refactoring required
```

**STEP 4**: Build priority matrix

```
MUST FIX NOW: All Critical severity findings
FIX BEFORE MERGE: All High severity findings
SHOULD FIX: All Medium severity findings
NICE TO HAVE: All Low severity findings
```

### Exit Criteria

- [ ] All dimension scores calculated
- [ ] Overall grade determined
- [ ] Priority matrix built
- [ ] Spec file updated with scores

### Gate 4→5 Decision

- **GO**: Scores calculated, ready for report
- **HOLD**: Scoring appears incorrect, need recalculation
- **RECYCLE**: Major findings missed, return to Phase 2

---

## Phase 5: Report Generation

### Entry Criteria

- Phase 4 complete
- Scores and priority matrix ready

### Actions

**STEP 1**: Generate final spec report sections

- Summary section
- Action plan with prioritized items (ALL checkboxes UNCHECKED `[ ]`)
- Recommendations

**CRITICAL**: Action Plan checkboxes MUST ALL be unchecked `[ ]`.
This is a SPECIFICATION document - NO implementation has been done.
NEVER use `[x]` for any action item.

**STEP 2**: Update spec file status to `complete`

**STEP 3**: Display Output Summary to user

### Exit Criteria

- [ ] Spec file complete with all sections
- [ ] Output Summary displayed
- [ ] User informed that implementation NOT started

### Gate 5→Complete Decision

- **COMPLETE**: All deliverables present, summary shown
- **HOLD**: Missing sections, need completion

---

## Output Summary Format

**ALWAYS display this summary after Phase 5 completion:**

```
========================================
REVIEW COMPLETE: {STATUS} (Score: {SCORE}/100)
========================================

Spec File: .specs/reviewing-{slug}-{timestamp}.md

---

Quick Summary:
{2-3 sentence summary of review findings and overall assessment}

---

Dimension Scores:
Security:        {score}/25 {status}
Performance:     {score}/20 {status}
Maintainability: {score}/20 {status}
Readability:     {score}/15 {status}
Test Coverage:   {score}/20 {status}
--------------------------------
TOTAL:           {total}/100 Grade: {grade}

---

MUST FIX NOW (Critical): {count}
{list top 3 critical issues with IDs}

FIX BEFORE MERGE (High): {count}
{list top 3 high issues with IDs}

---

Next Steps:

Option A - Implement fixes with this spec:
  /implementing .specs/reviewing-{slug}-{timestamp}.md

Option B - Export findings:
  Review the full spec file for detailed recommendations

========================================
IMPORTANT: Implementation NOT started.
This is a specification document only.
Review the spec file before proceeding.
========================================
```

---

## Mode Behavior Reference

### Autonomous Mode

```
Phase 0: Create spec, ask mode selection → wait for response
Phase 1: Complete context discovery → proceed automatically
Phase 2: Launch agents, collect findings → checkpoint: present inspection summary
Phase 3: Consolidate findings → proceed automatically
Phase 4: Calculate scores → checkpoint: present scores for confirmation
Phase 5: Generate report → show final summary
```

### Collaborative Mode

```
After EVERY phase:
1. Summarize what was accomplished
2. Present key findings
3. Ask clarifying questions if needed
4. Wait for user confirmation: "Ready to proceed to Phase {N+1}?"
5. Only proceed after user confirms
```

---

## Reference Files

- **references/templates.md**: Review spec YAML schema and body structure
- **references/scoring-criteria.md**: 5-dimension scoring rubrics and thresholds
- **references/security-checklist.md**: OWASP-based security review patterns
- **references/code-quality-checklist.md**: Maintainability and readability patterns
- **references/gate-criteria.md**: Detailed gate requirements for each phase
