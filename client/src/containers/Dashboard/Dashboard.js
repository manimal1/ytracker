import React, { Component } from 'react';

import InboxIcon from '@material-ui/icons/MoveToInbox';

import MainDashboard from './MainDashboard';
import { YachtDashboard } from '../Yachts/components';
import { CompanyDashboard } from '../Company/components';

import { Page } from 'components/Page';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          id: 'main-dashboard',
          label: 'Main',
          icon: <InboxIcon />,
          component: <MainDashboard />,
        },
        {
          id: 'yacht-dashboard',
          label: 'Yachts',
          icon: <InboxIcon />,
          component: <YachtDashboard />,
        },
        {
          id: 'company-dashboard',
          label: 'Companies',
          icon: <InboxIcon />,
          component: <CompanyDashboard />,
        },
      ],
    };
  }

  render() {
    const { menu } = this.state;

    return (
      <div>
        <Page {...{ menu }} defaultPanel="main-dashboard" />
      </div>
    );
  }
}

export default Company;
