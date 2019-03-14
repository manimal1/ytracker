import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';

const styles = () => ({
  accountIcon: {
    position: 'absolute',
    right: '12px',
  },
});

const AccountMenu = props => {
  const {
    isMenuOpen,
    accountMenuAnchor,
    isAuthenticated,
    user,
    handleAuthPageRedirect,
    handleAccountMenu,
    handleAccountMenuClose,
    handleLogoutUser,
    classes,
  } = props;

  return (
    <Fragment>
      <IconButton
        className={classes.accountIcon}
        aria-owns={isMenuOpen ? 'menu-appbar' : null}
        aria-haspopup="true"
        onClick={handleAccountMenu}
        color="inherit"
      >
        {isAuthenticated && <Avatar alt="user-avatar" src={user.avatar} />}
        {!isAuthenticated && <AccountCircle />}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={accountMenuAnchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleAccountMenuClose}
      >
        {!isAuthenticated && (
          <MenuItem component={Link} to="/" onClick={handleAuthPageRedirect}>
            Login
          </MenuItem>
        )}
        {isAuthenticated && (
          <MenuItem
            component={Link}
            to="/users/profile"
            onClick={handleAuthPageRedirect}
          >
            profile
          </MenuItem>
        )}
        {isAuthenticated && (
          <MenuItem onClick={handleLogoutUser}>logout</MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

export default withStyles(styles)(AccountMenu);
