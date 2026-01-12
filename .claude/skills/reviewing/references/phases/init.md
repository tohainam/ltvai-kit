# Phase 1: Init

Parse review request and determine scope.

## Steps

### 1. Mark Phase In Progress

- Update todo: mark Init as `in_progress`

### 2. Parse User Request

Analyze the natural language input to determine:

- **Scope type**: staged, pr, commit, branch, files, or working
- **Target**: specific PR number, commit hash, branch name, or file paths
- **Additional context**: any specific focus areas mentioned

### 3. Detect Scope

Use pattern matching on the args:

**Staged Changes**
```
Patterns: "staged", "staging", "cached"
Result:
  scope = "staged"
  git_cmd = "git diff --staged"
  description = "Staged changes"
```

**Pull Request**
```
Patterns: "PR #N", "pull request N", "pr N"
Result:
  scope = "pr"
  pr_number = extracted number
  git_cmd = "gh pr diff {pr_number}"
  description = "PR #{pr_number}"
```

**Specific Commit**
```
Patterns: "commit [hash]", "[7+ char hash]"
Result:
  scope = "commit"
  commit_hash = extracted hash
  git_cmd = "git show {commit_hash}"
  description = "Commit {commit_hash}"
```

**Branch Comparison**
```
Patterns: "vs main", "compare to", "branch", "against main"
Result:
  scope = "branch"
  base_branch = extracted branch or "main"
  git_cmd = "git diff {base_branch}...HEAD"
  description = "Changes vs {base_branch}"
```

**Specific Files**
```
Patterns: file paths like "src/", "*.ts", specific filenames
Result:
  scope = "files"
  file_paths = extracted paths
  description = "Files: {paths}"
```

**Working Directory (Default)**
```
Patterns: "changes", "my changes", or no clear pattern
Result:
  scope = "working"
  git_cmd = "git diff HEAD"
  description = "Uncommitted changes"
```

### 4. Validate Scope

Execute validation based on scope type:

**For staged:**
```bash
git diff --staged --stat
```
If empty, inform user: "No staged changes found."

**For pr:**
```bash
gh pr view {pr_number} --json state,title,changedFiles
```
If PR not found or closed, inform user.

**For commit:**
```bash
git cat-file -t {commit_hash}
```
If invalid, inform user.

**For branch:**
```bash
git rev-parse --verify {base_branch}
```
If branch not found, suggest alternatives.

**For files:**
```bash
ls {file_paths}
```
If files not found, inform user.

**For working:**
```bash
git diff HEAD --stat
```
If empty, inform user: "No uncommitted changes found."

### 5. Store Scope Context

Store for use in subsequent phases:

```
REVIEW_CONTEXT = {
  scope: "{scope_type}",
  git_cmd: "{command}",
  target: "{pr_number | commit_hash | branch_name | file_paths}",
  description: "{human-readable description}"
}
```

### 6. Inform User

```
Review scope detected: {description}
Command: {git_cmd}

Proceeding to analyze the changes...
```

### 7. Mark Phase Complete

- Update todo: mark Init as `completed`
- Proceed to Analyze phase
