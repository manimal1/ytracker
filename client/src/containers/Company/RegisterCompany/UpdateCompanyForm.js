import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  updateCompany,
  clearCompanyRegistrationData,
} from 'actions/companyRegisterActions';

import CompanyForm from './CompanyForm';

class UpdateCompanyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCompanySelected: this.props.isCompanySelected,
      company: this.props.companyData.selectedCompany,
      companyRegister: this.props.companyRegister,
      redirectToSectionHome: false,
      errors: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    }

    if (nextProps.companyRegister !== prevState.companyRegister) {
      return { companyRegister: nextProps.companyRegister };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.errors !== this.state.errors) {
      this.setState({ errors: this.state.errors });
    }

    if (prevState.companyRegister !== this.state.companyRegister) {
      this.setState({ companyRegister: this.state.companyRegister });
    }

    if (this.state.companyRegister.isUpdated) {
      this.setState({ redirectToSectionHome: true });
    }
  }

  componentWillUnmount() {
    this.props.clearCompanyRegistrationData();
  }

  onChange = e => {
    const name = e.target.name;
    const company = { ...this.state.company };
    company[name] = e.target.value;

    this.setState({ company });
  };

  onCompanyChange = e => {
    const name = e.target.name;
    const company = { ...this.state.company };
    const addressFields = [
      'addressline1',
      'addressline2',
      'city',
      'postalcode',
      'country',
    ];

    if (_.includes(addressFields, name)) {
      company.address[name] = e.target.value;
    } else {
      company[name] = e.target.value;
    }

    this.setState({ company });
  };

  handleCheckBox = name => event => {
    const company = { ...this.state.company };
    company[name] = event.target.checked;

    this.setState({ company });
  };

  onSubmit = e => {
    e.preventDefault();
    const company = this.state.company;
    const id = this.state.company._id;

    this.props.updateCompany(id, company);
  };

  render() {
    const { redirectToSectionHome } = this.state;
    if (redirectToSectionHome) return <Redirect to={'/yachts'} />;
    const onChange = this.onChange;
    const onCompanyChange = this.onCompanyChange;
    const handleCheckBox = this.handleCheckBox;
    const onSubmit = this.onSubmit;
    const isDataFetching =
      this.companyRegister && this.companyRegister.isFetching
        ? this.companyRegister.isFetching
        : false;

    const companyProps = {
      ...this.state,
      onChange,
      onCompanyChange,
      handleCheckBox,
      onSubmit,
      isDataFetching,
    };

    return <CompanyForm {...companyProps} />;
  }
}

UpdateCompanyForm.propTypes = {
  updateCompany: PropTypes.func.isRequired,
  clearCompanyRegistrationData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  companyRegister: state.companyRegister,
  companyData: state.companyData,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  {
    updateCompany,
    clearCompanyRegistrationData,
  },
)(UpdateCompanyForm);
