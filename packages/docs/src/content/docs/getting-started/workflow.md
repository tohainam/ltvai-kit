---
title: Workflow
description: Hiểu về Spec-Driven Development với ltvai-kit
---

import { Aside } from "@astrojs/starlight/components";

## Spec-Driven Development

ltvai-kit sử dụng **Spec-Driven Development** - một workflow tách biệt planning và implementation:

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER REQUEST                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PRODUCER SKILLS                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────────┐ │
│  │brainstorming│ │  debugging  │ │ refactoring │ │ reviewing  │ │
│  └──────┬──────┘ └──────┬──────┘ └──────┬──────┘ └─────┬──────┘ │
│         │               │               │              │         │
│         └───────────────┴───────────────┴──────────────┘         │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SPECIFICATION FILE                            │
│                    .claude/.specs/*.md                           │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ - Architecture Diagram                                       ││
│  │ - Data Models                                                ││
│  │ - Implementation Tasks                                       ││
│  │ - Verification Criteria                                      ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     CONSUMER SKILL                               │
│                     /implementing                                │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Phase 0: Detection & Parse                                   ││
│  │ Phase 1: Plan (EnterPlanMode)                               ││
│  │ Phase 2: Execute                                             ││
│  │ Phase 3: Verify (Quality Checks)                            ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       CODE OUTPUT                                │
└─────────────────────────────────────────────────────────────────┘
```

## Why Spec-Driven?

<Aside type="tip">
  Spec-Driven Development giúp team có cùng một "source of truth" cho mọi thay đổi trong codebase.
</Aside>

### Benefits

1. **Traceability**: Mọi code change đều có spec đi kèm
2. **Review-able**: Spec có thể được review trước khi implement
3. **Consistent**: Team cùng follow một workflow
4. **Auditable**: Lịch sử decision-making được lưu giữ

### Traditional vs Spec-Driven

| Traditional | Spec-Driven |
|-------------|-------------|
| Code ngay | Plan trước, code sau |
| Khó trace requirements | Requirements trong spec |
| Review code only | Review cả spec và code |
| Knowledge in head | Knowledge documented |

## Producer Skills

Producer skills **tạo specifications** từ yêu cầu:

### /brainstorming

**Khi dùng**: New features, architecture decisions, system design

**Output**:
- Architecture diagram (Mermaid)
- Data models
- API contracts
- Implementation task list

**Phases**: 6 phases (0-5) với explicit gates

```
Phase 0: Initialization
Phase 1: Discovery (5 Whys, clarify requirements)
Phase 2: Research (parallel agents)
Phase 3: Ideation (divergent - 4 tracks)
Phase 4: Synthesis (convergent - ADRs)
Phase 5: Specification (final deliverables)
```

### /debugging

**Khi dùng**: Bug investigation, runtime errors, performance issues

**Output**:
- Root cause analysis
- Fix options with risk assessment
- Verification criteria

**Special**: Auto-detect issue type (runtime_error, logic_bug, performance, security, regression)

### /refactoring

**Khi dùng**: Code smells, technical debt, design patterns

**Output**:
- Smell catalog
- Migration plan
- Characterization tests
- Rollback strategy

**Tracks**: 5 detection tracks (Structure, Abstraction, Naming, Pattern, Dependency)

### /reviewing

**Khi dùng**: PR review, security audit, code quality check

**Output**:
- Multi-dimension score (Security, Performance, Maintainability, Readability, Test Coverage)
- Priority matrix (MUST FIX NOW, FIX BEFORE MERGE, SHOULD FIX, NICE TO HAVE)
- Action plan

**Grades**: A (90-100) → F (<60)

## Consumer Skill

### /implementing

Consumer skill **executes specifications** từ producer skills:

**Input modes**:
1. **File reference**: `/implementing .claude/.specs/brainstorming-*.md`
2. **Natural language**: `/implementing dark mode feature`

**Phases**:

```
Phase 0: Detection & Parse
    ↓
Phase 1: Plan (EnterPlanMode → approval)
    ↓
Phase 2: Execute (apply strategy based on spec type)
    ↓
Phase 3: Verify (format, lint, build)
```

**Strategy by spec type**:

| Spec Type | Strategy |
|-----------|----------|
| brainstorming | Create structure + write code |
| debugging | Implement fix + verify |
| refactoring | Follow migration plan + preserve behavior |
| reviewing | Fix CRITICAL/HIGH issues |

## Spec File Format

Tất cả specs được lưu tại `.claude/.specs/` với format:

```yaml
---
spec_type: brainstorming | debugging | refactoring | reviewing
status: initializing | discovery | research | ideation | synthesis | complete | implementing | implemented
created_at: timestamp
priority: HIGH | MEDIUM | LOW
related_files: [list of files]
---

# Spec Content

## Phase-specific sections...
```

## Modes

### Autonomous Mode

- Claude làm việc độc lập
- Minimal user interaction
- Phù hợp cho tasks đơn giản, requirements rõ ràng

### Collaborative Mode

- Claude hỏi nhiều câu hỏi
- User confirmation tại mỗi phase gate
- Phù hợp cho tasks phức tạp, cần input thường xuyên

## Best Practices

1. **Start with Producer**: Luôn bắt đầu với producer skill trước khi code
2. **Review Specs**: Đọc kỹ spec trước khi implement
3. **Use Appropriate Skill**: Chọn đúng producer skill cho task
4. **Trust the Process**: Follow workflow, không skip steps
5. **Iterate**: Nếu spec không đúng, update spec trước khi implement

## Next Steps

- [Configuration](/getting-started/configuration/) - Customize behavior
- [Skills Reference](/skills/) - Chi tiết từng skill
- [Examples](/reference/examples/) - Real-world examples
