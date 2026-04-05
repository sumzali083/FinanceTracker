using FinanceTracker.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors();

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
//Get
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

//POST
app.MapPost("/transactions" , (Transaction transaction) =>
{
    transactions.Add(transaction);
    return Results.Created($"/transactions/{transaction.Id}", transaction);

}); 

//PUT
app.MapPut("/transactions/{id}", (int id, Transaction transaction) =>
{
    var existing = transactions.FirstOrDefault(t => t.Id == id);

    if (existing is null)
        return Results.NotFound("Transaction not found");

    existing.Amount = transaction.Amount;
    existing.Category = transaction.Category;
    existing.Description = transaction.Description;
    existing.Date = transaction.Date;
    existing.Type = transaction.Type;

    return Results.Ok(existing);
});

//DELETE
app.MapDelete("/transactions/{id}", (int id) =>
{
    var existing = transactions.FirstOrDefault(t => t.Id == id);

    if (existing is null)
        return Results.NotFound("Transaction not found");

    transactions.Remove(existing);

    return Results.NoContent();
});

app.Run();