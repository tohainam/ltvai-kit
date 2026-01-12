# Resume Logic

Handle draft detection and resume functionality.

## On Brainstorm Start

### 1. Check for Resume Flag

If args contain `--resume {feature_id}`:

- Load specified spec directly
- Skip draft detection prompt
- Continue from last incomplete phase

### 2. Scan for Drafts

```
glob: .claude/.specs/*.md
filter: frontmatter.status == "draft"
```

Read each file and extract:

- feature_id from frontmatter
- updated timestamp
- calculate relative time (e.g., "2h ago", "1d ago")

### 3. No Drafts Found

If no draft specs exist:

- Proceed directly to Intake phase with user's input

### 4. Drafts Found

Present options to user:

```
Found draft specs:
 1. social-login (draft) - last updated 2h ago
 2. payment-refactor (draft) - last updated 1d ago

Resume one of these or start new?
```

Use `AskUserQuestion`:

```
Question: "Found existing draft specs. What would you like to do?"
Header: "Resume"
Options:
  - label: "1. social-login"
    description: "Resume this draft (updated 2h ago)"
  - label: "2. payment-refactor"
    description: "Resume this draft (updated 1d ago)"
  - label: "Start new"
    description: "Create a new spec for your request"
```

### 5. Resume Selected

When user selects a draft:

1. Load spec file: `.claude/.specs/{feature_id}.md`
2. Read Discussion Log section
3. Determine last phase by checking content:

   - Has Overview? -> Intake complete
   - Has >= 1 requirement? -> Clarify in progress or complete
   - Has Related Files? -> Scout complete
   - Status still draft? -> Finalize not done

4. Summarize previous session:

   ```
   Resuming spec: {feature_id}

   Previous session summary:
   - Initial request: {brief from Discussion Log}
   - Current status: {what's filled in}
   - Missing: {what's still needed}

   Continuing from: {phase name}
   ```

5. Add new session to Discussion Log:

   ```markdown
   ## Session {N} - {YYYY-MM-DD HH:MM}

   (Resumed from previous session)
   ```

6. Continue from appropriate phase

### 6. Start New Selected

- Proceed to Intake phase with user's input
- Existing drafts remain untouched

## Resume from /code Command

When `/code` detects a draft spec that matches the task:

1. Show prompt:

   ```
   Found draft spec '{feature_id}' that matches your request.
   This spec is not yet approved.

   Would you like to resume brainstorming to finalize it first?
   ```

2. If yes: Switch to brainstorming skill with resume mode

   ```
   Skill(skill: "brainstorming", args: "--resume {feature_id}")
   ```

3. If no: Continue /code without spec

## Phase Detection Logic

```
function detect_current_phase(spec):

  # Priority 1: Read from frontmatter (explicit tracking)
  if spec.frontmatter.current_phase:
    return spec.frontmatter.current_phase

  # Priority 2: Fallback to content detection (for legacy specs)
  return detect_from_content(spec.content)

function detect_from_content(spec_content):

  overview = extract_section("## Overview", spec_content)
  requirements = extract_section("## Requirements", spec_content)
  related_files = extract_section("### Related Files", spec_content)
  agreed_approach = extract_section("## Agreed Approach", spec_content)

  if empty(overview) or len(overview) < 20:
    return "intake"  # Need to complete intake

  if not has_requirements(requirements):
    return "clarify"  # Need to add requirements

  if empty(related_files):
    return "scout"  # Need to scout

  if empty(agreed_approach):
    return "finalize"  # Need to agree approach

  return "finalize"  # Ready to finalize

function has_requirements(content):
  return regex_match(content, r"- \[ \] (FR|NFR)")
```

## Updating Timestamp

Whenever spec is modified during resume:

```yaml
---
status: draft
feature_id: social-login
created: 2026-01-11T10:30:00Z # Keep original
updated: 2026-01-11T14:45:00Z # Update this
---
```
