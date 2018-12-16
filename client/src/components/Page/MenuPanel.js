import React from 'react';
import { PageContext } from './PageContext';

const MenuPanel = props => {
  const id = !props.id ? props.item.id : props.id;
  const { children } = props;

  return (
    <PageContext.Consumer>
      {({ handlePanelSwitch }) => {
        const clonedChildren = React.Children.map(children, child => {
            return React.cloneElement(child, props);
          });
        return (
          <div onClick={() => handlePanelSwitch(id)}>
            {clonedChildren}
          </div>
        );
      }}
    </PageContext.Consumer>
  )
};

export default MenuPanel;