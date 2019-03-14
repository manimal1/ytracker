import React from 'react';
import { GetProfiles, GetTodos } from 'containers/Getters';

const UsersTodos = () => {
  return (
    <div>
      User Todo List!
      <GetProfiles label="Assign to" />
      <GetTodos />
    </div>
  );
};

export default UsersTodos;
