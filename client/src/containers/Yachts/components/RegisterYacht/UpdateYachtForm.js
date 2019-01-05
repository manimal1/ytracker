import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateYacht } from './actions';

import { default as YachtForm } from './YachtForm';

class UpdateYachtForm extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      name: this.props.selectedYacht ? this.props.selectedYacht.name : '',
      email: this.props.selectedYacht ? this.props.selectedYacht.email : '',
      yachttype: this.props.selectedYacht ? this.props.selectedYacht.yachttype : '',
      active: this.props.selectedYacht ? this.props.selectedYacht.active : '',
      phone: this.props.selectedYacht ? this.props.selectedYacht.phone : '',
      loa: this.props.selectedYacht ? this.props.selectedYacht.loa : '',
      draft: this.props.selectedYacht ? this.props.selectedYacht.draft : '',
      beam: this.props.selectedYacht ? this.props.selectedYacht.beam : '',
      grosstonnage: this.props.selectedYacht ? this.props.selectedYacht.grosstonnage : '',
      buildcompany: this.props.selectedYacht ? this.props.selectedYacht.buildcompany : '',
      buildyear: this.props.selectedYacht ? this.props.selectedYacht.buildyear : '',
      refityear: this.props.selectedYacht ? this.props.selectedYacht.refityear : '',
      billingcompanyname: this.props.selectedYacht && this.props.selectedYacht.billingcompany ? this.props.selectedYacht.billingcompany.companyname : '',
      billingcompanyemail: this.props.selectedYacht && this.props.selectedYacht.billingcompany ? this.props.selectedYacht.billingcompany.email : '',
      billingcompanyphone: this.props.selectedYacht && this.props.selectedYacht.billingcompany ? this.props.selectedYacht.billingcompany.phone : '',
      billingcompanymobile: this.props.selectedYacht && this.props.selectedYacht.billingcompany ? this.props.selectedYacht.billingcompany.mobile : '',
      billingcompanyaddressline1: this.props.selectedYacht && this.props.selectedYacht.billingcompany ? this.props.selectedYacht.billingcompany.address.addressline1 : '',
      billingcompanyaddressline2: this.props.selectedYacht && this.props.selectedYacht.billingcompany ? this.props.selectedYacht.billingcompany.address.addressline2 : '',
      billingcompanycity: this.props.selectedYacht && this.props.selectedYacht.billingcompany ? this.props.selectedYacht.billingcompany.address.city : '',
      billingcompanypostalcode: this.props.selectedYacht && this.props.selectedYacht.billingcompany ? this.props.selectedYacht.billingcompany.address.postalcode : '',
      billingcompanycountry: this.props.selectedYacht && this.props.selectedYacht.billingcompany ? this.props.selectedYacht.billingcompany.address.country : '',
      owningcompanyname: this.props.selectedYacht && this.props.selectedYacht.owningcompany ? this.props.selectedYacht.owningcompany.companyname : '',
      owningcompanyemail: this.props.selectedYacht && this.props.selectedYacht.owningcompany ? this.props.selectedYacht.owningcompany.email : '',
      owningcompanyphone: this.props.selectedYacht && this.props.selectedYacht.owningcompany ? this.props.selectedYacht.owningcompany.phone : '',
      owningcompanymobile: this.props.selectedYacht && this.props.selectedYacht.owningcompany ? this.props.selectedYacht.owningcompany.mobile : '',
      owningcompanyaddressline1: this.props.selectedYacht && this.props.selectedYacht.owningcompany ? this.props.selectedYacht.owningcompany.address.addressline1 : '',
      owningcompanyaddressline2: this.props.selectedYacht && this.props.selectedYacht.owningcompany ? this.props.selectedYacht.owningcompany.address.addressline2 : '',
      owningcompanycity: this.props.selectedYacht && this.props.selectedYacht.owningcompany ? this.props.selectedYacht.owningcompany.address.city : '',
      owningcompanypostalcode: this.props.selectedYacht && this.props.selectedYacht.owningcompany ? this.props.selectedYacht.owningcompany.address.postalcode : '',
      owningcompanycountry: this.props.selectedYacht && this.props.selectedYacht.owningcompany ? this.props.selectedYacht.owningcompany.address.country : '',
      managementcompanyname: this.props.selectedYacht && this.props.selectedYacht.managementcompany ? this.props.selectedYacht.managementcompany.companyname : '',
      managementcompanyemail: this.props.selectedYacht && this.props.selectedYacht.managementcompany ? this.props.selectedYacht.managementcompany.email : '',
      managementcompanyphone: this.props.selectedYacht && this.props.selectedYacht.managementcompany ? this.props.selectedYacht.managementcompany.phone : '',
      managementcompanymobile: this.props.selectedYacht && this.props.selectedYacht.managementcompany ? this.props.selectedYacht.managementcompany.mobile : '',
      managementcompanyaddressline1: this.props.selectedYacht && this.props.selectedYacht.managementcompany ? this.props.selectedYacht.managementcompany.address.addressline1 : '',
      managementcompanyaddressline2: this.props.selectedYacht && this.props.selectedYacht.managementcompany ? this.props.selectedYacht.managementcompany.address.addressline2 : '',
      managementcompanycity: this.props.selectedYacht && this.props.selectedYacht.managementcompany ? this.props.selectedYacht.managementcompany.address.city : '',
      managementcompanypostalcode: this.props.selectedYacht && this.props.selectedYacht.managementcompany ? this.props.selectedYacht.managementcompany.address.postalcode : '',
      managementcompanycountry: this.props.selectedYacht && this.props.selectedYacht.managementcompany ? this.props.selectedYacht.managementcompany.address.country : '',
      cruisinglicense: this.props.selectedYacht ? this.props.selectedYacht.cruisinglicense : '',
      taxid: this.props.selectedYacht ? this.props.selectedYacht.taxid : '',
      errors: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.errors !== prevState.errors) {
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

  componentDidMount() {
    if (this.props.yachtData && this.props.yachtData.selectedYacht) {
      this.setState({ name: this.props.yachtData.selectedYacht.name });
    }
  }

  handleCheckBox = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  onSubmit(e) {
    e.preventDefault();
    const existingYacht = {
      name: this.state.name, email: this.state.email, yachttype: this.state.yachttype,
      active: this.state.active, phone: this.state.phone,
      loa: this.state.loa, draft: this.state.draft, beam: this.state.beam, grosstonnage: this.state.grosstonnage,
      buildcompany: this.state.buildcompany, buildyear: this.state.buildyear, refityear: this.state.refityear,
      cruisinglicense: this.state.cruisinglicense, taxid: this.state.taxid,
      billingcompanyname: this.state.billingcompanyname,
      billingcompanyemail: this.state.billingcompanyemail,
      billingcompanyphone: this.state.billingcompanyphone,
      billingcompanymobile: this.state.billingcompanymobile,
      billingcompanyaddressline1: this.state.billingcompanyaddressline1,
      billingcompanyaddressline2: this.state.billingcompanyaddressline2,
      billingcompanycity: this.state.billingcompanycity,
      billingcompanypostalcode: this.state.billingcompanypostalcode,
      billingcompanycountry: this.state.billingcompanycountry,
      owningcompanyname: this.state.owningcompanyname,
      owningcompanyemail: this.state.owningcompanyemail,
      owningcompanyphone: this.state.owningcompanyphone,
      owningcompanymobile: this.state.owningcompanymobile,
      owningcompanyaddressline1: this.state.owningcompanyaddressline1,
      owningcompanyaddressline2: this.state.owningcompanyaddressline2,
      owningcompanycity: this.state.owningcompanycity,
      owningcompanypostalcode: this.state.owningcompanypostalcode,
      owningcompanycountry: this.state.owningcompanycountry,
      managementcompanyname: this.state.managementcompanyname,
      managementcompanyemail: this.state.managementcompanyemail,
      managementcompanyphone: this.state.managementcompanyphone,
      managementcompanymobile: this.state.managementcompanymobile,
      managementcompanyaddressline1: this.state.managementcompanyaddressline1,
      managementcompanyaddressline2: this.state.managementcompanyaddressline2,
      managementcompanycity: this.state.managementcompanycity,
      managementcompanypostalcode: this.state.managementcompanypostalcode,
      managementcompanycountry: this.state.managementcompanycountry,
    };
    
    this.props.updateYacht(existingYacht);
    this.context.handlePanelSwitch('yacht-dashboard');
    this.context.setSelectedIndex(0);
  }

  render() {
    console.log('uf: ', this.props.selectedYacht);
    const { 
      name, email, active, errors, phone, loa, draft, beam, grosstonnage, buildcompany,
      buildyear, refityear, billingcompanyname, billingcompanyemail, billingcompanyphone,
      cruisinglicense, taxid,
      billingcompanymobile, billingcompanyaddressline1, billingcompanyaddressline2,
      billingcompanycity, billingcompanypostalcode, billingcompanycountry,
      owningcompanyname, owningcompanyemail, owningcompanyphone, owningcompanymobile,
      owningcompanyaddressline1, owningcompanyaddressline2, owningcompanycity,
      owningcompanypostalcode, owningcompanycountry,
      managementcompanyname, managementcompanyemail, managementcompanyphone,
      managementcompanymobile, managementcompanyaddressline1, managementcompanyaddressline2,
      managementcompanycity, managementcompanypostalcode, managementcompanycountry,
    } = this.state;
    const yachttype = 'M/Y';
    const onChange = this.onChange;
    const handleCheckBox = this.handleCheckBox;
    const setIsYachtSelected = this.setIsYachtSelected;
    const onSubmit = this.onSubmit;
    const allProps = {
      name, email, yachttype, active, errors, phone, loa, draft, beam, grosstonnage, buildcompany,
      buildyear, refityear, billingcompanyname, billingcompanyemail, billingcompanyphone,
      cruisinglicense, taxid,
      billingcompanymobile, billingcompanyaddressline1, billingcompanyaddressline2,
      billingcompanycity, billingcompanypostalcode, billingcompanycountry,
      owningcompanyname, owningcompanyemail, owningcompanyphone, owningcompanymobile,
      owningcompanyaddressline1, owningcompanyaddressline2, owningcompanycity,
      owningcompanypostalcode, owningcompanycountry,
      managementcompanyname, managementcompanyemail, managementcompanyphone,
      managementcompanymobile, managementcompanyaddressline1, managementcompanyaddressline2,
      managementcompanycity, managementcompanypostalcode, managementcompanycountry,
      onChange, handleCheckBox, setIsYachtSelected, onSubmit,
    };
    return (
      <YachtForm formProps={ allProps } />
    )
  }
}

UpdateYachtForm.propTypes = {
  updateYacht: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
}

UpdateYachtForm.contextTypes = {
  handlePanelSwitch: PropTypes.func,
  setSelectedIndex: PropTypes.func,
}

const mapStateToProps = (state) => ({
  yachtData: state.yachtData,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  {
    updateYacht,
  },
)(UpdateYachtForm);
