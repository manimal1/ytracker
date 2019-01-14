import React from 'react';

import { default as PermanentDrawer } from '../PermanentDrawer';
import { default as NavMenu } from '../NavMenu';
import { default as MenuPanel } from './MenuPanel';
import { default as MenuItems } from '../MenuItems';

const PageDrawer = ({ menu, selectedIndex, handleMenuItemSelect }) => (
  <PermanentDrawer>
    <NavMenu {...{menu}}>
      <MenuPanel>
        <MenuItems {...{selectedIndex, handleMenuItemSelect}} />
      </MenuPanel>
    </NavMenu>
  </PermanentDrawer>
);

export default PageDrawer;
