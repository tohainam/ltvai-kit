# Root Cause Analysis Techniques

## Technique Selection Guide

### Adaptive RCA Selection

The debugging skill uses adaptive RCA selection based on bug complexity:

| Complexity | Score Range | RCA Technique | Rationale                         |
| ---------- | ----------- | ------------- | --------------------------------- |
| Simple     | 0-3         | 5 Whys        | Linear cause chain, fast analysis |
| Complex    | 4+          | Fishbone      | Multiple factors, systematic      |

### Complexity Scoring Criteria

```
complexity_score = 0

IF symptom_count > 3:
    complexity_score += 2    # Multiple symptoms indicate complex interactions

IF affected_files_count > 5:
    complexity_score += 2    # Wide impact suggests systemic issue

IF reproduction_rate < 100%:
    complexity_score += 2    # Intermittent bugs are inherently complex

IF involves_async OR involves_race_condition:
    complexity_score += 2    # Timing-related bugs need comprehensive analysis

IF affects_multiple_components:
    complexity_score += 1    # Cross-component issues need broader view

RESULT:
  complexity_score >= 4 → Use Fishbone (complex)
  complexity_score < 4  → Use 5 Whys (simple)
```

### Quick Selection Decision Tree

```
Is the bug intermittent or timing-related?
├── Yes → Fishbone
└── No → Continue

Does the bug affect more than 5 files?
├── Yes → Fishbone
└── No → Continue

Are there more than 3 different symptoms?
├── Yes → Fishbone
└── No → Continue

Is the cause likely to be a single point of failure?
├── Yes → 5 Whys
└── No → Fishbone
```

---

## 1. 5 Whys Analysis

### Purpose

Root cause exploration through iterative questioning. Best for bugs with a linear cause chain where one issue leads to another.

### When to Use

- Bug has a clear, reproducible behavior
- Cause appears to be a single point of failure
- Stack trace points to a specific location
- Error message is descriptive
- Complexity score < 4

### The Process

1. **State the problem** - Clearly describe the observed bug behavior
2. **Ask "Why?"** - Why does this problem occur?
3. **Answer specifically** - Give a concrete, verifiable answer
4. **Repeat** - Take the answer and ask "Why?" again
5. **Stop when actionable** - Continue until you reach a root cause that can be fixed

### Application Template

```markdown
### 5 Whys Analysis

**Problem**: {Observed bug behavior - be specific}

**Why 1**: Why does {problem} occur?
- Answer: {First level cause}
- Evidence: {Supporting evidence from investigation}

**Why 2**: Why does {first level cause} happen?
- Answer: {Second level cause}
- Evidence: {Supporting evidence}

**Why 3**: Why does {second level cause} happen?
- Answer: {Third level cause}
- Evidence: {Supporting evidence}

**Why 4**: Why does {third level cause} happen?
- Answer: {Fourth level cause}
- Evidence: {Supporting evidence}

**Why 5**: Why does {fourth level cause} happen?
- Answer: {Root cause}
- Evidence: {Supporting evidence}

---

**Root Cause Identified**: {Final root cause - actionable}
**Confidence**: HIGH | MEDIUM | LOW
**Evidence Summary**: {Key evidence supporting this conclusion}
```

### Example: Runtime Error Bug

```markdown
### 5 Whys Analysis

**Problem**: Application crashes with "TypeError: Cannot read property 'name' of undefined" when user clicks Submit

**Why 1**: Why does the application crash?
- Answer: The code tries to access `.name` property on an undefined value
- Evidence: Stack trace shows error at UserForm.tsx:45

**Why 2**: Why is the value undefined?
- Answer: The `user` object from API response is sometimes null
- Evidence: Network logs show API returns { user: null } in some cases

**Why 3**: Why does the API return null user?
- Answer: The API returns null when the user session has expired
- Evidence: Occurs after 30 minutes of inactivity

**Why 4**: Why doesn't the code handle null user?
- Answer: The component assumes user is always present after login
- Evidence: No null check before accessing user.name

**Why 5**: Why wasn't null handling implemented?
- Answer: The session expiry edge case wasn't considered during development
- Evidence: No test case for expired session scenario

---

**Root Cause Identified**: Missing null check for user object when session expires
**Confidence**: HIGH
**Evidence Summary**: Stack trace + API response logs + missing test case
```

### Tips for Effective 5 Whys

| Tip                     | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| **Stay focused**        | Don't branch into multiple causes too early          |
| **Be specific**         | Vague answers lead to vague root causes              |
| **Verify with evidence**| Each "Why" should have supporting evidence           |
| **Stop when actionable**| Root cause should suggest a clear fix                |
| **May need fewer/more** | 5 is a guideline, stop when you reach the fix point  |
| **Avoid blame**         | Focus on system/code issues, not people              |

### Common Pitfalls

| Pitfall                 | Problem                          | Solution                        |
| ----------------------- | -------------------------------- | ------------------------------- |
| Stopping too early      | Fix symptoms, not root cause     | Keep asking until actionable    |
| Going too deep          | Over-engineering the fix         | Stop at first actionable cause  |
| Multiple branches       | Analysis becomes unfocused       | Pick primary path first         |
| Vague answers           | "It just happens" is not useful  | Require specific, verifiable answers |
| Blame-focused           | "Developer made mistake"         | Ask why the mistake was possible |

