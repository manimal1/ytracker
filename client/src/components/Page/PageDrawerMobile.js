import React from 'react';

import { default as MobileDrawer } from '../MobileDrawer';
import { default as NavMenu } from '../NavMenu';
import { default as MenuPanel } from './MenuPanel';
import { default as MenuItems } from '../MenuItems';

const PageDrawerMobile = ({
  menu,
  isDrawerOpen,
  toggleDrawer,
  selectedIndex,
  handleMenuItemSelect,
  children,
}) => (
  <MobileDrawer {...{isDrawerOpen, toggleDrawer, children}} >
    <NavMenu {...{menu}}>
      <MenuPanel>
        <MenuItems {...{selectedIndex, handleMenuItemSelect}} />
      </MenuPanel>
    </NavMenu>
  </MobileDrawer>
);


export default PageDrawerMobile;
