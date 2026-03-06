namespace FinanceTracker;
using System.Collections.Generic;
using System.Xml.Serialization;

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
}