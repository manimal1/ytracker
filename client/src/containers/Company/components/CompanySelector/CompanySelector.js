import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ItemSelector from '../../../../components/ItemSelector';

import {
  getAllCompanies,
  getCompanyById,
  clearCompanies,
  clearSelectedCompany,
} from './actions';

class CompanySelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCompany: '',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCompany !== this.state.selectedCompany) {
      this.props.getCompanyById(this.state.selectedCompany);
    }
  }

  componentDidMount() {
    if (!this.props.companyData.companies
      || this.props.companyData.companies.length === 0) {
      this.props.getAllCompanies();
    }
  }

  componentWillUnmount() {
    this.props.clearCompanies();
    this.props.clearSelectedCompany();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { selectedCompany } = this.state;
    const { 
      sectionTitle,
      setIsCompanySelected, // function that sets parent-component boolean for whether a company is selected
    } = this.props;
    const onChange = this.onChange;
    const companies = this.props.companyData.companies || [];

    return (
      <ItemSelector
        label={'Existing Companies'}
        inputPropsId={'selectedCompany'}
        selectedValue={selectedCompany}
        list={companies}
        buttonText={'Select Company'}
        onChangeEvent={onChange}
        buttonClickEvent={setIsCompanySelected}
        sectionTitle={sectionTitle}
      />
    )
  }
}

CompanySelector.propTypes = {
  getAllCompanies: PropTypes.func.isRequired,
  getCompanyById: PropTypes.func.isRequired,
  clearSelectedCompany: PropTypes.func.isRequired,
  clearCompanies: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  companyData: state.companyData,
});

export default compose(
  connect(
    mapStateToProps,
    {
      getAllCompanies,
      getCompanyById,
      clearCompanies,
      clearSelectedCompany,
    },
  )
)(CompanySelector);
