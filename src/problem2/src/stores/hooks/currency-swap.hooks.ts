import { useCurrencySwapStore } from "../currency-swap.store";
import { CurrencyType } from "../types/currency-swap.types";

// Custom hooks for specific store parts
export const useSellCurrency = () => useCurrencySwapStore((state) => state[CurrencyType.SELL]);
export const useBuyCurrency = () => useCurrencySwapStore((state) => state[CurrencyType.BUY]);
export const useExchangeRates = () => useCurrencySwapStore((state) => state.exchangeRates);
export const useLoading = () => useCurrencySwapStore((state) => state.loading);
export const useError = () => useCurrencySwapStore((state) => state.error);

// Action hooks
export const useCurrencyActions = () => {
  const setCurrency = useCurrencySwapStore((state) => state.setCurrency);
  const setLoading = useCurrencySwapStore((state) => state.setLoading);
  const setError = useCurrencySwapStore((state) => state.setError);
  const loadExchangeRates = useCurrencySwapStore((state) => state.loadExchangeRates);
  const calculateAmount = useCurrencySwapStore((state) => state.calculateAmount);

  return {
    setCurrency,
    setLoading,
    setError,
    loadExchangeRates,
    calculateAmount,
  };
};

// Re-export the main store hook
export { useCurrencySwapStore };
