# Code Smell Catalog

This catalog provides a comprehensive reference for detecting and classifying code smells during the Smell Detection phase (Phase 2).

---

## Smell Categories Overview

| Category          | Focus                        | Common Smells                          |
| ----------------- | ---------------------------- | -------------------------------------- |
| Bloaters          | Excessive size               | Long Method, Large Class, Long Params  |
| OO Abusers        | Misuse of OOP principles     | Switch Statements, Refused Bequest     |
| Change Preventers | Difficult to modify          | Divergent Change, Shotgun Surgery      |
| Dispensables      | Unnecessary code             | Dead Code, Speculative Generality      |
| Couplers          | Excessive coupling           | Feature Envy, Inappropriate Intimacy   |

---

## Category 1: Bloaters

Code that has grown excessively large and is difficult to work with.

### Long Method

**Description**: A method that has grown too long and does too much.

**Detection Criteria**:
- Method exceeds 20-30 lines of code
- Method has more than 3 levels of nesting
- Method contains multiple unrelated operations
- Method has too many local variables (> 5)

**Severity**: MEDIUM to HIGH

**Related Track**: STR (Structure)

**Recommended Patterns**:
- Extract Method
- Replace Temp with Query
- Introduce Parameter Object

**Example Smell**:
```typescript
// SMELL: Long Method
function processOrder(order: Order) {
  // Validate order (should be extracted)
  if (!order.items) throw new Error('No items');
  if (!order.customer) throw new Error('No customer');
  // ... 10 more validation lines

  // Calculate totals (should be extracted)
  let subtotal = 0;
  for (const item of order.items) {
    subtotal += item.price * item.quantity;
    // ... discount logic
  }
  // ... 15 more calculation lines

  // Apply promotions (should be extracted)
  // ... 20 more lines

  // Save to database (should be extracted)
  // ... 10 more lines
}
```

---

### Large Class

**Description**: A class that does too much and has too many responsibilities.

**Detection Criteria**:
- Class exceeds 200-300 lines
- Class has more than 10 methods
- Class has more than 10 instance variables
- Class has methods that don't use all instance variables
- Class name contains "Manager", "Handler", "Utils" with many methods

**Severity**: HIGH

**Related Track**: STR (Structure)

**Recommended Patterns**:
- Extract Class
- Extract Subclass
- Extract Interface

**Example Smell**:
```typescript
// SMELL: Large Class (God Class)
class UserManager {
  // User CRUD
  createUser() { }
  updateUser() { }
  deleteUser() { }

  // Authentication
  login() { }
  logout() { }
  resetPassword() { }

  // Email
  sendWelcomeEmail() { }
  sendPasswordResetEmail() { }

  // Validation
  validateEmail() { }
  validatePassword() { }

  // Reporting
  generateUserReport() { }
  exportToCSV() { }

  // ... 20+ more methods
}
```

---

### Long Parameter List

**Description**: A method that takes too many parameters.

**Detection Criteria**:
- Method has more than 3-4 parameters
- Parameters are primitive types that could be grouped
- Multiple methods share similar parameter lists
- Parameters are often passed together

**Severity**: MEDIUM

**Related Track**: ABS (Abstraction)

**Recommended Patterns**:
- Introduce Parameter Object
- Preserve Whole Object
- Replace Parameter with Method Call

**Example Smell**:
```typescript
// SMELL: Long Parameter List
function createUser(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  street: string,
  city: string,
  state: string,
  zipCode: string,
  country: string
) { }
```

---

### Primitive Obsession

**Description**: Over-reliance on primitive types instead of small objects.

**Detection Criteria**:
- Type codes (strings/numbers) used for categorization
- Arrays used instead of objects
- String manipulation for structured data
- Money represented as plain numbers

**Severity**: MEDIUM

**Related Track**: ABS (Abstraction)

**Recommended Patterns**:
- Replace Type Code with Class
- Replace Type Code with Subclasses
- Replace Array with Object
- Introduce Value Object

