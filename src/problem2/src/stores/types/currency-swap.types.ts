import { ExchangeRate } from "@/apis/exchange-rates";

// Currency types
export enum CurrencyType {
  SELL = "sell",
  BUY = "buy",
}

export interface CurrencyPair {
  amount: number;
  symbol: string;
  price?: number;
}

// Store state interfaces
export interface CurrencySwapFormState {
  [CurrencyType.SELL]: CurrencyPair;
  [CurrencyType.BUY]: CurrencyPair;
}

export interface ExchangeRatesState {
  exchangeRates: ExchangeRate[];
  loading: boolean;
  error: string | null;
}

// Main store state interface
export interface CurrencySwapState
  extends CurrencySwapFormState,
    ExchangeRatesState {
  // Synchronous actions
  setCurrency: (type: CurrencyType, params: CurrencyPair) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Async actions
  loadExchangeRates: () => Promise<void>;
  calculateAmount: (
    type: CurrencyType,
    baseCurrency: CurrencyPair
  ) => Promise<void>;
}
