import moment from 'moment';

export const yachtService = {
  name: '',
  isPaid: false,
  isCompleted: false,
  assignedDate: moment(Date.now()).format('YYYY-MM-DD'),
  invoiceNumber: '',
  costCurrency: 'EUR',
  cost: '',
  isCostTaxAdded: false,
  isCostTaxIncluded: false,
  costTaxSelected: '',
  costTax: '',
  costTotal: '',
  chargedCurrency: 'EUR',
  charged: '',
  isChargedTaxAdded: false,
  isChargedTaxIncluded: false,
  chargedTaxSelected: '',
  chargedTaxPercentageOnTop: '',
  chargedTax: '',
  chargedTotal: '',
};
