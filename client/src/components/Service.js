import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import SectionTitle from './SectionTitle';
import Tax from './Tax';

const styles = () => ({
  serviceNameInput: {
    width: '100%',
  },
  assignedDate: {
    width: '100%',
  },
  currencyInput: {
    width: '82px',
    marginBottom: '8px',
  },
  costInput: {
    width: 'calc(100% - 82px)',
  },
  chargedInput: {
    width: 'calc(100% - 82px)',
  },
  checkboxGroup: {
    position: 'relative',
    width: 'auto',
    paddingLeft: '8px',
  },
});

const Service = props => {
  const {
    service,
    taxValues,
    serviceTypes,
    totalPrice,
    checkboxHandler,
    onChange,
    handleChangeChargedCurrency,
    handleCaclulateCostOnBlur,
    handleCalculateChargedAmountOnBlur,
    handleCalculateTaxOnBlur,
    handleAddPercentageToChargedAmountOnBlur,
    errors,
    classes,
  } = props;

  const {
    name,
    isPaid,
    isCompleted,
    assignedDate,
    serviceType,
    invoiceNumber,
    isCostTaxAdded,
    isCostTaxIncluded,
    costTaxSelected,
    costCurrency,
    cost,
    costTax,
    costTotal,
    chargedCurrency,
    charged,
    isChargedTaxAdded,
    chargedTaxSelected,
    chargedTaxPercentageOnTop,
    chargedTax,
    chargedTotal,
  } = service;

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardContent>
          <SectionTitle text="Service Info" />
          <FormGroup row className={classes.checkboxGroup}>
            <FormControlLabel
              className={classes.isPaidInput}
              control={
                <Checkbox
                  checked={isPaid}
                  onChange={e => checkboxHandler(e)}
                  value="isPaid"
                  name="isPaid"
                />
              }
              label="Paid"
            />
            <FormControlLabel
              className={classes.isCompletedInput}
              control={
                <Checkbox
                  checked={isCompleted}
                  onChange={e => checkboxHandler(e)}
                  value="isCompleted"
                  name="isCompleted"
                />
              }
              label="Completed"
            />
          </FormGroup>
          <TextField
            id="servicename"
            name="name"
            label="Name of Service"
            type="text"
            fullWidth
            value={name}
            error={errors && errors.name}
            helperText={errors && errors.name ? errors.name : ''}
            onChange={onChange}
            required
            className={classes.serviceNameInput}
          />
          <TextField
            id="assignedDate"
            name="assignedDate"
            label="Date of Service"
            type="date"
            fullWidth
            defaultValue={assignedDate}
            onChange={onChange}
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.assignedDate}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="serviceType">Service Type</InputLabel>
            <Select
              value={serviceType}
              onChange={onChange}
              inputProps={{
                name: 'serviceType',
                id: 'serviceType',
              }}
            >
              {serviceTypes.map(serviceTypeName => {
                return (
                  <MenuItem value={serviceTypeName}>{serviceTypeName}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <TextField
            id="invoiceNumber"
            name="invoiceNumber"
            label="Invoice Number"
            type="text"
            fullWidth
            value={invoiceNumber}
            onChange={onChange}
            className={classes.input}
          />
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <SectionTitle text="Service Cost" />
          <FormControl className={classes.currencyInput}>
            <InputLabel htmlFor="costCurrency">Currency</InputLabel>
            <Select
              value={costCurrency}
              onChange={onChange}
              inputProps={{
                name: 'costCurrency',
                id: 'costCurrency',
              }}
            >
              <MenuItem value="EUR">Euro</MenuItem>
              <MenuItem value="HRK">HRK</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="serviceCost"
            name="cost"
            label="Service Cost"
            type="number"
            value={cost}
            onChange={onChange}
            onBlur={handleCaclulateCostOnBlur}
            className={classes.costInput}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isCostTaxAdded}
                onChange={e => checkboxHandler(e)}
                value="isCostTaxAdded"
                name="isCostTaxAdded"
              />
            }
            label="Tax Included"
          />
          {isCostTaxAdded && (
            <Card>
              <CardContent>
                <Tax
                  onChange={onChange}
                  handleCalculateTaxOnBlur={handleCalculateTaxOnBlur}
                  checkboxHandler={checkboxHandler}
                  taxSelected={costTaxSelected}
                  taxName="costTaxSelected"
                  taxIncluded={isCostTaxIncluded}
                  taxIncludedName="isCostTaxIncluded"
                  taxValues={taxValues}
                  taxAmount={costTax}
                  taxAmountName="costTax"
                  totalAmount={costTotal}
                  totalAmountLabel="Total Cost"
                />
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <SectionTitle text="Service Charge" />
          <FormControl className={classes.currencyInput}>
            <InputLabel htmlFor="chargedCurrency">Currency</InputLabel>
            <Select
              value={chargedCurrency}
              onChange={onChange}
              onBlur={handleChangeChargedCurrency}
              inputProps={{
                name: 'chargedCurrency',
                id: 'chargedCurrency',
              }}
            >
              <MenuItem value="EUR">Euro</MenuItem>
              <MenuItem value="HRK">HRK</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="serviceCharged"
            name="charged"
            label="Service Charged"
            type="number"
            value={charged}
            onChange={onChange}
            onBlur={handleCalculateChargedAmountOnBlur}
            className={classes.chargedInput}
          />
          <TextField
            fullWidth
            id="chargedTaxPercentageOnTop"
            name="chargedTaxPercentageOnTop"
            label="Add Service Charge Percentage"
            type="number"
            value={chargedTaxPercentageOnTop}
            onChange={onChange}
            onBlur={handleAddPercentageToChargedAmountOnBlur}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
          {isChargedTaxAdded && (
            <Card>
              <CardContent>
                <Tax
                  fixed
                  taxSelectedLabel="Tax Percentage"
                  taxSelected={chargedTaxSelected}
                  taxAmountLabel="Tax Amount"
                  taxAmount={chargedTax}
                  totalAmountLabel="Total Charge"
                  totalAmount={chargedTotal}
                />
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Total Price
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {totalPrice}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default withStyles(styles)(Service);
