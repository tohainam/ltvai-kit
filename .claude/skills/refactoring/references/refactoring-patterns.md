# Refactoring Patterns Catalog

This catalog provides detailed guidance on applying refactoring patterns identified during the Strategy Selection phase (Phase 4).

---

## Patterns Overview

| Category        | Patterns                                           |
| --------------- | -------------------------------------------------- |
| Extraction      | Extract Method, Extract Class, Extract Interface   |
| Movement        | Move Method, Move Field, Hide Delegate             |
| Organization    | Introduce Parameter Object, Replace Temp with Query|
| Simplification  | Remove Dead Code, Inline Class, Collapse Hierarchy |
| Polymorphism    | Replace Conditional with Polymorphism              |
| Inheritance     | Replace Inheritance with Delegation                |

---

## Category 1: Extraction Patterns

### Extract Method

**Purpose**: Break a long method into smaller, focused methods.

**When to Use**:
- Method is too long (> 20-30 lines)
- Code block has a clear purpose
- Same code appears in multiple places
- Code block needs a comment to explain it

**Steps**:
1. Identify code block to extract
2. Create new method with descriptive name
3. Move code block to new method
4. Identify variables needed as parameters
5. Identify variables to return
6. Replace original code with method call
7. Run tests

**Before**:
```typescript
function printOwing(invoice: Invoice) {
  let outstanding = 0;

  console.log("***********************");
  console.log("**** Customer Owes ****");
  console.log("***********************");

  // Calculate outstanding
  for (const order of invoice.orders) {
    outstanding += order.amount;
  }

  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}
```

**After**:
```typescript
function printOwing(invoice: Invoice) {
  printBanner();
  const outstanding = calculateOutstanding(invoice);
  printDetails(invoice, outstanding);
}

function printBanner() {
  console.log("***********************");
  console.log("**** Customer Owes ****");
  console.log("***********************");
}

function calculateOutstanding(invoice: Invoice): number {
  return invoice.orders.reduce((sum, order) => sum + order.amount, 0);
}

function printDetails(invoice: Invoice, outstanding: number) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
}
```

**Risks**:
- LOW: Safe refactoring with clear boundaries
- May increase method count

---

### Extract Class

**Purpose**: Split a large class that does too much into multiple focused classes.

**When to Use**:
- Class has too many responsibilities
- Subset of data and methods form a logical unit
- Class has multiple reasons to change
- Class name ends with "Manager" or "Utils"

**Steps**:
1. Identify responsibility to extract
2. Create new class for that responsibility
3. Create link from old class to new class
4. Move relevant fields to new class
5. Move relevant methods to new class
6. Review and update references
7. Run tests

**Before**:
```typescript
class Person {
  private name: string;
  private officeAreaCode: string;
  private officeNumber: string;
  private homeAreaCode: string;
  private homeNumber: string;

  getName() { return this.name; }
  getOfficeAreaCode() { return this.officeAreaCode; }
  getOfficeNumber() { return this.officeNumber; }
  getOfficeTelephoneNumber() {
    return `(${this.officeAreaCode}) ${this.officeNumber}`;
  }
  // ... similar for home
}
```

**After**:
```typescript
class Person {
  private name: string;
  private officeTelephone: TelephoneNumber;
  private homeTelephone: TelephoneNumber;

  getName() { return this.name; }
  getOfficeTelephoneNumber() {
    return this.officeTelephone.getNumber();
  }
}

class TelephoneNumber {
  private areaCode: string;
  private number: string;

  getAreaCode() { return this.areaCode; }
  getNumber() { return `(${this.areaCode}) ${this.number}`; }
}
```

**Risks**:
- MEDIUM: Requires careful identification of boundaries
- May need to update many references

---

### Extract Interface

**Purpose**: Create an interface from a class to enable polymorphism.

**When to Use**:
- Multiple classes share a common subset of methods
- Need to decouple client from implementation
- Want to support multiple implementations
- Testing requires mock objects

