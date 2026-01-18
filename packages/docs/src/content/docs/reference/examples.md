---
title: Examples
description: Real-world examples và common workflows
---

import { Aside, Tabs, TabItem, Steps } from "@astrojs/starlight/components";

## Overview

Các examples thực tế về cách sử dụng ltvai-kit trong daily development.

## Complete Workflows

### New Feature: User Authentication

<Steps>

1. **Brainstorm the feature**

   ```
   /brainstorming Add OAuth2 authentication with Google and GitHub providers
   ```

   Output: `brainstorming-oauth2-auth-1801261400.md`

   Spec contains:
   - Architecture diagram
   - OAuth flow sequence
   - Data models (User, Session, Provider)
   - Implementation tasks

2. **Review the spec** (optional)

   Read through `.claude/.specs/brainstorming-oauth2-auth-1801261400.md`

   Check:
   - Architecture makes sense
   - Tasks are complete
   - No missing requirements

3. **Implement**

   ```
   /implementing oauth2 authentication
   ```

   Claude will:
   - Create auth module structure
   - Implement OAuth providers
   - Add session management
   - Create UI components

4. **Review implementation**

   ```
   /reviewing Check the new auth module for security issues
   ```

   Get:
   - Security score
   - Vulnerability findings
   - Recommendations

</Steps>

### Bug Fix: Payment Failure

<Steps>

1. **Debug the issue**

   ```
   /debugging Payment fails with "Invalid card" error despite valid card numbers
   ```

   Output: `debugging-payment-invalid-card-1801261500.md`

   Spec contains:
   - Reproduction steps
   - Root cause analysis
   - Fix options

2. **Review RCA**

   Check the Root Cause Analysis:
   - Is the root cause identified?
   - Are fix options viable?
   - Any risks to consider?

3. **Implement fix**

   ```
   /implementing payment invalid card bug
   ```

   Claude will:
   - Apply recommended fix
   - Run verification steps
   - Update spec status

4. **Verify fix**

   Test the payment flow manually to confirm fix works.

</Steps>

### Code Quality: Refactor Service

<Steps>

1. **Analyze code smells**

   ```
   /refactoring The OrderService has grown too large with 1500 lines
   ```

   Output: `refactoring-orderservice-decomposition-1801261600.md`

   Spec contains:
   - Smell catalog
   - Migration plan
   - Characterization tests

2. **Review migration plan**

   Check:
   - Is the plan safe?
   - Are tests adequate?
   - Can we roll back if needed?

3. **Implement refactoring**

   ```
   /implementing orderservice decomposition
   ```

   Claude will:
   - Follow migration plan
   - Keep tests GREEN
   - Split into focused services

4. **Verify behavior**

   Run full test suite to ensure behavior preserved.

</Steps>

## Quick Examples

### Feature Development

<Tabs>
  <TabItem label="Simple Feature">
    ```
    /brainstorming Add a "Remember Me" checkbox to login form
    ```

    Quick, focused spec for small feature.
  </TabItem>

  <TabItem label="Complex Feature">
    ```
    /brainstorming Design a real-time notification system with:
    - WebSocket connection management
    - Notification preferences per user
    - Push notifications for mobile
    - In-app notification center
    ```

    Comprehensive spec with architecture.
  </TabItem>

  <TabItem label="API Design">
    ```
    /brainstorming Design REST API endpoints for product management:
    - CRUD operations
    - Filtering and pagination
    - Bulk operations
    - Versioning strategy
    ```

    API-focused spec with contracts.
  </TabItem>
</Tabs>

### Bug Investigation

<Tabs>
  <TabItem label="Runtime Error">
    ```
    /debugging App crashes with "Cannot read property 'map' of undefined"
    when loading dashboard after logout
    ```

    Stack trace analysis.
  </TabItem>

  <TabItem label="Logic Bug">
    ```
    /debugging Cart total shows wrong amount when applying discount
    code twice in succession
    ```

    Business logic investigation.
  </TabItem>

  <TabItem label="Performance">
    ```
    /debugging Dashboard takes 10+ seconds to load after
    adding the new analytics charts
    ```

    Performance profiling.
  </TabItem>
