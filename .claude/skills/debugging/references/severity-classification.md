# Bug Severity Classification

## Severity Levels Overview

| Level    | Symbol | Description                                    | Response Time | Fix Priority     |
| -------- | ------ | ---------------------------------------------- | ------------- | ---------------- |
| CRITICAL | 🔴     | Security breach, data loss, system failure     | Immediate     | MUST FIX NOW     |
| HIGH     | 🟠     | Major functionality broken, significant impact | Same day      | FIX BEFORE MERGE |
| MEDIUM   | 🟡     | Feature degraded, workaround available         | This sprint   | SHOULD FIX       |
| LOW      | 🟢     | Minor inconvenience, cosmetic issues           | Backlog       | NICE TO HAVE     |

---

## CRITICAL Severity

### Definition

Bugs that pose immediate threat to security, data integrity, or system availability. These require immediate attention and hotfix deployment.

### Criteria (Any ONE is sufficient)

| Criterion                | Description                                  | Examples                                      |
| ------------------------ | -------------------------------------------- | --------------------------------------------- |
| **Security Breach**      | Unauthorized access to data or systems       | SQL injection, auth bypass, privilege escalation |
| **Data Loss**            | Permanent loss or corruption of user data    | Delete without backup, data overwrite bug     |
| **System Down**          | Complete system or service unavailability    | Crash loop, startup failure, infinite loop    |
| **PII Exposure**         | Personal identifiable information leaked     | User data in logs, exposed credentials        |
| **Financial Impact**     | Direct monetary loss or liability            | Double charging, payment processing failure   |

### Auto-Escalation Rules

```
IF issue_type == "security":
    severity = max(severity, HIGH)  # Minimum HIGH for security bugs

IF data_loss_possible == true:
    severity = CRITICAL

IF production_down == true:
    severity = CRITICAL
```

### Examples

| Bug Description                                    | Classification |
| -------------------------------------------------- | -------------- |
| Auth token exposed in URL query parameters         | CRITICAL       |
| Database deletion without confirmation             | CRITICAL       |
| API accepts negative payment amounts               | CRITICAL       |
| Memory leak causing OOM crash every 4 hours        | CRITICAL       |
| SSL certificate validation bypassed                | CRITICAL       |

### Response Protocol

1. **Immediate**: Stop current work
2. **Alert**: Notify team lead and security team
3. **Contain**: Disable affected feature if possible
4. **Fix**: Deploy hotfix within hours
5. **Review**: Post-incident analysis within 24 hours

---

## HIGH Severity

### Definition

Bugs that significantly impact core functionality or affect a large number of users. No workaround available or workaround is unacceptable.

### Criteria (Any ONE is sufficient)

| Criterion                | Description                                  | Examples                                      |
| ------------------------ | -------------------------------------------- | --------------------------------------------- |
| **Core Feature Broken**  | Primary functionality doesn't work           | Login failure, checkout broken, search returns 0 |
| **High User Impact**     | Affects >10% of users or critical user path  | Mobile app crash on startup for iOS 17        |
| **Data Integrity**       | Data becomes inconsistent but not lost       | Duplicate records, wrong calculations         |
| **Performance Critical** | Response time >10x normal or timeout         | API timeout during checkout                   |
| **Regression**           | Previously working feature now broken        | Update broke existing functionality           |

### Examples

| Bug Description                                    | Classification |
| -------------------------------------------------- | -------------- |
| Login fails for users with special characters      | HIGH           |
| Order total calculates wrong on multi-item cart    | HIGH           |
| File upload fails for files > 5MB                  | HIGH           |
| Search returns no results for valid queries        | HIGH           |
| Email notifications not being sent                 | HIGH           |

### Response Protocol

1. **Prioritize**: Move to top of sprint
2. **Assign**: Dedicated developer
3. **Fix**: Deploy within 1-2 business days
4. **Verify**: Extensive testing before release
5. **Monitor**: Watch metrics post-deployment

---

## MEDIUM Severity

### Definition

Bugs that impact functionality but have acceptable workarounds. Feature is degraded but usable.

### Criteria

| Criterion                | Description                                  | Examples                                      |
| ------------------------ | -------------------------------------------- | --------------------------------------------- |
| **Partial Feature Loss** | Feature works but with limitations           | Export works but missing some columns         |
| **Workaround Available** | Users can accomplish goal differently        | Refresh page to fix display issue             |
| **Edge Case**            | Bug only occurs in specific conditions       | Error when name contains emoji                |
| **Performance Degraded** | Slower than expected but acceptable          | List takes 3s instead of 1s to load           |
| **UI/UX Issue**          | Interface confusing but functional           | Button placement causes accidental clicks     |

### Examples

| Bug Description                                    | Classification |
| -------------------------------------------------- | -------------- |
| Date picker doesn't work on Safari 15              | MEDIUM         |
| Loading spinner shows even after content loads     | MEDIUM         |
| Filter resets when switching tabs                  | MEDIUM         |
| Error message is generic instead of specific       | MEDIUM         |
| Dark mode has contrast issues on some elements     | MEDIUM         |

### Response Protocol

