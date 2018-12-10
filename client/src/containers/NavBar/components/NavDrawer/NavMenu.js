import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const NavMenu = (props) => {
  const { selectedIndex, navMenu, handleNavMenuItemSelect } = props;

  return (
    <List component="nav">
      {
        navMenu.map((item, index) => {
          return (
            <ListItem
              key={index}
              button
              selected={selectedIndex === index}
              aria-selected={selectedIndex === index}
              component={Link}
              to={item.path}
              onClick={e => handleNavMenuItemSelect(e, index)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText inset primary={item.label} />
            </ListItem>
          )
        })
      }
    </List>
  );
}

NavMenu.propTypes = {
  selectedIndex: PropTypes.number,
  handleNavMenuItemSelect: PropTypes.func,
};

NavMenu.defaultProps = {
  selectedIndex: 0,
  handleNavMenuItemSelect: () => undefined,
};

export default NavMenu;
