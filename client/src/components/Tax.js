import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  serviceNameInput: {
    width: '100%',
  },
  assignedDate: {
    width: '100%',
  },
  taxSelect: {
    width: '82px',
    marginBottom: '8px',
  },
  taxCost: {
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

const Tax = (props) => {
  const {
    onChange,
    onBlur,
    checkboxHandler,
    taxIncluded,
    taxIncludedName,
    taxValues,
    taxSelected,
    taxName,
    taxAmount,
    taxAmountName,
    totalAmount,
    totalAmountName,
    classes,
  } = props;

  return (
    <div>
      <FormGroup row>
        <FormControl className={classes.taxSelect}>
          <InputLabel htmlFor="currency">Tax</InputLabel>
          <Select
            value={taxSelected}
            onChange={onChange}
            inputProps={{
              name: `${taxName}`,
              id: `${taxName}`,
            }}
          >
            {
              taxValues.map(tax => (
                <MenuItem value={tax}>{tax}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
        <TextField
          id={taxAmountName}
          name={taxAmountName}
          label="Tax Amount"
          type="number"
          value={taxAmount}
          onChange={onChange}
          onBlur={onBlur}
        />
      </FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={taxIncluded}
            onChange={(e) => checkboxHandler(e)}
            value={taxIncludedName}
            name={taxIncludedName}
          />
        }
        label="Include Tax"
      />
      <TextField
        id={totalAmountName}
        name={totalAmountName}
        label="Total Amount"
        type="number"
        value={totalAmount}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

Tax.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  checkboxHandler: PropTypes.func,
  taxIncluded: PropTypes.bool,
  taxIncludedName: PropTypes.string,
  taxValues: PropTypes.array,
  taxSelected: PropTypes.any,
  taxName: PropTypes.string,
  taxAmount: PropTypes.string,
  taxAmountName: PropTypes.string,
  totalAmount: PropTypes.string,
  totalAmountName: PropTypes.string,
  classes: PropTypes.object,
  text: PropTypes.string.isRequired,
  class: PropTypes.string,
}

export default withStyles(styles)(Tax);
