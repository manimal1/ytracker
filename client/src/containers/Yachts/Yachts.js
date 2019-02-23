import React, { Component } from 'react';

import InboxIcon from '@material-ui/icons/MoveToInbox';

import {
  YachtDashboard,
  RegisterYacht,
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
          label: 'Yachts',
          icon: <InboxIcon />,
          component: <YachtDashboard />
        },
        {
          id: 'yacht-create',
          label: 'Add Yacht',
          icon: <InboxIcon />,
          component: <RegisterYacht />
        },
        {
          id: 'yacht-service',
          label: 'Services',
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