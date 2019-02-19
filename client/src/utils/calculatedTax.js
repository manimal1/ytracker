const calculatedTax = (taxableAmount, taxValue, isTaxIncluded) => {
  let taxAmount;
  const taxOnTop = ((+taxValue / 100) + 1);

  if (isTaxIncluded) {
    taxAmount = +taxableAmount - (+taxableAmount / taxOnTop);
  } else {
    taxAmount = +taxableAmount * (+taxValue / 100);
  }

  return taxAmount.toFixed(2);
};

export default calculatedTax;
