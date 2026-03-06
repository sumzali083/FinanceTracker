namespace FinanceTracker;
using System.Collections.Generic;


public class FinanceTracker
{
    // logic will go here later
    private List<Transaction> transactions = new List<Transaction>{} ;

    public void addIncome(decimal Amount)
    {
        Transaction t = new Transaction();
        t.Amount = Amount;
        t.Date = DateTime.Now;
        transactions.Add(t);

    }

    public decimal getBalance()
    {
       decimal balance = 0;
       foreach (Transaction t in transactions){
            balance += t.Amount;

        }
        return balance;
    }
}