**Example Smell**:
```typescript
// SMELL: Primitive Obsession
const order = {
  status: 'pending',  // Should be enum/class
  type: 1,            // Magic number
  price: 99.99,       // Should be Money value object
  phone: '123-456-7890'  // Should be PhoneNumber class
};
```

---

## Category 2: Object-Orientation Abusers

Code that doesn't properly apply OOP principles.

### Switch Statements

**Description**: Complex switch/if-else chains that select behavior based on type.

**Detection Criteria**:
- Switch on type code or class type
- Same switch logic appears in multiple places
- Switch used to call different methods based on type
- Long if-else chains checking instanceof

**Severity**: MEDIUM to HIGH

**Related Track**: PAT (Pattern)

**Recommended Patterns**:
- Replace Conditional with Polymorphism
- Replace Type Code with State/Strategy
- Introduce Null Object

**Example Smell**:
```typescript
// SMELL: Switch Statements
function calculatePrice(product: Product) {
  switch (product.type) {
    case 'book':
      return product.basePrice * 0.9;
    case 'electronics':
      return product.basePrice * 1.1;
    case 'food':
      return product.basePrice;
    default:
      return product.basePrice;
  }
}
```

---

### Parallel Inheritance Hierarchies

**Description**: When creating a subclass in one hierarchy requires creating a subclass in another.

**Detection Criteria**:
- Subclasses in different hierarchies have similar prefixes
- Creating a class requires creating another class
- Two hierarchies grow in parallel

**Severity**: HIGH

**Related Track**: PAT (Pattern)

**Recommended Patterns**:
- Move Method
- Move Field
- Collapse Hierarchy

---

### Refused Bequest

**Description**: Subclass uses only some of the methods and properties inherited from parents.

**Detection Criteria**:
- Subclass overrides parent method to do nothing
- Subclass doesn't use inherited properties
- Inheritance used primarily for code reuse, not polymorphism

**Severity**: MEDIUM

**Related Track**: PAT (Pattern)

**Recommended Patterns**:
- Replace Inheritance with Delegation
- Extract Superclass
- Push Down Method/Field

**Example Smell**:
```typescript
// SMELL: Refused Bequest
class Bird {
  fly() { }
  eat() { }
}

class Penguin extends Bird {
  fly() {
    // Does nothing - penguins can't fly!
    throw new Error('Cannot fly');
  }
}
```

---

## Category 3: Change Preventers

Code that makes modifications difficult and risky.

### Divergent Change

**Description**: One class is changed for many different reasons.

**Detection Criteria**:
- Class modified for unrelated features
- Different developers modify same class for different purposes
- Single class handles multiple concerns

**Severity**: HIGH

**Related Track**: STR (Structure)

**Recommended Patterns**:
- Extract Class
- Extract Module

**Example Smell**:
```typescript
// SMELL: Divergent Change
class Employee {
  // Changed when payroll rules change
  calculatePay() { }

  // Changed when reporting format changes
  generateReport() { }

  // Changed when database schema changes
  save() { }
}
```

---

### Shotgun Surgery

**Description**: Making one change requires many small changes across multiple classes.

**Detection Criteria**:
- Single feature change touches many files
- Similar changes repeated in multiple places
- Adding a field requires changes in many classes

**Severity**: HIGH

**Related Track**: DEP (Dependency)

**Recommended Patterns**:
- Move Method
- Move Field
- Inline Class

**Example Smell**:
```typescript
// SMELL: Shotgun Surgery
// Adding a new user field requires changing:
// - UserEntity
// - UserDTO
// - UserMapper
// - UserValidator
// - UserRepository
// - UserService
// - UserController
// - UserForm
// - ... many more files
```

---

## Category 4: Dispensables

Code that is unnecessary and should be removed.

### Dead Code

**Description**: Code that is never executed.

**Detection Criteria**:
- Unreachable code after return/throw
- Unused variables or parameters
- Unused methods or classes
- Commented-out code blocks
- Code behind always-false conditions

**Severity**: MEDIUM

**Related Track**: ABS (Abstraction)

