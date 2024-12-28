export const formatMoneyValue = (value: number, currencySymbol: string, showDecimals: boolean = true): string => {
  console.log('Formatting money value:', { 
    originalValue: value, 
    type: typeof value,
    precision: value.toString()
  });
  
  // Ensure value is treated as a number and handle invalid inputs
  const numericValue = Number(value);
  if (isNaN(numericValue)) {
    console.error('Invalid numeric value:', value);
    return `${currencySymbol}0`;
  }

  try {
    // Preserve full decimal precision
    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 20 : 0, // Increased to preserve more decimals
      useGrouping: true,
    }).format(numericValue);

    console.log('Formatted value:', { 
      numericValue,
      formattedValue: `${currencySymbol}${formattedValue}`,
      showDecimals,
      precision: numericValue.toString()
    });

    return `${currencySymbol}${formattedValue}`;
  } catch (error) {
    console.error('Error formatting money value:', error);
    // If formatting fails, return the original value with currency symbol
    return `${currencySymbol}${value.toString()}`;
  }
};

export const formatInterestRate = (value: number): string => {
  // Preserve exact interest rate value
  const rate = Number(value);
  return isNaN(rate) ? '0.00%' : rate.toFixed(2) + '%';
};