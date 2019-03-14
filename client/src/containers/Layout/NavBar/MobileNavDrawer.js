import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import NavMenu from './NavMenu';

class MobileNavDrawer extends React.Component {
  state = {
    open: false,
  };

  toggleDrawer = () => () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { isMobileDrawerOpen, toggleMobileDrawer } = this.props;

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

export default MobileNavDrawer;
