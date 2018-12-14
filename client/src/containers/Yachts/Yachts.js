import React, { Component } from 'react';

import InboxIcon from '@material-ui/icons/MoveToInbox';

import {
  Dashboard,
  YachtForm,
  YachtService,
  YachtCalendar,
} from './components';

import { default as Page } from '../Page';

class Yachts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {label: 'Dashboard', icon: <InboxIcon />, component: <Dashboard />},
        {label: 'Add Yacht', icon: <InboxIcon />, component: <YachtForm />},
        {label: 'Add Service', icon: <InboxIcon />, component: <YachtService />},
        {label: 'Calendar', icon: <InboxIcon />, component: <YachtCalendar />},
      ],
    }
  }

  render() {
    const { menu } = this.state;

    return (
      <div>
        <Page {...{menu}} />
      </div>
    );
  }
}

export default Yachts;