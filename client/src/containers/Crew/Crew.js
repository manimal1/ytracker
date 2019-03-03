import React, { Component } from 'react';

import InboxIcon from '@material-ui/icons/MoveToInbox';

import { Page } from 'components/Page';
import { CrewDashboard, CrewForm, CrewService } from './components';

class Crew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          id: 'crew-dashboard',
          label: 'Dashboard',
          icon: <InboxIcon />,
          component: <CrewDashboard />,
        },
        {
          id: 'crew-create',
          label: 'Add Company',
          icon: <InboxIcon />,
          component: <CrewForm />,
        },
        {
          id: 'crew-service',
          label: 'Add Service',
          icon: <InboxIcon />,
          component: <CrewService />,
        },
      ],
    };
  }

  render() {
    const { menu } = this.state;

    return (
      <div>
        <Page {...{ menu }} defaultPanel="crew-dashboard" />
      </div>
    );
  }
}

export default Crew;
