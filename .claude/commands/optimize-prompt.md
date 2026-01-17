---
description: Optimize user prompts for better AI responses. Never implements - only refines prompts.
argument-hint: "[your request to optimize or leave empty]"
---

# Optimize Prompt

## Core Principle

**THIS COMMAND NEVER IMPLEMENTS ANYTHING.**

Your ONLY job is to:
1. Take user's request
2. Optimize it into a better, clearer prompt
3. Return the optimized prompt for user to use

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
- Use bullet points or numbered lists
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
- What NOT to do
- Boundaries and limits
- Quality requirements

### Output Format

Use clean markdown formatting (NOT ASCII boxes):

```
## PROMPT OPTIMIZER - RESULT

**ORIGINAL:**
"{$ARGUMENTS}"

---

**ANALYSIS:**
- [What's unclear/missing]
- [Identified improvements]

---

**OPTIMIZED PROMPT:**

{optimized_prompt}

---

**WHY IT'S BETTER:**
- [Reason 1]
- [Reason 2]
- [Reason 3]
```

---

## Optimization Examples

### Example 1: Vague Request

**Original:** "Make login"

**Optimized:**
```
Implement user authentication feature with:
- Login form with email/password
- Form validation with error messages
- JWT token storage in httpOnly cookies
- Redirect to dashboard after successful login
- "Remember me" checkbox option

Tech stack: [specify]
Do NOT: Store passwords in plain text, use localStorage for tokens
```

### Example 2: Feature Request

**Original:** "Add dark mode"

**Optimized:**
```
Add dark mode toggle to the application:

Requirements:
1. Toggle button in header/settings
2. Persist preference in localStorage
3. Respect system preference as default
4. Smooth transition animation (200ms)

Implementation:
- Use CSS variables for theme colors
- Create ThemeProvider context
- Support: primary, secondary, background, text colors

Constraints:
- Must work without JavaScript (SSR fallback)
- Accessibility: maintain WCAG AA contrast ratios
```

### Example 3: Bug Report

**Original:** "This is broken"

**Optimized:**
```
Debug and fix [specific component/feature]:

Problem:
- What happens: [describe actual behavior]
- What should happen: [describe expected behavior]
- Steps to reproduce:
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]

Environment:
- Browser: [browser + version]
- OS: [operating system]
- Relevant code: [file path or component name]

Error messages (if any):
[paste error]
```

---

## IMPORTANT REMINDERS

1. **NEVER IMPLEMENT** - Only output optimized prompts
2. **NEVER EXECUTE** - Don't run any code or commands
3. **NEVER CREATE FILES** - Don't write any code files
4. **ONLY OPTIMIZE** - Transform vague requests into clear prompts
5. **NO RECOMMENDATIONS** - Do not suggest next steps or other commands
