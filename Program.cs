using System.Diagnostics;

namespace FinanceTracker
{
    class Program
    {
        static void Main()
        {
            // code here
            FinanceTracker tracker = new FinanceTracker();
            //tracker.addIncome(100);
            //tracker.addIncome(50);

            //Console.WriteLine(balance);

            //starting the menu
            while(true){
            //loopig though the menue 
            Console.WriteLine("Type 1 for adding income \nType 2 for adding expenses \nType 3 to show balance \nType 4 to exit");
            //finding the option
            int menuSelection = int.Parse(Console.ReadLine());
            //read line
            Console.WriteLine("you selected option  " + menuSelection);
            //confirm optiom 
            switch(menuSelection){
                //loop through using witch
             case 1:
            
                Console.WriteLine("add your income here ");
                decimal newIncome = decimal.Parse(Console.ReadLine());
                tracker.addIncome(newIncome);
                Console.WriteLine("you added " + newIncome + "to your income");
                break;
             case 2:
                Console.WriteLine("add your expenses here  ");
                decimal newExpenses = decimal.Parse(Console.ReadLine());
                tracker.addExpense(newExpenses);
                break;
             case 3:
                decimal balance =  tracker.getBalance();
                Console.WriteLine("your balance is " + balance);
                break;
             case 4:
                return;
                
            
            }
        }
    }
 }
}