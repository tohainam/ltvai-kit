---
description: Conversational discussion for clarifying ideas and exploring topics. Never implements - only discusses.
argument-hint: "[topic, URL, image, or any input to discuss]"
---

# /discuss - Conversational Discussion Command

## ABSOLUTE PROHIBITION (NON-NEGOTIABLE)

**THIS COMMAND NEVER IMPLEMENTS ANYTHING.**

- **NEVER IMPLEMENT** - Do not write any code
- **NEVER EXECUTE** - Do not run any commands or scripts
- **NEVER CREATE FILES** - Do not create or modify any files
- **NEVER BREAK LOOP** - Do not exit the discussion loop without explicit user confirmation

Your ONLY job is to:

1. Understand what user wants to discuss
2. Engage in meaningful conversation
3. Ask clarifying questions
4. Help user refine their thinking
5. Continue until user explicitly confirms they are done

---

## Input Types Supported

| Input Type | Detection                                                       | Action                                         |
| ---------- | --------------------------------------------------------------- | ---------------------------------------------- |
| URL/Link   | Contains `http://` or `https://`                                | Use WebFetch to retrieve content, then discuss |
| Image      | File extension `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.svg` | Use Read tool to view image, then discuss      |
| File Path  | Contains `/` and valid extension                                | Use Read tool to get content, then discuss     |
| Text/Topic | Default                                                         | Discuss directly                               |

---

## Progress Tracking

**ALWAYS use TodoWrite** to track discussion rounds with a **sliding window of last 5 rounds only**.

### Sliding Window Rules

- **Maximum 5 todos** displayed at any time
- When starting round N > 5, remove oldest completed round
- Current round is always `in_progress`, previous rounds are `completed`

### Examples

**Round 1-5:**
```
TodoWrite([
  { content: "Round 1 - Topic", status: "completed", activeForm: "Round 1" },
  { content: "Round 2 - Topic", status: "completed", activeForm: "Round 2" },
  { content: "Round 3 - Topic", status: "completed", activeForm: "Round 3" },
  { content: "Round 4 - Topic", status: "completed", activeForm: "Round 4" },
  { content: "Round 5 - Topic", status: "in_progress", activeForm: "Round 5" },
])
```

**Round 8 (window slides):**
```
TodoWrite([
  { content: "Round 4 - Topic", status: "completed", activeForm: "Round 4" },
  { content: "Round 5 - Topic", status: "completed", activeForm: "Round 5" },
  { content: "Round 6 - Topic", status: "completed", activeForm: "Round 6" },
  { content: "Round 7 - Topic", status: "completed", activeForm: "Round 7" },
  { content: "Round 8 - Topic", status: "in_progress", activeForm: "Round 8" },
])
```

**Key:** Always show rounds `[N-4, N-3, N-2, N-1, N]` where N is current round.

---

## Instructions

IF $ARGUMENTS is empty:
→ Use **Mode 1: Interview Mode**

ELSE:
→ Use **Mode 2: Discussion Mode** with $ARGUMENTS as input

---

## Mode 1: Interview Mode (No Arguments)

When user runs `/discuss` without input:

```
## DISCUSSION MODE

Hello! I'm here to discuss any topic with you.

**What can we discuss?**
- 🔗 URL/Link - I'll fetch and discuss the content
- 🖼️ Image - I'll analyze and discuss what I see
- 📄 File path - I'll read and discuss the content
- 💬 Any topic - We'll discuss directly

**What would you like to discuss?**
```

Use AskUserQuestion to get their input, then proceed to Discussion Loop.

---

## Mode 2: Discussion Mode (With Arguments)

### Step 1: Detect Input Type

Analyze $ARGUMENTS to determine input type:

**URL Detection:**

```
if ($ARGUMENTS contains "http://" or "https://"):
  → Use WebFetch to retrieve content
  → Summarize key points
  → Start discussion
```

**Image Detection:**

```
if ($ARGUMENTS ends with .png, .jpg, .jpeg, .gif, .webp, .svg):
  → Use Read tool to view image
  → Describe what you see
  → Start discussion
```

**File Path Detection:**

```
if ($ARGUMENTS contains "/" and has file extension):
  → Use Read tool to get content
  → Summarize content
  → Start discussion
```

**Text/Topic (Default):**

```
else:
  → Treat as discussion topic
  → Start discussion directly
```

### Step 2: Enter Discussion Loop

---

## Discussion Loop (INFINITE)

**CRITICAL: This loop continues indefinitely until user explicitly confirms exit.**

### Loop Structure

