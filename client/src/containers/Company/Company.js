import React, { Component } from 'react';

import InboxIcon from '@material-ui/icons/MoveToInbox';

import {
  CompanyDashboard,
  CompanyForm,
  CompanyService,
} from './components';

import { Page } from '../../components/Page';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          id: 'company-dashboard',
          label: 'Dashboard',
          icon: <InboxIcon />,
          component: <CompanyDashboard />
        },
        {
          id: 'company-create',
          label: 'Add Company',
          icon: <InboxIcon />,
          component: <CompanyForm />
        },
        {
          id: 'company-service',
          label: 'Add Service',
          icon: <InboxIcon />,
          component: <CompanyService />
        },
      ],
    }
  }

  render() {
    const { menu } = this.state;

    return (
      <div>
        <Page {...{menu}} defaultPanel="company-dashboard" />
      </div>
    );
  }
}

export default Company;