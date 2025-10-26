export interface ExchangeRate {
  currency: string;
  date: string;
  price: number;
}

export interface TokenInfo {
  symbol: string;
  name: string;
  price: number;
  iconUrl: string;
}

const EXCHANGE_RATES_API = "https://interview.switcheo.com/prices.json";

export async function fetchExchangeRates(): Promise<ExchangeRate[]> {
  const response = await fetch(EXCHANGE_RATES_API);
  if (!response.ok) {
    throw new Error(`Failed to fetch exchange rates: ${response.status}`);
  }
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(response.json());
    }, 1000);
  });
}

export async function fetchCryptoCurrencies(
  searchTerm?: string
): Promise<string[]> {
  try {
    // Fetch the data from the API
    const response = await fetch(EXCHANGE_RATES_API);
    let data = await response.json();

    // Filter the data to get the unique currencies
    const uniqueCurrencies = new Set<string>();
    const normalizedSearch = searchTerm?.toLowerCase() || "";

    // Filter the data to get the unique currencies
    for (const item of data) {
      if (
        !searchTerm ||
        item.currency.toLowerCase().includes(normalizedSearch)
      ) {
        uniqueCurrencies.add(item.currency);
      }
    }

    return Array.from(uniqueCurrencies);
  } catch {
    return [];
  }
}

export async function fetchExchangeRate(
  baseCurrency: string,
  targetCurrency: string
): Promise<{ basePrice: number; targetPrice: number }> {
  const response = await fetch(EXCHANGE_RATES_API);
  const data = await response.json();
  const basePrice = data.find(
    (item: ExchangeRate) =>
      item.currency.toUpperCase() === baseCurrency.toUpperCase()
  );
  const targetPrice = data.find(
    (item: ExchangeRate) =>
      item.currency.toUpperCase() === targetCurrency.toUpperCase()
  );
  if (!basePrice || !targetPrice) {
    throw new Error("Exchange rate not found");
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        basePrice: basePrice.price,
        targetPrice: targetPrice.price,
      });
    }, 2000);
  });
}
