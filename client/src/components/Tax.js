import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
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
    width: '100%',
  },
  fixedAmountWrapper: {
    marginTop: '16px',
  },
  fixedAmountLabel: {
    display: 'inline',
  },
  fixedAmount: {
    display: 'inline',
    marginLeft: '16px',
  },
});

const Tax = props => {
  const {
    fixed,
    onChange,
    onBlur,
    handleCalculateTaxOnBlur,
    checkboxHandler,
    taxIncluded,
    taxIncludedName,
    taxValues,
    taxSelected,
    taxName,
    taxAmount,
    taxAmountName,
    totalAmount,
    totalAmountLabel,
    classes,
  } = props;

  if (fixed) {
    return fixedTaxComponent(props); // eslint-disable-line no-use-before-define
  }

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={taxIncluded}
            onChange={e => checkboxHandler(e)}
            value={taxIncludedName}
            name={taxIncludedName}
          />
        }
        label="Tax included in cost"
      />
      <FormGroup row>
        <FormControl className={classes.taxSelect}>
          <InputLabel htmlFor="currency">Tax</InputLabel>
          <Select
            value={taxSelected}
            onChange={onChange}
            onBlur={handleCalculateTaxOnBlur}
            inputProps={{
              name: `${taxName}`,
              id: `${taxName}`,
            }}
          >
            {taxValues.map((tax, index) => (
              <MenuItem key={`${taxName}-${index}`} value={tax}>
                {tax}
              </MenuItem>
            ))}
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
      <div className={classes.totalAmountWrapper}>
        <Typography variant="h6" className={classes.totalAmountLabel}>
          {totalAmountLabel}:
        </Typography>
        <Typography variant="subtitle1" className={classes.totalAmount}>
          {totalAmount}
        </Typography>
      </div>
    </div>
  );
};

function fixedTaxComponent(props) {
  const {
    taxSelectedLabel,
    taxSelected,
    taxAmountLabel,
    taxAmount,
    totalAmountLabel,
    totalAmount,
    classes,
  } = props;

  return (
    <div>
      <div className={classes.fixedAmountWrapper}>
        <Typography
          variant="subtitle1"
          gutterBottom
          className={classes.fixedAmountLabel}
        >
          {taxSelectedLabel}:
        </Typography>
        <Typography variant="subtitle2" className={classes.fixedAmount}>
          {taxSelected}%
        </Typography>
      </div>
      <div>
        <Typography
          variant="subtitle1"
          gutterBottom
          className={classes.fixedAmountLabel}
        >
          {taxAmountLabel}:
        </Typography>
        <Typography variant="subtitle2" className={classes.fixedAmount}>
          {taxAmount}
        </Typography>
      </div>
      <div>
        <Typography variant="subtitle1" className={classes.fixedAmountLabel}>
          {totalAmountLabel}:
        </Typography>
        <Typography variant="subtitle2" className={classes.fixedAmount}>
          {totalAmount}
        </Typography>
      </div>
    </div>
  );
}

export default withStyles(styles)(Tax);
