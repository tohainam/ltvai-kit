# TodoWrite Conversion Patterns

This document defines how to convert plan tasks into TodoWrite items.

---

## TodoWrite Schema

```typescript
interface TodoItem {
  content: string;      // "[Phase X] Task description"
  status: string;       // "pending" | "in_progress" | "completed"
  activeForm: string;   // "Working on: Task description"
}
```

---

## Conversion Rules

### Rule 1: Content Formatting

Prefix task with phase number in brackets:

```
Plan Task: "Create database schema"
Phase: 1
→ content: "[Phase 1] Create database schema"
```

### Rule 2: Status Assignment

- **First task**: `status: "in_progress"`
- **All other tasks**: `status: "pending"`

### Rule 3: ActiveForm Generation

Convert to present participle form:

```
Task: "Create database schema"
→ activeForm: "Creating database schema"

Task: "Add unit tests"
→ activeForm: "Adding unit tests"

Task: "Configure dependencies"
→ activeForm: "Configuring dependencies"
```

**Common verb transformations:**

| Imperative | Present Participle |
|------------|-------------------|
| Create | Creating |
| Add | Adding |
| Update | Updating |
| Implement | Implementing |
| Configure | Configuring |
| Write | Writing |
| Fix | Fixing |
| Refactor | Refactoring |
| Remove | Removing |
| Integrate | Integrating |

---

## Sliding Window Pattern

### Maximum 5 Items Visible

TodoWrite should display at most 5 items at any time:

```
IF total_tasks <= 5:
  Show all tasks
ELSE:
  Show first 5 tasks only
  As tasks complete, slide window forward
```

### Window Behavior

**Initial State (8 total tasks):**
```javascript
TodoWrite([
  { content: "[Phase 1] Task 1", status: "in_progress", activeForm: "Working on Task 1" },
  { content: "[Phase 1] Task 2", status: "pending", activeForm: "Working on Task 2" },
  { content: "[Phase 1] Task 3", status: "pending", activeForm: "Working on Task 3" },
  { content: "[Phase 2] Task 4", status: "pending", activeForm: "Working on Task 4" },
  { content: "[Phase 2] Task 5", status: "pending", activeForm: "Working on Task 5" }
  // Tasks 6, 7, 8 not visible yet
])
```

**After Task 1 Completed:**
```javascript
TodoWrite([
  { content: "[Phase 1] Task 1", status: "completed", activeForm: "Completed Task 1" },
  { content: "[Phase 1] Task 2", status: "in_progress", activeForm: "Working on Task 2" },
  { content: "[Phase 1] Task 3", status: "pending", activeForm: "Working on Task 3" },
  { content: "[Phase 2] Task 4", status: "pending", activeForm: "Working on Task 4" },
  { content: "[Phase 2] Task 5", status: "pending", activeForm: "Working on Task 5" }
])
```

**After Task 2 Completed (window slides):**
```javascript
TodoWrite([
  { content: "[Phase 1] Task 2", status: "completed", activeForm: "Completed Task 2" },
  { content: "[Phase 1] Task 3", status: "in_progress", activeForm: "Working on Task 3" },
  { content: "[Phase 2] Task 4", status: "pending", activeForm: "Working on Task 4" },
  { content: "[Phase 2] Task 5", status: "pending", activeForm: "Working on Task 5" },
  { content: "[Phase 2] Task 6", status: "pending", activeForm: "Working on Task 6" }
  // Task 1 removed, Task 6 added
])
```

### Window Rules

1. **Always show current task** as `in_progress`
2. **Keep 1-2 completed tasks** for context
3. **Show upcoming pending tasks** to fill window
4. **Maintain max 5 items** at all times
5. **Slide window** as tasks complete

---

## Full Conversion Example

### Input Plan

```markdown
## PLAN: User Authentication

### Phase 1: Setup
| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 1.1 | Create auth module | High | 1h | - |
| 1.2 | Configure JWT | High | 30m | 1.1 |

### Phase 2: Implementation
| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 2.1 | Implement register | High | 2h | 1.2 |
| 2.2 | Implement login | High | 2h | 2.1 |
| 2.3 | Add token refresh | Medium | 1h | 2.2 |

### Phase 3: Testing
| # | Task | Priority | Est. | Dependencies |
|---|------|----------|------|--------------|
| 3.1 | Write unit tests | Medium | 2h | 2.3 |
| 3.2 | Add integration tests | Medium | 2h | 3.1 |
```

### Output TodoWrite (Initial)

```javascript
TodoWrite([
  {
    content: "[Phase 1] Create auth module",
    status: "in_progress",
    activeForm: "Creating auth module"
  },
  {
    content: "[Phase 1] Configure JWT",
    status: "pending",
    activeForm: "Configuring JWT"
  },
  {
    content: "[Phase 2] Implement register",
    status: "pending",
    activeForm: "Implementing register"
  },
  {
    content: "[Phase 2] Implement login",
    status: "pending",
    activeForm: "Implementing login"
  },
  {
    content: "[Phase 2] Add token refresh",
    status: "pending",
    activeForm: "Adding token refresh"
  }
])
// Tasks 3.1 and 3.2 not visible (sliding window)
```

---

## Task Completion Pattern

When completing a task:

1. Mark current task as `completed`
2. Move next pending task to `in_progress`
3. If window has room, add next hidden task
4. If window full, remove oldest completed task

```javascript
// Before: Task 1 in progress
TodoWrite([
  { content: "[Phase 1] Task 1", status: "in_progress", ... },
  { content: "[Phase 1] Task 2", status: "pending", ... },
  ...
])

// After: Task 1 completed
TodoWrite([
  { content: "[Phase 1] Task 1", status: "completed", ... },
  { content: "[Phase 1] Task 2", status: "in_progress", ... },
  ...
])
```

---

## Special Cases

### Single Task

```javascript
TodoWrite([
  {
    content: "[Phase 1] Single task",
    status: "in_progress",
    activeForm: "Working on single task"
  }
])
```

### All Tasks Same Phase

Still prefix with phase for consistency:

```javascript
TodoWrite([
  { content: "[Phase 1] First task", status: "in_progress", ... },
  { content: "[Phase 1] Second task", status: "pending", ... },
  { content: "[Phase 1] Third task", status: "pending", ... }
])
```

### Long Task Descriptions

Truncate if needed, keep essential info:

```
Original: "Implement user authentication with JWT tokens, bcrypt password hashing, and refresh token rotation"
Truncated: "[Phase 2] Implement JWT auth with password hashing"
```

---

## Confirmation Message

After creating TodoWrite, display:

```
Plan converted to {N} tasks. Starting with:

**Current Task**: [Phase {X}] {first task description}

Progress will be tracked in the todo list. Let's begin!
```
