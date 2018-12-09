import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BoatIcon from '@material-ui/icons/DirectionsBoat';
import StoreIcon from '@material-ui/icons/Store';
// import AccountCircle from '@material-ui/icons/AccountCircle';
import RowingIcon from '@material-ui/icons/Rowing';

const styles = theme => ({
  bottomNav: {
    position: 'absolute',
    top: 'calc(100vh - 56px)',
    bottom: '0',
    right: '0',
    left: '0',
  },
});

const BottomNav = (props) => {
  const {classes, selectedIndex, handleNavMenuItemSelect} = props;
  const bottomNavItems = [
    { label: 'Dashboard', icon: <DashboardIcon/>, path: '/dashboard' },
    { label: 'Yachts', icon: <BoatIcon/>, path: '/yachts' },
    { label: 'Companies', icon: <StoreIcon/>, path: '/company' },
    { label: 'Captains', icon: <RowingIcon/>, path: '/captains' },
    // { label: 'Users', icon: <AccountCircle/>, path: '/users' },
  ];

  return (
    <BottomNavigation
      value={selectedIndex}
      showLabels
      className={classes.bottomNav}
    >
      {
        bottomNavItems.map((item, index) => {
          return (
            <BottomNavigationAction
              key={index}
              label={item.label}
              icon={item.icon}
              component={Link}
              to={item.path}
              onClick={e => handleNavMenuItemSelect(e, index)}
            />
          )
        })
      }
    </BottomNavigation>
  );
}

BottomNav.propTypes = {
  selectedIndex: PropTypes.number,
  handleNavMenuItemSelect: PropTypes.func,
}

BottomNav.defaultProps = {
  selectedIndex: 0,
  handleNavMenuItemSelect: () => undefined,
};

export default withStyles(styles)(BottomNav);
