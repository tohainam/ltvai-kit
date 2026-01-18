---
name: debugging
description: |
  Structured debugging skill for bug investigation, root cause analysis, and fix specification.
  Use when: (1) User reports runtime errors or crashes, (2) User needs bug investigation,
  (3) User wants root cause analysis, (4) User explicitly invokes /debugging command.

  Produces debugging specification files in .claude/.specs/ containing Root Cause Analysis (RCA),
  Reproduction Steps, and Fix Strategy. Supports Autonomous and Collaborative modes with numbered
  phases (0-5) and explicit gate criteria.
---

# Debugging Skill

## CRITICAL CONSTRAINTS

**YOU MUST FOLLOW THESE RULES WITHOUT EXCEPTION:**

1. **NEVER** implement fixes - produce ONLY debugging specification documents
2. **ALWAYS** create spec file FIRST before any phase work
3. **ALWAYS** use `date "+%d%m%y%H%M"` command for timestamps (format: ddmmyyHHMM)
4. **ALWAYS** follow numbered phases sequentially (0 → 1 → 2 → 3 → 4 → 5)
5. **ALWAYS** use AskUserQuestion tool for ALL user interactions in collaborative mode
6. **ALWAYS** update spec file after completing EACH phase
7. **NEVER** skip reproduction phase even if bug seems obvious
8. **NEVER** implement fixes automatically - always show output summary at the end
9. **ALWAYS** classify severity (CRITICAL/HIGH/MEDIUM/LOW) for root cause findings
10. **NEVER** mark checklist items as done - ALL checkboxes MUST remain unchecked `[ ]`

---

## Workflow Overview

```
Phase 0: Initialization    → Create spec file, detect issue type, select mode
Phase 1: Reproduction      → Validate bug, document steps, capture environment
Phase 2: Investigation     → 5 parallel scouter agents (specialized tracks)
Phase 3: Root Cause Analysis → Adaptive: 5 Whys (simple) or Fishbone (complex)
Phase 4: Fix Strategy      → Propose fix options, assess risk, define verification criteria
Phase 5: Specification     → Compile full spec, show summary
```

---

## Phase 0: Initialization

### Entry Criteria

- User has provided bug report, error message, or issue description

### Actions

**STEP 1**: Get current timestamp

```bash
date "+%d%m%y%H%M"
```

**STEP 2**: Generate slug from bug description

- Extract key concepts from error/bug report
- Convert to kebab-case (max 30 characters)
- Example: "login page crashes on submit" → "login-crash"

**STEP 3**: Detect issue type

```
IF error contains stack trace OR exception:
    issue_type = "runtime_error"
ELIF error relates to incorrect output OR behavior:
    issue_type = "logic_bug"
ELIF error mentions slow OR timeout OR memory:
    issue_type = "performance"
ELIF error relates to auth OR injection OR exposure:
    issue_type = "security"
ELIF error mentions "worked before" OR "after update":
    issue_type = "regression"
ELSE:
    issue_type = "runtime_error" (default)
```

**STEP 4**: Create spec file

- Path: `.claude/.specs/debugging-{slug}-{timestamp}.md`
- Initialize with YAML frontmatter (see references/templates.md)
- Set status: `initializing`

**STEP 5**: Select mode using AskUserQuestion

```
Spec file created at: .claude/.specs/debugging-{slug}-{timestamp}.md
Issue type detected: {issue_type}

Select your preferred debugging mode:

AUTONOMOUS:
- I proceed through phases with minimal interruption
- Check in at Phase 2 (investigation summary) and Phase 4 (fix strategy)
- Faster, comprehensive analysis

COLLABORATIVE:
- After EACH phase, we discuss findings
- You provide input and direction at every step
- More interactive, higher control
```

### Exit Criteria

- [ ] Spec file exists with valid frontmatter
- [ ] Issue type detected
- [ ] Mode selected (autonomous/collaborative)
- [ ] Bug description captured

### Gate 0→1 Decision

