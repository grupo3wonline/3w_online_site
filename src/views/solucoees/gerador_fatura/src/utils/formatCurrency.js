export const formatCurrency = (amount, currencyCode = 'BRL', minimumFractionDigits = 2) => {
  const locale = currencyCode === 'USD' ? 'en-US' : currencyCode === 'BRL' ? 'pt-BR' : 'en-IN';
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode, minimumFractionDigits }).format(amount);
};

export const getCurrencySymbol = (currencyCode) => {
  return formatCurrency(0, currencyCode).replace(/[\d.,\s]/g, '');
};
