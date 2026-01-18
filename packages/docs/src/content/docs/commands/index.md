---
title: Commands Overview
description: Tổng quan về commands trong ltvai-kit
---

import { Card, CardGrid, Aside } from "@astrojs/starlight/components";

## What are Commands?

Commands là các utilities **không generate code** - chúng hỗ trợ trong quá trình development nhưng không tạo ra specifications hay implementations.

<Aside type="note">
  Khác với Skills, Commands không output files hay code changes.
</Aside>

## Commands vs Skills

| Aspect | Commands | Skills |
|--------|----------|--------|
| Output | Conversation only | Spec files hoặc code |
| Purpose | Discussion, refinement | Analysis, implementation |
| Use case | Clarify ideas, improve prompts | Build features, fix bugs |

## Available Commands

<CardGrid>
  <Card title="/discuss" icon="comment">
    Conversational discussion để clarify ideas và explore topics trước khi implementation.
  </Card>
  <Card title="/optimize-prompt" icon="pencil">
    Transform vague requests thành clear, structured prompts cho better AI responses.
  </Card>
</CardGrid>

## Command Reference

| Command | Purpose | When to Use |
|---------|---------|-------------|
| [/discuss](/commands/discuss/) | Clarify ideas without implementing | Unsure about approach, need exploration |
| [/optimize-prompt](/commands/optimize-prompt/) | Improve prompt quality | Prompts không giving good results |

## Usage Pattern

```
1. User có idea chưa rõ ràng
   ↓
2. /discuss để clarify và explore
   ↓
3. /optimize-prompt để refine request
   ↓
4. /brainstorming (hoặc skill khác) để tạo spec
   ↓
5. /implementing để execute
```

## When to Use Commands

### Use /discuss when:

- Bạn chưa chắc về approach
- Cần explore multiple options
- Muốn clarify requirements trước khi commit
- Need to understand trade-offs

### Use /optimize-prompt when:

- Prompts của bạn quá vague
- Không getting expected results
- Muốn learn better prompting patterns
- Cần structured, clear requests

## Best Practices

1. **Start with /discuss** nếu chưa clear về direction
2. **Use /optimize-prompt** để improve future prompts
3. **Move to skills** khi ready to create output
4. **Don't over-discuss** - action when ready

## Next Steps

- [/discuss](/commands/discuss/) - Learn about discussion command
- [/optimize-prompt](/commands/optimize-prompt/) - Learn about prompt optimization
- [Skills Overview](/skills/) - Move to actionable skills
