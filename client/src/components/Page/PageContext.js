import React from 'react';

export const PageContext = React.createContext({
  activePanel: '',
  handlePanelSwitch: () => {},
});
