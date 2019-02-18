import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    [theme.breakpoints.up('lg')]: {
      minWidth: '33%',
    },
    [theme.breakpoints.down('md')]: {
      minWidth: '50%',
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
    },
  },
});

const TextFieldList = ({ item, onChange, onBlur, className, classes }) => {
  
  return (
    <TextField
      id={item.id ? item.id : ''}
      name={item.name ? item.name : ''}
      label={item.label ? item.label : ''}
      className={`${classes.textField} ${className ? className : ''}`}
      type={item.type ? item.type : ''}
      autoComplete="on"
      margin="normal"
      min={item.min ? item.min : ''}
      max={item.max ? item.max : ''}
      step={item.step ? item.step : ''}
      value={item.value ? item.value : ''}
      onChange={onChange ? onChange : undefined}
      onBlur={onBlur ? onBlur : undefined}
      required={item.required ? true : false}
      error={item.error ? true : false}
      helperText={item.error ? item.error : ''}
      InputProps={{
        endAdornment: <InputAdornment position="end">
          {item.adornment ? item.adornment : ''}
        </InputAdornment>,
      }}
    />
  )
}

export default withStyles(styles)(TextFieldList);
