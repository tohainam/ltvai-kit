# Example Decisions

## Example 1: Simple Research

```
DISPATCH DECISION

Request: What is new in React 19?

---

Agent: researcher
Mode: single
Instances: 1
Strategy: none

---

Inputs:

[1]
Focus: React 19 features
Scope: Search for React 19 new features, changes, and updates

---

Aggregation Notes:
- Single agent, no aggregation needed

---

Reasoning: Simple focused request, single topic, one agent sufficient
```

## Example 2: Complex Research

```
DISPATCH DECISION

Request: Research latest Next.js 15 features including docs and community feedback

---

Agent: researcher
Mode: parallel
Instances: 3
Strategy: by_source

---

Inputs:

[1]
Focus: Official documentation
Scope: Query Context7 for Next.js 15 official docs and API changes

[2]
Focus: Release news
Scope: WebSearch for Next.js 15 release announcements and changelog

[3]
Focus: Community feedback
Scope: WebSearch for Next.js 15 reviews, issues, community discussions

---

Aggregation Notes:
- Prioritize official docs findings
- Include community sentiment summary
- Note any discrepancies between docs and community experience

---

Reasoning: User wants comprehensive view from multiple sources
```

## Example 3: Code Review

```
DISPATCH DECISION

Request: Review my staged changes thoroughly

---

Agent: reviewer
Mode: parallel
Instances: 3
Strategy: by_criteria

---

Inputs:

[1]
Focus: Security review
Scope: Check for vulnerabilities, injection risks, auth issues, data exposure

[2]
Focus: Performance review
Scope: Check for inefficiencies, memory leaks, O(n) issues, caching opportunities

[3]
Focus: Code quality review
Scope: Check naming, DRY, SOLID principles, readability, maintainability

---

Aggregation Notes:
- Merge all issues, sort by severity
- If any Critical from security = REQUEST CHANGES
- Combine statistics from all reviewers

---

Reasoning: User wants thorough review, split by criteria for comprehensive coverage
```

## Example 4: Codebase Search

```
DISPATCH DECISION

Request: Find all authentication related code

---

Agent: scouter
Mode: parallel
Instances: 3
Strategy: by_method

---

Inputs:

[1]
Focus: File names
Scope: Glob for *auth*, *login*, *session* in filenames

[2]
Focus: Code content
Scope: Grep for authenticate, authorization, token, jwt, session

[3]
Focus: Git history
Scope: Git log for commits mentioning auth, login, security

---

Aggregation Notes:
- Merge all file paths, dedupe
- Rank by number of methods that found the file
- Group by directory structure

---

Reasoning: Comprehensive search using all available methods
```

## Example 5: Debug Error

```
DISPATCH DECISION

Request: Debug this TypeError: Cannot read property 'map' of undefined

---

Agent: debugger
Mode: parallel
Instances: 3
Strategy: by_hypothesis

---

Inputs:

[1]
Focus: Data flow analysis
Scope: Trace where the array should come from, check API responses, state initialization

[2]
Focus: Async timing issues
Scope: Check if data is accessed before async operation completes, race conditions

[3]
Focus: Null/undefined handling
Scope: Check optional chaining, default values, null checks in the code path

---

Aggregation Notes:
- Compare hypotheses, find common evidence
- Prioritize fix that addresses root cause
- If multiple valid causes, list all with likelihood

---

Reasoning: TypeError with undefined typically has multiple possible causes, parallel hypothesis testing is efficient
```