- **GO**: Spec file created, mode selected, issue described
- **HOLD**: User did not respond to mode selection

---

## Phase 1: Reproduction

### Entry Criteria

- Phase 0 complete
- Spec file created
- Issue type and mode selected

### Actions

**STEP 1**: Validate bug existence

- Confirm the bug can be observed
- If intermittent, note frequency and conditions

**STEP 2**: Document reproduction steps

```markdown
### Reproduction Steps

1. {Precondition/setup}
2. {Action step 1}
3. {Action step 2}
4. {Trigger action}
5. **Observed**: {What happens}
6. **Expected**: {What should happen}
```

**STEP 3**: Capture environment

```markdown
### Environment

- **OS**: {operating system and version}
- **Runtime**: {Node/Python/Java version}
- **Browser**: {if applicable}
- **Dependencies**: {relevant package versions}
- **Configuration**: {relevant config values}
- **Data State**: {relevant data conditions}
```

**STEP 4**: Determine bug complexity

```
complexity_score = 0

IF symptom_count > 3:
    complexity_score += 2
IF affected_files_count > 5:
    complexity_score += 2
IF reproduction_rate < 100%:
    complexity_score += 2
IF involves_async OR involves_race_condition:
    complexity_score += 2
IF affects_multiple_components:
    complexity_score += 1

IF complexity_score >= 4:
    bug_complexity = "complex"  # Use Fishbone in Phase 3
ELSE:
    bug_complexity = "simple"   # Use 5 Whys in Phase 3
```

**STEP 5**: Update spec file with reproduction findings

### Exit Criteria

- [ ] Bug confirmed reproducible (or intermittent pattern documented)
- [ ] Reproduction steps documented
- [ ] Environment captured
- [ ] Complexity assessed

### Gate 1→2 Decision

- **GO**: Bug reproducible, steps documented, complexity known
- **HOLD**: Cannot reproduce, need more information
- **RECYCLE**: Bug not valid, user confirms different issue

---

## Phase 2: Multi-Track Investigation

### Entry Criteria

- Phase 1 complete
- Reproduction documented

### CRITICAL: PARALLEL INVESTIGATION

**MUST** use up to 5 scouter agents in parallel:

```
Launch Task with subagent_type="scouter":

  Agent 1: "Error Analysis Track - Analyze {error_message/stack_trace} for:
    - Exception type and message parsing
    - Stack trace analysis (call chain)
    - Error origin identification
    - Related error patterns
    Return: Error context with line numbers and probable cause areas"

  Agent 2: "Code Context Track - Review {affected_files} for:
    - Function/method where error occurs
    - Input validation present/missing
    - Error handling patterns
    - State management issues
    Return: Code analysis with suspicious patterns"

  Agent 3: "Git History Track - Analyze recent changes:
    - git log --oneline -20 -- {affected_paths}
    - git diff HEAD~10 -- {affected_paths}
    - Identify recent commits that may have introduced bug
    Return: Suspect commits with change summary"

  Agent 4: "Log Analysis Track - Search for:
    - Related log entries around error time
    - Warning patterns preceding error
    - Correlation with other system events
    Return: Log context and timeline"

  Agent 5: "Related Issues Track - Search codebase for:
    - Similar error handling patterns
    - TODO/FIXME comments near affected code
    - Related test files and their status
    - Similar bugs in issue tracker (if accessible)
    Return: Related context and historical patterns"
```

### Investigation Summary Format

**ALWAYS display investigation summary using this format:**

```
---
PHASE 2: INVESTIGATION - SUMMARY

Agents Deployed: 5/5

| Agent | Track | Key Findings |
|-------|-------|--------------|
| 1 | Error Analysis | {brief findings} |
| 2 | Code Context | {brief findings} |
| 3 | Git History | {brief findings} |
| 4 | Log Analysis | {brief findings} |
| 5 | Related Issues | {brief findings} |

Probable Cause Areas:
1. {area 1 with confidence}
2. {area 2 with confidence}
3. {area 3 with confidence}

Complexity Confirmation: {simple/complex}
RCA Technique Selected: {5 Whys / Fishbone}
---
```