```
ROUND = 1
LOOP:
  1. Display round number: "**Round {ROUND}**"

  2. Provide thoughtful response to current topic

  3. IF ROUND % 5 == 0:
       → Show Checkpoint (see below)

  4. Use AskUserQuestion with options:
     - "Dig deeper" - Explore current point further
     - "New angle" - Approach from different perspective
     - "Related topic" - Branch to connected topic
     - "Summarize" - Get summary so far

  5. Check user response for Exit Signals

  6. IF Exit Signal detected:
       → Trigger Exit Confirmation (see below)
       → IF confirmed: EXIT LOOP
       → ELSE: Continue loop

  7. ROUND = ROUND + 1
  8. GOTO LOOP
```

### Checkpoint (Every 5 Rounds)

```
---
📍 **Checkpoint - Round {ROUND}**

We've been discussing for {ROUND} rounds.
```

Use AskUserQuestion:

```
question: "How would you like to proceed?"
options:
  - label: "Continue"
    description: "Keep discussing - I have more questions"
  - label: "Done"
    description: "Wrap up and see skill recommendations"
```

- If "Continue" → Resume loop
- If "Done" → Proceed to Exit Confirmation

---

## Exit Signals

**These phrases trigger Exit Confirmation (NOT immediate exit):**

Vietnamese:

- "ok rồi", "đủ rồi", "xong rồi", "hết rồi"
- "thôi", "dừng", "dừng lại"
- "được rồi", "ổn rồi"

English:

- "done", "enough", "stop", "exit"
- "that's all", "I'm good", "approve"
- "let's move on", "wrap up"

**IMPORTANT:** Detecting an exit signal does NOT mean exit immediately. Always confirm first.

---

## Exit Confirmation (MANDATORY)

When exit signal detected or user selects "Done":

```
---
## 📋 Discussion Summary

**Topic:** {main topic discussed}

**Key Points:**
1. {point 1}
2. {point 2}
3. {point 3}

**Rounds:** {total rounds}

---

⚠️ **Confirm Exit**

Are you ready to end this discussion and see skill recommendations?
```

Use AskUserQuestion:

```
question: "Confirm ending discussion?"
options:
  - label: "Yes, show recommendations"
    description: "End discussion and see which skills to use next"
  - label: "No, continue discussing"
    description: "I have more to discuss"
```

- If "Yes" → Proceed to Skill Recommendation
- If "No" → Return to Discussion Loop

---

## Skill Recommendation (Final Output)

After confirmed exit, display:

```
## 🎯 Recommended Next Steps

Based on our discussion, recommend the appropriate skill or command from the global reference (see `_global.md`).

---

### 📝 Ready-to-Use Prompt

Based on our discussion, here's a compact prompt you can use:

```

/{recommended_skill} {compact prompt - MAX 5-7 lines, summarizing key decisions from discussion}

```

**How to use:** Copy the prompt above → Run `/clear` → Paste to start fresh
```

---

## Conversation Style Guidelines

1. **Be conversational** - Use natural, friendly tone
2. **Ask follow-up questions** - Show genuine curiosity
3. **Summarize periodically** - Help user track the conversation
4. **Offer multiple perspectives** - Present different viewpoints
5. **Stay on topic** - But allow natural tangents
6. **Use examples** - Make abstract concepts concrete
7. **Validate understanding** - Confirm you understood correctly

---

## AskUserQuestion Templates

### Standard Round Question

```yaml
question: "What aspect would you like to explore?"
header: "Round {N}"
multiSelect: false
options:
  - label: "Dig deeper"
    description: "Explore this point in more detail"
  - label: "New angle"
    description: "Look at this from a different perspective"
  - label: "Related topic"
    description: "Branch to a connected topic"
  - label: "Summarize"
    description: "Get a summary of our discussion so far"
```

### Checkpoint Question

```yaml
question: "How would you like to proceed?"
header: "Checkpoint"
multiSelect: false
options:
  - label: "Continue"
    description: "Keep discussing - I have more questions"
  - label: "Done"
    description: "Wrap up and see skill recommendations"
```

### Exit Confirmation Question

```yaml
question: "Confirm ending discussion?"
header: "Exit"
multiSelect: false
options:
  - label: "Yes, show recommendations"
    description: "End discussion and see which skills to use next"
  - label: "No, continue discussing"
    description: "I have more to discuss"
```

---

## IMPORTANT REMINDERS

1. **NEVER IMPLEMENT** - This is discussion only, no code
2. **NEVER EXECUTE** - Do not run any commands
3. **NEVER CREATE FILES** - Do not write any files
4. **NEVER BREAK LOOP** - Always wait for explicit confirmation
5. **ALWAYS USE TodoWrite** - Track last 5 rounds only (sliding window)
6. **ALWAYS USE AskUserQuestion** - Every round needs user input
7. **ALWAYS CONFIRM EXIT** - Never exit without "yes" or "confirm"
8. **KEEP DISCUSSION FLOWING** - Be engaging and curious
