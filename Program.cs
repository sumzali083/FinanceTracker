namespace FinanceTracker
{
    class Program
    {
        static void Main()
        {
            // code here
            FinanceTracker tracker = new FinanceTracker();
            tracker.addIncome(100);
            tracker.addIncome(50);

            decimal balance =  tracker.getBalance();

            Console.WriteLine(balance);
        }
    }
}