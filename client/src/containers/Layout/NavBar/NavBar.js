import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import DesktopNavBar from './DesktopNavBar';
import MobileNavDrawer from './MobileNavDrawer';

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
      isMobileDrawerOpen: false,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.checkViewportWidth);
    this.checkViewportWidth();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkViewportWidth);
  }

  checkViewportWidth = () => {
    if (window.innerWidth <= 960) {
      this.setState({
        isMobile: true,
      });
    } else {
      this.setState({
        isMobile: false,
      });
    }
  };

  toggleMobileDrawer = state => {
    const { isMobileDrawerOpen } = this.state;
    const setIsOpen = state ? state : !isMobileDrawerOpen;
    this.setState({
      isMobileDrawerOpen: setIsOpen,
    });
  };

  render() {
    const { auth } = this.props;
    if (!auth.isAuthenticated) return null;

    const { isMobile, isMobileDrawerOpen } = this.state;
    const toggleMobileDrawer = this.toggleMobileDrawer;
    console.log({ isMobileDrawerOpen });

    return (
      <React.Fragment>
        <DesktopNavBar {...{ isMobile, toggleMobileDrawer }} />
        {isMobile && (
          <MobileNavDrawer {...{ isMobileDrawerOpen, toggleMobileDrawer }} />
        )}
      </React.Fragment>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps),
)(withRouter(NavBar));
