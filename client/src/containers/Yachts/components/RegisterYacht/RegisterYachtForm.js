import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Heading from '../../../../components/Heading';
import TextFieldList from '../../../../components/TextFieldList';

const styles = theme => ({
  container: {
    marginTop: '32px',
    marginLeft: 'auto',
    marginRight: 'auto',
    minWidth: '240px',
    maxWidth: '480px',
  },
  card: {
    marginTop: '8px',
    marginBottom: '8px',
  },
  textField: {
    position: 'relative',
    display: 'block',
    width: '100%',
  },
  formControl: {
    width: '100%',
  }
});

const RegisterYachtForm = ({
  classes, name, email, yachttype, phone,
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
}) => {
  const requiredInfo = [
    {
      keyname: 'yacht-required-info', label: 'name', name: 'name',
      type: 'text', value: name, error: errors.name,
    },
    {
      keyname: 'yacht-required-info', label: 'email', name: 'email',
      type: 'email', value: email, error: errors.email,
    },
    {
      keyname: 'yacht-required-info', label: 'phone', name: 'phone',
      type: 'number', value: phone, error: '',
    },
  ];
  const yachtMetrics = [
    {
      keyname: 'yachtMetrics', label: 'loa', name: 'loa',
      type: 'number', value: loa, error: '', adornment: 'meters',
    },
    {
      keyname: 'yachtMetrics', label: 'draft', name: 'draft',
      type: 'number', value: draft, error: '', adornment: 'meters',
    },
    {
      keyname: 'yachtMetrics', label: 'beam', name: 'beam',
      type: 'number', value: beam, error: '', adornment: 'meters',
    },
    {
      keyname: 'yachtMetrics', label: 'gross tonnage', name: 'grosstonnage',
      type: 'number', value: grosstonnage, error: '', adornment: 'gt',
    },
  ];
  const buildInfo = [
    {
      keyname: 'buildInfo', label: 'build company', name: 'buildcompany',
      type: 'text', value: buildcompany, error: '',
    },
    {
      keyname: 'buildInfo', label: 'build year', name: 'buildyear',
      type: 'number', value: buildyear, error: '',
    },
    {
      keyname: 'buildInfo', label: 'refit year', name: 'refityear',
      type: 'number', value: refityear, error: '',
    },
  ];
  const billingCompanyInfo = [
    {
      keyname: 'billingCompany', label: 'company name', name: 'billingcompanyname',
      type: 'text', value: billingcompanyname, error: '',
    },
    {
      keyname: 'billingCompany', label: 'email', name: 'billingcompanyemail',
      type: 'email', value: billingcompanyemail, error: '',
    },
    {
      keyname: 'billingCompany', label: 'phone', name: 'billingcompanyphone',
      type: 'number', value: billingcompanyphone, error: '',
    },
    {
      keyname: 'billingCompany', label: 'mobile', name: 'billingcompanymobile',
      type: 'number', value: billingcompanymobile, error: '',
    },
    {
      keyname: 'billingCompany', label: 'address line1', name: 'billingcompanyaddressline1',
      type: 'text', value: billingcompanyaddressline1, error: '',
    },
    {
      keyname: 'billingCompany', label: 'address line2', name: 'billingcompanyaddressline2',
      type: 'text', value: billingcompanyaddressline2, error: '',
    },
    {
      keyname: 'billingCompany', label: 'city', name: 'billingcompanycity',
      type: 'text', value: billingcompanycity, error: '',
    },
    {
      keyname: 'billingCompany', label: 'postal code', name: 'billingcompanypostalcode',
      type: 'text', value: billingcompanypostalcode, error: '',
    },
    {
      keyname: 'billingCompany', label: 'country', name: 'billingcompanycountry',
      type: 'text', value: billingcompanycountry, error: '',
    },
  ];
  const owningCompanyInfo = [
    {
      keyname: 'owningCompany', label: 'company name', name: 'owningcompanyname',
      type: 'text', value: owningcompanyname, error: '',
    },
    {
      keyname: 'owningCompany', label: 'email', name: 'owningcompanyemail',
      type: 'email', value: owningcompanyemail, error: '',
    },
    {
      keyname: 'owningCompany', label: 'phone', name: 'owningcompanyphone',
      type: 'number', value: owningcompanyphone, error: '',
    },
    {
      keyname: 'owningCompany', label: 'mobile', name: 'owningcompanymobile',
      type: 'number', value: owningcompanymobile, error: '',
    },
    {
      keyname: 'owningCompany', label: 'address line1', name: 'owningcompanyaddressline1',
      type: 'text', value: owningcompanyaddressline1, error: '',
    },
    {
      keyname: 'owningCompany', label: 'address line2', name: 'owningcompanyaddressline2',
      type: 'text', value: owningcompanyaddressline2, error: '',
    },
    {
      keyname: 'owningCompany', label: 'city', name: 'owningcompanycity',
      type: 'text', value: owningcompanycity, error: '',
    },
    {
      keyname: 'owningCompany', label: 'postal code', name: 'owningcompanypostalcode',
      type: 'text', value: owningcompanypostalcode, error: '',
    },
    {
      keyname: 'owningCompany', label: 'country', name: 'owningcompanycountry',
      type: 'text', value: owningcompanycountry, error: '',
    },
  ];
  const managementCompanyInfo = [
    {
      keyname: 'managementCompany', label: 'company name', name: 'managementcompanyname',
      type: 'text', value: managementcompanyname, error: '',
    },
    {
      keyname: 'managementCompany', label: 'email', name: 'managementcompanyemail',
      type: 'email', value: managementcompanyemail, error: '',
    },
    {
      keyname: 'managementCompany', label: 'phone', name: 'managementcompanyphone',
      type: 'number', value: managementcompanyphone, error: '',
    },
    {
      keyname: 'managementCompany', label: 'mobile', name: 'managementcompanymobile',
      type: 'number', value: managementcompanymobile, error: '',
    },
    {
      keyname: 'managementCompany', label: 'address line1', name: 'managementcompanyaddressline1',
      type: 'text', value: managementcompanyaddressline1, error: '',
    },
    {
      keyname: 'managementCompany', label: 'address line2', name: 'managementcompanyaddressline2',
      type: 'text', value: managementcompanyaddressline2, error: '',
    },
    {
      keyname: 'managementCompany', label: 'city', name: 'managementcompanycity',
      type: 'text', value: managementcompanycity, error: '',
    },
    {
      keyname: 'managementCompany', label: 'postal code', name: 'managementcompanypostalcode',
      type: 'text', value: managementcompanypostalcode, error: '',
    },
    {
      keyname: 'managementCompany', label: 'country', name: 'managementcompanycountry',
      type: 'text', value: managementcompanycountry, error: '',
    },
  ];
  const yachtFormGroups = [
    { array: yachtMetrics, label: 'Yacht Metrics'},
    { array: buildInfo, label: 'Build Info'},
    { array: billingCompanyInfo, label: 'Billing Company Info'},
    { array: owningCompanyInfo, label: 'Owning Company Info'},
    { array: managementCompanyInfo, label: 'Management Company Info'},
  ];

  return (
    <form className={classes.pagewrapper} onSubmit={onSubmit}>
      <div className={classes.container}>
        <Heading text="Register Yacht" />
        
        <Card className={classes.card}>
          <CardContent>
            <Heading text="Required Info" />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="yachttype">Yacht Type</InputLabel>
              <Select
                value={yachttype}
                onChange={onChange}
                inputProps={{
                  name: 'yachttype',
                  id: 'yachttype',
                }}
              >
                <MenuItem value={'MY'}>M/Y</MenuItem>
                <MenuItem value={'SY'}>S/Y</MenuItem>
              </Select>
            </FormControl>
            <TextFieldList list={requiredInfo} classname={classes.textField} onChange={onChange} />
          </CardContent>
        </Card>

        {
          yachtFormGroups.map(group => (
            <Card className={classes.card}>
              <CardContent>
                <Heading text={group.label} />
                <TextFieldList list={group.array} classname={classes.textField} onChange={onChange} />
              </CardContent>
            </Card>
          ))
        }

        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Register Yacht
        </Button>
      </div>
    </form>
  );
}

RegisterYachtForm.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  email: PropTypes.string,
  yachttype: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  errors: PropTypes.object,
}

export default withStyles(styles)(RegisterYachtForm);
