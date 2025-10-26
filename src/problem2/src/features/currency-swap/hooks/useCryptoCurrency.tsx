import { fetchCryptoCurrencies } from "@/apis/exchange-rates";
import { useLayoutEffect, useState } from "react";

export const useCryptoCurrency = () => {
  const [cryptoCurrencies, setCryptoCurrencies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loadCryptoCurrencies = async () => {
    try {
      setLoading(true);
      setError(null);
      const currencies = await fetchCryptoCurrencies();
      setCryptoCurrencies(currencies);
      setLoading(false);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch crypto currencies"
      );
      setLoading(false);
    }
  };
  const handleCryptoCurrencySearch = async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);
      const currencies = await fetchCryptoCurrencies(searchTerm);
      setCryptoCurrencies(currencies);
      setLoading(false);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to search crypto currencies"
      );
      setLoading(false);
    }
  };
  
  useLayoutEffect(() => {
    loadCryptoCurrencies();
  }, []);
  return { cryptoCurrencies, loading, error, handleCryptoCurrencySearch };
};
