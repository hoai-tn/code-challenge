// @ts-nocheck - React not installed in this demo context
import React, { useMemo } from "react";
// ISSUE 1: Missing 'blockchain' property in WalletBalance interface but used in getPriority(balance.blockchain)
interface WalletBalance {
    currency: string;
    amount: number;
  }
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
  
  interface Props extends BoxProps {
  
  }
  /* ISSUE 2: 
  - Type annotation is redundant (props: Props) when already typed in function signature
  - 'children' is not used
  */
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices(); // ISSUE 15: Used later but not memoized properly
  
      /* ISSUE 3: 
      - Function declared inside component without useCallback - recreated every render
      - Using 'any' type for blockchain parameter
      - Missing semicolons (though auto-semicolon insertion handles this)
      */
  const getPriority = (blockchain: any): number => {
        switch (blockchain) {
          case 'Osmosis':
            return 100
          case 'Ethereum':
            return 50
          case 'Arbitrum':
            return 30
          case 'Zilliqa':
            return 20
          case 'Neo':
            return 20
          default:
            return -99
        }
      }
  
    /* ISSUE 4: 
    - Incorrect filter logic - balance.amount <= 0 should be excluded, not included
    - Undefined variable 'lhsPriority' - should be 'balancePriority'
    - The filter logic is backwards - returns true when amount <= 0, which keeps bad balances
    - 'prices' is in dependencies but never used in the useMemo computation
    - Missing return statement in sort comparator's else branch
    */
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            // BUG: lhsPriority is undefined - should be balancePriority
            if (lhsPriority > -99) {
               // BUG: This keeps balances with amount <= 0 (should exclude them)
               if (balance.amount <= 0) {
                 return true;
               }
            }
            return false
          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
              const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
              return -1;
            } else if (rightPriority > leftPriority) {
              return 1;
            }
            // BUG: Missing return 0 when priorities are equal
      });
    }, [balances, prices]); // BUG: 'prices' is in deps but not used here
  
    /* ISSUE 5: 
    - formattedBalances is computed but never used - wasted computation
    - map is recreated on every render instead of being memoized
    */
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed()
      }
    })

    /* ISSUE 6: 
    - Using array index as React key is an anti-pattern
    - Type mismatch - using FormattedWalletBalance but sortedBalances contains WalletBalance
    - 'prices' is in dependencies but never used in the useMemo computation
    */
    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }