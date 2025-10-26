"use client";

import { useState } from "react";

import { Combobox } from "@/components/ui/combobox";
import { TokenIcon } from "@/components/ui/token-icon";
import { useCryptoCurrency } from "../hooks/useCryptoCurrency";

interface Currency {
  value: string;
  symbol: string;
}

interface CurrencyComboboxProps {
  value: string;
  onChange: (currency: string) => void;
}

export function CurrencyCombobox({
  value,
  onChange,
}: CurrencyComboboxProps) {
  const [loading, setLoading] = useState(false);
  const { handleCryptoCurrencySearch, cryptoCurrencies } = useCryptoCurrency();

  const handleCurrencySearch = async (searchTerm: string) => {
    setLoading(true);
    // Simulate search delay
    await handleCryptoCurrencySearch(searchTerm);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Combobox<Currency>
          className="rounded-full"
          items={cryptoCurrencies.map((currency: string) => ({
            value: currency,
            label: (
              <div className="flex items-center space-x-1">
                <TokenIcon symbol={currency} className="w-4 h-4" />
                <span>{currency}</span>
              </div>
            ),
          }))}
          value={value}
          onChange={(value) => onChange(value as string)}
          placeholder={"Select a currency"}
          loading={loading}
          emptyMessage={"No currencies found"}
          onSearch={handleCurrencySearch}
          searchDebounce={300}
        />
      </div>
    </div>
  );
}
