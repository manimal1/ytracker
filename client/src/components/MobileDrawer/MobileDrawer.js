import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { default as DrawerMenu } from './DrawerMenu';

const styles = theme => ({
  swipeableDrawer: {
    minWidth: '240px',
  },
});

const MobileDrawer = (props) => {
  const { classes, isDrawerOpen, selectedIndex, menu, toggleDrawer, handleMenuItemSelect } = props;

  return (
    <SwipeableDrawer
      open={isDrawerOpen}
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
        <DrawerMenu {...{menu, selectedIndex, handleMenuItemSelect}} />
      </div>
    </SwipeableDrawer>
  )
}

MobileDrawer.propTypes = {
  isDrawerOpen: PropTypes.bool,
  selectedIndex: PropTypes.number,
  handleNavMenuItemSelect: PropTypes.func,
  toggleDrawer: PropTypes.func,
};

MobileDrawer.defaultProps = {
  isDrawerOpen: false,
  selectedIndex: 0,
  handleNavMenuItemSelect: () => undefined,
  toggleDrawer: () => undefined,
};

export default withStyles(styles)(MobileDrawer);