**Steps**:
1. Identify shared methods across classes
2. Create interface with those method signatures
3. Have classes implement the interface
4. Update client code to use interface type
5. Run tests

**Before**:
```typescript
class Employee {
  getRate(): number { return this.rate; }
  hasSpecialSkill(): boolean { return this.specialSkill; }
}

function calculateCharge(employee: Employee) {
  // Client is coupled to concrete class
  return employee.getRate() * hours;
}
```

**After**:
```typescript
interface Billable {
  getRate(): number;
  hasSpecialSkill(): boolean;
}

class Employee implements Billable {
  getRate(): number { return this.rate; }
  hasSpecialSkill(): boolean { return this.specialSkill; }
}

class Contractor implements Billable {
  getRate(): number { return this.contractRate; }
  hasSpecialSkill(): boolean { return true; }
}

function calculateCharge(billable: Billable) {
  return billable.getRate() * hours;
}
```

**Risks**:
- LOW: Safe addition, no behavior change
- May require updating type annotations

---

## Category 2: Movement Patterns

### Move Method

**Purpose**: Move a method to the class that uses it most.

**When to Use**:
- Method uses more features of another class
- Feature Envy detected
- Method doesn't fit with its class's responsibilities

**Steps**:
1. Examine method dependencies
2. Check if method should be in superclass/subclass
3. Declare method in target class
4. Copy code to target, adjust as needed
5. Make original method delegate to target
6. Test
7. Remove original method (if possible)
8. Update all callers

**Before**:
```typescript
class Account {
  private type: AccountType;
  private daysOverdrawn: number;

  overdraftCharge(): number {
    if (this.type.isPremium()) {
      const baseCharge = 10;
      if (this.daysOverdrawn <= 7) return baseCharge;
      return baseCharge + (this.daysOverdrawn - 7) * 0.85;
    }
    return this.daysOverdrawn * 1.75;
  }
}
```

**After**:
```typescript
class AccountType {
  overdraftCharge(daysOverdrawn: number): number {
    if (this.isPremium()) {
      const baseCharge = 10;
      if (daysOverdrawn <= 7) return baseCharge;
      return baseCharge + (daysOverdrawn - 7) * 0.85;
    }
    return daysOverdrawn * 1.75;
  }
}

class Account {
  private type: AccountType;
  private daysOverdrawn: number;

  overdraftCharge(): number {
    return this.type.overdraftCharge(this.daysOverdrawn);
  }
}
```

**Risks**:
- MEDIUM: Requires understanding of class responsibilities
- May break existing callers

---

### Move Field

**Purpose**: Move a field to the class that uses it most.

**When to Use**:
- Field is used more by another class
- Field is passed as parameter to methods of another class
- Building a new class that needs the field

**Steps**:
1. Encapsulate field if public
2. Create field in target class
3. Create getter/setter if needed
4. Redirect all references to target
5. Test
6. Remove original field

**Risks**:
- LOW to MEDIUM: Straightforward but may need many updates
- Ensure proper encapsulation

---

### Hide Delegate

**Purpose**: Remove client's knowledge of delegate objects.

**When to Use**:
- Message chains detected (a.getB().getC())
- Client depends on navigation structure
- Changes to delegate structure break clients

**Steps**:
1. Create delegating method on server
2. Adjust client to call server method
3. Repeat for each delegate method used
4. If all clients use server, consider removing delegate accessor

**Before**:
```typescript
// Client code - knows too much about structure
const manager = person.getDepartment().getManager();
```

**After**:
```typescript
// Server class
class Person {
  private department: Department;

  getManager(): Manager {
    return this.department.getManager();
  }
}

// Client code - simplified
const manager = person.getManager();
```

**Risks**:
- LOW: Encapsulation improvement
- May create Middle Man smell if overdone

---

## Category 3: Organization Patterns

### Introduce Parameter Object

**Purpose**: Replace a group of parameters that naturally go together with an object.

**When to Use**:
- Multiple methods take the same group of parameters
- Parameters are often passed together
- Long parameter list detected

