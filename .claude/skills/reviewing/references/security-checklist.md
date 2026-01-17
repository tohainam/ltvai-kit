# Security Review Checklist

## Overview

This checklist is based on OWASP guidelines and industry best practices for secure code review. Use this during Phase 2 (Security Track) of the reviewing process.

---

## OWASP Top 10 Patterns

### 1. Injection (A01:2021)

**What to Look For:**

| Pattern | Severity | Example |
| ------- | -------- | ------- |
| SQL Injection | CRITICAL | `query("SELECT * FROM users WHERE id = " + userId)` |
| Command Injection | CRITICAL | `exec("ls " + userInput)` |
| LDAP Injection | CRITICAL | `filter = "(cn=" + username + ")"` |
| NoSQL Injection | CRITICAL | `db.users.find({name: req.body.name})` |
| XPath Injection | HIGH | `xpath.evaluate("//user[@name='" + name + "']")` |

**Secure Patterns:**

```javascript
// SQL - Use parameterized queries
db.query("SELECT * FROM users WHERE id = ?", [userId]);

// Command - Use argument arrays
execFile("ls", ["-la", safePath]);

// NoSQL - Validate and sanitize
db.users.find({ name: { $eq: sanitize(req.body.name) } });
```

---

### 2. Broken Access Control (A02:2021)

**What to Look For:**

| Pattern | Severity | Example |
| ------- | -------- | ------- |
| Missing authorization checks | CRITICAL | Endpoint without auth middleware |
| IDOR (Insecure Direct Object Reference) | CRITICAL | `/api/user/{id}` without ownership check |
| Path traversal | CRITICAL | `readFile("../../../etc/passwd")` |
| Privilege escalation | CRITICAL | User can access admin functions |
| CORS misconfiguration | HIGH | `Access-Control-Allow-Origin: *` |

**Secure Patterns:**

```javascript
// Always check ownership
router.get("/api/documents/:id", auth, async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (doc.ownerId !== req.user.id) {
    return res.status(403).json({ error: "Forbidden" });
  }
  res.json(doc);
});

// Path validation
const safePath = path.resolve(baseDir, userInput);
if (!safePath.startsWith(baseDir)) {
  throw new Error("Invalid path");
}
```

---

### 3. Cryptographic Failures (A03:2021)

**What to Look For:**

| Pattern | Severity | Example |
| ------- | -------- | ------- |
| Hardcoded secrets | CRITICAL | `const API_KEY = "sk_live_abc123"` |
| Weak encryption | HIGH | `MD5`, `SHA1` for passwords |
| Sensitive data in logs | HIGH | `console.log(user.password)` |
| Missing HTTPS | HIGH | HTTP endpoints for sensitive data |
| Insecure random | MEDIUM | `Math.random()` for tokens |

**Secure Patterns:**

```javascript
// Use environment variables
const API_KEY = process.env.API_KEY;

// Use strong hashing for passwords
const hash = await bcrypt.hash(password, 12);

// Use crypto for random values
const token = crypto.randomBytes(32).toString("hex");
```

---

### 4. Insecure Design (A04:2021)

**What to Look For:**

| Pattern | Severity | Example |
| ------- | -------- | ------- |
| Missing rate limiting | HIGH | No throttling on login endpoint |
| No account lockout | HIGH | Unlimited login attempts |
| Missing CAPTCHA | MEDIUM | No bot protection on forms |
| Predictable IDs | MEDIUM | Sequential user IDs |

**Secure Patterns:**

```javascript
// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
});
app.use("/api/", limiter);

// Use UUIDs instead of sequential IDs
const userId = uuidv4();
```

---

### 5. Security Misconfiguration (A05:2021)

**What to Look For:**

| Pattern | Severity | Example |
| ------- | -------- | ------- |
| Default credentials | CRITICAL | `admin/admin`, `root/root` |
| Debug mode in production | HIGH | `DEBUG=true` in production |
| Verbose error messages | MEDIUM | Stack traces in API responses |
| Missing security headers | MEDIUM | No `X-Frame-Options`, CSP |
| Unnecessary features enabled | MEDIUM | Directory listing enabled |

**Secure Patterns:**

```javascript
// Security headers
app.use(helmet());

// Error handling - don't expose internals
app.use((err, req, res, next) => {
  console.error(err); // Log internally
  res.status(500).json({ error: "Internal Server Error" }); // Generic response
});
```

---

### 6. Vulnerable Components (A06:2021)

**What to Look For:**

