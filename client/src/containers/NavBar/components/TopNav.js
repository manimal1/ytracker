import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BoatIcon from '@material-ui/icons/DirectionsBoat';
import StoreIcon from '@material-ui/icons/Store';
// import AccountCircle from '@material-ui/icons/AccountCircle';
import RowingIcon from '@material-ui/icons/Rowing';

const styles = theme => ({
  topNav: {
    paddingLeft: '8px',
    backgroundColor: '#FFFFFF',
  },
  tab: {
    marginLeft: '16px',
    marginRight: '16px',
    textAlign: 'center',
  }
});

const TopNav = (props) => {
  const { classes, selectedIndex, handleNavMenuItemSelect } = props;
  const topNavItems = [
    { label: 'Dashboard', icon: <DashboardIcon/>, path: '/dashboard' },
    { label: 'Yachts', icon: <BoatIcon/>, path: '/yachts' },
    { label: 'Companies', icon: <StoreIcon/>, path: '/company' },
    { label: 'Captains', icon: <RowingIcon/>, path: '/captains' },
    // { label: 'Users', icon: <AccountCircle/>, path: '/users' },
  ];

  return (
    <div className={classes.topNav}>
      <Tabs
        value={selectedIndex}
        indicatorColor="secondary"
        textColor="secondary"
      >
      {
        topNavItems.map((item, index) => {
          return (
            <Tab
              key={index}
              className={classes.tab}
              label={item.label}
              icon={item.icon}
              component={Link}
              to={item.path}
              onClick={e => handleNavMenuItemSelect(e, index)}
            />
          )
        })
      }
      </Tabs>
    </div>
  );
}

TopNav.propTypes = {
  selectedIndex: PropTypes.number,
  handleNavMenuItemSelect: PropTypes.func,
};

TopNav.defaultProps = {
  selectedIndex: 0,
  handleNavMenuItemSelect: () => undefined,
};

export default withStyles(styles)(TopNav);
