import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  registerCompany,
  clearCompanyRegistrationData,
} from 'actions/companyRegisterActions';
import CompanyFormSwitcher from './CompanyFormSwitcher';
import { company as companyModel } from 'utils/objectModels';

class RegisterCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      company: companyModel,
      isCompanySelected: false,
      companyRegister: this.props.companyRegister,
      companyData: this.props.companyData,
      errors: {},
      redirectToSectionHome: false,
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

    if (this.state.companyRegister.isRegistered) {
      this.setState({ redirectToSectionHome: true });
    }
  }

  componentWillUnmount() {
    this.props.clearCompanyRegistrationData();
  }

  onChange = e => {
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

  setIsCompanySelected = () => {
    if (this.state.isCompanySelected === true) {
      this.setState({ isCompanySelected: false });
    }

    window.setTimeout(() => this.setState({ isCompanySelected: true }), 20);
  };

  onSubmit = e => {
    e.preventDefault();
    const newCompany = this.state.company;

    this.props.registerCompany(newCompany);
  };

  render() {
    const { redirectToSectionHome } = this.state;
    if (redirectToSectionHome) return <Redirect to={'/yachts'} />;
    const onChange = this.onChange;
    const setIsCompanySelected = this.setIsCompanySelected;
    const onSubmit = this.onSubmit;
    const isDataFetching =
      this.props.registerCompany &&
      this.props.registerCompany.isFetching === true;

    return (
      <CompanyFormSwitcher
        {...{
          ...this.state,
          onChange,
          setIsCompanySelected,
          onSubmit,
          isDataFetching,
        }}
      />
    );
  }
}

RegisterCompany.propTypes = {
  registerCompany: PropTypes.func.isRequired,
  clearCompanyRegistrationData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  companyData: state.companyData,
  companyRegister: state.companyRegister,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  {
    registerCompany,
    clearCompanyRegistrationData,
  },
)(RegisterCompany);
