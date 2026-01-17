# Code Quality Checklist

## Overview

This checklist covers Performance, Maintainability, Readability, and Test Coverage dimensions. Use during Phase 2 (Performance Track, Quality Track, Coverage Track) of the reviewing process.

---

## Performance Track

### Database & Query Patterns

| Pattern | Severity | Description | Solution |
| ------- | -------- | ----------- | -------- |
| N+1 Query | HIGH | Loop with individual queries | Use eager loading, batch queries |
| Missing Index | HIGH | Slow queries on large tables | Add appropriate indexes |
| SELECT * | MEDIUM | Fetching unnecessary columns | Select only needed columns |
| Unbounded Query | CRITICAL | Query without LIMIT on large data | Add pagination/limits |
| Nested Loops on DB | CRITICAL | O(n²) database operations | Restructure with JOINs |

**Example - N+1 Query:**

```javascript
// BAD: N+1 query pattern
const users = await User.findAll();
for (const user of users) {
  user.posts = await Post.findAll({ where: { userId: user.id } });
}

// GOOD: Eager loading
const users = await User.findAll({
  include: [{ model: Post }],
});
```

### Algorithm Complexity

| Pattern | Severity | Description | Solution |
| ------- | -------- | ----------- | -------- |
| Nested Loops | HIGH | O(n²) on large datasets | Use hash maps, optimize algorithm |
| Repeated Calculations | MEDIUM | Same computation multiple times | Cache/memoize results |
| Inefficient Search | MEDIUM | Linear search on sorted data | Use binary search |
| Large Array Operations | MEDIUM | Multiple passes over large arrays | Combine operations |

### Memory Management

| Pattern | Severity | Description | Solution |
| ------- | -------- | ----------- | -------- |
| Memory Leak | CRITICAL | Objects not garbage collected | Clear references, use WeakMap |
| Large Objects in Memory | HIGH | Loading entire file/dataset | Stream processing |
| Circular References | MEDIUM | Objects referencing each other | Break cycles, use WeakRef |
| Event Listener Leak | HIGH | Listeners not removed | Clean up in componentWillUnmount |

### Caching & Optimization

| Pattern | Severity | Description | Solution |
| ------- | -------- | ----------- | -------- |
| No Caching | MEDIUM | Repeated expensive operations | Add caching layer |
| Cache Invalidation | MEDIUM | Stale cache data | Implement proper invalidation |
| Missing Memoization | LOW | Pure function called repeatedly | Add useMemo/useCallback |

---

## Maintainability Track (SOLID & Code Smells)

### SOLID Principles

#### Single Responsibility (S)

| Pattern | Severity | Description |
| ------- | -------- | ----------- |
| God Class | CRITICAL | Class with too many responsibilities |
| Mixed Concerns | HIGH | Business logic mixed with I/O |
| Feature Envy | MEDIUM | Method uses more of another class |

**Example:**

```javascript
// BAD: Multiple responsibilities
class UserService {
  createUser(data) { /* ... */ }
  sendEmail(user, template) { /* ... */ }
  generateReport(users) { /* ... */ }
  validateCreditCard(card) { /* ... */ }
}

// GOOD: Single responsibility
class UserService {
  createUser(data) { /* ... */ }
}
class EmailService {
  send(to, template) { /* ... */ }
}
```

#### Open/Closed (O)

| Pattern | Severity | Description |
| ------- | -------- | ----------- |
| Switch on Type | MEDIUM | Giant switch statements for types |
| Hard-coded Conditions | MEDIUM | If-else chains for variations |

#### Liskov Substitution (L)

| Pattern | Severity | Description |
| ------- | -------- | ----------- |
| Broken Inheritance | HIGH | Subclass breaks parent contract |
| Overridden Methods That Throw | HIGH | Child throws when parent doesn't |

#### Interface Segregation (I)

| Pattern | Severity | Description |
| ------- | -------- | ----------- |
| Fat Interface | MEDIUM | Interface with too many methods |
| Unused Dependencies | LOW | Implementing unused interface methods |

#### Dependency Inversion (D)

| Pattern | Severity | Description |
| ------- | -------- | ----------- |
| Hard-coded Dependencies | HIGH | `new Dependency()` inside class |
| Tight Coupling | HIGH | Direct dependency on concrete classes |

### Common Code Smells

| Smell | Severity | Description | Solution |
| ----- | -------- | ----------- | -------- |
| Long Method | MEDIUM | Method > 20-30 lines | Extract smaller methods |
| Long Parameter List | MEDIUM | Function with > 4 parameters | Use parameter object |
| Duplicate Code | HIGH | Same code in multiple places | Extract to shared function |
| Magic Numbers | MEDIUM | Hard-coded values without names | Use named constants |
| Dead Code | LOW | Unreachable or unused code | Remove it |
| Comments Explaining Bad Code | MEDIUM | Comments instead of clarity | Refactor the code |
| Deep Nesting | MEDIUM | > 3 levels of nesting | Early returns, extract methods |
| Large Class | HIGH | Class with > 300 lines | Split into smaller classes |
| Primitive Obsession | MEDIUM | Using primitives for domain concepts | Create value objects |

---

## Readability Track

### Naming Conventions

| Pattern | Severity | Description | Solution |
| ------- | -------- | ----------- | -------- |
| Single Letter Variables | HIGH | `x`, `y`, `a` (except loops) | Use descriptive names |
| Misleading Names | HIGH | Name doesn't match behavior | Rename to match purpose |
| Abbreviations | MEDIUM | `usr`, `mgr`, `btn` | Use full words |
| Inconsistent Naming | MEDIUM | Mixed styles in codebase | Follow established conventions |
| Generic Names | LOW | `data`, `info`, `temp` | Be more specific |

