import React from 'react';

import { PageContext } from './PageContext';
import { default as PagePanelFrame } from './PagePanelFrame';

const PagePanel = props => {

  return (
    <PageContext.Consumer>
      {({ activePanel }) =>
        activePanel === props.isActive
        ? <PagePanelFrame>{props.children}</PagePanelFrame>
        : null
      }
    </PageContext.Consumer>
  );
};

export default PagePanel;