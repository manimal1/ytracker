import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { yachtService } from 'utils/objectModels';
import {
  calculatedTax,
  addTaxOnTopOfAmount,
  calculatePercentageOnTop,
  formatCurrencyNumber,
  formatCurrency,
} from 'utils/calculate';
import { addYachtService, clearYachtServiceData } from './actions';

import ServiceForm from './ServiceForm';

class AddYachtService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      yachtService,
      statefulYachtService: this.props.yachtService,
      taxValues: [0, 7, 10, 25, 'custom'],
      serviceTypes: [
        'Deck',
        'Engineering',
        'Interior',
        'Management',
        'Provisions',
        'Berths',
        'Fuel',
        'Government/Taxes',
        'Insurance/Paperwork',
        'Shipyard',
        'Daily Hires',
        'Miscellaneous',
      ],
      totalPrice: '',
      errors: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    }

    if (nextProps.companyData.selectedCompany !== prevState.selectedCompany) {
      return { selectedCompany: nextProps.companyData.selectedCompany };
    }

    if (nextProps.yachtService !== prevState.yachtService) {
      return { statefulYachtService: nextProps.yachtService };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.errors !== this.state.errors) {
      this.setState({ errors: this.state.errors });
    }

    if (prevState.selectedCompany !== this.state.selectedCompany) {
      this.setState({ selectedCompany: this.state.selectedCompany });
    }

    if (prevState.statefulYachtService !== this.state.statefulYachtService) {
      this.setState({ statefulYachtService: this.state.statefulYachtService });
    }

    const prevYachtService = prevState.yachtService;
    let yachtService = { ...this.state.yachtService };
    let {
      cost,
      isCostTaxAdded,
      isCostTaxIncluded,
      costTaxSelected,
      isChargedTaxAdded,
      charged,
      chargedCurrency,
    } = yachtService;

    // recalculate taxes based on sales tax inclusion/exclusion
    if (prevYachtService.isCostTaxIncluded !== isCostTaxIncluded) {
      if (charged) {
        const costTaxTotals = this.handleCalculateTax(
          cost,
          costTaxSelected,
          isCostTaxIncluded,
        );
        yachtService.costTax = costTaxTotals.taxTotal;
        yachtService.costTotal = costTaxTotals.totalValue;
        const chargedTaxTotals = this.handleCalculateTax(
          charged,
          costTaxSelected,
          isCostTaxIncluded,
        );
        const chargedTotal = chargedTaxTotals.totalValue;
        yachtService.chargedTax = chargedTaxTotals.taxTotal;
        yachtService.chargedTotal = chargedTotal;
        const totalPrice = this.handleCalculateTotalPrice(
          isChargedTaxAdded,
          chargedCurrency,
          charged,
          chargedTotal,
        );
        return this.setState({
          yachtService,
          totalPrice,
        });
      }

      const costTaxTotals = this.handleCalculateTax(
        cost,
        costTaxSelected,
        isCostTaxIncluded,
      );
      yachtService.costTax = costTaxTotals.taxTotal;
      yachtService.costTotal = costTaxTotals.totalValue;
      return this.setState({ yachtService });
    }

    // clear all tax info if tax option removed
    if (prevYachtService.isCostTaxAdded !== isCostTaxAdded) {
      if (!isCostTaxAdded) {
        let isChargedTaxAdded = false;
        let chargedTotal = charged;
        yachtService.isCostTaxIncluded = false;
        yachtService.costTaxSelected = '';
        yachtService.costTax = '';
        yachtService.costTotal = this.state.cost;
        yachtService.isChargedTaxAdded = isChargedTaxAdded;
        yachtService.isChargedTaxIncluded = false;
        yachtService.chargedTaxSelected = '';
        yachtService.chargedTax = '';
        yachtService.chargedTotal = chargedTotal;
        const totalPrice = this.handleCalculateTotalPrice(
          isChargedTaxAdded,
          chargedCurrency,
          charged,
          chargedTotal,
        );
        this.setState({
          yachtService,
          totalPrice,
        });
      }
    }

    if (this.state.statefulYachtService.isServiceAdded) {
      this.context.handlePanelSwitch('yacht-home');
      this.context.setSelectedIndex(0);
    }
  }

  componentWillUnmount() {
    this.props.clearYachtServiceData();
  }

  onChange = e => {
    const name = e.target.name;
    const yachtService = { ...this.state.yachtService };
    yachtService[name] = e.target.value;
    this.setState({ yachtService });
  };

  onBlur = e => {
    const name = e.target.name;
    const value = e.target.value;
    const yachtService = { ...this.state.yachtService };
    const formattedCurrencyValue = formatCurrencyNumber(value);
    yachtService[name] = formattedCurrencyValue;
    this.setState({ yachtService });
  };

  handleChangeChargedCurrency = e => {
    let yachtService = { ...this.state.yachtService };
    const {
      isChargedTaxAdded,
      chargedCurrency,
      charged,
      chargedTotal,
    } = yachtService;
    const totalPrice = this.handleCalculateTotalPrice(
      isChargedTaxAdded,
      chargedCurrency,
      charged,
      chargedTotal,
    );
    this.setState({ totalPrice });
  };

  handleCaclulateCostOnBlur = e => {
    const name = e.target.name;
    const value = e.target.value;
    const formattedCurrencyValue = formatCurrencyNumber(value);
    let yachtService = { ...this.state.yachtService };
    const { cost, costTaxSelected, isCostTaxIncluded } = yachtService;
    yachtService[name] = formattedCurrencyValue;
    console.log('1: ', yachtService);

    if (costTaxSelected) {
      console.log(costTaxSelected);
      const costTaxTotals = this.handleCalculateTax(
        cost,
        costTaxSelected,
        isCostTaxIncluded,
      );
      console.log({ costTaxTotals });
      yachtService.costTax = costTaxTotals.taxTotal;
      yachtService.costTotal = costTaxTotals.totalValue;
      console.log('blurred: ', yachtService);
      return this.setState({ yachtService });
    }

    return this.setState({ yachtService });
  };

  handleCalculateTaxOnBlur = e => {
    const taxName = e.target.name;
    const taxValue = e.target.value;
    let yachtService = { ...this.state.yachtService };
    const { cost, isCostTaxIncluded, chargedCurrency, charged } = yachtService;

    if (charged) {
      const costTaxTotals = this.handleCalculateTax(
        cost,
        taxValue,
        isCostTaxIncluded,
      );
      const isChargedTaxAdded = true;
      yachtService.costTax = costTaxTotals.totalTax;
      yachtService.costTotal = costTaxTotals.totalValue;
      yachtService.isChargedTaxAdded = isChargedTaxAdded;
      yachtService.chargedTaxSelected = taxValue;
      const chargedTaxTotals = this.handleCalculateTax(
        charged,
        taxValue,
        isCostTaxIncluded,
      );
      const chargedTotal = chargedTaxTotals.totalValue;
      yachtService.chargedTax = chargedTaxTotals.taxTotal;
      yachtService.chargedTotal = chargedTotal;
      const totalPrice = this.handleCalculateTotalPrice(
        isChargedTaxAdded,
        chargedCurrency,
        charged,
        chargedTotal,
      );
      this.setState({
        yachtService,
        totalPrice,
      });
    }

    const taxTotals = this.handleCalculateTax(
      cost,
      taxValue,
      isCostTaxIncluded,
    );
    yachtService[taxName] = taxValue;
    yachtService.costTax = taxTotals.taxTotal;
    yachtService.costTotal = taxTotals.totalValue;
    console.log({ yachtService });
    return this.setState({ yachtService });
  };

  handleCalculateChargedAmountOnBlur = e => {
    const charged = e.target.name;
    const chargedValue = e.target.value;
    const formattedCurrencyValue = formatCurrencyNumber(chargedValue);
    let yachtService = { ...this.state.yachtService };
    const {
      isCostTaxIncluded,
      costTaxSelected,
      chargedCurrency,
    } = yachtService;

    if (!costTaxSelected) {
      const isChargedTaxAdded = false;
      const chargedTotal = formattedCurrencyValue;
      yachtService[charged] = formattedCurrencyValue;
      yachtService['isChargedTaxAdded'] = isChargedTaxAdded;
      yachtService['chargedTotal'] = chargedTotal;
      const totalPrice = this.handleCalculateTotalPrice(
        isChargedTaxAdded,
        chargedCurrency,
        chargedValue,
        chargedTotal,
      );
      return this.setState({
        yachtService,
        totalPrice,
      });
    }

    const isChargedTaxAdded = true;
    yachtService.isChargedTaxAdded = isChargedTaxAdded;
    yachtService.chargedTaxSelected = costTaxSelected;
    yachtService[charged] = formattedCurrencyValue;
    const taxTotals = this.handleCalculateTax(
      chargedValue,
      costTaxSelected,
      isCostTaxIncluded,
    );
    const chargedTotal = taxTotals.totalValue;
    yachtService.chargedTax = taxTotals.taxTotal;
    yachtService.chargedTotal = chargedTotal;
    const totalPrice = this.handleCalculateTotalPrice(
      isChargedTaxAdded,
      chargedCurrency,
      chargedValue,
      chargedTotal,
    );
    return this.setState({
      yachtService,
      totalPrice,
    });
  };

  handleAddPercentageToChargedAmountOnBlur = e => {
    const value = e.target.value;
    if (!value) {
      return '';
    }

    let yachtService = { ...this.state.yachtService };
    const {
      cost,
      costTaxSelected,
      isCostTaxAdded,
      isCostTaxIncluded,
      chargedCurrency,
    } = yachtService;

    const chargedAmounts = this.handleAddPercentageToChargedAmount(
      cost,
      costTaxSelected,
      isCostTaxAdded,
      isCostTaxIncluded,
      value,
    );
    const isChargedTaxAdded = chargedAmounts.isChargedTaxAdded;
    const charged = chargedAmounts.charged;
    const chargedTotal = chargedAmounts.chargedTotal;
    yachtService.charged = charged;
    yachtService.isChargedTaxAdded = isChargedTaxAdded;
    yachtService.chargedTaxSelected = chargedAmounts.chargedTaxSelected;
    yachtService.chargedTax = chargedAmounts.chargedTax;
    yachtService.isChargedTaxIncluded = chargedAmounts.isChargedTaxIncluded;
    yachtService.chargedTotal = chargedTotal;
    const totalPrice = this.handleCalculateTotalPrice(
      isChargedTaxAdded,
      chargedCurrency,
      charged,
      chargedTotal,
    );
    return this.setState({
      yachtService,
      totalPrice,
    });
  };

  handleAddPercentageToChargedAmount = (
    baseAmount,
    taxSelected,
    isTaxAdded,
    isTaxIncluded,
    percentageToAdd,
  ) => {
    const addPercentageToPrice = calculatePercentageOnTop(
      baseAmount,
      percentageToAdd,
    );
    const calculatedTaxTotal = calculatedTax(
      addPercentageToPrice,
      taxSelected,
      isTaxIncluded,
    );
    const isChargedTaxIncluded = isTaxIncluded ? true : false;
    const chargedTotal = isTaxIncluded
      ? formatCurrencyNumber(addPercentageToPrice)
      : addTaxOnTopOfAmount(addPercentageToPrice, calculatedTaxTotal);
    if (isTaxAdded) {
      return {
        charged: addPercentageToPrice,
        isChargedTaxAdded: true,
        chargedTaxSelected: taxSelected,
        chargedTax: calculatedTaxTotal,
        isChargedTaxIncluded,
        chargedTotal,
      };
    }
    return {
      charged: addPercentageToPrice,
      isChargedTaxAdded: false,
      chargedTaxSelected: '',
      chargedTax: '',
      isChargedTaxIncluded,
      chargedTotal,
    };
  };

  handleCalculateTax = (taxableAmount, value, isTaxIncluded) => {
    const calculatedTaxTotal = calculatedTax(
      taxableAmount,
      value,
      isTaxIncluded,
    );
    const addTaxOnTopOfValue = addTaxOnTopOfAmount(
      taxableAmount,
      calculatedTaxTotal,
    );
    const totalValue = isTaxIncluded
      ? formatCurrencyNumber(taxableAmount)
      : addTaxOnTopOfValue;
    return {
      taxTotal: calculatedTaxTotal,
      totalValue,
    };
  };

  handleCalculateTotalPrice = (
    isChargedTaxAdded,
    chargedCurrency,
    charged,
    chargedTotal,
  ) => {
    if (isChargedTaxAdded) {
      return formatCurrency(chargedCurrency, chargedTotal);
    }
    return formatCurrency(chargedCurrency, charged);
  };

  handleCheckBox = e => {
    const name = e.target.name;
    const yachtService = { ...this.state.yachtService };
    yachtService[name] = e.target.checked;

    this.setState({ yachtService });
  };

  onSubmit = e => {
    e.preventDefault();
    const newService = this.state.yachtService;
    const yachtId = this.props.yachtData.selectedYacht._id;
    const companyId =
      this.props.companyData && this.props.companyData.selectedCompany
        ? this.props.companyData.selectedCompany._id
        : '';

    this.props.addYachtService(yachtId, companyId, newService);
  };

  render() {
    const handleCheckBox = this.handleCheckBox;
    const onChange = this.onChange;
    const onSubmit = this.onSubmit;
    const onBlur = this.onBlur;
    const handleChangeChargedCurrency = this.handleChangeChargedCurrency;
    const handleCaclulateCostOnBlur = this.handleCaclulateCostOnBlur;
    const handleCalculateChargedAmountOnBlur = this
      .handleCalculateChargedAmountOnBlur;
    const handleCalculateTaxOnBlur = this.handleCalculateTaxOnBlur;
    const handleAddPercentageToChargedAmountOnBlur = this
      .handleAddPercentageToChargedAmountOnBlur;
    const isDataFetching =
      this.props.yachtService &&
      this.props.yachtService.isAddingService === true;

    return (
      <div>
        <ServiceForm
          {...{
            ...this.state,
            handleCheckBox,
            onChange,
            onSubmit,
            onBlur,
            handleChangeChargedCurrency,
            handleCaclulateCostOnBlur,
            handleCalculateChargedAmountOnBlur,
            handleCalculateTaxOnBlur,
            handleAddPercentageToChargedAmountOnBlur,
            isDataFetching,
          }}
        />
      </div>
    );
  }
}

AddYachtService.propTypes = {
  addYachtService: PropTypes.func.isRequired,
  clearYachtServiceData: PropTypes.func.isRequired,
};

AddYachtService.contextTypes = {
  handlePanelSwitch: PropTypes.func,
  setSelectedIndex: PropTypes.func,
};

const mapStateToProps = state => ({
  yachtData: state.yachtData,
  companyData: state.companyData,
  yachtService: state.yachtService,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  {
    addYachtService,
    clearYachtServiceData,
  },
)(AddYachtService);
