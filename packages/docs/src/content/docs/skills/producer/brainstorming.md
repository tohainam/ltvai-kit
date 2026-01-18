---
title: Brainstorming
description: Structured ideation skill cho new features, architecture decisions, và system design
---

import { Aside, Steps, Tabs, TabItem } from "@astrojs/starlight/components";

## Overview

`/brainstorming` là Producer Skill cho structured ideation - từ feature design đến architecture decisions.

<Aside type="tip">
  Sử dụng `/brainstorming` khi bạn có idea mới và cần plan trước khi implement.
</Aside>

## When to Use

- User requests **new feature** hoặc capability
- Cần **architecture planning**
- Muốn **explore implementation approaches**
- Yêu cầu **vague/short** cần clarification

## Quick Start

```
/brainstorming Add a dark mode toggle to the settings page
```

Claude sẽ:
1. Phân tích yêu cầu
2. Research codebase
3. Generate multiple options
4. Synthesize recommendations
5. Output specification file

## Output

Spec file tại `.claude/.specs/brainstorming-{slug}-{timestamp}.md`:

```yaml
---
spec_type: brainstorming
status: complete
created_at: 1801261400
slug: dark-mode-toggle
---

# Brainstorming Spec: Dark Mode Toggle

## Architecture Diagram
[Mermaid diagram]

## Data Models
[TypeScript interfaces]

## Implementation Tasks
- [ ] Task 1
- [ ] Task 2
...
```

## Phases

<Steps>

1. **Phase 0: Initialization**

   - Tạo spec file
   - Chọn mode (Autonomous/Collaborative)
   - Generate timestamp và slug

2. **Phase 1: Discovery**

   - Clarify requirements với 5 Whys technique
   - Identify constraints và goals
   - Determine complexity level

3. **Phase 2: Research**

   - Launch parallel research agents:
     - 5 Researcher agents (external best practices)
     - 5 Scouter agents (internal codebase patterns)
   - Collect findings

4. **Phase 3: Ideation (Divergent)**

   4 parallel tracks:
   - **Architecture**: Tech stack, patterns, structure
   - **UX/UI**: User flows, interfaces
   - **Integration**: APIs, dependencies, data flow
   - **Value/Business**: ROI, risks, trade-offs

5. **Phase 4: Synthesis (Convergent)**

   - Evaluate all options
   - Create Architecture Decision Records (ADRs)
   - Select recommended approach
   - Build evaluation matrix

6. **Phase 5: Specification**

   Final deliverables:
   - Architecture diagram (Mermaid)
   - Data models (TypeScript)
   - API contracts (YAML)
   - Implementation task list

</Steps>

## Modes

<Tabs>
  <TabItem label="Autonomous">
    **Khi nào**: Tasks rõ ràng, không cần nhiều input

    ```
    /brainstorming Add user authentication
    ```

    Claude sẽ tự động qua tất cả phases với minimal interaction.
  </TabItem>

  <TabItem label="Collaborative">
    **Khi nào**: Tasks phức tạp, cần input thường xuyên

    Claude sẽ hỏi tại mỗi phase gate:
    - "Tech stack nào bạn prefer?"
    - "Có constraint nào đặc biệt không?"
    - "Option A hay B phù hợp hơn?"
  </TabItem>
</Tabs>

## Examples

### Example 1: New Feature

```
/brainstorming Add a notification system for order updates
```

Output highlights:
- WebSocket vs Polling comparison
- Database schema for notifications
- React component structure
- API endpoints design

### Example 2: Architecture Decision

```
/brainstorming Should we use microservices or monolith for the payment module?
```

Output highlights:
- Pros/cons analysis
- Scalability considerations
- Team capacity assessment
- Migration path (if applicable)

### Example 3: System Design

```
/brainstorming Design a caching layer for product catalog
```

Output highlights:
- Cache strategy (TTL, invalidation)
- Redis vs Memcached comparison
- Fallback mechanisms
- Monitoring requirements

## Best Practices

1. **Be Specific**: Cung cấp context đầy đủ
   - Good: "Add OAuth2 authentication with Google and GitHub providers"
   - Bad: "Add login"

2. **Mention Constraints**: Giúp Claude narrow down options
   - "We're using PostgreSQL and can't add new databases"
   - "Must support both web and mobile"

3. **Review Before Implement**: Đọc kỹ spec, đặc biệt ADRs

4. **Iterate If Needed**: Chạy lại với refined requirements nếu spec chưa đúng

## Integration with /implementing

Sau khi brainstorming complete:

```
/implementing dark-mode-toggle
```

hoặc reference trực tiếp:

```
/implementing .claude/.specs/brainstorming-dark-mode-toggle-1801261400.md
```

## Troubleshooting

### Spec quá generic

- Cung cấp thêm context
- Sử dụng Collaborative mode
- Mention specific technologies đang dùng

### Missing important aspects

- Check các track trong Phase 3 (Architecture, UX, Integration, Value)
- Request additional research trong specific area

### Takes too long

- Use Autonomous mode
- Simplify requirements
- Break into smaller features

## Related

- [Implementing](/skills/consumer/implementing/) - Execute brainstorming specs
- [Reviewing](/skills/producer/reviewing/) - Review before implement
- [Workflow](/getting-started/workflow/) - Understand spec-driven development
