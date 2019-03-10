import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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

const Login = props => {
  const {
    classes,
    email,
    password,
    onChange,
    onSubmit,
    showPassword,
    handleClickShowPassword,
    errors,
  } = props;

  return (
    <form
      id="login-form"
      className={classes.pagewrapper}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <div className={classes.container}>
        <Card>
          <CardContent>
            <Heading text="Login" />
            <TextField
              id="email"
              name="email"
              label="Email"
              className={classes.textField}
              type="email"
              autoComplete="current-email"
              margin="normal"
              value={email}
              onChange={onChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              className={classes.textField}
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              margin="normal"
              value={password}
              onChange={onChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </CardContent>
          <CardActions>
            <Button
              id="login-button"
              variant="contained"
              color="primary"
              type="submit"
              onClick={onSubmit}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </div>
    </form>
  );
};

export default withStyles(styles)(Login);
