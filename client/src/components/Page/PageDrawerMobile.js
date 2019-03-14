import React from 'react';

import PageMobileDrawer from './PageMobileDrawer';
import PageNavMenu from './PageNavMenu';
import MenuPanel from './MenuPanel';
import PageMenuItems from './PageMenuItems';

const PageDrawerMobile = ({
  menu,
  isDrawerOpen,
  toggleDrawer,
  selectedIndex,
  handleMenuItemSelect,
  children,
}) => (
  <PageMobileDrawer {...{ isDrawerOpen, toggleDrawer, children }}>
    <PageNavMenu {...{ menu }}>
      <MenuPanel>
        <PageMenuItems {...{ selectedIndex, handleMenuItemSelect }} />
      </MenuPanel>
    </PageNavMenu>
  </PageMobileDrawer>
);

export default PageDrawerMobile;
