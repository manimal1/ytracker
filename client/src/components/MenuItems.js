import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const MenuItems = ({ selectedIndex, handleMenuItemSelect, component, link, index, item }) => {
  
  return (
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
  )
}

export default MenuItems;