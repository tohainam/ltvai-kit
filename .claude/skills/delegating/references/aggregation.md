# Aggregation Rules

Rules for main agent to combine results from parallel instances.

## researcher

- Merge findings by relevance
- Dedupe same sources
- Sort by date (newest first)
- Combine confidence: use lowest level

## scouter

- Merge file paths (dedupe)
- Files found by multiple methods = higher relevance
- Sort by match count
- Build relationship map

## reviewer

- Merge issues by severity (Critical > Warning > Info)
- Dedupe same file:line issues
- Sum statistics
- Verdict: most severe wins (any Critical = REQUEST CHANGES)

## debugger

- Combine root cause analyses from all instances
- Identify common evidence across hypotheses
- Merge fix suggestions, dedupe overlapping fixes
- Priority: fixes that address multiple hypotheses first
- Combine verification steps
- Confidence: highest if multiple instances agree on cause

## Template for New Agent

### [new_agent]

- [How to merge findings]
- [How to dedupe]
- [How to sort/prioritize]
- [How to determine final result]
