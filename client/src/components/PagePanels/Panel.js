import React from 'react';
import { PageContext } from './PageContext';

const Panel = props => {

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

export default Panel;