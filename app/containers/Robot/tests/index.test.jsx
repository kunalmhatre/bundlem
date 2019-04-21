import React from 'react';
import { Provider } from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';

import history from '../../../utils/history';
import configureStore from '../../../configureStore';
import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';
import Robot, { mapDispatchToProps, RobotComponent } from '../index';
import verifyTokenAction from '../actions';
import messages from '../messages';
import RobotMessage from '../RobotMessage';

describe('<Robot />', () => {
  const store = configureStore({}, history);

  it('renders successfully', () => {
    mountWithIntl(
      <Provider store={store}>
        <ReactRouterDOM.BrowserRouter>
          <Robot />
        </ReactRouterDOM.BrowserRouter>
      </Provider>,
    );
  });

  it('dispatches verifyTokenAction', () => {
    const token = 'testToken';
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);

    props.verifyToken(token);
    expect(dispatch).toHaveBeenCalledWith(
      verifyTokenAction(token),
    );
  });
});

describe('<RobotComponent />', () => {
  const defaultProps = {
    isVerifyingToken: false,
    isPublishingBundle: false,
    isBundlePublished: false,
    verifyToken: () => null,
  };

  it('renders successfully', () => {
    mountWithIntl(
      <ReactRouterDOM.BrowserRouter>
        <RobotComponent {...defaultProps} />
      </ReactRouterDOM.BrowserRouter>,
    );
  });

  it('redirects to Publish page after publishing bundle', () => {
    const bundleID = 1337;
    ReactRouterDOM.Redirect = jest
      .fn()
      .mockImplementation(() => null);
    expect(
      mountWithIntl(
        <ReactRouterDOM.BrowserRouter>
          <RobotComponent
            {...defaultProps}
            isBundlePublished
            bundleID={bundleID}
          />
        </ReactRouterDOM.BrowserRouter>,
      ).find(ReactRouterDOM.Redirect)
        .props()
        .to,
    ).toEqual({
      pathname: '/publish',
      state: { bundleID },
    });
  });

  it('renders RobotMessage while token verification is in progress', () => {
    expect(
      mountWithIntl(
        <ReactRouterDOM.BrowserRouter>
          <RobotComponent
            {...defaultProps}
            isVerifyingToken
          />
        </ReactRouterDOM.BrowserRouter>,
      ).find(RobotMessage)
        .props()
        .message,
    ).toBe(messages.verifyingToken);
  });

  it('renders RobotMessage while publishing bundle', () => {
    expect(
      mountWithIntl(
        <ReactRouterDOM.BrowserRouter>
          <RobotComponent
            {...defaultProps}
            isPublishingBundle
          />
        </ReactRouterDOM.BrowserRouter>,
      ).find(RobotMessage)
        .props()
        .message,
    ).toBe(messages.publishingBundle);
  });

  it('renders RobotMessage when there is an API error', () => {
    expect(
      mountWithIntl(
        <ReactRouterDOM.BrowserRouter>
          <RobotComponent
            {...defaultProps}
            error="error500"
          />
        </ReactRouterDOM.BrowserRouter>,
      ).find(RobotMessage)
        .props()
        .message,
    ).toBe(messages.error500);
  });
});
