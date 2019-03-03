const addTax = (taxableAmount, taxValue, isTaxIncluded) => {
  const taxOnTop = taxValue / 100 + 1;

  if (isTaxIncluded) {
    return taxableAmount - taxableAmount / taxOnTop;
  }
  return taxableAmount * taxOnTop;
};

export default addTax;
