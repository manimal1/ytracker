import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Heading from 'components/Heading';

const styles = () => ({
  pagewrapper: {
    marginLeft: '16px',
    marginRight: '16px',
  },
  container: {
    marginTop: '32px',
    marginLeft: 'auto',
    marginRight: 'auto',
    minWidth: '240px',
    maxWidth: '480px',
  },
  textField: {
    position: 'relative',
    display: 'block',
    width: '100%',
  },
});

const Register = props => {
  const {
    classes,
    firstname,
    lastname,
    email,
    password,
    password2,
    onChange,
    onSubmit,
    errors,
  } = props;
  const inputItems = [
    {
      label: 'firstname',
      type: 'text',
      value: firstname,
      error: errors.firstname,
    },
    {
      label: 'lastname',
      type: 'text',
      value: lastname,
      error: errors.lastname,
    },
    { label: 'email', type: 'email', value: email, error: errors.email },
    {
      label: 'password',
      type: 'password',
      value: password,
      error: errors.password,
    },
    {
      label: 'confirm password',
      type: 'password',
      value: password2,
      error: errors.password2,
    },
  ];

  return (
    <form className={classes.pagewrapper} onSubmit={onSubmit}>
      <div className={classes.container}>
        <Card>
          <CardContent>
            <Heading text="Register" />
            {inputItems.map((item, index) => {
              return (
                <TextField
                  key={`register-${index}`}
                  id={item.label}
                  name={
                    item.label === 'confirm password' ? 'password2' : item.label
                  }
                  label={item.label}
                  className={classes.textField}
                  type={item.type}
                  autoComplete={`current-${item.label}`}
                  margin="normal"
                  value={item.value}
                  onChange={onChange}
                  error={!!item.error}
                  helperText={item.error}
                />
              );
            })}
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </CardActions>
        </Card>
      </div>
    </form>
  );
};

export default withStyles(styles)(Register);
