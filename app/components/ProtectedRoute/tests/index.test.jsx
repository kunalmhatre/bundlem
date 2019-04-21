import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';
import { ProtectedRouteComponent } from '../index';

describe('<ProtectedRoute />', () => {
  it('renders Redirect component when title is empty', () => {
    ReactRouterDOM.Redirect = jest.fn(() => null);

    expect(
      mountWithIntl(
        <ReactRouterDOM.BrowserRouter>
          <ProtectedRouteComponent
            title=""
            component={() => null}
          />
        </ReactRouterDOM.BrowserRouter>,
      ).find(ReactRouterDOM.Redirect)
        .length,
    ).toBe(1);
  });

  it('renders component when title is present', () => {
    const TestComponent = () => <div>TestComponent</div>;
    const title = 'testTitle';

    expect(
      mountWithIntl(
        <ReactRouterDOM.BrowserRouter>
          <ProtectedRouteComponent
            title={title}
            component={TestComponent}
          />
        </ReactRouterDOM.BrowserRouter>,
      ).find(TestComponent)
        .length,
    ).toBe(1);
  });
});
