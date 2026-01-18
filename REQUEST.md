CLAUDE CODE CONFIG: SYSTEM REQUIREMENTS SPECIFICATION

1. Tổng quan yêu cầu hệ thống

Hệ thống yêu cầu thiết lập 5 Claude Code Skills hoạt động theo mô hình Spec-Driven Development.

Quy trình nghiệp vụ yêu cầu:
Input ->

$$Planning Skills$$

-> Specification File ->

$$Implementing Skill$$

-> Code.

Functional Flow Requirement

┌────────────────────────────────────────────────────────────────┐
│ │
│ ┌─────────────┐ ┌─────────────────────────────────────┐ │
│ │Brainstorming│────►│ brainstorming-slug-time.md │ │
│ └─────────────┘ └──────────────────┬──────────────────┘ │
│ │ │
│ ┌─────────────┐ ┌─────────────────────────────────────┐ │
│ │ Reviewing │────►│ reviewing-slug-timeec.md │ │
│ └─────────────┘ └──────────────────┬──────────────────┘ │
│ │ │
│ ┌─────────────┐ ┌─────────────────────────────────────┐ │
│ │ Refactoring │────►│ refactoring-slug-time.md │ │
│ └─────────────┘ └──────────────────┬──────────────────┘ │
│ │ │
│ ┌─────────────┐ ┌─────────────────────────────────────┐ │
│ │ Debugging │────►│ debugging-slug-time.md │ │
│ └─────────────┘ └──────────────────┬──────────────────┘ │
│ │ │
│ ▼ │
│ ┌─────────────────────────────────────┐ │
│ │ IMPLEMENTING │ │
│ │ (Auto-detect Mode + Execution) │ │
│ └─────────────────────────────────────┘ │
│ │
└────────────────────────────────────────────────────────────────┘

2. Yêu cầu về Giao thức liên kết (Spec Format)

Tất cả các file spec được sinh ra phải tuân thủ nghiêm ngặt quy tắc định danh và định dạng dưới đây.

2.1. Quy tắc đặt tên file (File Naming Convention)

Hệ thống phải tự động tạo tên file theo format:
{skill_type}-{request-slug}-{DDMMYYHHmm}.md

Trong đó:

{skill_type}: brainstorming | reviewing | refactoring | debugging

{request-slug}: Tóm tắt ngắn gọn yêu cầu (kebab-case).

{DDMMYYHHmm}: Timestamp thời điểm tạo.

Ví dụ:

brainstorming-google-auth-1701241530.md

debugging-login-crash-1701241645.md

2.2. Định dạng nội dung (Content Format)

Bắt buộc sử dụng Markdown với YAML Frontmatter:

---

spec_type: [brainstorming | reviewing | refactoring | debugging]
version: 1.0
created_at: {timestamp}
priority: [HIGH | MEDIUM | LOW]
related_files:

- src/path/to/file1.ts

---

#

$$TIÊU ĐỀ SPECIFICATION$$

(Nội dung chi tiết bên dưới tuỳ theo loại skill)

3. Yêu cầu chi tiết từng Skill

Nhóm 1: Producers (Tạo Spec)

Skill

Input Trigger

Output Focus

Yêu cầu Output File

Brainstorming

Ý tưởng, yêu cầu tính năng mới

Architecture, Data Flow, Task list

brainstorming-\*.md

Reviewing

Code PR, Security audit

Issues, Security, Performance

reviewing-\*.md

Refactoring

Code "xấu" (smells), tối ưu hoá

Code patterns, Migration plan

refactoring-\*.md

Debugging

Lỗi runtime, bug report

Root Cause Analysis (RCA), Fix

debugging-\*.md

Yêu cầu nội dung Spec:

Brainstorming Spec: Phải bao gồm Sơ đồ kiến trúc (Mermaid), Data Models, và API Contracts.

Reviewing Spec: Phải bao gồm Summary Score, Critical Issues (Must Fix), và Action Plan.

Refactoring Spec: Phải chỉ rõ Current Smell, Target Pattern, và Step-by-step Migration.

Debugging Spec: Phải bao gồm RCA (Nguyên nhân gốc), Reproduction Steps, Fix Strategy, và New Test Case.

Nhóm 2: Consumer (Thực thi)

Skill: Claude Code Implementing

Yêu cầu chức năng:
Skill này phải tự động phát hiện ngữ cảnh và xử lý theo 3 chế độ (Modes):

MODE 1 (File Reference):

Input: User cung cấp đường dẫn file spec (vd: run brainstorming-auth-010124.md).

Hành động: Đọc header spec_type, parse nội dung và thực thi code tương ứng.

MODE 2 (Natural Language Match):

Input: User yêu cầu bằng ngôn ngữ tự nhiên (vd: "Implement tính năng auth").

Hành động: Quét thư mục tìm file spec khớp từ khóa -> Xác nhận với user -> Thực thi.

MODE 3 (Direct Execution):

Input: User yêu cầu task nhỏ không có file spec.

Hành động: Bỏ qua quy trình đọc spec, thực thi code trực tiếp.

Yêu cầu xử lý Logic theo Spec Type:

Nếu spec_type: brainstorming -> Tạo cấu trúc project, viết code mới.

Nếu spec_type: reviewing -> Chỉ thực hiện sửa các lỗi Critical.

Nếu spec_type: refactoring -> Refactor code giữ nguyên logic (Behavior preservation).

Nếu spec_type: debugging -> Viết Test Case (Fail) -> Fix Code -> Verify Test (Pass).

4. Kế hoạch triển khai (Implementation Plan)

Các bước cần thực hiện để đáp ứng yêu cầu trên:

Phase 1: Foundation (Cốt lõi)

Task 1: Definita Spec Schema: Xác định template chuẩn cho 4 loại file markdown (Header YAML + Body).

Phase 2: The Producers (Các Skill tạo Spec)

Task 2.1 - Brainstorming: Cấu hình prompt tập trung Architecture & Data.

Task 2.2 - Reviewing: Cấu hình prompt tập trung Security & Quality Gate.

Task 2.3 - Debugging: Cấu hình prompt tập trung RCA (Root Cause Analysis).

Task 2.4 - Refactoring: Cấu hình prompt tập trung Design Patterns.

Phase 3: The Consumer (Skill Thực thi)

Task 3 - Implementing:

Cấu hình logic Detection (Mode 1, 2, 3).

Cấu hình khả năng parse YAML header.

Cấu hình quy trình TDD (Test-Driven Development).

Phase 4: Integration & Testing

Task 4: Kiểm thử luồng: Brainstorming -> Output File -> Implementing -> Code.

Task 5: Tinh chỉnh prompt xử lý các trường hợp ngoại lệ (Edge cases).
