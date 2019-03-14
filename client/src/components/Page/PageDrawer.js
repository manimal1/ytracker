import React from 'react';

import PermanentDrawer from './PagePermanentDrawer';
import PageNavMenu from './PageNavMenu';
import MenuPanel from './MenuPanel';
import PageMenuItems from './PageMenuItems';

const PageDrawer = ({ menu, selectedIndex, handleMenuItemSelect }) => (
  <PermanentDrawer>
    <PageNavMenu {...{ menu }}>
      <MenuPanel>
        <PageMenuItems {...{ selectedIndex, handleMenuItemSelect }} />
      </MenuPanel>
    </PageNavMenu>
  </PermanentDrawer>
);

export default PageDrawer;
