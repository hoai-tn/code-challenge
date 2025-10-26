/**
 * Money formatting utilities for currency values
 */

/**
 * Formats a value as USD currency
 * @param value - The number to format
 * @param showSymbol - Whether to show the $ symbol (default: true)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted USD string
 */
export function formatUSD(value: number, showSymbol: boolean = true, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) return showSymbol ? '$0.00' : '0.00';
  
  const formatted = value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  
  return showSymbol ? formatted : formatted.replace('$', '');
}

/**
 * Formats a value as cryptocurrency with appropriate precision
 * @param value - The number to format
 * @param symbol - The currency symbol (e.g., 'ETH', 'BTC')
 * @param decimals - Number of decimal places (default: 6)
 * @returns Formatted cryptocurrency string
 */
export function formatCrypto(value: number, symbol: string = '', decimals: number = 6): string {
  if (isNaN(value) || !isFinite(value)) return symbol ? `0 ${symbol}` : '0';
  
  // Handle very small values
  if (value < 0.000001 && value > 0) {
    return symbol ? `< 0.000001 ${symbol}` : '< 0.000001';
  }
  
  const formatted = value.toFixed(decimals).replace(/\.?0+$/, '');
  return symbol ? `${formatted} ${symbol}` : formatted;
}

/**
 * Formats a value as money with custom symbol
 * @param value - The number to format
 * @param symbol - The currency symbol
 * @param decimals - Number of decimal places (default: 2)
 * @param position - Position of symbol ('before' or 'after', default: 'before')
 * @returns Formatted money string
 */
export function formatMoney(
  value: number, 
  symbol: string = '$', 
  decimals: number = 2, 
  position: 'before' | 'after' = 'before'
): string {
  if (isNaN(value) || !isFinite(value)) {
    return position === 'before' ? `${symbol}0.00` : `0.00 ${symbol}`;
  }
  
  const formatted = value.toFixed(decimals);
  return position === 'before' ? `${symbol}${formatted}` : `${formatted} ${symbol}`;
}

/**
 * Formats a value as compact money (e.g., $1.2K, $1.5M)
 * @param value - The number to format
 * @param symbol - The currency symbol (default: '$')
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted compact money string
 */
export function formatCompactMoney(value: number, symbol: string = '$', decimals: number = 1): string {
  if (isNaN(value) || !isFinite(value)) return `${symbol}0`;
  
  const absValue = Math.abs(value);
  
  if (absValue >= 1e9) {
    return `${symbol}${(value / 1e9).toFixed(decimals)}B`;
  } else if (absValue >= 1e6) {
    return `${symbol}${(value / 1e6).toFixed(decimals)}M`;
  } else if (absValue >= 1e3) {
    return `${symbol}${(value / 1e3).toFixed(decimals)}K`;
  }
  
  return `${symbol}${value.toFixed(decimals)}`;
}

/**
 * Formats a price change with appropriate styling indicators
 * @param value - The price change value
 * @param showSign - Whether to show + sign for positive values (default: true)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted price change string
 */
export function formatPriceChange(value: number, showSign: boolean = true, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) return '0.00';
  
  const formatted = Math.abs(value).toFixed(decimals);
  
  if (value > 0) {
    return showSign ? `+${formatted}` : formatted;
  } else if (value < 0) {
    return `-${formatted}`;
  }
  
  return formatted;
}

/**
 * Formats a value as percentage change
 * @param value - The percentage change value (as decimal, e.g., 0.05 for 5%)
 * @param showSign - Whether to show + sign for positive values (default: true)
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted percentage change string
 */
export function formatPercentageChange(value: number, showSign: boolean = true, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) return '0.00%';
  
  const percentage = value * 100;
  const formatted = Math.abs(percentage).toFixed(decimals);
  
  if (percentage > 0) {
    return showSign ? `+${formatted}%` : `${formatted}%`;
  } else if (percentage < 0) {
    return `-${formatted}%`;
  }
  
  return `${formatted}%`;
}

/**
 * Parses a money string to a number, handling various formats
 * @param value - The money string to parse
 * @returns Parsed number or 0 if invalid
 */
export function parseMoney(value: string): number {
  if (!value || value.trim() === '') return 0;
  
  // Remove currency symbols and commas
  const cleaned = value.replace(/[$,\s]/g, '');
  const parsed = parseFloat(cleaned);
  
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Validates if a string represents a valid money amount
 * @param value - The string to validate
 * @returns True if valid money amount, false otherwise
 */
export function isValidMoney(value: string): boolean {
  if (!value || value.trim() === '') return false;
  
  // Allow numbers with optional decimal places and currency symbols
  const moneyRegex = /^[$]?[\d,]+(\.\d{1,2})?$/;
  return moneyRegex.test(value.trim());
}
