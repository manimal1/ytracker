import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { logoutUser } from 'actions/userLoginActions';
import { clearCurrentProfile } from 'actions/profileActions';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import NavMenu from './NavMenu';
import AccountMenu from './AccountMenu';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class DesktopNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      accountMenuAnchor: null,
    };
  }

  handleDrawerOpen = () => {
    this.setState({ isOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ isOpen: false });
  };

  handleToggleMobileDrawer = () => {
    if (this.state.isOpen) this.setState({ isOpen: false });
    return this.props.toggleMobileDrawer();
  };

  handleAccountMenu = event => {
    this.setState({ accountMenuAnchor: event.currentTarget });
  };

  handleAccountMenuClose = () => {
    this.setState({ accountMenuAnchor: null });
  };

  handleLogoutUser = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    this.handleAccountMenuClose();
  };

  render() {
    const { classes, theme, isMobile, auth } = this.props;
    const { isAuthenticated, user } = auth;
    const { isOpen, accountMenuAnchor } = this.state;
    const handleMenuClick = isMobile
      ? this.handleToggleMobileDrawer
      : this.handleDrawerOpen;
    const handleAccountMenu = this.handleAccountMenu;
    const handleAccountMenuClose = this.handleAccountMenuClose;
    const handleLogoutUser = this.handleLogoutUser;
    const isMenuOpen = Boolean(accountMenuAnchor);

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: isOpen,
          })}
        >
          <Toolbar disableGutters={!isOpen}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleMenuClick}
              className={classNames(classes.menuButton, {
                [classes.hide]: isOpen,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              YTracker
            </Typography>
            <AccountMenu
              {...{
                isMobile,
                isMenuOpen,
                accountMenuAnchor,
                isAuthenticated,
                user,
                handleAccountMenu: handleAccountMenu,
                handleAccountMenuClose: handleAccountMenuClose,
                handleLogoutUser: handleLogoutUser,
              }}
            />
          </Toolbar>
        </AppBar>
        {!isMobile && (
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: isOpen,
              [classes.drawerClose]: !isOpen,
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: isOpen,
                [classes.drawerClose]: !isOpen,
              }),
            }}
            open={isOpen}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <NavMenu />
          </Drawer>
        )}
      </div>
    );
  }
}

DesktopNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    { logoutUser, clearCurrentProfile },
  ),
)(withRouter(DesktopNavBar));