### Exit Actions

1. Collect and synthesize all agent results
2. Display Investigation Summary (format above)
3. Update spec file with Investigation findings
4. Set status: `investigating`
5. Confirm RCA technique selection

### Gate 2→3 Decision

- **GO**: All tracks complete, probable causes identified
- **HOLD**: Investigation incomplete, need more analysis
- **RECYCLE**: New information changes reproduction understanding

---

## Phase 3: Root Cause Analysis

### Entry Criteria

- Phase 2 complete
- Investigation findings documented
- RCA technique selected (5 Whys or Fishbone)

### ADAPTIVE RCA SELECTION

```
IF bug_complexity == "simple":
    Apply 5 Whys Analysis
ELSE:
    Apply Fishbone (Ishikawa) Analysis
```

### 5 Whys Analysis (Simple Bugs)

See references/rca-techniques.md for detailed guide.

```markdown
### 5 Whys Analysis

**Problem**: {observed bug behavior}

**Why 1**: Why does {problem} occur?

- Answer: {first level cause}

**Why 2**: Why does {first level cause} happen?

- Answer: {second level cause}

**Why 3**: Why does {second level cause} happen?

- Answer: {third level cause}

**Why 4**: Why does {third level cause} happen?

- Answer: {fourth level cause}

**Why 5**: Why does {fourth level cause} happen?

- Answer: {root cause}

---

**Root Cause Identified**: {final root cause}
**Confidence**: HIGH | MEDIUM | LOW
**Evidence**: {supporting evidence from investigation}
```

### Fishbone Analysis (Complex Bugs)

See references/rca-techniques.md for detailed guide.

Apply 6Ms analysis adapted for software:

```markdown
### Fishbone (Ishikawa) Analysis

**Effect**: {observed bug behavior}

#### Method (Process/Logic)

- {cause related to algorithm/logic}
- {cause related to business rules}

#### Machine (Infrastructure/Environment)

- {cause related to server/runtime}
- {cause related to dependencies}

#### Material (Data/Input)

- {cause related to data quality}
- {cause related to input validation}

#### Man (Human/Code)

- {cause related to implementation error}
- {cause related to misunderstanding}

#### Measurement (Monitoring/Logging)

- {cause related to missing observability}
- {cause related to false assumptions}

#### Mother Nature (External/Timing)

- {cause related to race conditions}
- {cause related to network/external services}

---

**Primary Root Cause**: {main cause identified}
**Contributing Factors**: {secondary causes}
**Confidence**: HIGH | MEDIUM | LOW
**Evidence**: {supporting evidence from investigation}
```

### Root Cause Finding Format

```markdown
### RCA-001: {Root Cause Title}

**Severity**: CRITICAL | HIGH | MEDIUM | LOW
**Confidence**: HIGH | MEDIUM | LOW

**Description**:
{Clear description of the root cause}

**Evidence**:

- {Evidence 1 from investigation}
- {Evidence 2 from investigation}

**Affected Code**:

\`\`\`{language}
// File: {path}
// Line: {number}
{code snippet showing the issue}
\`\`\`

**Why This Causes the Bug**:
{Explanation of causation chain}
```

### Exit Criteria

- [ ] RCA technique applied
- [ ] Root cause(s) identified with confidence level
- [ ] Evidence documented
- [ ] Affected code pinpointed

### Gate 3→4 Decision

- **GO**: Root cause identified with evidence
- **HOLD**: Root cause unclear, need more investigation
- **RECYCLE**: Investigation missed key area

---

## Phase 4: Fix Strategy

### Entry Criteria

- Phase 3 complete
- Root cause(s) documented

### Actions

**STEP 1**: Propose fix options (minimum 2)