</Tabs>

### Code Review

<Tabs>
  <TabItem label="PR Review">
    ```
    /reviewing Review PR #234 adding user profile editing
    ```

    Full code review with scores.
  </TabItem>

  <TabItem label="Security Audit">
    ```
    /reviewing Security audit the authentication and
    authorization modules
    ```

    Security-focused review.
  </TabItem>

  <TabItem label="Quality Check">
    ```
    /reviewing Check code quality of the new payment
    integration before release
    ```

    Pre-release quality gate.
  </TabItem>
</Tabs>

### Refactoring

<Tabs>
  <TabItem label="God Class">
    ```
    /refactoring UserController has 2000 lines handling
    auth, profile, settings, and notifications
    ```

    Split into focused controllers.
  </TabItem>

  <TabItem label="Duplication">
    ```
    /refactoring Similar validation logic repeated in
    RegisterForm, ProfileForm, and SettingsForm
    ```

    Extract shared validator.
  </TabItem>

  <TabItem label="Coupling">
    ```
    /refactoring PaymentService directly accesses OrderService
    and UserService internals
    ```

    Introduce interfaces.
  </TabItem>
</Tabs>

## Utility Skills Examples

### UI/UX Design

```
/ui-ux-pro-max Design a dashboard for SaaS analytics product with:
- Dark mode default
- Data visualization focus
- Responsive for tablet
```

### Diagrams

```
/mermaidjs-v11 Create a sequence diagram for the checkout flow:
User → Cart → Checkout → Payment → Confirmation
```

### React Optimization

```
/react-best-practices Review this component:

function ProductList({ category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/products?cat=${category}`)
      .then(r => r.json())
      .then(setProducts);
  }, [category]);

  return products.map(p => <ProductCard key={p.id} product={p} />);
}
```

## Command Examples

### Discuss Ideas

```
/discuss Should we use a monorepo or multiple repos for our
microservices architecture?
```

### Optimize Prompts

```
/optimize-prompt make the app better
```

Output:
```
Optimized: "Improve application performance focusing on:
1. Initial load time (target: under 3s)
2. Time to interactive (target: under 5s)
3. Core Web Vitals compliance

Current metrics: [provide baseline]
Priority areas: [list specific pages]"

Recommended skill: /reviewing for performance audit
```

## Integration Patterns

### CI/CD Integration

```yaml
# .github/workflows/review.yml
on:
  pull_request:

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Code Review
        run: |
          claude /reviewing Review changes in this PR
```

### Pre-commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Run format check
claude /reviewing --quick Check staged files for issues
```

### VS Code Task

```json
// .vscode/tasks.json
{
  "tasks": [
    {
      "label": "Brainstorm Feature",
      "type": "shell",
      "command": "claude",
      "args": ["/brainstorming", "${input:featureDescription}"]
    }
  ]
}
```

## Tips và Tricks

### Effective Prompts

<Aside type="tip">
  Cung cấp context đầy đủ để get better results.
</Aside>

**Good:**
```
/brainstorming Add user notification preferences:
- Email digest frequency (daily/weekly/never)
- Push notification categories
- In-app notification settings
- Integration with existing UserSettings model
```

**Less Good:**
```
/brainstorming Add notifications
```

### Chaining Skills

```
1. /discuss (clarify requirements)
      ↓
2. /brainstorming (create spec)
      ↓
3. /reviewing (review spec/code)
      ↓
4. /implementing (execute)
      ↓
5. /refactoring (if needed)
```

### Iterating on Specs

Nếu spec chưa đúng:

```
1. Read spec file
2. Identify issues
3. Run skill again với refined prompt
4. OR manually edit spec file
```

## Related

- [Quick Start](/getting-started/quick-start/) - Get started fast
- [Workflow](/getting-started/workflow/) - Understand the flow
- [Skills Overview](/skills/) - All available skills
