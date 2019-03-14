import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import SectionTitle from 'components/SectionTitle';
import TextFieldList from 'components/TextFieldList';
import TextField from 'components/TextField';
import ExpansionPanelGroup from 'components/ExpansionPanelGroup';
import Spinner from 'components/Spinner';

const styles = theme => ({
  nameField: {
    width: 'calc(100% - 16px)',
  },
  formControl: {
    marginTop: '16px',
    marginLeft: '8px',
    marginRight: '8px',
    [theme.breakpoints.up('lg')]: {
      minWidth: 'calc(33% - 16px)',
    },
    [theme.breakpoints.down('md')]: {
      minWidth: 'calc(50% - 16px)',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  },
});

const CompanyForm = props => {
  const {
    company,
    onChange,
    onSubmit,
    errors,
    classes,
    isDataFetching,
  } = props;

  if (isDataFetching) {
    return <Spinner />;
  }

  const nameInputData = {
    id: 'companyname',
    name: 'name',
    label: 'Company Name',
    type: 'text',
    value: company.name,
    error: errors && errors.name,
    helperText: errors && errors.name ? errors.name : '',
  };

  const primaryCompanyInputData = [
    {
      keyname: 'companyData',
      id: 'email',
      name: 'email',
      label: 'Company Email',
      type: 'text',
      value: company.email,
      error: errors && errors.email,
      helperText: errors && errors.email ? errors.email : '',
    },
    {
      keyname: 'companyData',
      id: 'phone',
      name: 'phone',
      label: 'Company phone',
      type: 'number',
      value: company.phone,
      error: false,
      helperText: '',
    },
    {
      keyname: 'companyData',
      id: 'mobile',
      name: 'mobile',
      label: 'Company mobile',
      type: 'number',
      value: company.mobile,
      error: false,
      helperText: '',
    },
  ];

  const setCompanyAddressInputData = [
    {
      keyname: 'companyAddress',
      label: 'Address Line 1',
      id: 'addressline1',
      name: 'addressline1',
      type: 'text',
      value: company.address.addressline1,
      error: '',
    },
    {
      keyname: 'companyAddress',
      label: 'Address Line 2',
      id: 'addressline2',
      name: 'addressline2',
      type: 'text',
      value: company.address.addressline2,
      error: '',
    },
    {
      keyname: 'companyAddress',
      label: 'Postal Code',
      id: 'postalcode',
      name: 'postalcode',
      type: 'text',
      value: company.address.postalcode,
      error: '',
    },
    {
      keyname: 'companyAddress',
      label: 'City',
      id: 'city',
      name: 'city',
      type: 'text',
      value: company.address.city,
      error: '',
    },
    {
      keyname: 'companyAddress',
      label: 'Country',
      id: 'country',
      name: 'country',
      type: 'text',
      value: company.address.country,
      error: '',
    },
  ];

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardContent>
          <SectionTitle text="Company Info" />
          <TextField
            item={nameInputData}
            onChange={onChange}
            className={classes.nameField}
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="servicetype">Service Type</InputLabel>
            <Select
              value={company.servicetype}
              onChange={onChange}
              inputProps={{
                name: 'servicetype',
                id: 'servicetype',
              }}
            >
              <MenuItem value="Provisions">Provisions</MenuItem>
              <MenuItem value="Government">Government</MenuItem>
              <MenuItem value="Boat Supplies">Boat Supplies</MenuItem>
            </Select>
          </FormControl>
          <TextFieldList list={primaryCompanyInputData} onChange={onChange} />
        </CardContent>
      </Card>

      <ExpansionPanelGroup label="Address">
        <TextFieldList list={setCompanyAddressInputData} onChange={onChange} />
      </ExpansionPanelGroup>

      <Button variant="contained" color="primary" type="submit">
        Add Company
      </Button>
    </form>
  );
};

export default withStyles(styles)(CompanyForm);