**Recommended Patterns**:
- Remove Dead Code
- Remove Unused Parameter

**Example Smell**:
```typescript
// SMELL: Dead Code
function calculate(a: number, b: number, c: number) {
  // c is never used
  const result = a + b;
  return result;

  // Unreachable code
  console.log('Done');
}

// Unused function
function oldCalculate() {
  // This method is never called
}
```

---

### Speculative Generality

**Description**: Code created "just in case" it's needed in the future.

**Detection Criteria**:
- Abstract classes with only one subclass
- Methods that are never called
- Parameters that are never used
- Generic code without multiple implementations
- Comments saying "for future use"

**Severity**: LOW to MEDIUM

**Related Track**: ABS (Abstraction)

**Recommended Patterns**:
- Collapse Hierarchy
- Inline Class
- Remove Parameter

**Example Smell**:
```typescript
// SMELL: Speculative Generality
abstract class AbstractUserFactory {
  // Only one implementation exists
}

class UserFactory extends AbstractUserFactory {
  // The only subclass
}

interface Config {
  featureA: boolean;  // Never used
  featureB: boolean;  // Never used
  featureC: boolean;  // Only this one is used
}
```

---

### Duplicate Code

**Description**: Same or similar code appearing in multiple places.

**Detection Criteria**:
- Identical code blocks in multiple methods
- Similar algorithms with minor variations
- Parallel class hierarchies with similar methods
- Copy-pasted code with small changes

**Severity**: HIGH

**Related Track**: ABS (Abstraction)

**Recommended Patterns**:
- Extract Method
- Extract Class
- Pull Up Method
- Form Template Method

**Example Smell**:
```typescript
// SMELL: Duplicate Code
function calculateDiscount(price: number) {
  const taxRate = 0.1;
  const discount = price > 100 ? 0.1 : 0;
  return price * (1 - discount) * (1 + taxRate);
}

function calculateShippingCost(weight: number) {
  const taxRate = 0.1;  // Duplicated
  const discount = weight > 50 ? 0.1 : 0;  // Similar logic
  return weight * 2 * (1 - discount) * (1 + taxRate);  // Duplicated formula
}
```

---

### Lazy Class

**Description**: A class that doesn't do enough to justify its existence.

**Detection Criteria**:
- Class with only 1-2 methods
- Class that delegates all work to other classes
- Class that was reduced after refactoring

**Severity**: LOW

**Related Track**: STR (Structure)

**Recommended Patterns**:
- Inline Class
- Collapse Hierarchy

---

## Category 5: Couplers

Code with excessive coupling between classes.

### Feature Envy

**Description**: A method that uses more features of another class than its own.

**Detection Criteria**:
- Method accesses data of another object extensively
- Method calls many methods on a single other object
- Method performs calculations that belong to another class

**Severity**: MEDIUM to HIGH

**Related Track**: DEP (Dependency)

**Recommended Patterns**:
- Move Method
- Move Field
- Extract Method

**Example Smell**:
```typescript
// SMELL: Feature Envy
class Order {
  calculateTotal() {
    // This method is envious of Customer data
    return this.customer.getBaseDiscount() +
           this.customer.getLoyaltyDiscount() +
           this.customer.getVolumeDiscount() -
           this.customer.getPenalties();
  }
}
```

---

### Inappropriate Intimacy

**Description**: Two classes that are too tightly coupled, knowing too much about each other's internals.

**Detection Criteria**:
- Classes access private/protected fields of each other
- Bidirectional associations
- Classes have methods that only make sense together

**Severity**: HIGH

**Related Track**: DEP (Dependency)

**Recommended Patterns**:
- Move Method
- Move Field
- Extract Class
- Hide Delegate
- Replace Inheritance with Delegation

**Example Smell**:
```typescript
// SMELL: Inappropriate Intimacy
class Order {
  private customer: Customer;

  process() {
    // Directly manipulating customer's internal state
    this.customer._internalBalance -= this.total;
    this.customer._orders.push(this);
  }
}

class Customer {
  _internalBalance: number;  // Should be private
  _orders: Order[];          // Should be private

  getOrderDetails(order: Order) {
    // Accessing order's internal details
    return order._internalItems;
  }
}
```

