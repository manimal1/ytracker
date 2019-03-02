import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { selectedYacht } from 'utils/objectModels';

import { registerYacht, clearYachtRegistrationData } from './actions';
import YachtFormSwitcher from './YachtFormSwitcher';

class RegisterYacht extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isYachtSelected: false,
      selectedYacht,
      yachtRegister: this.props.yachtRegister,
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

    if (this.state.yachtRegister.isRegistered) {
      this.context.handlePanelSwitch('yacht-dashboard');
      this.context.setSelectedIndex(0);
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

  setIsYachtSelected = () => {
    if (this.state.isYachtSelected === true) {
      this.setState({ isYachtSelected: false });
    }

    window.setTimeout(() => this.setState({ isYachtSelected: true }), 20);
  };

  onSubmit = e => {
    e.preventDefault();
    const newYacht = this.state.selectedYacht;

    this.props.registerYacht(newYacht);
  };

  render() {
    const onChange = this.onChange;
    const onCompanyChange = this.onCompanyChange;
    const handleCheckBox = this.handleCheckBox;
    const onSubmit = this.onSubmit;
    const setIsYachtSelected = this.setIsYachtSelected;
    const isDataFetching =
      this.props.yachtRegister && this.props.yachtRegister.isFetching === true;

    return (
      <YachtFormSwitcher
        {...{
          ...this.state,
          onChange,
          onCompanyChange,
          handleCheckBox,
          onSubmit,
          setIsYachtSelected,
          isDataFetching,
        }}
      />
    );
  }
}

RegisterYacht.propTypes = {
  registerYacht: PropTypes.func.isRequired,
  clearYachtRegistrationData: PropTypes.func.isRequired,
  yachtRegister: PropTypes.objectOf(PropTypes.object).isRequired,
  errors: PropTypes.objectOf(PropTypes.object).isRequired,
};

RegisterYacht.contextTypes = {
  handlePanelSwitch: PropTypes.func,
  setSelectedIndex: PropTypes.func,
};

const mapStateToProps = state => ({
  yachtRegister: state.yachtRegister,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  {
    registerYacht,
    clearYachtRegistrationData,
  },
)(RegisterYacht);