```markdown
### Fix Options

#### FIX-001: {Fix Title} (Recommended)

- **Approach**: patch | refactor | redesign
- **Description**: {What to change}
- **Affected Files**:
  - {file1}: {change description}
  - {file2}: {change description}
- **Estimated Effort**: {hours/days}
- **Risk Level**: LOW | MEDIUM | HIGH
- **Pros**: {advantages}
- **Cons**: {disadvantages}

#### FIX-002: {Alternative Fix Title}

- **Approach**: {type}
- **Description**: {What to change}
- ...
```

**STEP 2**: Assess fix risk

```markdown
### Risk Assessment

| Risk           | Likelihood   | Impact       | Mitigation   |
| -------------- | ------------ | ------------ | ------------ |
| {risk 1}       | LOW/MED/HIGH | LOW/MED/HIGH | {mitigation} |
| {risk 2}       | LOW/MED/HIGH | LOW/MED/HIGH | {mitigation} |

**Overall Fix Risk**: LOW | MEDIUM | HIGH
```

**STEP 3**: Define verification criteria

```markdown
### Verification Criteria

**Description**: How to verify that {bug} is fixed

**Verification Steps**:

1. {verification step 1}
2. {verification step 2}
3. {verification step 3}

**Expected Result (After Fix)**: {what should happen}
**Current Result (Before Fix)**: {what currently happens}
```

### Exit Criteria

- [ ] At least 2 fix options documented
- [ ] Risk assessment complete
- [ ] Verification criteria defined
- [ ] Recommended fix identified

### Gate 4→5 Decision

- **GO**: Fix options documented, verification criteria ready
- **HOLD**: Fix strategy unclear, need review
- **RECYCLE**: Root cause reassessment needed

---

## Phase 5: Specification

### Entry Criteria

- Phase 4 complete
- Fix strategy documented
- Verification criteria defined

### Actions

**STEP 1**: Compile complete debugging specification

- Ensure all sections are populated
- Verify YAML frontmatter is complete

**STEP 2**: Update spec file status to `complete`

**STEP 3**: Display Output Summary

### Exit Criteria

- [ ] Spec file complete with all sections
- [ ] Output Summary displayed
- [ ] User informed that fix NOT implemented

---

## Output Summary Format

**ALWAYS display this summary after Phase 5 completion:**

```
========================================
DEBUGGING COMPLETE: {SEVERITY} Bug Analyzed
========================================

Spec File: .claude/.specs/debugging-{slug}-{timestamp}.md

---

Bug Summary:
{2-3 sentence description of the bug, its root cause, and recommended fix}

---

Root Cause Analysis:
- RCA-001: {root cause title} [Confidence: {level}]
  {One-line description}

---

Recommended Fix:
- FIX-001: {fix title}
  Approach: {patch/refactor/redesign}
  Risk: {LOW/MEDIUM/HIGH}
  Effort: {estimate}

---

Next Steps:

Option A - Implement fix:
  /implementing .claude/.specs/debugging-{slug}-{timestamp}.md

Option B - Review specification:
  Open the spec file for detailed analysis

Option C - Request changes:
  Ask for alternative fix strategies or more investigation

========================================
IMPORTANT: Fix NOT implemented.
This is a specification document only.
Review the spec file before proceeding.
========================================
```

---

## Mode Behavior Reference

### Autonomous Mode

```
Phase 0: Create spec, ask mode selection → wait for response
Phase 1: Complete reproduction → proceed automatically
Phase 2: Launch agents, synthesize → checkpoint: present investigation summary
Phase 3: Complete RCA → proceed automatically
Phase 4: Complete fix strategy → checkpoint: present fix options and test case
Phase 5: Generate specification → show final summary
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

- **references/templates.md**: Debugging spec YAML schema and body structure
- **references/rca-techniques.md**: 5 Whys and Fishbone technique detailed guides
- **references/severity-classification.md**: Bug severity criteria (CRITICAL/HIGH/MEDIUM/LOW)
- **references/gate-criteria.md**: Detailed gate requirements for each phase
