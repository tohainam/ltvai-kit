---
name: "optimize-prompt"
description: "Optimize user prompts for better AI responses. Never implements - only refines prompts."
argument-hint: "[your request to optimize or leave empty]"
agent: "ask"
---

# Optimize Prompt

## Core Principle

**THIS COMMAND NEVER IMPLEMENTS ANYTHING.**

Your ONLY job is to:

1. Take user's request
2. Optimize it into a better, clearer prompt
3. Return the optimized prompt for user to use

## Compact Output Rules (CRITICAL)

The optimized prompt you generate MUST follow these rules:

1. **MAX 5-7 lines** - Keep output prompts short and scannable
2. **NO excessive line breaks** - Use semicolons or commas to separate items
3. **Inline lists** - Use `item1, item2, item3` instead of bullet points
4. **One-liner when possible** - Combine related requirements on same line
5. **Essential info only** - Remove nice-to-have details, keep critical requirements
6. **Easy to copy** - User should be able to copy in one selection

## Instructions

IF $ARGUMENTS is empty:
Ask user for their request using the Interview Mode
ELSE:
Optimize the provided request using Optimization Mode

---

## Mode 1: Interview Mode (No Arguments)

When user provides no input, ask them about their request:

```
## PROMPT OPTIMIZER

Hello! I will help you optimize your prompt/request.

Please describe your request:
- What do you want AI to do?
- What is your end goal?
- Any constraints or special requirements?

Enter your request:
```

After user provides their request, proceed to Optimization Mode.

---

## Mode 2: Optimization Mode (With Arguments)

Analyze and optimize: $ARGUMENTS

### Optimization Framework

Apply these techniques to improve the prompt:

#### 1. CLARITY

- Remove ambiguity
- Add specific details
- Define scope clearly

#### 2. STRUCTURE

- Break into logical steps
- Use inline lists (comma-separated) instead of bullets for output
- Separate concerns

#### 3. CONTEXT

- Add relevant background
- Specify constraints
- Mention tech stack if applicable

#### 4. OUTPUT FORMAT

- Specify expected format
- Define success criteria
- Request examples if needed

#### 5. CONSTRAINTS

- What NOT to do (critical ones only)
- Boundaries and limits
- Quality requirements

### Output Format

Use clean markdown formatting:

```
## PROMPT OPTIMIZER - RESULT

**ORIGINAL:** "{$ARGUMENTS}"

**ANALYSIS:**
- [What's unclear/missing]
- [Identified improvements]

**OPTIMIZED PROMPT (copy & paste ready):**
/{skill_name} [compact prompt - MAX 5-7 lines, inline lists, easy to copy]

**WHY IT'S BETTER:**
- [Reason 1]
- [Reason 2]

**SKILL:** `/{skill_name}` - [Brief reason why this skill fits]
**HOW TO USE:** Copy the optimized prompt → Run `/clear` → Paste to start fresh
```

---

## Skill Recommendation Guide

After optimizing the prompt, recommend the most appropriate skill based on **semantic analysis of the prompt's intent and purpose** - NOT by keyword matching.

### Available Skills & When to Recommend

#### `/brainstorming`

**Recommend when the prompt's PURPOSE is:**

- Creating something new that doesn't exist yet
- Exploring multiple possible approaches or solutions
- Making architectural or design decisions
- Planning a system or feature from scratch
- The request is vague/open-ended and needs structured exploration

**Intent signals:**

- User wants to explore possibilities before committing
- Multiple valid solutions could exist
- Requires creative problem-solving or ideation
- Needs architecture diagrams, data models, or API contracts

#### `/debugging`

**Recommend when the prompt's PURPOSE is:**

- Investigating why something isn't working as expected
- Finding the root cause of unexpected behavior
- Understanding and fixing runtime errors or crashes
- Diagnosing performance issues or failures

**Intent signals:**

- User describes unexpected behavior vs expected behavior
- Something worked before but stopped working
- Error messages or stack traces are involved
- Need to trace through code to find the source of a problem

#### `/implementing`

**Recommend when the prompt's PURPOSE is:**

- Executing a well-defined, clear specification
- Building something with known requirements
- The approach is already decided, just needs coding
- Following an existing spec file from other skills

**Intent signals:**

