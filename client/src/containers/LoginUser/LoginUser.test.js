import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider as ReduxProvider } from 'react-redux';

import LoginUser from './LoginUser';

const mockStore = configureStore();

const inputErrors = () => ({
  errors: {
    email: 'Invalid email',
    password: 'Invalid password',
  },
});

const emailInputError = () => ({
  errors: {
    email: 'Invalid email',
  },
});

const passwordInputError = () => ({
  errors: {
    password: 'Invalid password',
  },
});

const renderAuthenticatedUser = reduxStateOverrides => {
  const store = mockStore({
    auth: {
      isAuthenticated: false,
      user: {},
    },
    errors: {},
    ...reduxStateOverrides,
  });

  return mount(
    <ReduxProvider store={store}>
      <LoginUser />
    </ReduxProvider>,
  );
};

describe('<LoginUser>', () => {
  it('renders errors if there are no text in the input fields', async () => {
    // given
    const tree = renderAuthenticatedUser(inputErrors());

    // then
    expect(tree.find('#email-helper-text').hostNodes()).toHaveLength(1);
    expect(tree.find('#password-helper-text').hostNodes()).toHaveLength(1);
  });

  it('renders an email input error but not a password input error if only email is not passing validation', async () => {
    // given
    const tree = renderAuthenticatedUser(emailInputError());

    // then
    expect(tree.find('#email-helper-text').hostNodes()).toHaveLength(1);
    expect(tree.find('#password-helper-text').hostNodes()).toHaveLength(0);
  });

  it('renders a password input error but not an email input error if only password is not passing validation', async () => {
    // given
    const tree = renderAuthenticatedUser(passwordInputError());

    // then
    expect(tree.find('#email-helper-text').hostNodes()).toHaveLength(0);
    expect(tree.find('#password-helper-text').hostNodes()).toHaveLength(1);
  });
});
