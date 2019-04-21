import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import createComponentWithIntl from '../../../utils/createComponentWithIntl';
import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';
import { PublishComponent, mapDispatchToProps } from '../index';
import { resetCreateDomainAction } from '../../../containers/Create/actions';
import { resetMakeDomainAction } from '../../../containers/Make/actions';
import { resetRobotDomainAction } from '../../../containers/Robot/actions';

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
          <PublishComponent
            resetCreateDomain={() => null}
            resetMakeDomain={() => null}
            resetRobotDomain={() => null}
            location={location}
          />
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
          <PublishComponent
            resetCreateDomain={() => null}
            resetMakeDomain={() => null}
            resetRobotDomain={() => null}
            location={testLocation}
          />
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
          resetCreateDomain={() => null}
          resetMakeDomain={() => null}
          resetRobotDomain={() => null}
          history={history}
          location={location}
        />
      </ReactRouterDOM.BrowserRouter>,
    ).find('button')
      .at(0)
      .simulate('click');

    expect(history.push).toHaveReturnedWith('/bundle/?bundleID=1337');
  });

  describe('dispatches correct actions', () => {
    let dispatch;
    let props;

    beforeEach(() => {
      dispatch = jest.fn();
      props = mapDispatchToProps(dispatch);
    });

    it('dispatches resetCreateDomainAction', () => {
      props.resetCreateDomain();
      expect(dispatch).toHaveBeenCalledWith(resetCreateDomainAction());
    });

    it('dispatches resetMakeDomainAction', () => {
      props.resetMakeDomain();
      expect(dispatch).toHaveBeenCalledWith(resetMakeDomainAction());
    });

    it('dispatches resetRobotDomainAction', () => {
      props.resetRobotDomain();
      expect(dispatch).toHaveBeenCalledWith(resetRobotDomainAction());
    });
  });
});
