import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addYachtService, clearYachtServiceData } from './actions';

import { default as ServiceForm } from './ServiceForm';

class AddYachtService extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      yachtService: {
        currency: 'EUR',
        name: '',
        cost: 0,
        charged: 0,
        paid: false,
      },
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

  onSubmit = (e) => {
    e.preventDefault();
    const newService = this.state.yachtService;
    const yachtId = this.props.yachtData.selectedYacht._id;
    const companyId = this.props.companyData && this.props.companyData.selectedCompany
      ? this.props.companyData.selectedCompany._id : '';

    this.props.addYachtService(yachtId, companyId, newService);
  }

  handleCheckBox = paid => event => {
    let yachtService = {...this.state.yachtService};
    yachtService[paid] = event.target.checked;

    this.setState({ yachtService });
  };

  render() {
    const handleCheckBox = this.handleCheckBox;
    const onChange = this.onChange;
    const onSubmit = this.onSubmit;
    const onBlur = this.onBlur;
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