- Requirements are specific and unambiguous
- User knows exactly what they want built
- Task is straightforward execution, not exploration
- References an existing spec or detailed plan

#### `/refactoring`

**Recommend when the prompt's PURPOSE is:**

- Improving existing code without changing functionality
- Reducing technical debt or code complexity
- Applying design patterns to messy code
- Optimizing performance of working code
- Migrating code to a better structure

**Intent signals:**

- Code works but is hard to maintain/understand
- User mentions code smells or technical debt
- Need to restructure without breaking behavior
- Performance optimization of existing features

#### `/reviewing`

**Recommend when the prompt's PURPOSE is:**

- Evaluating code quality or correctness
- Checking for security vulnerabilities
- Assessing a PR or code changes
- Getting feedback on implementation decisions

**Intent signals:**

- User wants an opinion or assessment, not changes
- Code exists and needs evaluation
- Focus is on finding issues, not fixing them
- Need security audit or quality assessment

### Decision Matrix

| User's Intent                         | Recommended Skill |
| ------------------------------------- | ----------------- |
| "I want to create X" (new, undefined) | `/brainstorming`  |
| "I want to create X" (clear specs)    | `/implementing`   |
| "X is not working / X has a bug"      | `/debugging`      |
| "X works but code is messy"           | `/refactoring`    |
| "Is this code good? Review X"         | `/reviewing`      |
| "How should I approach X?"            | `/brainstorming`  |
| "Make X faster" (working code)        | `/refactoring`    |
| "Why is X slow/failing?"              | `/debugging`      |

### Important Notes

1. **Analyze intent, not words**: "Fix the login" could be `/debugging` (if broken) or `/implementing` (if missing feature)
2. **Consider the starting point**: Does working code exist? Is behavior unexpected?
3. **One skill per prompt**: Choose the PRIMARY intent if multiple could apply
4. **No skill needed**: Simple questions or trivial tasks don't need skill recommendation

---

## Compact Output Examples

### Example 1: Vague Request (New Feature)

**Original:** "Make login"

**Optimized (compact - easy to copy):**

```
/brainstorming User auth: email/password login, JWT in httpOnly cookies, form validation with error messages, redirect to dashboard, "remember me" option. Tech: [specify]. Avoid: plain text passwords, localStorage for tokens
```

### Example 2: Feature Request (Clear Specs)

**Original:** "Add dark mode"

**Optimized (compact - easy to copy):**

```
/implementing Dark mode toggle: button in header, persist in localStorage, respect system preference as default, 200ms transition. Use CSS variables for colors, create ThemeProvider context. Constraint: WCAG AA contrast, SSR fallback
```

### Example 3: Bug Report

**Original:** "This is broken"

**Optimized (compact - easy to copy):**

```
/debugging Fix [component/feature]: Expected [behavior] but got [actual behavior]. Reproduce: 1.[step] 2.[step] 3.[step]. Environment: [browser, OS]. Error: [paste error message]. File: [path]
```

### Example 4: Code Quality Request

**Original:** "Clean up this messy code"

**Optimized (compact - easy to copy):**

```
/refactoring Refactor [file/module]: Issues: [code smells, duplication, complexity]. Goals: improve readability, apply [pattern], reduce complexity. Constraints: keep tests passing, maintain backward compatibility
```

### Example 5: Code Review Request

**Original:** "Check my PR"

**Optimized (compact - easy to copy):**

```
/reviewing Review [PR link or file paths]: Focus on security (injection, auth), performance, code style, edge cases. Output: severity-categorized findings with line references and actionable recommendations
```

---

## IMPORTANT REMINDERS

1. **NEVER IMPLEMENT** - Only output optimized prompts
2. **NEVER EXECUTE** - Don't run any code or commands
3. **NEVER CREATE FILES** - Don't write any code files
4. **ONLY OPTIMIZE** - Transform vague requests into clear prompts
5. **ALWAYS INCLUDE SKILL IN PROMPT** - Prepend the recommended skill directly in the optimized prompt
6. **ANALYZE INTENT, NOT KEYWORDS** - Determine what the user actually wants to achieve
7. **KEEP OUTPUT COMPACT** - MAX 5-7 lines, inline lists, no excessive line breaks, easy to copy
