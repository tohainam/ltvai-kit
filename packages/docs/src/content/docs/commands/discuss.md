---
title: /discuss
description: Conversational discussion command để clarify ideas và explore topics
---

import { Aside, Steps, Tabs, TabItem } from "@astrojs/starlight/components";

## Overview

`/discuss` là command cho conversational discussion - clarify ideas, explore options, và understand trade-offs **without implementing**.

<Aside type="tip">
  Sử dụng `/discuss` khi bạn muốn talk through ideas trước khi commit to action.
</Aside>

## When to Use

- **Clarify ideas** trước khi implementation
- **Explore multiple approaches** và trade-offs
- **Understand implications** của decisions
- **Learn about concepts** related to task

## Quick Start

```
/discuss Should we use REST or GraphQL for our new API?
```

Claude sẽ:
1. Analyze your context
2. Present options với pros/cons
3. Ask clarifying questions
4. Guide toward decision

## Input Types

<Tabs>
  <TabItem label="Text Question">
    ```
    /discuss What's the best state management approach for our React app?
    ```
  </TabItem>

  <TabItem label="With URL">
    ```
    /discuss https://example.com/api-docs - Is this API design good for our use case?
    ```
  </TabItem>

  <TabItem label="With File">
    ```
    /discuss @architecture.md - What improvements can we make?
    ```
  </TabItem>

  <TabItem label="With Image">
    ```
    /discuss @wireframe.png - Feedback on this UI layout?
    ```
  </TabItem>
</Tabs>

## Discussion Flow

<Steps>

1. **Input Analysis**

   Claude analyzes your question/content to understand context

2. **Clarifying Questions**

   If needed, Claude asks questions để hiểu rõ hơn:
   - "What's your current tech stack?"
   - "What scale are you targeting?"
   - "Any specific constraints?"

3. **Options Presentation**

   Claude presents options với:
   - Pros và cons
   - Trade-offs
   - Recommendations based on context

4. **Iterative Discussion**

   Continue conversation until clarity reached

5. **Exit Signal**

   When ready, Claude suggests appropriate skill:
   - "Ready to plan? Try `/brainstorming`"
   - "Need to review code? Try `/reviewing`"

</Steps>

## Examples

### Example 1: Architecture Decision

```
/discuss Microservices vs Monolith for our e-commerce platform
```

Claude discusses:
- Team size considerations
- Scalability requirements
- Deployment complexity
- Development velocity trade-offs

### Example 2: Technology Choice

```
/discuss PostgreSQL vs MongoDB for storing user-generated content
```

Claude discusses:
- Data structure flexibility
- Query patterns
- Scaling characteristics
- Ecosystem và tooling

### Example 3: Design Pattern

```
/discuss Should we implement CQRS for our order management system?
```

Claude discusses:
- When CQRS makes sense
- Complexity trade-offs
- Alternative patterns
- Implementation considerations

## Exit Signals

Claude recognizes these signals to end discussion:

| Signal | Response |
|--------|----------|
| "I think I'll go with X" | Acknowledge và offer next step |
| "Let's implement this" | Suggest `/brainstorming` or `/implementing` |
| "Thanks, that's clear now" | Summarize discussion points |
| "I need to think about it" | Offer to continue later |

## Discussion vs Implementation

<Aside type="caution">
  `/discuss` KHÔNG tạo code hay spec files. Nó chỉ conversation only.
</Aside>

```
/discuss → Conversation, exploration
/brainstorming → Spec file output
/implementing → Code output
```

## Best Practices

1. **Be Specific**: Provide context about your situation
2. **Share Constraints**: Mention deadlines, team size, existing tech
3. **Ask Follow-ups**: Dig deeper into areas unclear
4. **Know When to Move On**: Don't over-discuss, take action

## Transitioning to Skills

After productive discussion:

```
Discussion: "Let's go with REST API"
Next step: /brainstorming Design REST API for user management
```

```
Discussion: "I understand the bug now"
Next step: /debugging User login fails after password change
```

## Troubleshooting

### Discussion too generic

- Add more context about your project
- Specify constraints và requirements
- Ask about specific scenarios

### Going in circles

- Summarize key points
- Make a decision and move forward
- Use `/brainstorming` to formalize

### Need more depth

- Ask follow-up questions
- Request examples
- Share specific code/designs for feedback

## Related

- [/optimize-prompt](/commands/optimize-prompt/) - Improve your prompts
- [Brainstorming](/skills/producer/brainstorming/) - Formalize ideas into specs
- [Skills Overview](/skills/) - All available skills
