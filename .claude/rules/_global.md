# Global Rules

## Skills & Commands Reference

### 🛠️ Producer Skills (Generate specs)

| Skill            | Purpose                       | When to Use                      |
| ---------------- | ----------------------------- | -------------------------------- |
| `/brainstorming` | Ideation, feature design      | New features, explore approaches |
| `/debugging`     | Bug analysis, find root cause | Complex bugs, need RCA           |
| `/refactoring`   | Improve code quality          | Code smells, technical debt      |
| `/reviewing`     | Code review, security audit   | PR review, quality check         |

### 🚀 Consumer Skill

| Skill           | Purpose       | When to Use                            |
| --------------- | ------------- | -------------------------------------- |
| `/implementing` | Execute specs | After having spec from producer skills |

### 🧩 Utility Skills

| Skill                   | Purpose            | When to Use                   |
| ----------------------- | ------------------ | ----------------------------- |
| `/ui-ux-pro-max`        | Design UI/UX       | Build interfaces, components  |
| `/mermaidjs-v11`        | Create diagrams    | Flowcharts, sequence diagrams |
| `/react-best-practices` | React optimization | Performance React/Next.js     |

### 📝 Commands (No code generation)

| Command            | Purpose         | When to Use                     |
| ------------------ | --------------- | ------------------------------- |
| `/discuss`         | Discuss ideas   | Clarify before implementation   |
| `/optimize-prompt` | Improve prompts | Prompts not giving good results |

---

## 📚 Documentation & Technology Rules

### Get Current Date

Always use `bash date` to get current date when needed:

```bash
date "+%Y-%m-%d"  # 2026-01-18
date "+%Y"        # Current year for search queries
```

### Always Use Latest Documentation

1. **Use Context7 MCP** for up-to-date docs:
   - `mcp__context7__resolve-library-id` → get library ID
   - `mcp__context7__query-docs` → query documentation

2. **WebSearch with current year** (run `date "+%Y"` first):
   - Example: "React best practices 2026" (use actual year from bash)

3. **Never assume** API syntax from memory - always verify latest docs
