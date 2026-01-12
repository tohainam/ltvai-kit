---
name: naming
description: Generate consistent names for files, folders, and identifiers. Used by brainstorming (spec naming) and coding (session naming) skills. Internal utility - not user-invocable.
allowed-tools: none
user-invocable: false
---

# Naming

Generate consistent, meaningful names for files, folders, and identifiers.

## Algorithm

1. Analyze input (request text, feature description)
2. Extract key concepts (2-3 words max)
3. Format: kebab-case, lowercase
4. Max length: 30 characters
5. Ensure uniqueness in target directory

## Extraction Rules

**Focus on**:

- Action verbs (add, fix, refactor, implement, create, update)
- Main features/concepts (auth, login, payment, user, api)
- Technologies only if central (jwt, oauth, graphql)

**Ignore**:

- Filler words (the, a, with, and, for, to, in, of, etc.)
- Generic terms (feature, functionality, system, module)
- Redundant qualifiers (new, better, improved)

## Formatting

- All lowercase
- Words separated by hyphens (kebab-case)
- No special characters
- Max 30 characters (truncate if necessary)
- 2-4 words typical

## Examples

| Input                                       | Output                |
| ------------------------------------------- | --------------------- |
| "Add social login with Google and Facebook" | social-login          |
| "Refactor payment processing module"        | payment-refactor      |
| "Fix bug in user registration flow"         | user-registration-fix |
| "Implement dark mode toggle"                | dark-mode-toggle      |
| "Add JWT authentication with refresh token" | jwt-auth-refresh-token |
| "Update API endpoint for user profile"      | api-user-profile      |
| "Create pagination component"               | pagination-component  |

## Uniqueness Check

If target directory already contains a file/folder with generated name:

1. Append numeric suffix: `-2`, `-3`, etc.
2. Example: `social-login` exists -> use `social-login-2`

## Usage

This skill is invoked internally by other skills. Do not use directly.

### By Brainstorming Skill

```
Input: user request for spec
Output: spec filename (e.g., "social-login.md")
```

### By Coding Skill

```
Input: task description
Output: session folder name (e.g., "260111-social-login")
```
