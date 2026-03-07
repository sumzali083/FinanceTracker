# Finance Tracker (C# Console Application)

A simple personal finance tracker built in C#.
This console application allows users to record income and expenses, calculate their balance, and view all transactions.

The project was built to practice object-oriented programming concepts such as classes, lists, methods, and program structure in C#.

---

## Features

* Add income
* Add expenses
* Automatically calculate balance
* View all transactions with amount and date
* Interactive console menu
* Transaction history stored during runtime

---

## How It Works

The program uses three main components:

### Transaction Class

Represents a single financial transaction.

Each transaction stores:

* Amount
* Date

Income values are stored as positive numbers, while expenses are stored as negative numbers.

---

### FinanceTracker Class

Handles all financial logic.

Responsibilities:

* Store transactions in a list
* Add income
* Add expenses
* Calculate the current balance
* Display all transactions

---

### Program Class

Handles the user interface and menu system.

The user interacts with a console menu to perform actions such as:

* Adding income
* Adding expenses
* Viewing balance
* Viewing all transactions
* Exiting the application

---

## Menu Options

When the program runs, users see the following menu:

1. Add income
2. Add expense
3. Show balance
4. Show all transactions
5. Exit

The program loops continuously until the user selects the exit option.

---

## Example Usage

```
Type 1 for adding income
Type 2 for adding expenses
Type 3 to show balance
Type 4 to show all transactions
Type 5 to exit
```

Example output:

```
add your income here
100

you added 100 to your income

your balance is 100
```

---

## Concepts Practiced

This project demonstrates:

* Object-Oriented Programming
* Classes and Methods
* Lists and Collections
* Loops
* Switch Statements
* User Input Handling
* Basic Program Architecture

---

## Future Improvements

Possible improvements for the project:

* Add transaction categories (Food, Rent, Salary, etc.)
* Add transaction descriptions
* Save transactions to a file (JSON or database)
* Load previous transactions when the program starts
* Add monthly summaries
* Create a graphical user interface

---

## Author

Created as a C# learning project to practice building structured console applications and working with financial data.
