import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider as ReduxProvider } from 'react-redux';

import axios from 'axios';

import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';

import axios from 'axios';

import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';

import LoginUser from './LoginUser';
import { SET_CURRENT_USER, loginUser } from './actions';

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


// describe("<LoginUser> actions", () => {
//   let store;
//   let httpMock;
//   const userLogin = {
//     email: 'js@got.com',
//     password: 'password',
//   };
//   const userInfo = {
//     firstname: 'John',
//     lastname: 'Snow',
//   };

//   const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

//   beforeEach(() => {
//     httpMock = new MockAdapter(axios);
//     const mockStore = configureMockStore();
//     store = mockStore({});
//   });

//   it('sets a current user', async () => {
//     httpMock.onPost(
//       'http://localhost:3000/api/users/login',
//       userLogin
//     ).reply(200, userInfo);

//     loginUser(userLogin)(store.dispatch);
//     await flushAllPromises();
//     // then
//     expect(store.getActions()).toEqual(
//       [
//         { type: SET_CURRENT_USER },
//         { payload: userInfo }
//       ]);
//   });
// });
