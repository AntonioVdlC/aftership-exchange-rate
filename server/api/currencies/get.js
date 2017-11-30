const get = async (req, res) => {
  try {
    // Hardcoded for now, but might be interesting to put this
    // information into a table or a JSON file!
    let currencies = [
      { symbol: "AUD", name: "Australian Dollar" }, 
      { symbol: "BGN", name: "Bulgarian Lev" }, 
      { symbol: "BRL", name: "Brazilian Real" }, 
      { symbol: "CAD", name: "Canadian Dollar" }, 
      { symbol: "CHF", name: "Swiss Franc" }, 
      { symbol: "CNY", name: "Chinese Yuan" }, 
      { symbol: "CZK", name: "Czech Koruna" }, 
      { symbol: "DKK", name: "Danish Krone" }, 
      { symbol: "EUR", name: "Euro"},
      { symbol: "GBP", name: "British Pound" }, 
      { symbol: "HKD", name: "Hong Kong Dollar" }, 
      { symbol: "HRK", name: "Croatian Kuna" }, 
      { symbol: "HUF", name: "Hungarian Forint" }, 
      { symbol: "IDR", name: "Indonesian Rupiah" }, 
      { symbol: "ILS", name: "Israeli New Shekel" }, 
      { symbol: "INR", name: "Indian Rupee" }, 
      { symbol: "JPY", name: "Japanese Yen" }, 
      { symbol: "KRW", name: "South Korean Won" }, 
      { symbol: "MXN", name: "Mexican Peso" }, 
      { symbol: "MYR", name: "Malaysian Ringgit" }, 
      { symbol: "NOK", name: "Norwegian Krone" }, 
      { symbol: "NZD", name: "New Zealand Dollar" }, 
      { symbol: "PHP", name: "Phillipine Piso" }, 
      { symbol: "PLN", name: "Polish Złoty" }, 
      { symbol: "RON", name: "Romanian Leu" }, 
      { symbol: "RUB", name: "Russian Ruble" }, 
      { symbol: "SEK", name: "Swedish Krona" }, 
      { symbol: "SGD", name: "Singapore Dollar" }, 
      { symbol: "THB", name: "Thai Baht" }, 
      { symbol: "TRY", name: "Turkish Lira" }, 
      { symbol: "USD", name: "United States Dollar" }, 
      { symbol: "ZAR", name: "South African Rand" }
    ];

    res.json(currencies);
  } catch (err) {
    console.log(err);
  }
};

module.exports = get;
