import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

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
  const {classes, navMenu, selectedIndex, handleNavMenuItemSelect} = props;

  return (
    <BottomNavigation
      value={selectedIndex}
      showLabels
      className={classes.bottomNav}
    >
      {
        navMenu.map((item, index) => {
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
