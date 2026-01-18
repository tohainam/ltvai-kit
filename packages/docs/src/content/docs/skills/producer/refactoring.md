---
title: Refactoring
description: Structured refactoring skill cho code smell detection, pattern application, và migration planning
---

import { Aside, Steps, Tabs, TabItem } from "@astrojs/starlight/components";

## Overview

`/refactoring` là Producer Skill cho structured code quality improvement - từ smell detection đến migration planning.

<Aside type="tip">
  Sử dụng `/refactoring` khi code cần improvement nhưng behavior phải giữ nguyên.
</Aside>

## When to Use

- **Code smells** detected
- **Technical debt** reduction needed
- **Design pattern** application required
- **Performance optimization** needed

## Quick Start

```
/refactoring The UserService class has grown too large and hard to maintain
```

Claude sẽ:
1. Analyze code structure
2. Detect all code smells
3. Assess impact và risk
4. Generate migration plan
5. Output specification file

## Output

Spec file tại `.claude/.specs/refactoring-{slug}-{timestamp}.md`:

```yaml
---
spec_type: refactoring
status: complete
smell_type: structural
complexity_score: 7
---

# Refactoring Spec: UserService Decomposition

## Smell Catalog
[List of detected smells với severity]

## Impact Assessment
[Risk matrix, breaking changes]

## Migration Plan
[Step-by-step với characterization tests]

## Rollback Strategy
[How to revert if needed]
```

## Smell Type Detection

Claude auto-detect smell type:

| Type | Indicators |
|------|------------|
| `structural` | God classes, large files, circular deps |
| `duplication` | Copy-paste, DRY violations |
| `coupling` | High dependencies, feature envy |
| `unnecessary` | Dead code, unused variables |
| `data` | Data clumps, primitive obsession |

## Phases

<Steps>

1. **Phase 0: Initialization**

   - Tạo spec file
   - Detect smell type
   - Chọn mode

2. **Phase 1: Scope Analysis**

   - Read target files
   - Identify dependencies
   - Calculate complexity score

3. **Phase 2: Smell Detection**

   5 parallel detection tracks:
   - **STR** (Structure): God classes, modules, boundaries
   - **ABS** (Abstraction): Duplicates, DRY, missing abstractions
   - **NAM** (Naming): Conventions, clarity, magic values
   - **PAT** (Pattern): SOLID violations, anti-patterns
   - **DEP** (Dependency): Coupling, feature envy, DI needs

4. **Phase 3: Impact Assessment**

   - Build risk matrix
   - Identify breaking changes
   - Map affected components

5. **Phase 4: Strategy Selection**

   - Generate 2+ refactoring options
   - Evaluate trade-offs
   - Select recommendation

6. **Phase 5: Plan Generation**

   Deliverables:
   - Migration plan (step-by-step)
   - Characterization tests
   - Rollback strategy

</Steps>

## Detection Tracks

<Tabs>
  <TabItem label="STR - Structure">
    **Focus**: Code organization

    Detects:
    - God classes (> 500 lines)
    - Circular dependencies
    - Module boundary violations
    - Deep nesting
  </TabItem>

  <TabItem label="ABS - Abstraction">
    **Focus**: Code reuse

    Detects:
    - Copy-paste code
    - DRY violations
    - Missing interfaces
    - Over-abstraction
  </TabItem>

  <TabItem label="NAM - Naming">
    **Focus**: Code clarity

    Detects:
    - Unclear names
    - Inconsistent conventions
    - Magic numbers/strings
    - Abbreviations
  </TabItem>

  <TabItem label="PAT - Pattern">
    **Focus**: Design quality

    Detects:
    - SOLID violations
    - Anti-patterns
    - Missing patterns
    - Over-engineering
  </TabItem>

  <TabItem label="DEP - Dependency">
    **Focus**: Code coupling

    Detects:
    - High coupling
    - Feature envy
    - Inappropriate intimacy
    - Missing DI
  </TabItem>
