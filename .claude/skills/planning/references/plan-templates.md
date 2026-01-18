# Plan Output Format Templates

This document defines the standard format for displaying plans in conversation.

---

## Standard Plan Template

```markdown
## PLAN: {Title}

**Objective**: {Clear, concise statement of what will be achieved}
**Source**: {Standalone | Spec: path/to/file.md}
**Complexity**: {simple | moderate | complex}

---

### Phase 1: {Phase Name}

| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 1.1 | {task description} | {High/Medium/Low} | {time} | {task refs or -} |
| 1.2 | {task description} | {High/Medium/Low} | {time} | {task refs or -} |

### Phase 2: {Phase Name}

| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 2.1 | {task description} | {High/Medium/Low} | {time} | {task refs or -} |

[Continue for all phases...]

---

### Summary

- **Total Tasks**: {N}
- **Phases**: {X}
- **Critical Path**: {sequence of critical task numbers}

### Risks

- {Risk description}: {Mitigation strategy}
```

**IMPORTANT**: After displaying plan, IMMEDIATELY use AskUserQuestion tool for approval.

---

## Field Descriptions

### Header Fields

| Field | Description | Example |
|-------|-------------|---------|
| Title | Concise plan name | "REST API Authentication" |
| Objective | What will be achieved | "Implement secure JWT auth" |
| Source | Where input came from | "Standalone" or "Spec: path.md" |
| Complexity | Effort assessment | "simple", "moderate", "complex" |

### Task Table Fields

| Column | Description | Values |
|--------|-------------|--------|
| # | Task ID (phase.sequence) | 1.1, 1.2, 2.1, etc. |
| Task | Task description (imperative) | "Create database schema" |
| Priority | Task importance | High, Medium, Low |
| Est. | Time estimate | 30m, 1h, 2h, 1d, etc. |
| Dependencies | Required prior tasks | "1.1", "1.1, 1.2", or "-" |

### Priority Guidelines

| Priority | Criteria |
|----------|----------|
| **High** | Blocking other tasks, critical path, security-related |
| **Medium** | Important but not blocking, adds significant value |
| **Low** | Nice-to-have, can be deferred, polish items |

### Complexity Levels

| Level | Tasks | Phases | Typical Scope |
|-------|-------|--------|---------------|
| Simple | < 5 | 1-2 | Single feature, minor fix |
| Moderate | 5-15 | 2-4 | Multi-component feature |
| Complex | > 15 | 4+ | System-wide changes |

---

## Example: Simple Plan

```markdown
## PLAN: Add Password Reset

**Objective**: Implement forgot password flow with email verification
**Source**: Standalone
**Complexity**: Simple

---

### Phase 1: Implementation

| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 1.1 | Create reset token model | High | 30m | - |
| 1.2 | Add reset password endpoint | High | 1h | 1.1 |
| 1.3 | Integrate email service | Medium | 1h | 1.2 |
| 1.4 | Add unit tests | Medium | 30m | 1.3 |

---

### Summary

- **Total Tasks**: 4
- **Phases**: 1
- **Critical Path**: 1.1 → 1.2 → 1.3 → 1.4

### Risks

- Email delivery: Use transactional email service with retry
```

→ **Next**: Use AskUserQuestion tool for approval

---

## Example: Moderate Plan