| Pattern | Severity | Example |
| ------- | -------- | ------- |
| Known vulnerable packages | CRITICAL | `lodash < 4.17.21` |
| Outdated dependencies | HIGH | Major version behind |
| Unmaintained packages | MEDIUM | No updates in 2+ years |
| Excessive dependencies | LOW | 100+ transitive deps |

**Actions:**

```bash
# Check for vulnerabilities
npm audit
yarn audit
snyk test

# Update dependencies
npm update
npm outdated
```

---

### 7. Authentication Failures (A07:2021)

**What to Look For:**

| Pattern | Severity | Example |
| ------- | -------- | ------- |
| Weak password policy | HIGH | No minimum length requirement |
| Missing MFA | MEDIUM | No 2FA option |
| Session fixation | HIGH | Session ID not rotated after login |
| Insecure session storage | HIGH | Session in localStorage |
| Credential stuffing vulnerable | HIGH | No brute force protection |

**Secure Patterns:**

```javascript
// Strong password validation
const passwordSchema = Joi.string()
  .min(12)
  .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/);

// Secure session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
```

---

### 8. Software Integrity Failures (A08:2021)

**What to Look For:**

| Pattern | Severity | Example |
| ------- | -------- | ------- |
| Untrusted CDN | HIGH | Loading scripts from HTTP |
| Missing SRI | MEDIUM | No `integrity` attribute on scripts |
| Insecure deserialization | CRITICAL | `eval(userInput)`, `JSON.parse` of untrusted data |
| No code signing | MEDIUM | Unsigned packages |

**Secure Patterns:**

```html
<!-- Use SRI for external scripts -->
<script
  src="https://cdn.example.com/lib.js"
  integrity="sha384-..."
  crossorigin="anonymous"
></script>
```

---

### 9. Logging Failures (A09:2021)

**What to Look For:**

| Pattern | Severity | Example |
| ------- | -------- | ------- |
| No security event logging | HIGH | Failed logins not logged |
| Sensitive data in logs | HIGH | Passwords, tokens in logs |
| Logs not protected | MEDIUM | Logs accessible publicly |
| No monitoring/alerting | MEDIUM | No alert on suspicious activity |

**Secure Patterns:**

```javascript
// Log security events (without sensitive data)
logger.security({
  event: "login_failed",
  userId: user.id,
  ip: req.ip,
  timestamp: new Date().toISOString(),
  // NEVER log password
});
```

---

### 10. SSRF (A10:2021)

**What to Look For:**

| Pattern | Severity | Example |
| ------- | -------- | ------- |
| Unvalidated URLs | CRITICAL | `fetch(req.body.url)` |
| Internal network access | CRITICAL | Accessing `http://localhost` or `169.254.169.254` |
| DNS rebinding vulnerable | HIGH | No re-validation after DNS lookup |

**Secure Patterns:**

```javascript
// Validate and whitelist URLs
const allowedHosts = ["api.example.com", "cdn.example.com"];
const url = new URL(userProvidedUrl);

if (!allowedHosts.includes(url.hostname)) {
  throw new Error("URL not allowed");
}
```

---

## Quick Security Audit Checklist

### Authentication & Authorization

- [ ] All endpoints require authentication (unless public)
- [ ] Authorization checks on every protected resource
- [ ] Passwords hashed with bcrypt/argon2 (cost factor ≥12)
- [ ] Session tokens are cryptographically random
- [ ] Tokens expire and can be revoked

### Input Validation

- [ ] All user input is validated server-side
- [ ] SQL queries use parameterized statements
- [ ] User input never directly in commands
- [ ] File paths validated against traversal
- [ ] URLs validated against SSRF

### Data Protection

- [ ] Sensitive data encrypted at rest
- [ ] HTTPS enforced for all connections
- [ ] No secrets in code or version control
- [ ] Sensitive data not logged
- [ ] Proper error handling (no stack traces)

### Headers & Configuration

- [ ] Security headers configured (CSP, X-Frame-Options, etc.)
- [ ] CORS properly restricted
- [ ] Debug mode disabled in production
- [ ] Default credentials changed
- [ ] Rate limiting implemented

### Dependencies

- [ ] No known vulnerable dependencies
- [ ] Dependencies regularly updated
- [ ] Dependency audit in CI/CD

---

## Severity Classification Rules

| Severity | Criteria |
| -------- | -------- |
| CRITICAL | Remote code execution, auth bypass, data breach risk |
| HIGH | Significant security weakness, exploitable vulnerability |
| MEDIUM | Defense-in-depth issue, potential risk |
| LOW | Minor security improvement, best practice violation |
