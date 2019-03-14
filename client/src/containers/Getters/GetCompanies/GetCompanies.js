import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import ItemSelector from 'components/ItemSelector';

import {
  getAllCompanies,
  getCompanyById,
  clearCompanies,
  clearSelectedCompany,
} from 'actions/companyActions';

class GetCompanies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyData: {},
      selectedCompany: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.companyData !== prevState.companyData) {
      return { companyData: nextProps.companyData };
    }

    return null;
  }

  componentDidMount() {
    if (
      !this.props.companyData.companies ||
      this.props.companyData.companies.length === 0
    ) {
      this.props.getAllCompanies();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCompany !== this.state.selectedCompany) {
      this.props.getCompanyById(this.state.selectedCompany);
    }
    if (prevState.companyData !== this.state.companyData) {
      this.setState({ companyData: this.state.companyData });
    }
  }

  componentWillUnmount() {
    this.props.clearSelectedCompany();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { selectedCompany, companyData } = this.state;
    const {
      card,
      label,
      sectionTitle,
      setIsCompanySelected, // function that sets parent-component boolean for whether a company is selected
    } = this.props;
    const onChange = this.onChange;
    const companies = companyData.companies || [];
    const isLoading = companyData.isLoading;

    return (
      <ItemSelector
        label={label}
        inputPropsId="selectedCompany"
        selectedValue={selectedCompany}
        list={companies}
        onChangeEvent={onChange}
        buttonText="Select Company"
        buttonClickEvent={setIsCompanySelected}
        sectionTitle={sectionTitle}
        buttonLoading={isLoading}
        card={card}
      />
    );
  }
}

GetCompanies.propTypes = {
  getAllCompanies: PropTypes.func.isRequired,
  getCompanyById: PropTypes.func.isRequired,
  clearSelectedCompany: PropTypes.func.isRequired,
  clearCompanies: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
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
  ),
)(GetCompanies);
