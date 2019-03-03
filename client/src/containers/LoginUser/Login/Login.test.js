import React from 'react';
import { render, mount } from 'enzyme';

import Login from './Login';

const standardRender = render(<Login errors={{}} />);

describe('<Login>', () => {
  it('should render one email input field', () => {
    expect(standardRender.find('#email')).toHaveLength(1);
  });

  it('should render one password input field', () => {
    expect(standardRender.find('#password')).toHaveLength(1);
  });

  it('should render one login button', () => {
    expect(standardRender.find('button#login-button')).toHaveLength(1);
  });

  it('clicking login button triggers onSubmit function', () => {
    const onSubmitSpy = jest.fn();
    const mountRender = mount(<Login errors={{}} onSubmit={onSubmitSpy} />);

    mountRender
      .find('[type="submit"]')
      .hostNodes()
      .simulate('click');
    expect(onSubmitSpy).toBeCalled();
  });
});
