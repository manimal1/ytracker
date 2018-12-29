import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { registerYacht } from './actions';
import { default as RegisterYachtForm } from './RegisterYachtForm';

class RegisterYacht extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      name: '', email: '', yachttype: '', phone: '',
      loa: '', draft: '', beam: '', grosstonnage: '',
      buildcompany: '', buildyear: '', refityear: '',
      billingcompanyname: '', billingcompanyemail: '', billingcompanyphone: '', billingcompanymobile: '',
      billingcompanyaddressline1: '', billingcompanyaddressline2: '', billingcompanycity: '',  
      billingcompanypostalcode: '', billingcompanycountry: '',
      owningcompanyname: '', owningcompanyemail: '', owningcompanyphone: '', owningcompanymobile: '',
      owningcompanyaddressline1: '', owningcompanyaddressline2: '', owningcompanycity: '',  
      owningcompanypostalcode: '', owningcompanycountry: '',
      managementcompanyname: '', managementcompanyemail: '', managementcompanyphone: '',
      managementcompanymobile: '', managementcompanyaddressline1: '', managementcompanyaddressline2: '',
      managementcompanycity: '', managementcompanypostalcode: '', managementcompanycountry: '',
      errors: {},
      // avatar: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.errors !== prevState.errors ) {
      return {errors: nextProps.errors};
    }
    
    else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.errors !== this.state.errors) {
      this.setState({ errors: this.state.errors });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const yachtData = {
      name: this.state.name, email: this.state.email, yachttype: this.state.yachttype, phone: this.state.phone,
      loa: this.state.loa, draft: this.state.draft, beam: this.state.beam, grosstonnage: this.state.grosstonnage,
      buildcompany: this.state.buildcompany, buildyear: this.state.buildyear, refityear: this.state.refityear,
      billingcompanyname: this.state.billingcompanyname, billingcompanyemail: this.state.billingcompanyemail,
      billingcompanyphone: this.state.billingcompanyphone, billingcompanymobile: this.state.billingcompanymobile,
      billingcompanyaddressline1: this.state.billingcompanyaddressline1,
      billingcompanyaddressline2: this.state.billingcompanyaddressline2,
      billingcompanycity: this.state.billingcompanycity,
      billingcompanypostalcode: this.state.billingcompanypostalcode,
      billingcompanycountry: this.state.billingcompanycountry,
      owningcompanyname: this.state.owningcompanyname, owningcompanyemail: this.state.owningcompanyemail,
      owningcompanyphone: this.state.owningcompanyphone, owningcompanymobile: this.state.owningcompanymobile,
      owningcompanyaddressline1: this.state.owningcompanyaddressline1,
      owningcompanyaddressline2: this.state.owningcompanyaddressline2,
      owningcompanycity: this.state.owningcompanycity,
      owningcompanypostalcode: this.state.owningcompanypostalcode,
      owningcompanycountry: this.state.owningcompanycountry,
      managementcompanyname: this.state.managementcompanyname, managementcompanyemail: this.state.managementcompanyemail,
      managementcompanyphone: this.state.managementcompanyphone,
      managementcompanymobile: this.state.managementcompanymobile,
      managementcompanyaddressline1: this.state.managementcompanyaddressline1,
      managementcompanyaddressline2: this.state.managementcompanyaddressline2,
      managementcompanycity: this.state.managementcompanycity,
      managementcompanypostalcode: this.state.managementcompanypostalcode,
      managementcompanycountry: this.state.managementcompanycountry,
    };
    
    this.props.registerYacht(yachtData);
    this.context.handlePanelSwitch('yacht-dashboard');
    this.context.setSelectedIndex(0);
  }

  render() {
    const { 
      name, email, yachttype, errors, phone, loa, draft, beam, grosstonnage, buildcompany,
      buildyear, refityear, billingcompanyname, billingcompanyemail, billingcompanyphone,
      billingcompanymobile, billingcompanyaddressline1, billingcompanyaddressline2,
      billingcompanycity, billingcompanypostalcode, billingcompanycountry,
      owningcompanyname, owningcompanyemail, owningcompanyphone, owningcompanymobile,
      owningcompanyaddressline1, owningcompanyaddressline2, owningcompanycity,
      owningcompanypostalcode, owningcompanycountry,
      managementcompanyname, managementcompanyemail, managementcompanyphone,
      managementcompanymobile, managementcompanyaddressline1, managementcompanyaddressline2,
      managementcompanycity, managementcompanypostalcode, managementcompanycountry,
    } = this.state;
    const onChange = this.onChange;
    const onSubmit = this.onSubmit;

    return (
      <RegisterYachtForm {...{
        name, email, yachttype, phone,
        loa, draft, beam, grosstonnage,
        buildcompany, buildyear, refityear,
        billingcompanyname, billingcompanyemail, billingcompanyphone, billingcompanymobile,
        billingcompanyaddressline1, billingcompanyaddressline2, billingcompanycity,  
        billingcompanypostalcode, billingcompanycountry,
        owningcompanyname, owningcompanyemail, owningcompanyphone, owningcompanymobile,
        owningcompanyaddressline1, owningcompanyaddressline2, owningcompanycity,  
        owningcompanypostalcode, owningcompanycountry,
        managementcompanyname, managementcompanyemail, managementcompanyphone,
        managementcompanymobile, managementcompanyaddressline1, managementcompanyaddressline2,
        managementcompanycity, managementcompanypostalcode, managementcompanycountry,
        onChange, onSubmit, errors,
      }} />
    );
  }
}

RegisterYacht.propTypes = {
  registerYacht: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
}

RegisterYacht.contextTypes = {
  handlePanelSwitch: PropTypes.func,
  setSelectedIndex: PropTypes.func,
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { registerYacht },
)(RegisterYacht);
