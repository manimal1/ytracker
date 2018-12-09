import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';

const AccountMenu = (props) => {
  const {
    isMenuOpen,
    accountMenuAnchor,
    isAuthenticated,
    user,
    handleAuthPageRedirect,
    handleAccountMenu,
    handleAccountMenuClose,
    handleLogoutUser,
  } = props;

  return (
    <div>
      <IconButton
        aria-owns={isMenuOpen ? 'menu-appbar' : null}
        aria-haspopup="true"
        onClick={handleAccountMenu}
        color="inherit"
      >
        {isAuthenticated && 
          <Avatar
            alt="Adelle Charles"
            src={user.avatar}
          />
        }
        {!isAuthenticated && 
          <AccountCircle />
        }
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
        {!isAuthenticated &&
          <MenuItem
            component={Link}
            to="/login"
            onClick={handleAuthPageRedirect}
          >
            Login
          </MenuItem>
        }
        {!isAuthenticated &&
          <MenuItem
            component={Link}
            to="/register"
            onClick={handleAuthPageRedirect}
          >
            Register
          </MenuItem>
        }
        {isAuthenticated &&
          <MenuItem
            component={Link}
            to="/profile"
            onClick={handleAuthPageRedirect}
          >
            profile
          </MenuItem>
        }
        {isAuthenticated &&
          <MenuItem onClick={handleLogoutUser}>
            logout
          </MenuItem>
        }
      </Menu>
    </div>
  )
}

AccountMenu.propTypes = {
  user: PropTypes.object,
  handleAuthPageRedirect: PropTypes.func,
  handleAccountMenu: PropTypes.func,
  handleAccountMenuClose: PropTypes.func,
  handleLogoutUser: PropTypes.func,
};

export default (AccountMenu);