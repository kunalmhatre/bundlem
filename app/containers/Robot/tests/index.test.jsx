import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import history from '../../../utils/history';
import configureStore from '../../../configureStore';
import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';
import Robot, { mapDispatchToProps, RobotComponent } from '../index';
import verifyTokenAction from '../actions';
import messages from '../messages';
import Publish from '../../../components/Publish';
import RobotMessage from '../RobotMessage';

describe('<Robot />', () => {
  const store = configureStore({}, history);

  it('renders successfully', () => {
    mountWithIntl(
      <Provider store={store}>
        <BrowserRouter>
          <Robot />
        </BrowserRouter>
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
      <BrowserRouter>
        <RobotComponent {...defaultProps} />
      </BrowserRouter>,
    );
  });

  it('renders Publish component after publishing bundle', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <RobotComponent
            {...defaultProps}
            isBundlePublished
          />
        </BrowserRouter>,
      ).find(Publish)
        .length,
    ).toBe(1);
  });

  it('renders RobotMessage while token verification is in progress', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <RobotComponent
            {...defaultProps}
            isVerifyingToken
          />
        </BrowserRouter>,
      ).find(RobotMessage)
        .props()
        .message,
    ).toBe(messages.verifyingToken);
  });

  it('renders RobotMessage while publishing bundle', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <RobotComponent
            {...defaultProps}
            isPublishingBundle
          />
        </BrowserRouter>,
      ).find(RobotMessage)
        .props()
        .message,
    ).toBe(messages.publishingBundle);
  });

  it('renders RobotMessage when there is an API error', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <RobotComponent
            {...defaultProps}
            error="error500"
          />
        </BrowserRouter>,
      ).find(RobotMessage)
        .props()
        .message,
    ).toBe(messages.error500);
  });
});
