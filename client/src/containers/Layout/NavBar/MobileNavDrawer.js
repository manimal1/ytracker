import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import NavMenu from './NavMenu';

const drawerWidth = 240;

const styles = {
  list: {
    width: drawerWidth,
  },
  fullList: {
    width: 'auto',
  },
};

class TemporaryDrawer extends React.Component {
  state = {
    open: false,
  };

  toggleDrawer = () => () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { classes, isMobileDrawerOpen, toggleMobileDrawer } = this.props;

    return (
      <Drawer open={isMobileDrawerOpen}>
        <div
          tabIndex={0}
          role="button"
          onClick={() => toggleMobileDrawer(false)}
          onKeyDown={() => toggleMobileDrawer(false)}
        >
          <NavMenu />
        </div>
      </Drawer>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
