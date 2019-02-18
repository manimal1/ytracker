const formatCurrency = (currency, value) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: currency, currencyDisplay: 'symbol' })
      .format(value);
}

export default formatCurrency;
