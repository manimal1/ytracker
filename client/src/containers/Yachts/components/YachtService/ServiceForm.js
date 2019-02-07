import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

import SectionTitle from '../../../../components/SectionTitle';
import TextFieldList from '../../../../components/TextFieldList';
import TextField from '../../../../components/TextField';
import Spinner from '../../../../components/Spinner';

const styles = theme => ({
  serviceNameInput: {
    width: 'calc(100% - 94px)',
  },
  currencyInput: {
    width: '66px',
    marginTop: '16px',
    marginBottom: '8px',
  },
  costInput: {
    width: 'calc(100% - 82px)',
  },
  paidInput: {
    width: '76px',
    marginTop: '16px',
    marginBottom: '8px',
  },
  chargedInput: {
    width: 'calc(100% - 16px)'
  },
  // formGroup: {
  //   marginTop: '16px',
  //   marginLeft: '8px',
  //   marginRight: '8px',
  //   [theme.breakpoints.up('lg')]: {
  //     minWidth: 'calc(33% - 16px)',
  //   },
  //   [theme.breakpoints.down('md')]: {
  //     minWidth: 'calc(50% - 16px)',
  //   },
  //   [theme.breakpoints.down('sm')]: {
  //     minWidth: '100%',
  //   },
  // },
});

const ServiceForm = (props) => {
  const {
    yachtService,
    handleCheckBox,
    selectedCompany,
    onChange,
    onSubmit,
    onBlur,
    errors,
    classes,
    isDataFetching,
  } = props;

  const {
    currency,
    name,
    charged,
    cost,
    paid,
  } = yachtService;

  if (isDataFetching) {
    return <Spinner />;
  }

  const serviceNameInputData = {
    id: 'servicename', name: 'name', label: 'Service Name', type: 'text',
    value: name, error: errors && errors.name, required: true,
    helperText: errors && errors.name ? errors.name : '',
  };

  const serviceCostInputData = {
    id: 'serviceCost', name: 'cost', label: 'Service Cost', type: 'number',
    value: cost, required: true, 
  }

  const serviceChargedInputData = {
    id: 'serviceCharged', name: 'charged', label: 'Service Charged', type: 'number',
    value: charged, required: true, 
  }

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardContent>
          <SectionTitle text="Service Info" />
          <FormGroup row className={classes.formGroup}>
            <FormControlLabel
              className={classes.paidInput}
              control={
                <Checkbox
                  checked={paid}
                  onChange={handleCheckBox('paid')}
                  value="paid"
                />
              }
              label="Paid"
            />
            <TextField
              item={serviceNameInputData}
              onChange={onChange}
              className={classes.serviceNameInput}
            />
          </FormGroup>
          <FormGroup row className={classes.formGroup}>
            <FormControl className={classes.currencyInput}>
              <InputLabel htmlFor="currency">Currency</InputLabel>
              <Select
                value={currency}
                onChange={onChange}
                inputProps={{
                  name: 'currency',
                  id: 'currency',
                }}
              >
                <MenuItem value={'EUR'}>Euro</MenuItem>
                <MenuItem value={'HRK'}>HRK</MenuItem>
              </Select>
            </FormControl>
            <TextField
              item={serviceCostInputData}
              onChange={onChange}
              onBlur={onBlur}
              className={classes.costInput}
            />
          </FormGroup>
          <TextField
            item={serviceChargedInputData}
            onChange={onChange}
            onBlur={onBlur}
            className={classes.chargedInput}
          />
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Add Service
      </Button>
    </form>
  );
}

export default withStyles(styles)(ServiceForm);
