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
      statefulYachtService: this.props.yachtService,
      taxValues: [ 0, 7, 10, 25, 'custom'],
      totalPrice: '',
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

    if (nextProps.yachtService !== prevState.yachtService) {
      return {statefulYachtService: nextProps.yachtService};
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

    if (prevState.statefulYachtService !== this.state.statefulYachtService) {
      this.setState({ statefulYachtService: this.state.statefulYachtService });
    }

    if (prevState.yachtService.isCostTaxIncluded !== this.state.yachtService.isCostTaxIncluded) {
        const yachtService = {...this.state.yachtService};
        let {
          cost,
          isCostTaxAdded,
          costTaxSelected,
          isCostTaxIncluded,
          charged,
          chargedTaxPercentageOnTop
        } = yachtService;

        if (chargedTaxPercentageOnTop) {
          return Promise.resolve(this.handleCalculateTax(cost, costTaxSelected, isCostTaxIncluded, 'costTax', 'costTotal'))
            .then(() => this.handleAddPercentageToChargedAmount(cost, costTaxSelected, isCostTaxAdded, isCostTaxIncluded, chargedTaxPercentageOnTop))
            .then(() => {
              let yachtService = {...this.state.yachtService};
              const { isChargedTaxAdded, chargedCurrency, charged, chargedTotal } = this.state.yachtService;
              yachtService['totalPrice'] = this.handleCalculateTotalPrice(isChargedTaxAdded, chargedCurrency, charged, chargedTotal);
              this.setState({ yachtService });
            });
        }

        if (!chargedTaxPercentageOnTop && charged) {
          return Promise.resolve(this.handleCalculateTax(cost, costTaxSelected, isCostTaxIncluded, 'costTax', 'costTotal'))
            .then(() => this.handleCalculateTax(charged, costTaxSelected, isCostTaxIncluded, 'chargedTax', 'chargedTotal'))
            .then(() => {
              let yachtService = {...this.state.yachtService};
              const { isChargedTaxAdded, chargedCurrency, charged, chargedTotal } = this.state.yachtService;
              yachtService['totalPrice'] = this.handleCalculateTotalPrice(isChargedTaxAdded, chargedCurrency, charged, chargedTotal);
              this.setState({ yachtService });
            });
        }
        return this.handleCalculateTax(cost, costTaxSelected, isCostTaxIncluded, 'costTax', 'costTotal');
    }

    if (prevState.yachtService.isCostTaxAdded !== this.state.yachtService.isCostTaxAdded) {
      if (!this.state.yachtService.isCostTaxAdded) {
        let yachtService = {...this.state.yachtService};
        const {
          isChargedTaxAdded,
          chargedCurrency,
          charged,
          chargedTotal
        } = yachtService;
        
        yachtService['isCostTaxIncluded'] = false;
        yachtService['costTaxSelected'] = '';
        yachtService['costTax'] = '';
        yachtService['costTotal'] = this.state.cost;
        yachtService['isChargedTaxAdded'] = false;
        yachtService['isChargedTaxIncluded'] = false;
        yachtService['chargedTaxSelected'] = '';
        yachtService['chargedTax'] = '';
        yachtService['chargedTotal'] = charged;
        return Promise.resolve(this.setState({ yachtService }))
        .then(() => this.handleCalculateTotalPrice(isChargedTaxAdded, chargedCurrency, charged, chargedTotal));
      }
    }

    if (prevState.yachtService.isChargedTaxAdded !== this.state.yachtService.isChargedTaxAdded) {
      let yachtService = {...this.state.yachtService};
      const {
        isChargedTaxAdded,
        chargedCurrency,
        charged,
        chargedTotal
      } = yachtService;

      if (isChargedTaxAdded) {
        return this.handleCalculateTotalPrice(isChargedTaxAdded, chargedCurrency, charged, chargedTotal);
      }
      if (!isChargedTaxAdded) {
        yachtService['isChargedTaxIncluded'] = false;
        yachtService['chargedTaxSelected'] = '';
        yachtService['chargedTax'] = '';
        yachtService['chargedTotal'] = charged;
        return this.setState({ yachtService });
      }
    }

    if (prevState.yachtService.charged !== this.state.yachtService.charged
      || prevState.yachtService.chargedCurrency !== this.state.yachtService.chargedCurrency) {
        let yachtService = {...this.state.yachtService};
        let {
          isChargedTaxAdded,
          chargedCurrency,
          charged,
          chargedTotal
        } = yachtService;
        
        yachtService['totalPrice'] = this.handleCalculateTotalPrice(isChargedTaxAdded, chargedCurrency, charged, chargedTotal);
        this.setState({ yachtService });
    }

    if (this.state.statefulYachtService.isServiceAdded) {
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

  handleCaclulateCostOnBlur = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let formattedCurrencyValue = formatCurrencyNumber(value);
    let yachtService = {...this.state.yachtService};
    let {
      cost,
      isCostTaxAdded,
      costTaxSelected,
      isCostTaxIncluded,
      chargedTaxPercentageOnTop
    } = yachtService;
    let hasChargedTaxPercentageAdded = chargedTaxPercentageOnTop && chargedTaxPercentageOnTop !== '0';
    yachtService[name] = formattedCurrencyValue;
    
    if (!hasChargedTaxPercentageAdded) {
      return this.setState({ yachtService });
    }

    if (hasChargedTaxPercentageAdded && !isCostTaxAdded) {
      yachtService['charged'] = calculatePercentageOnTop(value, chargedTaxPercentageOnTop);
      return this.setState({ yachtService });
    }

    if (isCostTaxAdded && costTaxSelected) {
      if (!hasChargedTaxPercentageAdded) {
        return this.handleCalculateTax(cost, costTaxSelected, isCostTaxAdded, 'costTax', 'costTotal');
      }
      if (hasChargedTaxPercentageAdded) {
        return Promise.resolve(this.handleCalculateTax(cost, costTaxSelected, isCostTaxAdded, 'costTax', 'costTotal'))
          .then(() => this.handleAddPercentageToChargedAmount(cost, costTaxSelected, isCostTaxAdded, isCostTaxIncluded, chargedTaxPercentageOnTop));
      }
    }
  }

  handleCalculateTaxOnBlur = (e) => {
    const value = e.target.value;
    let yachtService = {...this.state.yachtService};
    const {
      cost,
      isCostTaxIncluded,
      charged,
      chargedTaxPercentageOnTop
    } = yachtService;

    if (!charged && !chargedTaxPercentageOnTop) {
      return this.handleCalculateTax(cost, value, isCostTaxIncluded, 'costTax', 'costTotal');
    }

    if (!chargedTaxPercentageOnTop && charged) {
      return Promise.resolve(this.handleCalculateTax(cost, value, isCostTaxIncluded, 'costTax', 'costTotal'))
      .then(() => {
        let yachtService = {...this.state.yachtService};
        yachtService['isChargedTaxAdded'] = true;
        yachtService['chargedTaxSelected'] = value;
        return this.setState({ yachtService });
      })
      .then(() => this.handleCalculateTax(charged, value, isCostTaxIncluded, 'chargedTax', 'chargedTotal'))
      .then(() => {
        let yachtService = {...this.state.yachtService};
        const {isChargedTaxAdded, chargedCurrency, charged, chargedTotal } = yachtService;
        return this.handleCalculateTotalPrice(isChargedTaxAdded, chargedCurrency, charged, chargedTotal);
      });
    }
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
    if (!value) {
      return null;
    }
    const { 
      cost,
      costTaxSelected,
      isCostTaxAdded,
      isCostTaxIncluded
    } = this.state.yachtService;
    this.handleAddPercentageToChargedAmount(cost, costTaxSelected, isCostTaxAdded, isCostTaxIncluded, value);
  }

  handleAddPercentageToChargedAmount = (baseAmount, taxSelected, isTaxAdded, isTaxIncluded, percentageToAdd) => {
    let yachtService = {...this.state.yachtService};
    const addPercentageToPrice = calculatePercentageOnTop(baseAmount, percentageToAdd);
    const calculatedTaxTotal = calculatedTax(addPercentageToPrice, taxSelected, isTaxIncluded);
    yachtService['charged'] = addPercentageToPrice;

    if (isTaxAdded) {
      yachtService['isChargedTaxAdded'] = true;
      yachtService['chargedTaxSelected'] = taxSelected;
      yachtService['chargedTax'] = calculatedTaxTotal;
      yachtService['chargedTotal'] = isTaxIncluded
        ? formatCurrencyNumber(addPercentageToPrice)
        : addTaxOnTopOfAmount(addPercentageToPrice, calculatedTaxTotal);

      if (isTaxIncluded) {
        yachtService['isChargedTaxIncluded'] = true;
      } else {
        yachtService['isChargedTaxIncluded'] = false;
      }
    }
    this.setState({ yachtService });
  }

  handleCalculateChargedAmountOnBlur = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let formattedCurrencyValue = formatCurrencyNumber(value);
    let yachtService = {...this.state.yachtService};
    const {
      isCostTaxAdded,
      isCostTaxIncluded,
      costTaxSelected,
      charged,
      chargedTaxPercentageOnTop
    } = yachtService;

    if (!isCostTaxAdded && !costTaxSelected) {
      if (chargedTaxPercentageOnTop) {
        yachtService['chargedTaxPercentageOnTop'] = '';
      }
      yachtService[name] = formattedCurrencyValue;
      return this.setState({ yachtService });
    } else {
      return Promise.resolve(this.handleCalculateTax(charged, costTaxSelected, isCostTaxIncluded, 'chargedTax', 'chargedTotal'))
      .then(() => {
        let yachtService = {...this.state.yachtService};
        if (chargedTaxPercentageOnTop) {
          yachtService['chargedTaxPercentageOnTop'] = '';
        }
        yachtService['isChargedTaxAdded'] = true;
        yachtService['chargedTaxSelected'] = costTaxSelected;
        yachtService[name] = formattedCurrencyValue;
        return this.setState({ yachtService });
      })
      .then(() => {
        let yachtService = {...this.state.yachtService};
        const {
          isChargedTaxAdded,
          chargedCurrency,
          charged,
          chargedTotal
        } = yachtService;
        return this.handleCalculateTotalPrice(isChargedTaxAdded, chargedCurrency, charged, chargedTotal);
      });
    }
  }

  handleCalculateTotalPrice = (isChargedTaxAdded, chargedCurrency, charged, chargedTotal) => {
    if (isChargedTaxAdded) {
      return this.setState({ totalPrice: formatCurrency(chargedCurrency, chargedTotal) });
    }
    return this.setState({ totalPrice: formatCurrency(chargedCurrency, charged) });
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
    const handleCaclulateCostOnBlur = this.handleCaclulateCostOnBlur;
    const handleCalculateChargedAmountOnBlur = this.handleCalculateChargedAmountOnBlur;
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
          handleCaclulateCostOnBlur,
          handleCalculateChargedAmountOnBlur,
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
