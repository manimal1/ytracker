const addTax = (taxableAmount, taxValue, isTaxIncluded) => {
  const taxOnTop = ((taxValue / 100) + 1);
  
  if (isTaxIncluded) {
    return taxableAmount - (taxableAmount / taxOnTop);
  } else {
    return taxableAmount * taxOnTop;
  }
};

export default addTax;
