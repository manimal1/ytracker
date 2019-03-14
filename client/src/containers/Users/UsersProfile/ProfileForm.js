import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import SectionTitle from 'components/SectionTitle';
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

const ProfileForm = props => {
  const {
    profile,
    userRoles,
    onChange,
    onSubmit,
    errors,
    isDataFetching,
    // classes,
  } = props;

  const { handle, firstname, lastname, role, location, linkedin } = profile;
  console.log({ profile });
  if (isDataFetching) {
    return <Spinner />;
  }

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <CardContent>
          <SectionTitle text="User Profile" />
          <TextField
            id="user-handle"
            name="handle"
            label="Nickname / handle"
            type="text"
            autoComplete="on"
            margin="normal"
            value={handle}
            onChange={onChange}
            required
            error={errors && errors.handle ? true : false}
            helperText={errors && errors.handle ? errors.handle : null}
          />
          <TextField
            id="user-firstname"
            name="firstname"
            label="first name"
            type="text"
            autoComplete="on"
            margin="normal"
            value={firstname}
            onChange={onChange}
            required
            error={errors && errors.firstname ? true : false}
            helperText={errors && errors.firstname ? errors.firstname : null}
          />
          <TextField
            id="user-lastname"
            name="lastname"
            label="first name"
            type="text"
            autoComplete="on"
            margin="normal"
            value={lastname}
            onChange={onChange}
            required
            error={errors && errors.lastname ? true : false}
            helperText={errors && errors.lastname ? errors.lastname : null}
          />
          <FormControl>
            <InputLabel htmlFor="role">User Role</InputLabel>
            <Select
              value={role}
              onChange={onChange}
              inputProps={{
                name: 'role',
                id: 'role',
              }}
            >
              {userRoles.map((role, index) => (
                <MenuItem key={`user-role-${index}`} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="user-location"
            name="location"
            label="Office Location"
            type="text"
            autoComplete="on"
            margin="normal"
            value={location}
            onChange={onChange}
          />
          <TextField
            id="user-linkedin"
            name="linkedin"
            label="LinkedIn Page"
            type="text"
            autoComplete="on"
            margin="normal"
            value={linkedin}
            onChange={onChange}
          />
        </CardContent>
      </Card>

      <Button variant="contained" color="primary" type="submit">
        Update Profile
      </Button>
    </form>
  );
};

export default withStyles(styles)(ProfileForm);
