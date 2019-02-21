import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addYachtService, clearYachtServiceData } from './actions';

import { default as ServiceForm } from './ServiceForm';
import { yachtService } from '../../../../utils/objectModels';
import {
  calculatedTax,
  addTaxOnTopOfAmount,
  calculatePercentageOnTop,
  formatCurrencyNumber,
  formatCurrency,
} from '../../../../utils/calculate';

class AddYachtService extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      yachtService: yachtService,
      selectedCompany: {},
      errors: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.errors !== prevState.errors) {
      return {errors: nextProps.errors};
    }

    if (nextProps.companyData.selectedCompany !== prevState.selectedCompany) {
      return {selectedCompany: nextProps.companyData.selectedCompany};
    }
    
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.errors !== this.state.errors) {
      this.setState({ errors: this.state.errors });
    }

    if (prevState.selectedCompany !== this.state.selectedCompany) {
      this.setState({ selectedCompany: this.state.selectedCompany });
    }

    if (prevState.yachtService.isCostTaxIncluded !== this.state.yachtService.isCostTaxIncluded) {
      const { cost, costTaxSelected, isCostTaxIncluded } = this.state.yachtService;
      return this.handleCalculateTax(cost, costTaxSelected, isCostTaxIncluded, 'costTax', 'costTotal');
    }

    if (prevState.yachtService.isChargedTaxIncluded !== this.state.yachtService.isChargedTaxIncluded) {
      const { charged, chargedTaxSelected, isChargedTaxIncluded } = this.state.yachtService;
      return this.handleCalculateTax(charged, chargedTaxSelected, isChargedTaxIncluded, 'chargedTax', 'chargedTotal');
    }

    if (prevState.yachtService.isCostTaxAdded !== this.state.yachtService.isCostTaxAdded) {
      if (!this.state.yachtService.isCostTaxAdded) {
        let yachtService = {...this.state.yachtService};
        yachtService['isCostTaxIncluded'] = false;
        yachtService['costTaxSelected'] = '0.00';
        yachtService['costTaxSelected'] = '0.00';
        yachtService['costTaxSelected'] = '0.00';
        return this.setState({ yachtService });
      }
    }

    if (prevState.yachtService.isChargedTaxAdded !== this.state.yachtService.isChargedTaxAdded) {
      if (!this.state.yachtService.isChargedTaxAdded) {
        let yachtService = {...this.state.yachtService};
        yachtService['isChargedTaxIncluded'] = false;
        yachtService['chargedTaxSelected'] = '0.00';
        yachtService['chargedTax'] = '0.00';
        yachtService['chargedTotal'] = '0.00';
        return this.setState({ yachtService });
      }
    }

    if (prevState.yachtService.charged !== this.state.yachtService.charged
      || prevState.yachtService.chargedTotal !== this.state.yachtService.chargedTotal
      || prevState.yachtService.chargedCurrency !== this.state.yachtService.chargedCurrency) {
        const { isChargedTaxAdded, chargedCurrency, charged, chargedTotal } = this.state.yachtService;
        let yachtService = {...this.state.yachtService};
        yachtService['totalValue'] = this.handleCalculateTotalPrice(isChargedTaxAdded, chargedCurrency, charged, chargedTotal);
        this.setState({ yachtService });
    }

    if (this.state.yachtService.isAdded) {
      this.context.handlePanelSwitch('yacht-dashboard');
      this.context.setSelectedIndex(0);
    }
  }

  componentWillUnmount() {
    this.props.clearYachtServiceData();
  }

  onChange = (e) => {
    let name = e.target.name;
    let yachtService = {...this.state.yachtService};
    yachtService[name] = e.target.value;
    this.setState({ yachtService });
  }

  onBlur = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let yachtService = {...this.state.yachtService};
    const formattedCurrencyValue = formatCurrencyNumber(value);
    yachtService[name] = formattedCurrencyValue;
    this.setState({ yachtService });
  }

  handleCalculateTaxOnBlur = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let yachtService = {...this.state.yachtService};
    const isCostTax = name === 'costTaxSelected';
    const taxableAmount = isCostTax ? yachtService.cost : yachtService.charged;
    const isTaxIncluded = isCostTax ? yachtService.isCostTaxIncluded : yachtService.isChargedTaxIncluded;
    const taxTotal = isCostTax ? 'costTax' : 'chargedTax';
    const totalValue = isCostTax ? 'costTotal' : 'chargedTotal';
    return this.handleCalculateTax(taxableAmount, value, isTaxIncluded, taxTotal, totalValue);
  }

  handleCalculateTax = (taxableAmount, value, isTaxIncluded, taxTotal, totalValue) => {
    let yachtService = {...this.state.yachtService};
    const calculatedTaxTotal = calculatedTax(taxableAmount, value, isTaxIncluded);
    const addTaxOnTopOfValue = addTaxOnTopOfAmount(taxableAmount, calculatedTaxTotal);
    yachtService[taxTotal] = calculatedTaxTotal;
    yachtService[totalValue] = isTaxIncluded ? formatCurrencyNumber(taxableAmount) : addTaxOnTopOfValue;
    this.setState({ yachtService });
  }

  handleAddPercentageToChargedAmountOnBlur = (e) => {
    const value = e.target.value;
    const cost = this.state.yachtService.cost;
    const costTaxSelected = this.state.yachtService.costTaxSelected;
    const isCostTaxAdded = this.state.yachtService.isCostTaxAdded;
    const isCostTaxIncluded = this.state.yachtService.isCostTaxIncluded;
    this.handleAddPercentageToChargedAmount(cost, costTaxSelected, isCostTaxAdded, isCostTaxIncluded, value);
  }

  handleAddPercentageToChargedAmount = (baseAmount, taxSelected, isTaxAdded, isTaxIncluded, percentageToAdd) => {
    let yachtService = {...this.state.yachtService};
    const addPercentageToPrice = calculatePercentageOnTop(baseAmount, percentageToAdd);
    yachtService['charged'] = addPercentageToPrice;

    if (isTaxAdded) {
      yachtService['isChargedTaxAdded'] = true;
      yachtService['chargedTaxSelected'] = taxSelected;

      if (isTaxIncluded) {
        yachtService['isChargedTaxIncluded'] = true;
      } else {
        yachtService['isChargedTaxIncluded'] = false;
      }
    }
    this.setState({ yachtService });
  }

  handleCalculateTotalPrice = (isChargedTaxAdded, chargedCurrency, charged, chargedTotal) => {
    if (isChargedTaxAdded) {
      return formatCurrency(chargedCurrency, chargedTotal);
    }
    return formatCurrency(chargedCurrency, charged);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newService = this.state.yachtService;
    const yachtId = this.props.yachtData.selectedYacht._id;
    const companyId = this.props.companyData && this.props.companyData.selectedCompany
      ? this.props.companyData.selectedCompany._id : '';

    this.props.addYachtService(yachtId, companyId, newService);
  }

  handleCheckBox = (e) => {
    const name = e.target.name;
    let yachtService = {...this.state.yachtService};
    yachtService[name] = e.target.checked;

    this.setState({ yachtService });
  };

  render() {
    const handleCheckBox = this.handleCheckBox;
    const onChange = this.onChange;
    const onSubmit = this.onSubmit;
    const onBlur = this.onBlur;
    const handleCalculateTaxOnBlur = this.handleCalculateTaxOnBlur;
    const handleAddPercentageToChargedAmountOnBlur = this.handleAddPercentageToChargedAmountOnBlur;
    const isDataFetching = this.props.yachtService 
      && this.props.yachtService.isAddingService === true;

    return (
      <div>
        <ServiceForm {...{
          ...this.state,
          handleCheckBox,
          onChange,
          onSubmit,
          onBlur,
          handleCalculateTaxOnBlur,
          handleAddPercentageToChargedAmountOnBlur,
          isDataFetching,
        }} />
      </div>
    );
  }
}

AddYachtService.propTypes = {
  addYachtService: PropTypes.func.isRequired,
  clearYachtServiceData: PropTypes.func.isRequired,
  yachtService: PropTypes.object,
  yachtData: PropTypes.object.isRequired,
  companyData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

AddYachtService.contextTypes = {
  handlePanelSwitch: PropTypes.func,
  setSelectedIndex: PropTypes.func,
}

const mapStateToProps = (state) => ({
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
