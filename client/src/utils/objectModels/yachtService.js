import moment from 'moment';

export const yachtService = {
  name: '',
  isPaid: false,
  isCompleted: false,
  assignedDate: moment(Date.now()).format('YYYY-MM-DD'),
  invoiceNumber: '',
  costCurrency: 'EUR',
  cost: '0.00',
  isCostTaxAdded: false,
  isCostTaxIncluded: false,
  costTaxSelected: '0',
  costTax: '0.00',
  costTotal: '0.00',
  chargedCurrency: 'EUR',
  charged: '0.00',
  isChargedTaxAdded: false,
  isChargedTaxIncluded: false,
  chargedTaxSelected: '0',
  chargedTaxPercentageOnTop: '0',
  chargedTax: '0.00',
  chargedTotal: '0.00',
};
