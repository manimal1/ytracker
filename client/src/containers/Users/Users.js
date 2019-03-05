import React, { Component } from 'react';

import InboxIcon from '@material-ui/icons/MoveToInbox';

import { UsersTodos, UsersProfile } from './components';

import { Page } from 'components/Page';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          id: 'users-todos',
          label: 'Todos',
          icon: <InboxIcon />,
          component: <UsersTodos />,
        },
        {
          id: 'users-profile',
          label: 'Profile',
          icon: <InboxIcon />,
          component: <UsersProfile />,
        },
      ],
    };
  }

  render() {
    const { menu } = this.state;

    return (
      <div>
        <Page {...{ menu }} defaultPanel="users-todos" />
      </div>
    );
  }
}

export default Users;