---

## 2. Fishbone (Ishikawa) Diagram Analysis

### Purpose

Comprehensive root cause analysis considering multiple categories of potential causes. Best for complex bugs with multiple contributing factors.

### When to Use

- Bug has multiple symptoms
- Intermittent or timing-related issues
- Multiple components affected
- Cause unclear after initial investigation
- Complexity score >= 4

### The 6Ms Framework (Adapted for Software)

| Category              | Software Equivalent     | What to Investigate                        |
| --------------------- | ----------------------- | ------------------------------------------ |
| **Method**            | Process/Logic           | Algorithms, business rules, workflows      |
| **Machine**           | Infrastructure/Env      | Servers, runtime, dependencies, configs    |
| **Material**          | Data/Input              | Input data, data quality, data formats     |
| **Man**               | Human/Code              | Implementation errors, misunderstandings   |
| **Measurement**       | Monitoring/Logging      | Observability gaps, false assumptions      |
| **Mother Nature**     | External/Timing         | Race conditions, network, external services|

### Fishbone Diagram Structure

```
                    ┌─────────────────────────────────────────────────┐
                    │                                                 │
Method ─────────────┤     ┌─────────────────────────────────────┐     │
                    │     │                                     │     │
Machine ────────────┤     │         BUG / EFFECT               │     │
                    │     │                                     │     │
Material ───────────┤     │   (Observed Problem Behavior)      │     │
                    │     │                                     │     │
Man ────────────────┤     └─────────────────────────────────────┘     │
                    │                                                 │
Measurement ────────┤                                                 │
                    │                                                 │
Mother Nature ──────┤                                                 │
                    └─────────────────────────────────────────────────┘
```

### Application Template

```markdown
### Fishbone (Ishikawa) Analysis

**Effect**: {Observed bug behavior}

---

#### Method (Process/Logic)

| Potential Cause                | Evidence | Likelihood |
| ------------------------------ | -------- | ---------- |
| {Algorithm flaw}               | {proof}  | HIGH/MED/LOW |
| {Business rule violation}      | {proof}  | HIGH/MED/LOW |
| {Workflow sequencing issue}    | {proof}  | HIGH/MED/LOW |

**Summary**: {Key finding for this category}

---

#### Machine (Infrastructure/Environment)

| Potential Cause                | Evidence | Likelihood |
| ------------------------------ | -------- | ---------- |
| {Server configuration}         | {proof}  | HIGH/MED/LOW |
| {Runtime version issue}        | {proof}  | HIGH/MED/LOW |
| {Dependency conflict}          | {proof}  | HIGH/MED/LOW |
| {Resource exhaustion}          | {proof}  | HIGH/MED/LOW |

**Summary**: {Key finding for this category}

---

#### Material (Data/Input)

| Potential Cause                | Evidence | Likelihood |
| ------------------------------ | -------- | ---------- |
| {Invalid input data}           | {proof}  | HIGH/MED/LOW |
| {Data format mismatch}         | {proof}  | HIGH/MED/LOW |
| {Missing required data}        | {proof}  | HIGH/MED/LOW |
| {Data corruption}              | {proof}  | HIGH/MED/LOW |

**Summary**: {Key finding for this category}

---

#### Man (Human/Code)

| Potential Cause                | Evidence | Likelihood |
| ------------------------------ | -------- | ---------- |
| {Implementation bug}           | {proof}  | HIGH/MED/LOW |
| {Misunderstood requirement}    | {proof}  | HIGH/MED/LOW |
| {Copy-paste error}             | {proof}  | HIGH/MED/LOW |
| {Type error}                   | {proof}  | HIGH/MED/LOW |

**Summary**: {Key finding for this category}

---

#### Measurement (Monitoring/Logging)

| Potential Cause                | Evidence | Likelihood |
| ------------------------------ | -------- | ---------- |
| {Missing logs/metrics}         | {proof}  | HIGH/MED/LOW |
| {False positive/negative}      | {proof}  | HIGH/MED/LOW |
| {Wrong assumption in test}     | {proof}  | HIGH/MED/LOW |

**Summary**: {Key finding for this category}

---

#### Mother Nature (External/Timing)

| Potential Cause                | Evidence | Likelihood |
| ------------------------------ | -------- | ---------- |
| {Race condition}               | {proof}  | HIGH/MED/LOW |
| {Network latency/timeout}      | {proof}  | HIGH/MED/LOW |
| {External service failure}     | {proof}  | HIGH/MED/LOW |
| {Clock/timezone issue}         | {proof}  | HIGH/MED/LOW |

**Summary**: {Key finding for this category}

---

### Root Cause Summary

**Primary Root Cause**: {Main cause identified}
- Category: {which M}
- Evidence: {key proof}
- Confidence: HIGH | MEDIUM | LOW

**Contributing Factors**:
1. {Secondary cause 1} - {category}
2. {Secondary cause 2} - {category}

**Interaction Pattern**: {How the causes interact to produce the bug}
```