</Tabs>

## Complexity Scoring

| Factor | Points |
|--------|--------|
| Multiple smells (> 5) | +2 |
| Wide impact (> 10 files) | +2 |
| External dependencies | +2 |
| Database schema changes | +2 |
| Public API impact | +1 |
| Low test coverage | +1 |

**Score < 5**: Direct refactoring
**Score ≥ 5**: Phased migration with feature flags

## Migration Strategies

<Tabs>
  <TabItem label="Direct Migration">
    For low-risk refactoring:

    ```markdown
    ## Migration Plan

    1. [ ] Write characterization tests
    2. [ ] Apply refactoring
    3. [ ] Run tests (must stay GREEN)
    4. [ ] Update documentation
    ```
  </TabItem>

  <TabItem label="Phased Migration">
    For high-risk refactoring:

    ```markdown
    ## Migration Plan

    ### Phase A: Preparation
    1. [ ] Write characterization tests
    2. [ ] Add feature flag
    3. [ ] Create new structure alongside old

    ### Phase B: Migration
    4. [ ] Gradually migrate consumers
    5. [ ] Monitor for regressions
    6. [ ] Fix issues as they arise

    ### Phase C: Cleanup
    7. [ ] Remove feature flag
    8. [ ] Delete old code
    9. [ ] Update documentation
    ```
  </TabItem>
</Tabs>

## Examples

### Example 1: God Class

```
/refactoring UserService.ts has 1500 lines and handles everything user-related
```

Detection:
- God class (1500 lines)
- Multiple responsibilities
- High coupling

Plan:
1. Extract AuthenticationService
2. Extract ProfileService
3. Extract PermissionService
4. Keep UserService as facade

### Example 2: Duplicate Code

```
/refactoring Similar validation logic repeated across all form handlers
```

Detection:
- Copy-paste code in 12 files
- DRY violation
- Missing abstraction

Plan:
1. Create ValidationService
2. Define common validators
3. Migrate forms one by one
4. Remove duplicate code

### Example 3: Coupling

```
/refactoring PaymentModule directly accesses OrderModule internals
```

Detection:
- Feature envy
- Tight coupling
- Missing interface

Plan:
1. Define OrderService interface
2. Implement interface in OrderModule
3. Update PaymentModule to use interface
4. Add dependency injection

## Characterization Tests

<Aside type="caution">
  CRITICAL: Tests phải GREEN trước và sau refactoring. Đây là safety net.
</Aside>

```typescript
// characterization.test.ts
describe('UserService - Before Refactoring', () => {
  it('should authenticate user with correct credentials', () => {
    // Capture current behavior
  });

  it('should return user profile', () => {
    // Capture current behavior
  });

  // ... more tests capturing ALL behaviors
});
```

## Integration with /implementing

Sau khi refactoring complete:

```
/implementing userservice decomposition
```

Claude sẽ:
1. Read refactoring spec
2. Follow migration plan step-by-step
3. Verify characterization tests stay GREEN
4. Update spec status

## Best Practices

1. **Small Steps**: Prefer nhiều small refactorings over one big refactoring
2. **Test First**: Ensure có đủ tests trước khi refactor
3. **Preserve Behavior**: Không add features during refactoring
4. **Commit Often**: Mỗi step should be one commit

## Troubleshooting

### Smell list quá dài

- Focus on HIGH severity first
- Request prioritization
- Break into multiple refactoring sessions

### Migration plan quá phức tạp

- Use phased approach
- Add more intermediate steps
- Consider smaller scope

### Breaking tests after refactoring

- Revert immediately
- Review characterization tests
- Ensure tests capture behavior, not implementation

## Related

- [Implementing](/skills/consumer/implementing/) - Execute refactoring specs
- [Reviewing](/skills/producer/reviewing/) - Find smells during review
- [Debugging](/skills/producer/debugging/) - Fix bugs introduced by refactoring