**Steps**:
1. Create new class for parameters
2. Add field and constructor for each parameter
3. Test compilation
4. Change method signature to use new object
5. Update all callers
6. Move behavior to parameter object if appropriate

**Before**:
```typescript
function amountInvoiced(startDate: Date, endDate: Date): number { }
function amountReceived(startDate: Date, endDate: Date): number { }
function amountOverdue(startDate: Date, endDate: Date): number { }
```

**After**:
```typescript
class DateRange {
  constructor(
    public readonly start: Date,
    public readonly end: Date
  ) {}

  contains(date: Date): boolean {
    return date >= this.start && date <= this.end;
  }
}

function amountInvoiced(range: DateRange): number { }
function amountReceived(range: DateRange): number { }
function amountOverdue(range: DateRange): number { }
```

**Risks**:
- LOW: Safe improvement
- Consider adding behavior to new class

---

### Replace Temp with Query

**Purpose**: Replace a temporary variable with a method call.

**When to Use**:
- Temporary variable holds result of an expression
- Expression is used in multiple places
- Preparing for Extract Method

**Steps**:
1. Extract expression into a method
2. Replace all references to temp with method call
3. Remove temp declaration
4. Test

**Before**:
```typescript
function calculateTotal() {
  const basePrice = quantity * itemPrice;
  if (basePrice > 1000) {
    return basePrice * 0.95;
  }
  return basePrice * 0.98;
}
```

**After**:
```typescript
function calculateTotal() {
  if (getBasePrice() > 1000) {
    return getBasePrice() * 0.95;
  }
  return getBasePrice() * 0.98;
}

function getBasePrice(): number {
  return quantity * itemPrice;
}
```

**Risks**:
- LOW to MEDIUM: Ensure method has no side effects
- May impact performance if called frequently

---

## Category 4: Simplification Patterns

### Remove Dead Code

**Purpose**: Delete code that is never executed.

**When to Use**:
- Code is unreachable
- Methods are never called
- Variables are never used
- Code is commented out

**Steps**:
1. Verify code is truly unused (search all references)
2. Check for reflection/dynamic calls
3. Delete the code
4. Test
5. Commit with clear message

**Risks**:
- LOW to MEDIUM: Ensure thorough search
- Check for dynamic invocation patterns

---

### Inline Class

**Purpose**: Move all features of a class into another and delete the empty class.

**When to Use**:
- Class is too small to justify existence
- Class was reduced after refactoring
- Lazy Class detected

**Steps**:
1. Declare public methods of source in target
2. Change all references to use target
3. Delete source class
4. Test

**Risks**:
- MEDIUM: May make target class too large
- Ensure target remains cohesive

---

### Collapse Hierarchy

**Purpose**: Merge a superclass and subclass that are too similar.

**When to Use**:
- Subclass doesn't add much to parent
- Hierarchy is result of Speculative Generality
- Single subclass exists

**Steps**:
1. Choose which to remove
2. Move all methods/fields to remaining class
3. Adjust references to removed class
4. Delete empty class
5. Test

**Risks**:
- MEDIUM: Ensure no other subclasses exist
- Consider future extensibility

---

## Category 5: Polymorphism Patterns

### Replace Conditional with Polymorphism

**Purpose**: Replace complex conditionals with polymorphic behavior.

**When to Use**:
- Switch statements on type code
- Same conditional logic in multiple methods
- Behavior varies based on object type

**Steps**:
1. Create polymorphic base (interface or abstract class)
2. Create subclass for each case
3. Move conditional branch to appropriate subclass
4. Replace conditional with polymorphic call
5. Test each change

**Before**:
```typescript
function calculatePay(employee: Employee): number {
  switch (employee.type) {
    case 'engineer':
      return employee.monthlySalary;
    case 'salesman':
      return employee.monthlySalary + employee.commission;
    case 'manager':
      return employee.monthlySalary + employee.bonus;
  }
}
```

