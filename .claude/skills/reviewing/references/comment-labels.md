# Conventional Comments Reference

Standard labels for categorizing review findings, based on industry best practices.

## Comment Labels

### `issue (blocking):`

**Use for**: Critical problems that MUST be fixed before merge

**Criteria**:
- Security vulnerabilities
- Bugs that will cause failures
- Breaking changes to existing functionality
- Data corruption or loss risks
- Hardcoded secrets or credentials

**Example**:
```markdown
`issue (blocking):` src/auth.ts:42

SQL injection vulnerability in user query. User input is directly interpolated into query string without sanitization.

**Fix**: Use parameterized queries instead of string interpolation.
```

---

### `issue (non-blocking):`

**Use for**: Problems that SHOULD be fixed but aren't merge blockers

**Criteria**:
- Code smells or technical debt
- Missing error handling (non-critical paths)
- Performance concerns (not severe)
- Inconsistent patterns
- Missing edge case handling

**Example**:
```markdown
`issue (non-blocking):` src/utils.ts:88

Missing null check before accessing property. This could cause runtime errors in edge cases.

**Fix**: Add null check or use optional chaining (`?.`).
```

---

### `suggestion:`

**Use for**: Improvement ideas that would enhance the code

**Criteria**:
- Refactoring opportunities
- Alternative approaches
- Better abstractions
- Code organization improvements
- Performance optimizations (nice-to-have)

**Example**:
```markdown
`suggestion:` src/components/UserList.tsx:55

Consider using `useMemo` for the filtered users array to prevent unnecessary recalculations on re-renders.
```

---

### `nitpick:`

**Use for**: Minor style or preference items

**Criteria**:
- Naming preferences
- Formatting inconsistencies
- Comment improvements
- Import ordering
- Whitespace issues

**Example**:
```markdown
`nitpick:` src/api.ts:12

Consider renaming `getData` to `fetchUserProfile` for clarity about what data is being retrieved.
```

---

### `praise:`

**Use for**: Recognizing good code patterns

**Criteria**:
- Well-designed abstractions
- Excellent error handling
- Clear documentation
- Clever but readable solutions
- Good test coverage

**Example**:
```markdown
`praise:` src/services/auth.ts:100-120

Excellent error handling with specific error types and clear recovery paths. This makes debugging much easier.
```

---

### `question:`

**Use for**: Areas needing clarification

**Criteria**:
- Unclear intent
- Missing context
- Architectural decisions
- Business logic questions
- Trade-off discussions

**Example**:
```markdown
`question:` src/config.ts:35

Why is the timeout set to 30 seconds? Is this based on specific requirements or could it be configurable?
```

---

## Severity Mapping

| Conventional Label      | Reviewer Severity | Priority |
| ----------------------- | ----------------- | -------- |
| `issue (blocking):`     | CRITICAL          | 1        |
| `issue (non-blocking):` | WARNING           | 2        |
| `suggestion:`           | INFO              | 3        |
| `nitpick:`              | INFO              | 4        |
| `praise:`               | (positive)        | -        |
| `question:`             | INFO              | 3        |

## Formatting Guidelines

### Basic Format

```markdown
`{label}:` {file_path}:{line_number}

{Description of the finding}

**Fix**: {Suggested solution if applicable}
```

### With Code Suggestion

```markdown
`{label}:` {file_path}:{line_number}

{Description}

**Before**:
```{language}
{current code}
```

**After**:
```{language}
{suggested code}
```
```

### For Ranges

```markdown
`{label}:` {file_path}:{start_line}-{end_line}

{Description covering multiple lines}
```

## Usage Examples

### Security Issue

```markdown
`issue (blocking):` src/api/users.ts:45

**Issue**: XSS vulnerability - user input rendered without sanitization.

**Impact**: Attackers could inject malicious scripts that execute in user browsers.

**Fix**:
```typescript
// Before
return `<div>${userInput}</div>`;

// After
return `<div>${escapeHtml(userInput)}</div>`;
```
```

### Performance Warning

```markdown
`issue (non-blocking):` src/components/Dashboard.tsx:120

**Issue**: N+1 query problem - fetching user details inside loop.

**Impact**: Causes {n} database queries instead of 1, degrading performance with large datasets.

**Fix**: Batch fetch all users upfront or use DataLoader pattern.
```

### Code Quality Suggestion

```markdown
`suggestion:` src/utils/validators.ts:30-50

Consider extracting these validation functions into a dedicated `validation.ts` module. This would:
- Improve reusability across the codebase
- Make testing easier
- Follow single responsibility principle
```

### Positive Feedback

```markdown
`praise:` src/services/payment.ts:80-110

Excellent use of the Strategy pattern for payment processors. This makes adding new payment methods straightforward without modifying existing code.
```

## References

- [Conventional Comments](https://conventionalcomments.org/)
- [Google Code Review Guidelines](https://google.github.io/eng-practices/review/)
- [Microsoft Code Review Best Practices](https://docs.microsoft.com/en-us/azure/devops/repos/git/review-code)
