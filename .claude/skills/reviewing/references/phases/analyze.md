# Phase 2: Analyze

Estimate review size, apply chunking strategy, and determine scaling.

## Steps

### 1. Mark Phase In Progress

- Update todo: mark Analyze as `in_progress`

### 2. Get Changes Statistics

Execute the appropriate command to get change statistics:

**For diff-based scopes (staged, branch, working):**
```bash
{git_cmd} --stat
```

**For PR:**
```bash
gh pr diff {pr_number} --stat
```

**For commit:**
```bash
git show {commit_hash} --stat
```

**For files:**
```bash
wc -l {file_paths}
```

### 3. Calculate Total Lines Changed

Parse the `--stat` output:
- Extract insertions (lines added)
- Extract deletions (lines removed)
- Total = insertions + deletions

```
Example stat output:
 src/auth.ts | 150 ++++++++++----
 src/user.ts | 80 ++++--
 2 files changed, 180 insertions(+), 50 deletions(-)

Total lines changed = 180 + 50 = 230
```

### 4. Determine Chunking Need

Apply chunking threshold:

| Total Lines | Chunking Decision        |
| ----------- | ------------------------ |
| <= 200      | No chunking (single)     |
| 201-400     | Optional (ask user)      |
| > 400       | Required (auto-chunk)    |

**If chunking required:**

Determine chunk strategy based on changes:

**by_file** (default for many files):
- Group files by directory or related functionality
- Each chunk = subset of files
- Max ~200 lines per chunk

**by_criteria** (for few files with many changes):
- Split review by criteria categories
- Chunk 1: Security + Performance
- Chunk 2: Functionality + Error Handling
- Chunk 3: Readability + Architecture
- Chunk 4: Testing + Documentation

### 5. Call Delegating Skill

```
Skill(
  skill: "delegating",
  args: "Code review of {description}. Total lines changed: {total_lines}. Files affected: {file_count}. Review all 8 categories: Functionality, Readability, Security, Performance, Testing, Documentation, Architecture, Error Handling."
)
```

### 6. Parse DISPATCH DECISION

Extract from delegating response:

- **Agent**: reviewer (expected)
- **Mode**: single or parallel
- **Instances**: Number of reviewer instances
- **Strategy**: by_criteria, by_file, or by_change
- **Inputs**: Specific scope for each instance

Store decision for Review phase:

```
DISPATCH_DECISION = {
  agent: "reviewer",
  mode: "{single | parallel}",
  instances: {count},
  strategy: "{strategy_name}",
  inputs: [
    { focus: "{focus_1}", scope: "{scope_1}" },
    { focus: "{focus_2}", scope: "{scope_2}" }
  ]
}
```

### 7. Inform User

```
Analysis complete:
- Lines changed: {total_lines}
- Files affected: {file_count}
- Chunking: {yes/no}
- Reviewer mode: {single/parallel}
- Instances: {count}

Starting code review...
```

### 8. Mark Phase Complete

- Update todo: mark Analyze as `completed`
- Proceed to Review phase

## Size Estimation Reference

| Lines Changed | Estimated Review Time | Recommended Mode |
| ------------- | --------------------- | ---------------- |
| 1-50          | Quick                 | Single           |
| 51-200        | Standard              | Single           |
| 201-400       | Extended              | Single or Parallel |
| 401-800       | Chunked               | Parallel (2-3)   |
| 800+          | Multi-chunk           | Parallel (4-5)   |

## Chunking Examples

**Example 1: Large PR with 600 lines across 8 files**
```
Strategy: by_file
Chunks:
  [1] src/components/ (3 files, ~200 lines)
  [2] src/services/ (3 files, ~220 lines)
  [3] src/utils/ + tests/ (2 files, ~180 lines)
```

**Example 2: Single file with 500 lines changed**
```
Strategy: by_criteria
Chunks:
  [1] Security + Performance review
  [2] Functionality + Error Handling review
  [3] Readability + Architecture + Testing + Docs review
```
