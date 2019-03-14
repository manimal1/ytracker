import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = () => ({
  topNav: {
    backgroundColor: '#FFFFFF',
  },
  tab: {
    marginLeft: '16px',
    marginRight: '16px',
    textAlign: 'center',
  },
});

const TopNav = props => {
  const { classes, navMenu, selectedIndex, handleNavMenuItemSelect } = props;

  return (
    <div className={classes.topNav}>
      <Tabs
        value={selectedIndex}
        indicatorColor="secondary"
        textColor="secondary"
      >
        {navMenu.map((item, index) => {
          return (
            <Tab
              key={index}
              className={classes.tab}
              label={item.label}
              icon={item.icon}
              component={Link}
              to={item.path}
              onClick={e => handleNavMenuItemSelect(e, index)}
            />
          );
        })}
      </Tabs>
    </div>
  );
};

TopNav.propTypes = {
  selectedIndex: PropTypes.number,
  handleNavMenuItemSelect: PropTypes.func,
};

TopNav.defaultProps = {
  selectedIndex: 0,
  handleNavMenuItemSelect: () => undefined,
};

export default withStyles(styles)(TopNav);
