using System.Text.Json.Serialization;

namespace FinanceTracker.Api.Models;

public class Stock
{
    [JsonPropertyName("symbol")]
    public string Symbol { get; set; } = string.Empty;

    [JsonPropertyName("price")]
    public string Price { get; set; } = string.Empty;

    [JsonPropertyName("Previous close")]
    public string PreviousClose { get; set; } = string.Empty;

    [JsonPropertyName("Day range")]
    public string DayRange { get; set; } = string.Empty;

    [JsonPropertyName("Year range")]
    public string YearRange { get; set; } = string.Empty;

    [JsonPropertyName("Market cap")]
    public string MarketCap { get; set; } = string.Empty;

    [JsonPropertyName("Avg Volume")]
    public string AvgVolume { get; set; } = string.Empty;

    [JsonPropertyName("P/E ratio")]
    public string PERatio { get; set; } = string.Empty;

    [JsonPropertyName("Dividend yield")]
    public string DividendYield { get; set; } = string.Empty;
}
