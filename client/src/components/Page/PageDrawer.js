import React from 'react';

import { default as PermanentDrawer } from '../PermanentDrawer';
import { default as DrawerMenu } from '../DrawerMenu';
import { default as MenuPanel } from './MenuPanel';
import { default as DrawerMenuItems } from '../DrawerMenuItems';

const PageDrawer = ({ menu, selectedIndex, handleMenuItemSelect }) => (
  <PermanentDrawer>
    <DrawerMenu {...{menu}}>
      <MenuPanel>
        <DrawerMenuItems {...{selectedIndex, handleMenuItemSelect}} />
      </MenuPanel>
    </DrawerMenu>
  </PermanentDrawer>
);

export default PageDrawer;