```markdown
## PLAN: User Dashboard Feature

**Objective**: Create user dashboard with activity metrics and quick actions
**Source**: Spec: .claude/.specs/brainstorming-dashboard-1801261500.md
**Complexity**: Moderate

---

### Phase 1: Data Layer

| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 1.1 | Define dashboard metrics schema | High | 1h | - |
| 1.2 | Create metrics aggregation queries | High | 2h | 1.1 |
| 1.3 | Add caching layer | Medium | 1h | 1.2 |

### Phase 2: API Layer

| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 2.1 | Create dashboard API endpoints | High | 2h | 1.2 |
| 2.2 | Add response DTOs | Medium | 30m | 2.1 |
| 2.3 | Implement rate limiting | Low | 1h | 2.1 |

### Phase 3: Frontend

| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 3.1 | Create dashboard layout component | High | 2h | 2.1 |
| 3.2 | Implement metrics widgets | High | 3h | 3.1 |
| 3.3 | Add quick action buttons | Medium | 1h | 3.1 |
| 3.4 | Implement loading states | Medium | 30m | 3.2 |

### Phase 4: Testing

| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 4.1 | Write API integration tests | High | 2h | 2.2 |
| 4.2 | Add component unit tests | Medium | 2h | 3.4 |
| 4.3 | E2E dashboard flow test | Low | 1h | 4.2 |

---

### Summary

- **Total Tasks**: 13
- **Phases**: 4
- **Critical Path**: 1.1 → 1.2 → 2.1 → 3.1 → 3.2 → 4.2

### Risks

- Data volume: Implement pagination and time-range filters
- Performance: Use caching and consider async loading
```

→ **Next**: Use AskUserQuestion tool for approval

---

## Example: Complex Plan

```markdown
## PLAN: Multi-tenant Architecture Migration

**Objective**: Migrate from single-tenant to multi-tenant architecture
**Source**: Spec: .claude/.specs/refactoring-multitenant-1801261530.md
**Complexity**: Complex

---

### Phase 1: Foundation

| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 1.1 | Create tenant model and migrations | High | 2h | - |
| 1.2 | Implement tenant context middleware | High | 3h | 1.1 |
| 1.3 | Add tenant isolation utilities | High | 2h | 1.2 |

### Phase 2: Data Layer Migration

| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 2.1 | Add tenant_id to all entities | High | 4h | 1.3 |
| 2.2 | Update all repositories | High | 4h | 2.1 |
| 2.3 | Create data migration scripts | High | 3h | 2.2 |
| 2.4 | Add database-level RLS policies | Medium | 2h | 2.1 |

### Phase 3: API Layer Updates

| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 3.1 | Update all controllers | High | 4h | 2.2 |
| 3.2 | Add tenant validation | High | 2h | 3.1 |
| 3.3 | Update authentication flow | High | 3h | 3.1 |
| 3.4 | Add cross-tenant prevention | High | 2h | 3.2 |

### Phase 4: Background Jobs

| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 4.1 | Update job queue for tenancy | High | 2h | 2.2 |
| 4.2 | Add tenant context to workers | High | 2h | 4.1 |
| 4.3 | Update scheduled tasks | Medium | 1h | 4.2 |

### Phase 5: Testing & Validation

| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 5.1 | Create tenant isolation tests | High | 3h | 3.4 |
| 5.2 | Update existing test suites | High | 4h | 5.1 |
| 5.3 | Add cross-tenant security tests | High | 2h | 5.1 |
| 5.4 | Performance regression tests | Medium | 2h | 5.2 |

### Phase 6: Deployment

| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 6.1 | Create rollback strategy | High | 1h | 5.3 |
| 6.2 | Write deployment runbook | High | 1h | 6.1 |
| 6.3 | Execute data migration | High | 2h | 6.2 |
| 6.4 | Monitor and validate | High | 2h | 6.3 |

---

### Summary

- **Total Tasks**: 22
- **Phases**: 6
- **Critical Path**: 1.1 → 1.2 → 1.3 → 2.1 → 2.2 → 3.1 → 5.1 → 5.3 → 6.3 → 6.4

### Risks

- Data migration: Run in batches with checkpoints
- Downtime: Use blue-green deployment
- Security: Extensive isolation testing required
- Rollback: Keep single-tenant code path until validated
```

→ **Next**: Use AskUserQuestion tool for approval

---

## Approval via AskUserQuestion

After displaying plan, **ALWAYS** use AskUserQuestion tool. **NEVER** use text-based "yes/no" prompts.

```yaml
question: "Bạn muốn tạo todos từ plan này không?"
header: "Plan Approval"
multiSelect: false
options:
  - label: "Yes, create todos"
    description: "Convert plan to TodoWrite items and start working"
  - label: "No, revise plan"
    description: "I have changes or want to discuss first"
```

This triggers Phase 3 approval flow in the skill.
