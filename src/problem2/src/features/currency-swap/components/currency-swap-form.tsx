//React
import { useCallback, useLayoutEffect } from "react";
//Components
import { Button } from "@/components/ui/button";
import { ArrowDown, Loader2 } from "lucide-react";
//Stores
import {
  CurrencyPair,
  CurrencyType,
  useCurrencySwapStore,
} from "@/stores";
//Hooks
import { CurrencySwapCard } from "./currency-swap-card";
import { useDebounce } from "@/shared/hooks";

export function CurrencySwapForm() {
  const {
    [CurrencyType.SELL]: sellCurrency,
    [CurrencyType.BUY]: buyCurrency,
    loading,
    error,
    setCurrency,
    calculateAmount,
  } = useCurrencySwapStore();

  // Debounce the amounts to avoid excessive API calls
  const debouncedSellAmount = useDebounce(sellCurrency, 800);
  const debouncedBuyAmount = useDebounce(buyCurrency, 800);


  useLayoutEffect(() => {
    calculateAmount(CurrencyType.SELL, debouncedSellAmount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedSellAmount.amount,
    debouncedSellAmount.symbol,
    debouncedBuyAmount.symbol,
  ]);

  const handleCurrencyChange = useCallback(
    (type: CurrencyType, currency: CurrencyPair) => {
      setCurrency(type, currency);
    },
    [setCurrency]
  );

  return (
    <div className="w-full max-w-md space-y-1">
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
          <p className="font-medium">Error loading exchange rates</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {!error && (
        <>
          {/* Sell Section */}
          <CurrencySwapCard
            label="Sell"
            type={CurrencyType.SELL}
            onChange={(currency: CurrencyPair) =>
              handleCurrencyChange(CurrencyType.SELL, currency)
            }
          />

          {/* Swap Button */}
          <div className="flex flex-col items-center absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card p-1 rounded-xl">
            <Button
              size="icon"
              className="bg-[#393943] border-gray-700 hover:bg-gray-700 rounded-xl w-10 h-10"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>

          {/* Buy Section */}
          <CurrencySwapCard
            className="bg-[#393943]"
            label="Buy"
            type={CurrencyType.BUY}
            onChange={(currency: CurrencyPair) =>
              handleCurrencyChange(CurrencyType.BUY, currency)
            }
          />

          {/* Primary Action Button */}
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg text-base"
            disabled={!sellCurrency.amount || !buyCurrency.amount || loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Swap Now"
            )}
          </Button>
        </>
      )}
    </div>
  );
}
