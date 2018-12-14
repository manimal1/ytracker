import React from 'react';

import { PageContext } from './PageContext';

const PagePanel = props => {

  return (
    <PageContext.Consumer>
      {({ activePanel }) =>
        activePanel === props.isActive ? props.children : null
      }
    </PageContext.Consumer>
  );
};

export default PagePanel;