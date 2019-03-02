import React from 'react';

import PermanentDrawer from '../PermanentDrawer';
import NavMenu from '../NavMenu';
import MenuPanel from './MenuPanel';
import MenuItems from '../MenuItems';

const PageDrawer = ({ menu, selectedIndex, handleMenuItemSelect }) => (
  <PermanentDrawer>
    <NavMenu {...{ menu }}>
      <MenuPanel>
        <MenuItems {...{ selectedIndex, handleMenuItemSelect }} />
      </MenuPanel>
    </NavMenu>
  </PermanentDrawer>
);

export default PageDrawer;
