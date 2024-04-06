import React, { useMemo } from 'react';

// Move getPriority function outside of the WalletPage component
const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100;
    case 'Ethereum':
      return 50;
    case 'Arbitrum':
      return 30;
    case 'Zilliqa':
    case 'Neo': // Combine cases with same priority
      return 20;
    default:
      return -99;
  }
};

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added missing blockchain property
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface WalletRowProps {
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({amount, usdValue, formattedAmount,}) => {
  return (
    <div>
      {/* Render wallet row */}
    </div>
  );
};

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = ({ children, ...rest }: Props) => {
  const balances = useWalletBalances();
  const prices = usePrices();
  
  // Refactor: Combine filtering, sorting, and formatting logic into a single useMemo hook
  const formattedBalances = useMemo(() => {
    const prioritizedBalances = balances.map((balance) => ({
      ...balance,
      priority: getPriority(balance.blockchain), // Use getPriority function
      
      /**
       * In this case, merging the formatting logic into the useMemo hook when calculating prioritizedBalances doesn't violate the Single Responsibility Principle (SRP).
       * SRP suggests that each class or module should have only one responsibility.
       * However, here, calculating and formatting formattedBalances is also part of processing specific data within the WalletPage component.
       *
       * The reason for merging the formatting logic into the useMemo hook is to optimize computation.
       * By doing so, we avoid iterating over formattedBalances after computing prioritizedBalances.
       * This minimizes the number of loops, potentially improving performance, especially with large datasets,
       * and enhancing user experience by reducing processing and rendering time.
       *
       * Therefore, in this context, merging not only saves iterations
       * but also enhances overall application performance without violating the SOLID principles.
       */
      formatted: balance.amount.toFixed(), // Format balance amount
    }));
    
    // Filter balances based on priority and amount
    const filteredBalances = prioritizedBalances.filter(
      (balance) => balance.priority > -99 && balance.amount <= 0
    );
    
    // Sort balances by priority
    filteredBalances.sort((lhs, rhs) => rhs.priority - lhs.priority);
    
    return filteredBalances;
  }, [balances]);
  
  // Refactor: Use unique identifier as key instead of index
  const rows = formattedBalances.map((balance, index) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={balance.currency} // Use currency as unique key
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });
  
  // Note: Using `{...rest}` here may unintentionally pass props that HTML doesn't support,
  // leading to warnings or unexpected behavior. Consider declaring specific props instead.
  return <div {...rest}>{rows}</div>;
};