---

### Message Chains

**Description**: Client asks one object for another object, then asks that object for yet another, and so on.

**Detection Criteria**:
- Chains of method calls: a.getB().getC().getD()
- Client depends on navigation structure
- Changes to intermediate classes break the chain

**Severity**: MEDIUM

**Related Track**: DEP (Dependency)

**Recommended Patterns**:
- Hide Delegate
- Extract Method
- Move Method

**Example Smell**:
```typescript
// SMELL: Message Chains
const street = order.getCustomer().getAddress().getStreet();
const city = order.getCustomer().getAddress().getCity();
```

---

### Middle Man

**Description**: A class that delegates most of its work to another class.

**Detection Criteria**:
- Most methods simply call methods on another object
- Class exists only to forward requests
- Class adds no real value

**Severity**: LOW to MEDIUM

**Related Track**: DEP (Dependency)

**Recommended Patterns**:
- Remove Middle Man
- Inline Method
- Replace Delegation with Inheritance

**Example Smell**:
```typescript
// SMELL: Middle Man
class Department {
  private manager: Person;

  getManagerName() { return this.manager.getName(); }
  getManagerEmail() { return this.manager.getEmail(); }
  getManagerPhone() { return this.manager.getPhone(); }
  // All methods just delegate to manager
}
```

---

## Quick Reference Matrix

| Smell | Track | Severity | Primary Pattern |
| ----- | ----- | -------- | --------------- |
| Long Method | STR | MEDIUM-HIGH | Extract Method |
| Large Class | STR | HIGH | Extract Class |
| Long Parameter List | ABS | MEDIUM | Parameter Object |
| Primitive Obsession | ABS | MEDIUM | Value Object |
| Switch Statements | PAT | MEDIUM-HIGH | Polymorphism |
| Parallel Inheritance | PAT | HIGH | Move Method |
| Refused Bequest | PAT | MEDIUM | Delegation |
| Divergent Change | STR | HIGH | Extract Class |
| Shotgun Surgery | DEP | HIGH | Move Method |
| Dead Code | ABS | MEDIUM | Remove |
| Speculative Generality | ABS | LOW-MEDIUM | Inline |
| Duplicate Code | ABS | HIGH | Extract Method |
| Lazy Class | STR | LOW | Inline Class |
| Feature Envy | DEP | MEDIUM-HIGH | Move Method |
| Inappropriate Intimacy | DEP | HIGH | Hide Delegate |
| Message Chains | DEP | MEDIUM | Hide Delegate |
| Middle Man | DEP | LOW-MEDIUM | Remove |

---

## Detection Checklist by Track

### STR Track (Structure)
- [ ] Any class > 200 lines?
- [ ] Any method > 30 lines?
- [ ] Any circular dependencies?
- [ ] Any God class (too many responsibilities)?
- [ ] Any class changed for unrelated reasons?

### ABS Track (Abstraction)
- [ ] Any duplicate code blocks?
- [ ] Any long parameter lists (> 3-4)?
- [ ] Any primitive obsession?
- [ ] Any dead/unused code?
- [ ] Any speculative abstractions?

### NAM Track (Naming)
- [ ] Any misleading names?
- [ ] Any inconsistent naming conventions?
- [ ] Any magic numbers/strings?
- [ ] Any unclear abbreviations?
- [ ] Any names that don't match behavior?

### PAT Track (Pattern)
- [ ] Any switch statements on type?
- [ ] Any inheritance misuse?
- [ ] Any SOLID violations?
- [ ] Any anti-patterns (Singleton abuse, etc.)?
- [ ] Any missing design patterns?

### DEP Track (Dependency)
- [ ] Any feature envy?
- [ ] Any tight coupling?
- [ ] Any message chains?
- [ ] Any inappropriate intimacy?
- [ ] Any dependency injection needed?
