import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addYachtService, clearYachtServiceData } from './actions';

import { default as ServiceForm } from './ServiceForm';
import { yachtService } from '../../../../utils/objectModels';
import calculatedTax from '../../../../utils/calculatedTax';

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
    const formattedCurrencyValue = parseFloat(value).toFixed(2);
    yachtService[name] = formattedCurrencyValue;
    this.setState({ yachtService });
  }

  handleCalculateTax = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let yachtService = {...this.state.yachtService};
    const isCostTax = name === 'costTaxSelected';
    const taxableAmount = isCostTax ? yachtService.cost : yachtService.charged;
    const isTaxIncluded = isCostTax ? yachtService.costTaxIncluded : yachtService.chargedTaxIncluded;
    const calculatedTaxTotal = calculatedTax(taxableAmount, value, isTaxIncluded);
    const taxTotal = isCostTax ? 'taxCost' : 'taxCharged';
    yachtService[taxTotal] = calculatedTaxTotal;
    const totalValue = isCostTax ? 'totalCost' : 'totalCharged';
    yachtService[totalValue] = parseFloat(+taxableAmount + +calculatedTaxTotal).toFixed(2).toString();
    this.setState({ yachtService });
    console.log('tax blur');
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
    const handleCalculateTax = this.handleCalculateTax;
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
          handleCalculateTax,
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
