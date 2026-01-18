# Execution Strategies

Detailed execution logic for each spec_type.

---

## Strategy: brainstorming

**Purpose**: Create new features from scratch based on architecture design.

### Primary Sections to Parse

| Section | Purpose |
|---------|---------|
| Implementation Tasks | Task checklist to execute |
| Architecture Diagram | System structure reference |
| Data Models | TypeScript/schema definitions |
| API Contracts | Endpoint specifications |

### Execution Flow

```
1. Parse Implementation Tasks section
2. For each task:
   a. Read related architecture/data model sections
   b. Create directories if needed
   c. Write new files following architecture
   d. Implement features matching data models
   e. Mark checkbox [x] when complete
3. Verify all components match architecture diagram
```

### Key Actions

- **Create directories**: Match project structure from architecture
- **Write new files**: Implement components, services, models
- **Implement features**: Follow API contracts and data models
- **Connect components**: Wire up according to architecture diagram

### Example Task Execution

```markdown
Spec Task: [ ] Implement user registration endpoint

Actions:
1. Read API Contracts for POST /api/users
2. Read Data Models for User interface
3. Create src/api/users/register.ts
4. Implement validation, hashing, database insert
5. Mark: [x] Implement user registration endpoint
```

---

## Strategy: reviewing

**Purpose**: Fix code issues identified in code review.

### Primary Sections to Parse

| Section | Priority | Action |
|---------|----------|--------|
| MUST FIX NOW | CRITICAL | Fix immediately |
| FIX BEFORE MERGE | HIGH | Fix before completion |
| CONSIDER FIXING | MEDIUM | Skip (optional) |
| MINOR SUGGESTIONS | LOW | Skip (optional) |

### Execution Flow

```
1. Parse MUST FIX NOW section
2. For each CRITICAL issue:
   a. Read issue description and location
   b. Apply recommended fix
   c. Mark checkbox [x]
3. Parse FIX BEFORE MERGE section
4. For each HIGH issue:
   a. Apply fix
   b. Mark checkbox [x]
5. SKIP MEDIUM and LOW issues unless user requests
```

### Key Actions

- **Fix security issues**: SQL injection, XSS, auth bypasses
- **Fix correctness bugs**: Logic errors, null checks
- **Fix performance issues**: N+1 queries, memory leaks
- **Skip style issues**: Let quality checks handle formatting

### Example Task Execution

```markdown
Spec Issue: [ ] [CRITICAL] SQL injection in user query (src/db/users.ts:45)

Actions:
1. Navigate to src/db/users.ts line 45
2. Replace string concatenation with parameterized query
3. Verify fix prevents injection
4. Mark: [x] [CRITICAL] SQL injection in user query
```

---

## Strategy: refactoring

**Purpose**: Improve code structure while preserving behavior.

### Primary Sections to Parse

| Section | Purpose |
|---------|---------|
| Migration Plan | Step-by-step refactoring guide |
| Characterization Tests | Tests to verify behavior preservation |
| Rollback Plan | How to revert if issues occur |
| Target Patterns | Design patterns to apply |

### Execution Flow

```
1. Run characterization tests (if exist) - establish baseline
2. Parse Migration Plan section
3. For each migration step:
   a. Read step description
   b. Apply refactoring transformation
   c. Run characterization tests
   d. If tests fail: check Rollback Plan
   e. If tests pass: mark checkbox [x]
4. Verify final state matches Target Patterns
```

### Key Actions

- **Run baseline tests**: Ensure current behavior is captured
- **Apply transformations**: Extract, rename, move, inline
- **Verify after each step**: Run tests to confirm behavior preserved
- **Rollback if needed**: Use Rollback Plan for recovery

### Example Task Execution

```markdown
Spec Step: [ ] Extract payment processing into PaymentService class

Actions:
1. Run existing tests: npm test -- --grep "payment"
2. Create src/services/PaymentService.ts
3. Move processPayment, validatePayment, refundPayment methods
4. Update imports in original file
5. Run tests again - verify all pass
6. Mark: [x] Extract payment processing into PaymentService class
```

---

## Strategy: debugging

**Purpose**: Implement fix for identified bug.

### Primary Sections to Parse

| Section | Purpose |
|---------|---------|
| Root Cause Analysis | Understanding of why bug occurs |
| Fix Strategy | Recommended fix approach (FIX-001, etc.) |
| Verification Criteria | How to verify fix works |
| Reproduction Steps | Test cases to verify |

### Execution Flow

```
1. Read Root Cause Analysis to understand bug
2. Parse Fix Strategy section
3. Implement recommended fix (usually FIX-001):
   a. Navigate to affected code
   b. Apply fix as described
   c. Handle edge cases mentioned
4. Run Verification Criteria:
   a. Execute each verification step
   b. Confirm expected behavior
5. Run Reproduction Steps:
   a. Verify bug no longer reproduces
6. Mark all checkboxes [x]
```

### Key Actions

- **Understand root cause**: Read RCA before fixing
- **Apply targeted fix**: Implement FIX-001 recommendation
- **Verify fix works**: Run all verification criteria
- **Confirm no regression**: Check reproduction steps fail (bug gone)

### Example Task Execution

```markdown
Spec Fix: FIX-001: Add null check before accessing user.email

Actions:
1. Read RCA: Bug occurs when user object is null
2. Navigate to src/utils/email.ts:23
3. Add: if (!user?.email) return null;
4. Run verification:
   - Send email with valid user: PASS
   - Send email with null user: PASS (no crash)
5. Run reproduction:
   - Original crash scenario: No longer crashes
6. Mark: [x] Implement FIX-001
```

---

## Checkbox Update Pattern

After completing each task, update the spec file:

```markdown
Before: - [ ] Task description
After:  - [x] Task description
```

Use Edit tool:
```
old_string: "- [ ] Task description"
new_string: "- [x] Task description"
```

---

## Common Patterns Across Strategies

### Reading Related Files

Before implementing, always read:
1. Files mentioned in `related_files` frontmatter
2. Files referenced in task description
3. Existing code in same directory

### Creating New Files

Follow project conventions:
1. Check existing file naming patterns
2. Use appropriate file extension
3. Add necessary imports
4. Follow existing code style

### Modifying Existing Files

Use Edit tool with:
1. Minimal `old_string` for uniqueness
2. Preserve surrounding context
3. Maintain indentation
4. Update related imports if needed
