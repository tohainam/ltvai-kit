---
title: Skills Overview
description: Tổng quan về 8 skills trong ltvai-kit
---

import { Card, CardGrid } from "@astrojs/starlight/components";

ltvai-kit cung cấp **8 skills** được phân loại theo chức năng:

## Skills Categories

<CardGrid>
  <Card title="Producer Skills (4)" icon="pencil">
    Tạo specification files từ yêu cầu. **Output**: `.claude/.specs/*.md`
  </Card>
  <Card title="Consumer Skill (1)" icon="rocket">
    Execute specifications thành code. **Input**: Spec files
  </Card>
  <Card title="Utility Skills (3)" icon="setting">
    Supporting functions cho design, diagrams, best practices.
  </Card>
</CardGrid>

## Producer Skills

Producer skills **phân tích yêu cầu** và tạo specification files:

| Skill | Purpose | When to Use |
|-------|---------|-------------|
| [/brainstorming](/skills/producer/brainstorming/) | Ideation, architecture | New features, system design |
| [/debugging](/skills/producer/debugging/) | Bug analysis, RCA | Runtime errors, bugs |
| [/refactoring](/skills/producer/refactoring/) | Code quality | Code smells, tech debt |
| [/reviewing](/skills/producer/reviewing/) | Code review | PR review, security audit |

### Output Format

Tất cả producer skills tạo spec files với format:

```yaml
---
spec_type: brainstorming | debugging | refactoring | reviewing
status: complete
created_at: timestamp
---

# Spec Content
...
```

## Consumer Skill

Consumer skill **executes specifications** từ producer skills:

| Skill | Purpose | Input |
|-------|---------|-------|
| [/implementing](/skills/consumer/implementing/) | Execute specs into code | Spec files hoặc keywords |

### Workflow

```
Producer Skill → Spec File → /implementing → Code
```

## Utility Skills

Utility skills **hỗ trợ** trong quá trình development:

| Skill | Purpose | Output |
|-------|---------|--------|
| [/ui-ux-pro-max](/skills/utility/ui-ux-pro-max/) | UI/UX design intelligence | Design guidelines |
| [/mermaidjs-v11](/skills/utility/mermaidjs-v11/) | Create diagrams | Mermaid syntax |
| [/react-best-practices](/skills/utility/react-best-practices/) | React optimization | Performance rules |

## Skill Comparison

### When to Use Which Skill?

| Scenario | Recommended Skill |
|----------|-------------------|
| "Tôi muốn thêm feature X" | `/brainstorming` |
| "Có bug khi user làm Y" | `/debugging` |
| "Code này quá messy" | `/refactoring` |
| "Review PR này giúp tôi" | `/reviewing` |
| "Implement spec này" | `/implementing` |
| "Thiết kế UI cho page này" | `/ui-ux-pro-max` |
| "Vẽ diagram workflow" | `/mermaidjs-v11` |
| "Optimize React component" | `/react-best-practices` |

## Skill Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER REQUEST                             │
└────────────────────────────────┬────────────────────────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
     ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
     │ PRODUCER SKILL │ │ CONSUMER SKILL │ │ UTILITY SKILL  │
     │ (brainstorming │ │ (implementing) │ │ (ui-ux, etc.)  │
     │  debugging     │ │                │ │                │
     │  refactoring   │ │                │ │                │
     │  reviewing)    │ │                │ │                │
     └───────┬────────┘ └───────┬────────┘ └───────┬────────┘
             │                  │                  │
             ▼                  ▼                  ▼
     ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
     │   SPEC FILE    │ │     CODE       │ │   GUIDELINES   │
     └────────────────┘ └────────────────┘ └────────────────┘
```

## Modes

Hầu hết skills hỗ trợ 2 modes:

### Autonomous Mode

- Claude làm việc độc lập
- Minimal user interaction
- Nhanh hơn, phù hợp tasks đơn giản

### Collaborative Mode

- Claude hỏi nhiều câu hỏi
- User confirmation tại mỗi phase
- Chính xác hơn, phù hợp tasks phức tạp

## Next Steps

Explore từng skill:

- **Producer Skills**: [Brainstorming](/skills/producer/brainstorming/), [Debugging](/skills/producer/debugging/), [Refactoring](/skills/producer/refactoring/), [Reviewing](/skills/producer/reviewing/)
- **Consumer Skill**: [Implementing](/skills/consumer/implementing/)
- **Utility Skills**: [UI/UX Pro Max](/skills/utility/ui-ux-pro-max/), [Mermaid.js](/skills/utility/mermaidjs-v11/), [React Best Practices](/skills/utility/react-best-practices/)