**After**:
```typescript
interface Employee {
  calculatePay(): number;
}

class Engineer implements Employee {
  calculatePay(): number {
    return this.monthlySalary;
  }
}

class Salesman implements Employee {
  calculatePay(): number {
    return this.monthlySalary + this.commission;
  }
}

class Manager implements Employee {
  calculatePay(): number {
    return this.monthlySalary + this.bonus;
  }
}
```

**Risks**:
- MEDIUM to HIGH: Significant structural change
- May require factory pattern for instantiation

---

## Category 6: Inheritance Patterns

### Replace Inheritance with Delegation

**Purpose**: Replace inheritance with composition for better flexibility.

**When to Use**:
- Subclass uses only part of superclass interface
- Refused Bequest detected
- Need to inherit from multiple sources

**Steps**:
1. Create field for superclass in subclass
2. Change methods to delegate to superclass
3. Remove subclass declaration
4. Create delegating methods
5. Test

**Before**:
```typescript
class Stack extends ArrayList {
  push(element: any) { this.add(element); }
  pop() { return this.remove(this.size() - 1); }
  // Inherits many unneeded methods: add, remove, get, etc.
}
```

**After**:
```typescript
class Stack {
  private items: ArrayList = new ArrayList();

  push(element: any) { this.items.add(element); }
  pop() { return this.items.remove(this.items.size() - 1); }
  size() { return this.items.size(); }
  // Only exposes needed operations
}
```

**Risks**:
- MEDIUM: Changes inheritance relationship
- May need to add many delegating methods

---

## Pattern Selection Guide

### By Smell Type

| Smell Type   | Primary Patterns                              |
| ------------ | --------------------------------------------- |
| structural   | Extract Class, Move Method, Collapse Hierarchy|
| duplication  | Extract Method, Pull Up Method, Template Method|
| coupling     | Move Method, Hide Delegate, Inject Dependency |
| unnecessary  | Remove Dead Code, Inline Class                |
| data         | Introduce Parameter Object, Value Object      |

### By Complexity

| Complexity | Safe Patterns                    | Careful Patterns               |
| ---------- | -------------------------------- | ------------------------------ |
| Simple     | Extract Method, Remove Dead Code | Move Method                    |
| Complex    | Extract Class (with tests)       | Replace Conditional with Poly  |

### Risk Assessment

| Risk  | Patterns                                          |
| ----- | ------------------------------------------------- |
| LOW   | Extract Method, Extract Interface, Remove Dead Code|
| MEDIUM| Move Method, Extract Class, Inline Class          |
| HIGH  | Replace Conditional with Polymorphism             |

---

## Characterization Test Guidance

Before applying any pattern, ensure characterization tests exist:

```typescript
describe('Before Refactoring: {Class/Method}', () => {
  it('should {behavior 1}', () => {
    // Capture current behavior
  });

  it('should {behavior 2}', () => {
    // Capture current behavior
  });
});
```

After applying pattern, tests should still pass:

```typescript
describe('After Refactoring: {Class/Method}', () => {
  // Same tests should pass
  it('should {behavior 1}', () => { /* Same assertions */ });
  it('should {behavior 2}', () => { /* Same assertions */ });
});
```

---

## Quick Reference

| Pattern | Complexity | Risk | Reversibility |
| ------- | ---------- | ---- | ------------- |
| Extract Method | Low | Low | Easy |
| Extract Class | Medium | Medium | Medium |
| Extract Interface | Low | Low | Easy |
| Move Method | Medium | Medium | Medium |
| Move Field | Low | Low | Easy |
| Hide Delegate | Low | Low | Easy |
| Introduce Parameter Object | Low | Low | Medium |
| Replace Temp with Query | Low | Low | Easy |
| Remove Dead Code | Low | Medium | N/A |
| Inline Class | Medium | Medium | Hard |
| Collapse Hierarchy | Medium | Medium | Hard |
| Replace Conditional with Poly | High | High | Hard |
| Replace Inheritance with Delegation | Medium | Medium | Hard |
