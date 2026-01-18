---
title: Quick Start
description: Bắt đầu với ltvai-kit trong 5 phút
---

import { Steps, Tabs, TabItem } from "@astrojs/starlight/components";

Hướng dẫn này giúp bạn hoàn thành workflow đầu tiên với ltvai-kit trong vòng 5 phút.

## Your First Workflow

<Steps>

1. **Mở Claude Code trong project của bạn**

   ```bash
   cd your-project
   claude
   ```

2. **Sử dụng Producer Skill để tạo spec**

   Gõ lệnh sau để brainstorm một feature mới:

   ```
   /brainstorming Add a dark mode toggle to the settings page
   ```

   Claude sẽ:
   - Phân tích yêu cầu
   - Đặt câu hỏi làm rõ (nếu cần)
   - Tạo spec file tại `.claude/.specs/brainstorming-dark-mode-*.md`

3. **Review spec file**

   Spec file chứa:
   - Architecture diagram
   - Implementation tasks
   - Data models
   - API contracts (nếu có)

4. **Implement với Consumer Skill**

   Sau khi spec hoàn thành, chạy:

   ```
   /implementing dark mode
   ```

   Hoặc reference trực tiếp file:

   ```
   /implementing .claude/.specs/brainstorming-dark-mode-*.md
   ```

5. **Review code output**

   Claude sẽ:
   - Tạo plan và xin approval
   - Implement theo spec
   - Chạy quality checks
   - Update spec status

</Steps>

## Example Workflows

<Tabs>
  <TabItem label="New Feature">
    ```
    # Step 1: Brainstorm
    /brainstorming Add user notification preferences

    # Step 2: Review spec
    # (spec file sẽ được tạo tự động)

    # Step 3: Implement
    /implementing notification preferences
    ```
  </TabItem>

  <TabItem label="Bug Fix">
    ```
    # Step 1: Debug
    /debugging Users cannot reset password on mobile

    # Step 2: Review RCA
    # (spec file chứa root cause analysis)

    # Step 3: Implement fix
    /implementing password reset bug
    ```
  </TabItem>

  <TabItem label="Code Review">
    ```
    # Step 1: Review
    /reviewing Check the auth module for security issues

    # Step 2: Review findings
    # (spec file chứa prioritized issues)

    # Step 3: Fix critical issues
    /implementing auth security review
    ```
  </TabItem>
</Tabs>

## Key Concepts

### Producer vs Consumer

| Type | Skills | Output |
|------|--------|--------|
| **Producer** | brainstorming, debugging, refactoring, reviewing | Spec files |
| **Consumer** | implementing | Code |

### Spec Files

Tất cả spec files được lưu tại `.claude/.specs/`:

```
.claude/.specs/
├── brainstorming-dark-mode-1801261400.md
├── debugging-password-reset-1801261430.md
└── reviewing-auth-security-1801261500.md
```

### Status Flow

```
complete → implementing → implemented
```

- **complete**: Spec ready for implementation
- **implementing**: Currently being implemented
- **implemented**: Implementation done

## Tips

1. **Hãy cụ thể**: Yêu cầu càng chi tiết, spec càng chính xác
2. **Review trước khi implement**: Luôn đọc qua spec trước khi `/implementing`
3. **Sử dụng autonomous mode**: Cho các task đơn giản, collaborative mode cho task phức tạp
4. **Check spec status**: Đảm bảo status là `complete` trước khi implement

## Troubleshooting

### Spec không được tạo

- Kiểm tra Claude Code session active
- Đảm bảo `.claude/skills/` folder tồn tại
- Thử restart session

### Implementation fails

- Đọc error message trong output
- Kiểm tra spec file format đúng
- Đảm bảo spec status là `complete`

## Next Steps

- [Workflow Details](/getting-started/workflow/) - Hiểu sâu về spec-driven development
- [Skills Reference](/skills/) - Khám phá tất cả 8 skills
- [Configuration](/getting-started/configuration/) - Customize behavior
