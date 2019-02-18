import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const drawerWidth = 226;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    top: '136px',
  },
});

const PermanentDrawer = ({classes, children }) => (
  <Drawer
    className={classes.drawer}
    variant="permanent"
    classes={{
      paper: classes.drawerPaper,
    }}
  >
    {children}
  </Drawer>
);

PermanentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PermanentDrawer);
