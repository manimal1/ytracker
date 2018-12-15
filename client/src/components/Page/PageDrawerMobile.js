import React from 'react';

import { default as MobileDrawer } from '../MobileDrawer';
import { default as DrawerMenu } from '../DrawerMenu';
import { default as MenuPanel } from './MenuPanel';
import { default as DrawerMenuItems } from '../DrawerMenuItems';

const PageDrawerMobile = ({
  menu,
  isDrawerOpen,
  toggleDrawer,
  selectedIndex,
  handleMenuItemSelect,
  children,
}) => (
  <MobileDrawer {...{isDrawerOpen, toggleDrawer, children}} >
    <DrawerMenu {...{menu}}>
      <MenuPanel>
        <DrawerMenuItems {...{selectedIndex, handleMenuItemSelect}} />
      </MenuPanel>
    </DrawerMenu>
  </MobileDrawer>
);


export default PageDrawerMobile;
