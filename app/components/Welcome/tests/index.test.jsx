import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import createComponentWithIntl from '../../../utils/createComponentWithIntl';
import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';
import Welcome, { WelcomeComponent } from '../index';

describe('<Welcome />', () => {
  it('renders old snapshot', () => {
    expect(
      createComponentWithIntl(
        <BrowserRouter>
          <Welcome />
        </BrowserRouter>,
      ).toJSON(),
    ).toMatchSnapshot();
  });

  it('CREATE button redirects to /create', () => {
    const history = {
      push: jest.fn(pathname => pathname),
    };

    mountWithIntl(
      <WelcomeComponent history={history} />,
    ).find('button')
      .at(0)
      .simulate('click');

    expect(history.push).toHaveReturnedWith('/create');
  });

  it('SEARCH button redirects to /bundle/search', () => {
    const history = {
      push: jest.fn(pathname => pathname),
    };

    mountWithIntl(
      <WelcomeComponent history={history} />,
    ).find('button')
      .at(1)
      .simulate('click');

    expect(history.push).toHaveReturnedWith('/bundle/search');
  });
});
