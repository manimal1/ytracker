import React from 'react';

import MobileDrawer from '../MobileDrawer';
import NavMenu from '../NavMenu';
import MenuPanel from './MenuPanel';
import MenuItems from '../MenuItems';

const PageDrawerMobile = ({
  menu,
  isDrawerOpen,
  toggleDrawer,
  selectedIndex,
  handleMenuItemSelect,
  children,
}) => (
  <MobileDrawer {...{ isDrawerOpen, toggleDrawer, children }}>
    <NavMenu {...{ menu }}>
      <MenuPanel>
        <MenuItems {...{ selectedIndex, handleMenuItemSelect }} />
      </MenuPanel>
    </NavMenu>
  </MobileDrawer>
);

export default PageDrawerMobile;
