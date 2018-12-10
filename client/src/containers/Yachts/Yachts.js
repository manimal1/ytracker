import React, { Component } from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import { default as ActionDrawer } from '../../components/ActionDrawer';

export default class Yachts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {text: 'Dashboard', icon: <InboxIcon />},
        {text: 'Add Yacht', icon: <InboxIcon />},
        {text: 'Add Service', icon: <InboxIcon />},
        {text: 'Calendar', icon: <InboxIcon />},
      ]
    }
  }
  render() {
    return (
      <div>
        <ActionDrawer menu={this.state.menu} />
      </div>
    );
  }
}