1. **Schedule**: Plan for current or next sprint
2. **Assign**: Include in regular sprint work
3. **Fix**: Deploy within 1-2 weeks
4. **Test**: Standard testing procedures
5. **Document**: Update known issues if needed

---

## LOW Severity

### Definition

Minor bugs that cause minimal inconvenience. Cosmetic issues, minor inconsistencies, or edge cases with easy workarounds.

### Criteria

| Criterion                | Description                                  | Examples                                      |
| ------------------------ | -------------------------------------------- | --------------------------------------------- |
| **Cosmetic**             | Visual issues with no functional impact      | Misaligned icon, color slightly off           |
| **Minor Inconsistency**  | Behavior differs but acceptable              | Button style varies between pages             |
| **Rare Edge Case**       | Extremely unlikely scenario                  | Bug with 8+ character emoji in name           |
| **Enhancement Request**  | "Would be nice" improvements                 | Want autocomplete in search                   |
| **Documentation**        | Help text unclear or outdated                | Tooltip has typo                              |

### Examples

| Bug Description                                    | Classification |
| -------------------------------------------------- | -------------- |
| Footer text has typo "recieve" → "receive"         | LOW            |
| Hover state slightly different between browsers    | LOW            |
| Empty state message could be more helpful          | LOW            |
| Form labels not perfectly aligned                  | LOW            |
| Success message disappears too quickly (3s vs 5s)  | LOW            |

### Response Protocol

1. **Log**: Add to backlog
2. **Batch**: Group with similar issues
3. **Fix**: Address when convenient (tech debt sprints)
4. **Verify**: Basic testing

---

## Severity by Issue Type

### Default Severity Mapping

| Issue Type      | Default Severity | Rationale                                |
| --------------- | ---------------- | ---------------------------------------- |
| runtime_error   | HIGH             | Application instability                  |
| logic_bug       | MEDIUM           | Wrong output but usually not critical    |
| performance     | MEDIUM           | Unless timeout/crash then HIGH           |
| security        | HIGH (min)       | Security always requires attention       |
| regression      | HIGH             | Broke something that worked              |

### Adjustment Factors

```
# Increase Severity
IF affects_production: severity += 1
IF affects_money: severity = max(severity, HIGH)
IF affects_many_users: severity += 1
IF no_workaround: severity += 1

# Decrease Severity
IF edge_case_only: severity -= 1
IF easy_workaround: severity -= 1
IF development_env_only: severity -= 1
```

---

## Severity Decision Matrix

### Impact vs Frequency

|              | Low Frequency   | Medium Frequency | High Frequency  |
| ------------ | --------------- | ---------------- | --------------- |
| **High Impact**   | HIGH       | CRITICAL         | CRITICAL        |
| **Medium Impact** | MEDIUM     | HIGH             | HIGH            |
| **Low Impact**    | LOW        | LOW              | MEDIUM          |

### Impact Assessment

| Impact Level | Description                              | Examples                          |
| ------------ | ---------------------------------------- | --------------------------------- |
| High         | Core functionality, data, security       | Can't login, data lost, hacked    |
| Medium       | Important feature, user experience       | Feature broken, confusing UX      |
| Low          | Minor feature, cosmetic                  | Typo, alignment, rare edge case   |

### Frequency Assessment

| Frequency    | Description                              | Measurement                       |
| ------------ | ---------------------------------------- | --------------------------------- |
| High         | Affects most users most of the time      | >50% of sessions                  |
| Medium       | Affects some users some of the time      | 10-50% of sessions                |
| Low          | Rare occurrence, specific conditions     | <10% of sessions                  |

---

## Auto-Detection Hints

### Keywords Suggesting CRITICAL

- "security", "breach", "unauthorized", "injection", "XSS", "CSRF"
- "data loss", "deleted", "corrupted", "overwritten"
- "down", "crash", "unavailable", "unresponsive"
- "exposed", "leaked", "credentials", "password", "token"
- "payment", "money", "charge", "billing"

### Keywords Suggesting HIGH

- "broken", "fails", "doesn't work", "error"
- "login", "auth", "checkout", "payment"
- "all users", "everyone", "always"
- "regression", "worked before", "after update"
- "timeout", "hang", "freeze"

### Keywords Suggesting MEDIUM

- "sometimes", "occasionally", "intermittent"
- "workaround", "if you try again"
- "specific browser", "only on", "edge case"
- "slow", "delayed", "takes long"
- "confusing", "unclear", "hard to"

### Keywords Suggesting LOW

- "typo", "spelling", "grammar"
- "alignment", "spacing", "color", "style"
- "would be nice", "enhancement", "suggestion"
- "rare", "unlikely", "specific scenario"
- "minor", "small", "trivial"

---

## Quick Reference Card

```
CRITICAL 🔴
- Security breach, data loss, system down
- Fix: Immediate
- Notify: Team lead + security

HIGH 🟠
- Core feature broken, no workaround
- Fix: Same day / 1-2 days
- Priority: Top of sprint

MEDIUM 🟡
- Feature degraded, workaround exists
- Fix: This sprint / 1-2 weeks
- Priority: Normal sprint work

LOW 🟢
- Cosmetic, minor inconvenience
- Fix: When convenient
- Priority: Backlog
```
