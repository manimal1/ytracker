import React from 'react';
import { GetProfiles } from 'containers/Getters';

const UsersTodos = () => {
  return (
    <div>
      User Todo List!
      <GetProfiles label="Assign to" />
    </div>
  );
};

export default UsersTodos;
