using FinanceTracker.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

List<Transaction> transactions = new()
{
    new Transaction
    {
        Id = 1,
        Amount = 2500,
        Category = "Salary",
        Description = "Monthly salary",
        Date = DateTime.Now,
        Type = "Income"
    },
    new Transaction
    {
        Id = 2,
        Amount = 45,
        Category = "Food",
        Description = "Groceries",
        Date = DateTime.Now,
        Type = "Expense"
    }
};

app.MapGet("/transactions", () =>
{
    return transactions;
});

app.MapGet("/stocks/{symbol}", (string symbol) =>
{
    var path = $"stocks/{symbol}.json";

    if (!File.Exists(path))
        return Results.NotFound("Stock not found");

    var json = File.ReadAllText(path);

    return Results.Content(json, "application/json");
});
app.Run();