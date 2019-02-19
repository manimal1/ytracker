import moment from 'moment';

export const yachtService = {
  currency: 'EUR',
  name: '',
  cost: '0.00',
  charged: '0.00',
  paid: false,
  completed: false,
  assignedDate: moment(Date.now()).format('YY-MM-DD'),
  taxValues: ['0', '7', '10', '25', 'custom'],
  addCostTax: false,
  costTaxIncluded: false,
  costTaxSelected: '0',
  taxCost: '0.00',
  totalCost: '0.00',
  addChargedTax: false,
  chargedTaxIncluded: false,
  chargedTaxSelected: '0.00',
  taxCharged: '0.00',
  totalCharged: '0.00',
  totalValue: '0.00',
};
