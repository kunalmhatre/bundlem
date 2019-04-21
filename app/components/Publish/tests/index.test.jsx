import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import createComponentWithIntl from '../../../utils/createComponentWithIntl';
import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';
import { PublishComponent } from '../index';

describe('<Publish />', () => {
  const location = {
    state: {
      bundleID: 1337,
    },
  };

  it('renders old snapshot', () => {
    expect(
      createComponentWithIntl(
        <ReactRouterDOM.BrowserRouter>
          <PublishComponent location={location} />
        </ReactRouterDOM.BrowserRouter>,
      ).toJSON(),
    ).toMatchSnapshot();
  });

  it('redirects to Create page when navigated directly to it', () => {
    const testLocation = {
      state: undefined,
    };

    ReactRouterDOM.Redirect = jest
      .fn()
      .mockImplementation(() => null);

    expect(
      mountWithIntl(
        <ReactRouterDOM.BrowserRouter>
          <PublishComponent location={testLocation} />
        </ReactRouterDOM.BrowserRouter>,
      ).find(ReactRouterDOM.Redirect)
        .props()
        .to,
    ).toBe('/create');
  });

  it('VIEW button redirects to /bundle/?bundleID=[bundleID]', () => {
    const history = {
      push: jest.fn(pathname => pathname),
    };

    mountWithIntl(
      <ReactRouterDOM.BrowserRouter>
        <PublishComponent
          history={history}
          location={location}
        />
      </ReactRouterDOM.BrowserRouter>,
    ).find('button')
      .at(0)
      .simulate('click');

    expect(history.push).toHaveReturnedWith('/bundle/?bundleID=1337');
  });
});
