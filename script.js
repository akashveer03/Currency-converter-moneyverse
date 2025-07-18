const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

// Currency list with full names
const currencyList = {
  USD: "United States Dollar",
  INR: "Indian Rupee",
  EUR: "Euro",
  GBP: "British Pound Sterling",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  NZD: "New Zealand Dollar",
  SGD: "Singapore Dollar",
  SEK: "Swedish Krona",
  NOK: "Norwegian Krone",
  ZAR: "South African Rand",
  AED: "United Arab Emirates Dirham",
  HKD: "Hong Kong Dollar",
  MYR: "Malaysian Ringgit",
  THB: "Thai Baht",
  PHP: "Philippine Peso",
  RUB: "Russian Ruble"
};

// Populate dropdowns
Object.entries(currencyList).forEach(([code, name]) => {
  const option1 = document.createElement("option");
  option1.value = code;
  option1.text = `${code} - ${name}`;
  fromCurrency.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = code;
  option2.text = `${code} - ${name}`;
  toCurrency.appendChild(option2);
});

// Default selections
fromCurrency.value = "USD";
toCurrency.value = "INR";

// Convert button logic
convertBtn.addEventListener("click", () => {
  const amountValue = parseFloat(amount.value);

  if (isNaN(amountValue) || amountValue <= 0) {
    result.innerText = "Please enter a valid amount.";
    return;
  }

  const from = fromCurrency.value;
  const to = toCurrency.value;

  const url = `https://api.frankfurter.app/latest?amount=${amountValue}&from=${from}&to=${to}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      result.innerText = `${amountValue} ${from} = ${data.rates[to]} ${to}`;
    })
    .catch(() => {
      result.innerText = "Something went wrong. Try again!";
    });
});
