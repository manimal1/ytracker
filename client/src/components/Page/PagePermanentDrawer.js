import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const drawerWidth = 226;

const styles = () => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    top: '136px',
  },
});

const PagePermanentDrawer = ({ classes, children }) => (
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

export default withStyles(styles)(PagePermanentDrawer);
