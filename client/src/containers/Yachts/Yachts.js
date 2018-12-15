import React, { Component } from 'react';

import InboxIcon from '@material-ui/icons/MoveToInbox';

import {
  Dashboard,
  YachtForm,
  YachtService,
  YachtCalendar,
} from './components';

import { Page } from '../../components/Page';

class Yachts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          id: 'yacht-dashboard',
          label: 'Dashboard',
          icon: <InboxIcon />,
          component: <Dashboard />
        },
        {
          id: 'yacht-create',
          label: 'Add Yacht',
          icon: <InboxIcon />,
          component: <YachtForm />
        },
        {
          id: 'yacht-service',
          label: 'Add Service',
          icon: <InboxIcon />,
          component: <YachtService />
        },
        {
          id: 'yacht-calendar',
          label: 'Calendar',
          icon: <InboxIcon />,
          component: <YachtCalendar />
        },
      ],
    }
  }

  render() {
    const { menu } = this.state;

    return (
      <div>
        <Page {...{menu}} defaultPanel="yacht-dashboard" />
      </div>
    );
  }
}

export default Yachts;