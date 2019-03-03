import React from 'react';

const PageContext = React.createContext({
  activePanel: '',
  handlePanelSwitch: () => {},
});

export default PageContext;
