import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { MenuPanel } from '../Page';

const DrawerMenu = ({ selectedIndex, menu, handleMenuItemSelect }) => {
  
  return (
    <List component="nav">
      {
        menu.map((item, index) => {
          const component = item.path ? Link : '';
          const link = item.path ? item.path : '';
          
          return (
            <MenuPanel
              key={index}
              id={item.label}
            >
              <ListItem
                button
                selected={selectedIndex === index}
                aria-selected={selectedIndex === index}
                component={component}
                to={link}
                onClick={e => handleMenuItemSelect(e, index)}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText inset primary={item.label} />
              </ListItem>
            </MenuPanel>
          )
        })
      }
    </List>
  );
}

DrawerMenu.propTypes = {
  selectedIndex: PropTypes.number,
  handleMenuItemSelect: PropTypes.func,
};

DrawerMenu.defaultProps = {
  selectedIndex: 0,
  handleMenuItemSelect: () => undefined,
};

export default DrawerMenu;
