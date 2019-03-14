import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import {
  updateYacht,
  clearYachtRegistrationData,
} from 'actions/yachtRegisterActions';

import YachtForm from './YachtForm';

class UpdateYachtForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isYachtSelected: this.props.isYachtSelected,
      selectedYacht: this.props.yachtData.selectedYacht,
      yachtRegister: this.props.yachtRegister,
      redirectToSectionHome: false,
      errors: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    }

    if (nextProps.yachtRegister !== prevState.yachtRegister) {
      return { yachtRegister: nextProps.yachtRegister };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.errors !== this.state.errors) {
      this.setState({ errors: this.state.errors });
    }

    if (prevState.yachtRegister !== this.state.yachtRegister) {
      this.setState({ yachtRegister: this.state.yachtRegister });
    }

    if (this.state.yachtRegister.isUpdated) {
      this.setState({ redirectToSectionHome: true });
    }
  }

  componentWillUnmount() {
    this.props.clearYachtRegistrationData();
  }

  onChange = e => {
    const name = e.target.name;
    const selectedYacht = { ...this.state.selectedYacht };
    selectedYacht[name] = e.target.value;

    this.setState({ selectedYacht });
  };

  onCompanyChange = (e, companyType) => {
    const name = e.target.name;
    const selectedYacht = { ...this.state.selectedYacht };
    const addressFields = [
      'addressline1',
      'addressline2',
      'city',
      'postalcode',
      'country',
    ];

    if (_.includes(addressFields, name)) {
      selectedYacht[companyType].address[name] = e.target.value;
    } else {
      selectedYacht[companyType][name] = e.target.value;
    }

    this.setState({ selectedYacht });
  };

  handleCheckBox = name => event => {
    const selectedYacht = { ...this.state.selectedYacht };
    selectedYacht[name] = event.target.checked;

    this.setState({ selectedYacht });
  };

  onSubmit = e => {
    e.preventDefault();
    const yacht = this.state.selectedYacht;
    const id = this.state.selectedYacht._id;

    this.props.updateYacht(id, yacht);
  };

  render() {
    const { redirectToSectionHome } = this.state;
    if (redirectToSectionHome) return <Redirect to={'/yachts'} />;
    const onChange = this.onChange;
    const onCompanyChange = this.onCompanyChange;
    const handleCheckBox = this.handleCheckBox;
    const onSubmit = this.onSubmit;
    const isDataFetching =
      this.yachtRegister && this.yachtRegister.isFetching
        ? this.yachtRegister.isFetching
        : false;

    const yachtProps = {
      ...this.state,
      onChange,
      onCompanyChange,
      handleCheckBox,
      onSubmit,
      isDataFetching,
    };

    return <YachtForm yachtProps={yachtProps} />;
  }
}

UpdateYachtForm.propTypes = {
  updateYacht: PropTypes.func.isRequired,
  clearYachtRegistrationData: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  yachtRegister: state.yachtRegister,
  yachtData: state.yachtData,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  {
    updateYacht,
    clearYachtRegistrationData,
  },
)(UpdateYachtForm);
