import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BoatIcon from '@material-ui/icons/DirectionsBoat';
import PersonIcon from '@material-ui/icons/Person';
import StoreIcon from '@material-ui/icons/Store';
import RowingIcon from '@material-ui/icons/Rowing';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { clearCurrentProfile } from 'actions/profileActions';
import { logoutUser } from 'actions/userLoginActions';

import { TopNav, BottomNav, AccountMenu } from './components';

const styles = theme => ({
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    textDecoration: 'none',
    color: '#FFFFFF',
  },
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      selectedIndex: 0,
      accountMenuAnchor: null,
      navMenu: [
        { label: 'Yachts', icon: <BoatIcon />, path: '/yachts' },
        { label: 'Users', icon: <PersonIcon />, path: '/users' },
        { label: 'Companies', icon: <StoreIcon />, path: '/company' },
        { label: 'Crew', icon: <RowingIcon />, path: '/crew' },
        { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        // { label: 'Users', icon: <AccountCircle/>, path: '/users' },
      ],
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.checkViewportWidth);
    this.checkViewportWidth();
  }

  componentDidMount() {
    const { navMenu } = this.state;

    navMenu.map((item, index) => {
      if (this.props.location.pathname === item.path) {
        this.setState({ selectedIndex: index });
      }
      return null;
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkViewportWidth);
  }

  checkViewportWidth = () => {
    if (window.innerWidth <= 768) {
      this.setState({
        isMobile: true,
      });
    } else {
      this.setState({
        isMobile: false,
      });
    }
  };

  handleNavMenuItemSelect = (e, index) => {
    this.setState({ selectedIndex: index });
  };

  handleAccountMenu = event => {
    this.setState({ accountMenuAnchor: event.currentTarget });
  };

  handleAccountMenuClose = () => {
    this.setState({ accountMenuAnchor: null });
  };

  handleAuthPageRedirect = () => {
    this.setState({ selectedIndex: 0 });
    this.handleAccountMenuClose();
  };

  handleLogoutUser = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    this.handleAccountMenuClose();
  };

  render() {
    const { isMobile, selectedIndex, accountMenuAnchor, navMenu } = this.state;
    const { classes, toggleDrawer, isDrawerOpen, children } = this.props;
    const { isAuthenticated, user } = this.props.auth;
    const isMenuOpen = Boolean(accountMenuAnchor);

    return (
      <AppBar position="sticky" color="primary" className={classes.appbar}>
        <Toolbar className="toolbar">
          <Typography variant="h5" color="inherit" className={classes.grow}>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={toggleDrawer(!isDrawerOpen)}
            >
              <MenuIcon />
            </IconButton>
            {children}
            <Link
              className={classes.logo}
              to={isAuthenticated ? '/yachts' : '/'}
              onClick={e => this.handleNavMenuItemSelect(e, 0)}
            >
              YTracker
            </Link>
          </Typography>
          <AccountMenu
            {...{
              isMobile,
              isMenuOpen,
              accountMenuAnchor,
              isAuthenticated,
              user,
              handleAuthPageRedirect: this.handleAuthPageRedirect,
              handleAccountMenu: this.handleAccountMenu,
              handleAccountMenuClose: this.handleAccountMenuClose,
              handleLogoutUser: this.handleLogoutUser,
            }}
          />
        </Toolbar>
        {!isMobile && isAuthenticated && (
          <TopNav
            {...{
              navMenu,
              selectedIndex,
              handleNavMenuItemSelect: this.handleNavMenuItemSelect,
            }}
          />
        )}
        {isMobile && isAuthenticated && (
          <BottomNav
            {...{
              navMenu,
              selectedIndex,
              handleNavMenuItemSelect: this.handleNavMenuItemSelect,
            }}
          />
        )}
      </AppBar>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { logoutUser, clearCurrentProfile },
  ),
)(withRouter(NavBar));
