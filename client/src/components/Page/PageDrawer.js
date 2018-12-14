import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { default as MenuPanel } from './MenuPanel';

const drawerWidth = 220;

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

const PageDrawer = ({classes, PageConsumer, menu, selectedIndex, handleMenuItemSelect }) => (
  <Drawer
    className={classes.drawer}
    variant="permanent"
    classes={{
      paper: classes.drawerPaper,
    }}
  >
      <List>
        {
          menu.map((menuItem, index) => {
            const component = menuItem.path ? Link : '';
            const link = menuItem.path ? menuItem.path : '';
            
            return (
              <MenuPanel
                key={index}
                id={menuItem.label}
                {...{PageConsumer}}
              >
                <ListItem
                  button
                  selected={selectedIndex === index}
                  aria-selected={selectedIndex === index}
                  component={component}
                  to={link}
                  onClick={e => handleMenuItemSelect(e, index)}
                >
                  <ListItemIcon>{menuItem.icon}</ListItemIcon>
                  <ListItemText primary={menuItem.label} />
                </ListItem>
              </MenuPanel>
            )
          })
        }
      </List>
    </Drawer>
);

PageDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PageDrawer);