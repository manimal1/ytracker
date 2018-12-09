import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../containers/LoginUser/actions';
import { clearCurrentProfile } from '../../containers/Profile/actions';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import { TopNav, BottomNav, NavDrawer, AccountMenu } from './components';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    textDecoration: 'none',
    color: '#FFFFFF',
  }
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      isNavDrawerOpen: false,
      selectedIndex: 0,
      accountMenuAnchor: null,
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.checkViewportWidth);
    this.checkViewportWidth();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkViewportWidth);
  }

  checkViewportWidth = () => {
    if (window.innerWidth <= 768) {
      this.setState({
        isMobile: true
      });
    } else {
      this.setState({
        isMobile: false
      });
    }
  }

  handleNavMenuItemSelect = (e, index) => {
    this.setState({selectedIndex: index});
  }

  toggleDrawer = (isOpen) => () => {
    this.setState({
      isNavDrawerOpen: isOpen
    });
  }

  handleAccountMenu = (event) => {
    this.setState({accountMenuAnchor: event.currentTarget});
  }

  handleAccountMenuClose = () => {
    this.setState({accountMenuAnchor: null});
  }

  handleAuthPageRedirect = () => {
    this.setState({ selectedIndex: 0 });
    this.handleAccountMenuClose();
  }

  handleLogoutUser = (e) => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    this.handleAccountMenuClose();
  }

  render() {
    const { isMobile, isNavDrawerOpen, selectedIndex, accountMenuAnchor } = this.state;
    const { classes } = this.props;
    const { isAuthenticated, user } = this.props.auth;
    const isMenuOpen = Boolean(accountMenuAnchor);

    return (
      <AppBar position="sticky" color="primary" className="">
        <Toolbar className="toolbar">
          {/* <IconButton
            className="icon"
            color="inherit"
            aria-label="Menu"
            onClick={this.toggleDrawer(!isNavDrawerOpen)}
          >
            <MenuIcon/>
          </IconButton> */}
          <Typography variant="h5" color="inherit" className={classes.grow}>
            <Link
              className={classes.logo}
              to={isAuthenticated ? '/dashboard' : '/'}
              onClick={(e) => this.handleNavMenuItemSelect(e, 0)}
            >
              YTracker
            </Link>
          </Typography>
          <AccountMenu {...{
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
        {!isMobile && isAuthenticated &&
          <TopNav {...{
            selectedIndex,
            handleNavMenuItemSelect: this.handleNavMenuItemSelect
          }} />
        }
        {isMobile && isAuthenticated &&
          <BottomNav {...{
            selectedIndex,
            handleNavMenuItemSelect: this.handleNavMenuItemSelect
          }} />
        }
        <NavDrawer {...{
          isNavDrawerOpen,
          selectedIndex,
          toggleDrawer: this.toggleDrawer,
          handleNavMenuItemSelect: this.handleNavMenuItemSelect
        }} />
      </AppBar>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { logoutUser, clearCurrentProfile }
  ),
)(NavBar);
