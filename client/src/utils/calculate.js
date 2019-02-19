export const calculatedTax = (taxableAmount, taxValue, isTaxIncluded) => {
  let taxAmount;
  const taxOnTop = ((+taxValue / 100) + 1);

  if (isTaxIncluded) {
    taxAmount = +taxableAmount - (+taxableAmount / taxOnTop);
  } else {
    taxAmount = +taxableAmount * (+taxValue / 100);
  }

  return taxAmount.toFixed(2);
};

export const addTaxOnTopOfAmount = (taxableAmount, calculatedTaxTotal) => {
  return (+taxableAmount + +calculatedTaxTotal).toFixed(2).toString();
}

export const formatCurrencyNumber = (amount) => {
  return parseFloat(amount).toFixed(2);
}

export const formatCurrency = (currency, value) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency, currencyDisplay: 'symbol' })
    .format(value);
}
