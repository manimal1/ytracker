import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { default as NavMenu } from './NavMenu';

const styles = theme => ({
  swipeableDrawer: {
    minWidth: '240px',
  },
});

const NavDrawer = (props) => {
  const { classes, isNavDrawerOpen, selectedIndex, toggleDrawer, handleNavMenuItemSelect } = props;

  return (
    <SwipeableDrawer
      open={isNavDrawerOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div
        tabIndex={0}
        role="button"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        className={classes.swipeableDrawer}
      >
        <NavMenu {...{selectedIndex, handleNavMenuItemSelect}} />
      </div>
    </SwipeableDrawer>
  )
}

NavDrawer.propTypes = {
  isNavDrawerOpen: PropTypes.bool,
  selectedIndex: PropTypes.number,
  handleNavMenuItemSelect: PropTypes.func,
  toggleDrawer: PropTypes.func,
};

NavDrawer.defaultProps = {
  isNavDrawerOpen: false,
  selectedIndex: 0,
  handleNavMenuItemSelect: () => undefined,
  toggleDrawer: () => undefined,
};

export default withStyles(styles)(NavDrawer);
