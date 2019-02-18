import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';

import Tax from './Tax';

const styles = theme => ({
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
  checkboxGroup: {
    position: 'relative',
    width: 'auto',
    paddingLeft: '8px',
  },
  chargedInput: {
    width: '100%'
  },
});

const Service = (props) => {
  const {
    service,
    checkboxHandler,
    onChange,
    onBlur,
    errors,
    classes,
  } = props;

  const {
    currency,
    name,
    charged,
    cost,
    paid,
    completed,
    assignedDate,
    addCostTax,
    costTaxIncluded,
    costTaxSelected,
    taxValues,
    taxCost,
    totalCost,
    addChargedTax,
    chargedTaxIncluded,
    chargedTaxSelected,
    taxCharged,
    totalCharged,
    totalValue,
  } = service;

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardContent>
          <FormGroup row className={classes.checkboxGroup}>
            <FormControlLabel
              className={classes.paidInput}
              control={
                <Checkbox
                  checked={paid}
                  onChange={(e) => checkboxHandler(e)}
                  value="paid"
                  name="paid"
                />
              }
              label="Paid"
            />
            <FormControlLabel
              className={classes.completedInput}
              control={
                <Checkbox
                  checked={completed}
                  onChange={(e) => checkboxHandler(e)}
                  value="completed"
                  name="completed"
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
            fullWidth={true}
            value={name}
            error={errors && errors.name}
            helperText={errors && errors.name ? errors.name : ''}
            onChange={onChange}
            required={true}
            className={classes.serviceNameInput}
          />
          <TextField
            id="assignedDate"
            name="assignedDate"
            label="Date of Service"
            type="date"
            fullWidth={true}
            defaultValue={assignedDate}
            onChange={onChange}
            required={true}
            InputLabelProps={{
              shrink: true,
            }}
            className={classes.assignedDate}
          />
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <FormGroup row>
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
              id="serviceCost"
              name="cost"
              label="Service Cost"
              type="number"
              value={cost}
              onChange={onChange}
              onBlur={onBlur}
              className={classes.costInput}
            />
          </FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={addCostTax}
                onChange={(e) => checkboxHandler(e)}
                value="addCostTax"
                name="addCostTax"
              />
            }
            label="Add Cost Tax"
          />
          {addCostTax &&
            <Card>
              <CardContent>
                <Tax
                  onChange={onChange}
                  onBlur={onBlur}
                  checkboxHandler={checkboxHandler}
                  taxSelected={costTaxSelected}
                  taxName="costTaxSelected"
                  taxIncluded={costTaxIncluded}
                  taxIncludedName="costTaxIncluded"
                  taxValues={taxValues}
                  taxAmount={taxCost}
                  taxAmountName="taxCost"
                  totalAmount={totalCost}
                  totalAmountName="totalCost"
                />
              </CardContent>
            </Card>
          }
          <TextField
            id="serviceCharged"
            name="charged"
            label="Service Charged"
            type="number"
            value={charged}
            onChange={onChange}
            onBlur={onBlur}
            className={classes.chargedInput}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={addChargedTax}
                onChange={(e) => checkboxHandler(e)}
                value="addChargedTax"
                name="addChargedTax"
              />
            }
            label="Add Charge Tax"
          />
          {addChargedTax &&
            <Card>
              <CardContent>
                <Tax
                  onChange={onChange}
                  onBlur={onBlur}
                  checkboxHandler={checkboxHandler}
                  taxSelected={chargedTaxSelected}
                  taxName="chargedTaxSelected"
                  taxIncluded={chargedTaxIncluded}
                  taxIncludedName="chargedTaxIncluded"
                  taxValues={taxValues}
                  taxAmount={taxCharged}
                  taxAmountName="taxCharged"
                  totalAmount={totalCharged}
                  totalAmountName="totalCharged"
                />
              </CardContent>
            </Card>
          }
      </CardContent>
      </Card>
      <Card>
        <CardContent>
          <TextField
            fullWidth={true}
            id="totalValue"
            name="totalValue"
            label="Total Price"
            type="number"
            value={totalValue}
            onChange={onChange}
            onBlur={onBlur}
          />
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

Service.propTypes = {
  service: PropTypes.object.isRequired,
  checkboxHandler: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  errors: PropTypes.object,
  classes: PropTypes.object,
}

export default withStyles(styles)(Service);
