import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';

const DrawerMenu = (props) => {
  const { menu } = props;
  return (
    <List component="nav">
      {
        menu.map((item, index) => {
          const component = item.path ? Link : '';
          const link = item.path ? item.path : '';
          const clonedChildren = React.Children.map(props.children, child => {
            return React.cloneElement(child, {item, index, component, link});
          });
          
          return (
            <React.Fragment key={index}>
              {clonedChildren}
            </React.Fragment>
          )
        })
      }
    </List>
  );
}

DrawerMenu.propTypes = {
  menu: PropTypes.array.isRequired,
};

export default DrawerMenu;
