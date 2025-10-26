//React
import React from "react";
//Components
import { Card, CardContent } from "@/components/ui/card";
import { InputCurrency } from "@/components/ui/input";
import { CurrencyCombobox } from "./currency-combobox";
import { CurrencyAmountSkeleton, UsdValueSkeleton } from "@/components/ui/skeleton";
//Stores
import {
  CurrencyPair,
  CurrencyType,
  useCurrencySwapStore,
} from "@/stores";
//Utils
import { formatUSD } from "@/utils/money-format.util";

type CurrencySwapCardProps = {
  label: string;
  type: CurrencyType;
  onChange: (currency: CurrencyPair) => void;
} & Omit<React.ComponentProps<typeof Card>, 'onChange'>;

export function CurrencySwapCard({
  label,
  type,
  onChange,
  ...props
}: CurrencySwapCardProps) {
  const {
    [type]: currentCurrency,
    loading,
  } = useCurrencySwapStore();

  const calculateUsdValue = (amount: number, price: number): string => {
    if (!amount || !price) return "0.00";
    const usdValue = amount * price;
    return formatUSD(usdValue, false);
  };

  const isCurrencyLoading = type === CurrencyType.BUY && loading;

  return (
    <Card className="rounded-2xl" {...props}>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-300">{label}</div>
          {isCurrencyLoading ? (
            <CurrencyAmountSkeleton className="h-10 w-24" />
          ) : (
            <InputCurrency
              type="number"
              placeholder="0"
              value={currentCurrency.amount}
              disabled={type === CurrencyType.BUY}
              onChange={(e) =>
                onChange({
                  amount: parseFloat(e.target.value) ,
                  symbol: currentCurrency.symbol,
                } as CurrencyPair)
              }
              className="w-full min-w-20 h-10"
            />
          )}
          {loading ? (
            <UsdValueSkeleton className="h-4 w-16" />
          ) : (
            <div className="text-sm text-gray-400 mt-1">
              $
              {calculateUsdValue(
                currentCurrency.amount,
                currentCurrency.price || 0
              )}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <CurrencyCombobox
            value={currentCurrency.symbol}
            onChange={(symbol: string) =>
              onChange({
                amount: currentCurrency.amount,
                symbol,
              })
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
