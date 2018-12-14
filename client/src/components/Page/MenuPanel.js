import React from 'react';
import { PageContext } from './PageContext';

const MenuPanel = props => {

  return (
    <PageContext.Consumer>
      {({ handlePanelSwitch }) => {
        return (
          <div onClick={() => handlePanelSwitch(props.id)}>
            {props.children}
          </div>
        );
      }}
    </PageContext.Consumer>
  )
};

export default MenuPanel;