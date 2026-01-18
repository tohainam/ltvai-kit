# Quality Checks Reference

Multi-language quality check commands for format, lint, and build.

---

## Language Detection

Detect project language by checking for these files:

| Files Present | Language |
|---------------|----------|
| `package.json`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml` | JavaScript/TypeScript |
| `pyproject.toml`, `requirements.txt`, `setup.py`, `Pipfile` | Python |
| `go.mod`, `go.sum` | Go |
| `Cargo.toml`, `Cargo.lock` | Rust |
| `pom.xml`, `build.gradle`, `build.gradle.kts` | Java |
| `composer.json` | PHP |
| `Gemfile`, `Gemfile.lock` | Ruby |
| `mix.exs` | Elixir |

**Detection Order**: Check in order listed. First match determines language.

---

## JavaScript / TypeScript

### Prerequisites Check

```bash
# Check if tools are available
command -v npx >/dev/null 2>&1 || echo "npx not found"
```

### Format

```bash
# Prettier (most common)
npx prettier --write .

# Alternative: If prettier not configured
npx prettier --write "**/*.{js,jsx,ts,tsx,json,css,md}"
```

### Lint

```bash
# ESLint with auto-fix
npx eslint --fix .

# Alternative: If specific config
npx eslint --fix "src/**/*.{js,jsx,ts,tsx}"

# TypeScript type checking (no fix, just check)
npx tsc --noEmit
```

### Build

```bash
# npm
npm run build

# yarn
yarn build

# pnpm
pnpm build

# If no build script, try direct tsc
npx tsc
```

---

## Python

### Prerequisites Check

```bash
# Check if tools are available
command -v black >/dev/null 2>&1 || pip install black
command -v ruff >/dev/null 2>&1 || pip install ruff
```

### Format

```bash
# Black formatter
black .

# Alternative: isort for imports
isort .

# Combined
black . && isort .
```

### Lint

```bash
# Ruff (fast, modern)
ruff check --fix .

# Alternative: Pylint (if ruff not available)
pylint --fix .

# Alternative: Flake8 (no auto-fix)
flake8 .
```

### Build (Type Check)

```bash
# MyPy type checking
mypy .

# Pyright (alternative)
pyright

# Syntax check only
python -m py_compile **/*.py
```

---

## Go

### Prerequisites Check

```bash
# Go tools are typically available with Go installation
command -v go >/dev/null 2>&1 || echo "go not found"
command -v golangci-lint >/dev/null 2>&1 || echo "golangci-lint not found"
```

### Format

```bash
# gofmt (built-in)
gofmt -w .

# goimports (also fixes imports)
goimports -w .
```

### Lint

```bash
# golangci-lint (comprehensive)
golangci-lint run --fix

# Alternative: go vet (built-in, no fix)
go vet ./...
```

### Build

```bash
# Build all packages
go build ./...

# Build with race detector (optional)
go build -race ./...
```

---

## Rust

### Prerequisites Check

```bash
# Cargo tools are typically available with Rust installation
command -v cargo >/dev/null 2>&1 || echo "cargo not found"
```

### Format

```bash
# rustfmt (built-in with cargo)
cargo fmt

# Or directly
rustfmt **/*.rs
```

### Lint

```bash
# Clippy with auto-fix
cargo clippy --fix --allow-dirty --allow-staged

# Without allow flags (stricter)
cargo clippy --fix
```

### Build

```bash
# Debug build
cargo build

# Release build (optional)
cargo build --release

# Check only (faster, no binary)
cargo check
```

---

## Java

### Prerequisites Check

```bash
# Maven or Gradle
command -v mvn >/dev/null 2>&1 || command -v gradle >/dev/null 2>&1
```

### Format

```bash
# Spotless (Maven)
mvn spotless:apply

# Spotless (Gradle)
gradle spotlessApply

# Google Java Format (standalone)
google-java-format -i **/*.java
```

### Lint

```bash
# Checkstyle (Maven)
mvn checkstyle:check

# PMD (Maven)
mvn pmd:check

# SpotBugs (Maven)
mvn spotbugs:check
```

### Build

```bash
# Maven
mvn compile

# Gradle
gradle build

# Or just compile
gradle compileJava
```

---

## PHP

### Prerequisites Check

```bash
command -v composer >/dev/null 2>&1 || echo "composer not found"
```

### Format

```bash
# PHP CS Fixer
vendor/bin/php-cs-fixer fix

# Or via composer script
composer run-script cs-fix
```

### Lint

```bash
# PHPStan
vendor/bin/phpstan analyse

# Psalm
vendor/bin/psalm

# PHP CodeSniffer
vendor/bin/phpcs --standard=PSR12 src/
```

### Build

```bash
# Syntax check
php -l **/*.php

# Composer autoload
composer dump-autoload
```

---

## Execution Pattern

```
FOR language IN detected_languages:
    TRY format:
        RUN format_command
        IF error: WARN but continue

    TRY lint:
        RUN lint_command with --fix
        IF unfixable_errors: REPORT to user

    TRY build:
        RUN build_command
        IF error:
            CHECKPOINT: Critical failure
            ASK user how to proceed
```

---

## Error Handling

### Format Errors

Usually non-critical. Log warning and continue:
```
Warning: Format check found issues that couldn't be auto-fixed.
Continuing with lint and build...
```

### Lint Errors

May be critical. Check if auto-fix succeeded:
```
IF lint_errors_remain:
    Display: "Lint errors that couldn't be auto-fixed:"
    List errors
    Ask: "Continue with build? (yes/no)"
```

### Build Errors

Critical. Must resolve before marking complete:
```
Build failed with errors:
{error_output}

Options:
1. Fix the errors and retry build
2. Skip build check (not recommended)
3. Abort implementation
```

---

## Skip Conditions

Skip quality checks when:

1. **Language not detected**: No recognized project files
2. **Tools not available**: Required CLI tools missing
3. **User requests skip**: Explicit --skip-quality flag
4. **Spec specifies skip**: Quality checks disabled in spec

When skipping:
```
Quality checks skipped: {reason}
- Format: SKIPPED
- Lint: SKIPPED
- Build: SKIPPED
```
