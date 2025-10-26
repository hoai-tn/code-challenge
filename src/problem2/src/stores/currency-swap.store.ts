import { create } from "zustand";
import { fetchExchangeRate, fetchExchangeRates } from "@/apis/exchange-rates";
import {
  CurrencySwapState,
  CurrencyType,
  CurrencyPair,
} from "./types/currency-swap.types";
import { formatNumber } from "@/utils";

export const useCurrencySwapStore = create<CurrencySwapState>((set, get) => ({
  // Initial state
  [CurrencyType.SELL]: {
    amount: 0,
    symbol: "ETH",
    price: 0,
  },
  [CurrencyType.BUY]: {
    amount: 0,
    symbol: "USD",
    price: 0,
  },
  exchangeRates: [],
  loading: false,
  error: null,

  // Synchronous actions
  setCurrency: (type: CurrencyType, { amount, symbol, price }: CurrencyPair) =>
    set((state) => ({
      [type]: { ...state[type], amount, symbol, price },
    })),

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  // Async actions
  loadExchangeRates: async () => {
    try {
      set({ loading: true, error: null });
      const rates = await fetchExchangeRates();
      set({ exchangeRates: rates, loading: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to load exchange rates";
      set({ error: errorMessage, loading: false });
    }
  },

  calculateAmount: async (
    type: CurrencyType,
    baseCurrency: CurrencyPair
  ): Promise<void> => {
    try {
      if (baseCurrency.amount === 0) return;
      set({ loading: true });
      // 1. Get the target currency type
      const targetType =
        type === CurrencyType.SELL ? CurrencyType.BUY : CurrencyType.SELL;
      const targetCurrency = get()[targetType];
      
      // 2. Fetch the exchange rate
      const { basePrice, targetPrice } = await fetchExchangeRate(
        baseCurrency.symbol,
        targetCurrency.symbol
      );
      if (basePrice === 0 || targetPrice === 0) return;

      // 3. Calculate the amount
      const calculatedAmount = formatNumber(baseCurrency.amount * basePrice / targetPrice);
      set((state) => ({
        [type]: {
          ...state[type],
          price: basePrice,
        },
        [targetType]: {
          ...state[targetType],
          amount: calculatedAmount,
          price: targetPrice,
        },
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to calculate amount";
      set({ error: errorMessage });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