### Example: Intermittent Performance Bug

```markdown
### Fishbone (Ishikawa) Analysis

**Effect**: API response times spike to 10+ seconds intermittently during peak hours

---

#### Method (Process/Logic)

| Potential Cause                | Evidence        | Likelihood |
| ------------------------------ | --------------- | ---------- |
| N+1 query in user lookup       | Query logs show 100+ queries | HIGH |
| Inefficient pagination         | No evidence     | LOW |

**Summary**: N+1 query pattern confirmed in user lookup service

---

#### Machine (Infrastructure/Environment)

| Potential Cause                | Evidence        | Likelihood |
| ------------------------------ | --------------- | ---------- |
| Database connection exhaustion | Pool at 95% during spikes | HIGH |
| Memory pressure on API server  | Memory stable   | LOW |

**Summary**: Connection pool exhaustion correlates with slow responses

---

#### Material (Data/Input)

| Potential Cause                | Evidence        | Likelihood |
| ------------------------------ | --------------- | ---------- |
| Large result sets              | Some requests return 1000+ items | MEDIUM |
| Invalid cache data             | Cache hit rate normal | LOW |

**Summary**: Large result sets contribute but not primary cause

---

#### Man (Human/Code)

| Potential Cause                | Evidence        | Likelihood |
| ------------------------------ | --------------- | ---------- |
| Missing eager loading          | Code review confirms | HIGH |
| No query optimization          | No indexes on user_id | MEDIUM |

**Summary**: Missing eager loading and indexes

---

#### Measurement (Monitoring/Logging)

| Potential Cause                | Evidence        | Likelihood |
| ------------------------------ | --------------- | ---------- |
| Alert threshold too high       | Alerts only at 30s | MEDIUM |
| Missing slow query logging     | Not enabled     | HIGH |

**Summary**: Slow queries not being captured, alerts too late

---

#### Mother Nature (External/Timing)

| Potential Cause                | Evidence        | Likelihood |
| ------------------------------ | --------------- | ---------- |
| Traffic spike during lunch     | Usage patterns confirm | HIGH |
| DB replica lag                 | Replica lag < 10ms | LOW |

**Summary**: Traffic patterns correlate with incidents

---

### Root Cause Summary

**Primary Root Cause**: N+1 query pattern in user lookup service
- Category: Method (Process/Logic) + Man (Human/Code)
- Evidence: Query logs, code review, connection pool metrics
- Confidence: HIGH

**Contributing Factors**:
1. Database connection pool undersized for peak load - Machine
2. Missing eager loading in ORM queries - Man
3. Traffic spikes during lunch hours - Mother Nature

**Interaction Pattern**: N+1 queries exhaust connection pool during traffic spikes, causing cascading timeouts
```

### Tips for Effective Fishbone Analysis

| Tip                      | Description                                           |
| ------------------------ | ----------------------------------------------------- |
| **Cover all categories** | Even if you suspect one cause, check all 6Ms          |
| **Prioritize by evidence**| Focus on causes with strong evidence                 |
| **Look for interactions** | Complex bugs often result from multiple factors      |
| **Include unlikely causes**| Don't dismiss possibilities without checking        |
| **Document everything**  | Even ruled-out causes help future debugging          |

---

## Combining Techniques

### When to Use Both

Sometimes it's helpful to start with Fishbone to identify the category, then use 5 Whys to drill into the primary cause:

1. **Fishbone first**: Identify all potential causes across categories
2. **Prioritize**: Find the most likely primary cause
3. **5 Whys**: Deep dive into the primary cause
4. **Verify**: Check if secondary causes are also contributing

### Hybrid Template

```markdown
### Hybrid RCA: Fishbone + 5 Whys

#### Step 1: Fishbone Overview
{Quick assessment of all 6Ms - 1-2 potential causes each}

#### Step 2: Primary Cause Selection
Most likely category: {M category}
Primary suspect: {cause from that category}

#### Step 3: 5 Whys Deep Dive
{Apply 5 Whys to the primary suspect}

#### Step 4: Contributing Factors
{List secondary causes from other categories}

#### Step 5: Root Cause Synthesis
{Combine findings into comprehensive root cause statement}
```

---

## Quick Reference Cards

### 5 Whys Quick Card

```
Problem → Why? → Why? → Why? → Why? → Why? → ROOT CAUSE

Rules:
- One problem at a time
- Each answer must be specific and verifiable
- Stop when you can take action
- Support with evidence
```

### Fishbone 6Ms Quick Card

```
Method      → Logic, algorithms, workflows, business rules
Machine     → Servers, runtime, dependencies, configs
Material    → Input data, data quality, formats
Man         → Implementation errors, misunderstandings
Measurement → Logging, monitoring, test assumptions
Mother Nature → Timing, race conditions, external services
```

### Technique Selection Quick Card

```
Simple bug (score < 4)  → 5 Whys
- Single symptom
- Clear stack trace
- Reproducible 100%

Complex bug (score >= 4) → Fishbone
- Multiple symptoms
- Intermittent
- Multiple components
- Timing-related
```