**Naming Guidelines:**

```javascript
// BAD
const d = new Date();
const u = getUser();
function proc(x) { /* ... */ }

// GOOD
const createdAt = new Date();
const currentUser = getUser();
function processPayment(order) { /* ... */ }
```

### Code Structure

| Pattern | Severity | Description | Solution |
| ------- | -------- | ----------- | -------- |
| Inconsistent Formatting | MEDIUM | Mixed indentation, spacing | Use linter/formatter |
| Long Files | MEDIUM | Files > 500 lines | Split into modules |
| Poor File Organization | MEDIUM | Related code scattered | Group by feature/domain |
| Circular Imports | HIGH | Module A imports B imports A | Restructure dependencies |

### Documentation

| Pattern | Severity | Description | Solution |
| ------- | -------- | ----------- | -------- |
| No Documentation on Complex Logic | HIGH | Hard to understand code | Add explaining comments |
| Outdated Comments | MEDIUM | Comments don't match code | Update or remove |
| Missing JSDoc on Public API | MEDIUM | No parameter/return docs | Add JSDoc comments |
| Over-commenting | LOW | Comments stating the obvious | Remove redundant comments |

### Control Flow

| Pattern | Severity | Description | Solution |
| ------- | -------- | ----------- | -------- |
| Deeply Nested Conditions | MEDIUM | Multiple if/else levels | Use early returns, guard clauses |
| Complex Boolean Expressions | MEDIUM | Long && / \|\| chains | Extract to named variables |
| Hidden Side Effects | HIGH | Function does more than name says | Rename or split function |

---

## Test Coverage Track

### Test Quality

| Pattern | Severity | Description | Solution |
| ------- | -------- | ----------- | -------- |
| No Tests | CRITICAL | Code without any tests | Add unit tests |
| Tests Without Assertions | HIGH | Tests that always pass | Add meaningful assertions |
| Flaky Tests | HIGH | Tests that randomly fail | Fix race conditions, mock properly |
| Slow Tests | MEDIUM | Test suite takes > 5 minutes | Optimize, mock external calls |
| Tightly Coupled Tests | MEDIUM | Tests depend on other tests | Make tests independent |

### Coverage Patterns

| Pattern | Severity | Description | Solution |
| ------- | -------- | ----------- | -------- |
| Low Coverage (<50%) | MEDIUM | Most code untested | Add tests for critical paths |
| No Edge Case Coverage | HIGH | Only happy path tested | Test boundaries, errors |
| Missing Integration Tests | HIGH | Only unit tests | Add integration tests |
| No Error Path Tests | HIGH | Errors not tested | Test error handling |

### Test Structure

| Pattern | Severity | Description | Solution |
| ------- | -------- | ----------- | -------- |
| Test Names Don't Describe | LOW | `test1`, `testFunction` | Use descriptive names |
| No Test Isolation | MEDIUM | Tests affect each other | Reset state between tests |
| Excessive Mocking | MEDIUM | Testing mocks not code | Reduce mocks, test integration |
| Missing Setup/Teardown | LOW | Repeated setup code | Use beforeEach/afterEach |

**Good Test Example:**

```javascript
describe("UserService", () => {
  describe("createUser", () => {
    it("should create user with valid data", async () => {
      // Arrange
      const userData = { email: "test@example.com", name: "Test" };

      // Act
      const user = await userService.createUser(userData);

      // Assert
      expect(user.id).toBeDefined();
      expect(user.email).toBe(userData.email);
    });

    it("should throw error for duplicate email", async () => {
      // Arrange
      const userData = { email: "existing@example.com", name: "Test" };

      // Act & Assert
      await expect(userService.createUser(userData)).rejects.toThrow(
        "Email already exists"
      );
    });
  });
});
```

---

## Quick Quality Audit Checklist

### Performance

- [ ] No N+1 query patterns
- [ ] Database queries have appropriate indexes
- [ ] Large datasets are paginated
- [ ] No memory leaks in event handlers
- [ ] Expensive operations are cached

### Maintainability

- [ ] Classes have single responsibility
- [ ] Dependencies are injected, not hard-coded
- [ ] No duplicate code blocks
- [ ] Methods are < 30 lines
- [ ] No god classes or modules

### Readability

- [ ] Variables/functions have descriptive names
- [ ] Consistent formatting throughout
- [ ] Complex logic has explaining comments
- [ ] No deeply nested conditions (> 3 levels)
- [ ] Files are < 500 lines

### Test Coverage

- [ ] Critical paths have unit tests
- [ ] Edge cases are tested
- [ ] Error handling is tested
- [ ] Integration tests exist
- [ ] Tests are independent and fast

---

## Severity Classification

| Severity | Performance | Maintainability | Readability | Coverage |
| -------- | ----------- | --------------- | ----------- | -------- |
| CRITICAL | System crash, infinite loops | No structure, impossible to modify | Obfuscated code | No tests for critical paths |
| HIGH | Significant slowdown, N+1 | SOLID violations, tight coupling | Misleading names | Missing edge cases |
| MEDIUM | Missing optimization | Code smells, long methods | Poor formatting | Low coverage |
| LOW | Minor inefficiencies | Style issues | Minor naming | Test improvements |
