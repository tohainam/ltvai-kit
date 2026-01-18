---
title: /optimize-prompt
description: Optimize user prompts cho better AI responses
---

import { Aside, Tabs, TabItem } from "@astrojs/starlight/components";

## Overview

`/optimize-prompt` transform vague, unclear requests thành structured, effective prompts.

<Aside type="tip">
  Sử dụng `/optimize-prompt` khi prompts của bạn không giving expected results.
</Aside>

## When to Use

- Prompts **quá vague** hoặc generic
- Không getting **expected results**
- Muốn **learn better prompting** patterns
- Cần **structured, clear** requests

## Quick Start

```
/optimize-prompt make the app faster
```

Output:

```
Original: "make the app faster"

Optimized: "Analyze and optimize the performance of our React
application. Focus on:
1. Identifying render bottlenecks using React DevTools
2. Reducing bundle size through code splitting
3. Optimizing data fetching with caching strategies

Current symptoms: [describe specific slow areas]
Target: Improve Lighthouse Performance score from X to Y"

Recommended skill: /reviewing (for performance audit)
```

## Optimization Framework

### 1. Clarity

Transform vague → specific:

| Original | Optimized |
|----------|-----------|
| "fix the bug" | "Fix the login error where users see 'Invalid credentials' despite correct password" |
| "add feature" | "Add user notification preferences with email/push/in-app toggles" |
| "improve code" | "Refactor UserService to follow Single Responsibility Principle" |

### 2. Structure

Add organization:

```
Vague: "help with authentication"

Structured:
"Implement OAuth2 authentication:
- Providers: Google, GitHub
- Store: JWT in HTTP-only cookies
- Pages: Login, Callback, Logout
- Protect: /dashboard/* routes"
```

### 3. Context

Add necessary background:

```
Without context: "add dark mode"

With context:
"Add dark mode to the React dashboard:
- Current stack: Next.js 14, Tailwind CSS
- Design: Follow existing color tokens
- Persistence: localStorage
- Default: System preference"
```

## Examples

<Tabs>
  <TabItem label="Feature Request">
    **Original:**
    ```
    add search
    ```

    **Optimized:**
    ```
    Add search functionality to the product catalog:
    - Search fields: name, description, SKU
    - Features: autocomplete, recent searches
    - UI: Search bar in header, results dropdown
    - Performance: Debounce 300ms, cache results

    Tech stack: React, Elasticsearch backend
    ```

    **Recommended skill:** `/brainstorming`
  </TabItem>

  <TabItem label="Bug Report">
    **Original:**
    ```
    checkout broken
    ```

    **Optimized:**
    ```
    Debug checkout failure:
    - Symptom: "Payment failed" error after entering card
    - Steps: Add item → Cart → Checkout → Enter card → Submit
    - Environment: Production, Chrome, logged-in users
    - Started: After deploy on Jan 15

    Error in console: [paste error]
    ```

    **Recommended skill:** `/debugging`
  </TabItem>

  <TabItem label="Code Quality">
    **Original:**
    ```
    code is messy
    ```

    **Optimized:**
    ```
    Refactor OrderService.ts:
    - Current issues: 800 lines, mixed responsibilities
    - Goal: Split into focused services
    - Preserve: All existing functionality
    - Tests: Maintain green test suite

    Priority: High - blocking new feature development
    ```

    **Recommended skill:** `/refactoring`
  </TabItem>

  <TabItem label="Review Request">
    **Original:**
    ```
    check my code
    ```

    **Optimized:**
    ```
    Review the authentication module (src/auth/*):
    - Focus: Security vulnerabilities
    - Check: Input validation, token handling, session management
    - Context: Handling PII, GDPR compliance required

    Recent changes: Added "Remember me" feature
    ```

    **Recommended skill:** `/reviewing`
  </TabItem>
</Tabs>

## Skill Recommendations

Based on optimized prompt, Claude suggests appropriate skill:

| Intent | Recommended Skill |
|--------|-------------------|
| New feature, design | `/brainstorming` |
| Bug, error, issue | `/debugging` |
| Code quality, refactor | `/refactoring` |
| Review, audit | `/reviewing` |
| Execute spec | `/implementing` |
| Discuss options | `/discuss` |

## Output Format

```markdown
## Prompt Optimization

**Original:** [user's original prompt]

**Issues identified:**
- [issue 1]
- [issue 2]

**Optimized prompt:**
[improved version with clarity, structure, context]

**Recommended skill:** [skill] because [reason]

**Tips for next time:**
- [tip 1]
- [tip 2]
```

## Prompting Principles

### Be Specific

```
Bad:  "help with database"
Good: "Optimize slow queries on the orders table affecting checkout"
```

### Provide Context

```
Bad:  "add validation"
Good: "Add form validation to registration (React Hook Form, Zod schema)"
```

### State Desired Outcome

```
Bad:  "fix performance"
Good: "Reduce page load time from 4s to under 2s"
```

### Mention Constraints

```
Bad:  "new feature"
Good: "Add export feature - must work with existing PDF library, deadline Friday"
```

## Best Practices

1. **Start Vague, End Specific**: Use this command to refine
2. **Learn Patterns**: Notice what makes prompts better
3. **Iterate**: Run multiple times if needed
4. **Apply Learning**: Use patterns in future prompts

## Troubleshooting

### Optimization không helpful

- Add more context about your situation
- Specify what you're trying to achieve
- Share relevant code snippets

### Skill recommendation wrong

- Clarify your intent
- Mention if you want to discuss vs implement

## Related

- [/discuss](/commands/discuss/) - Explore ideas before prompting
- [Skills Overview](/skills/) - All available skills
- [Quick Start](/getting-started/quick-start/) - Using skills effectively
