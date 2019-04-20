import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import RobotContent from '../RobotContent';
import Publish from '../../../components/Publish';
import RobotMessage from '../RobotMessage';
import messages from '../messages';
import { mountWithIntl } from '../../../../internals/testing/reactIntlHelperFunction';

describe('<RobotContent />', () => {
  const defaultProps = {
    isVerifyingToken: false,
    isPublishingBundle: false,
    isBundlePublished: false,
    verifyToken: () => null,
  };

  it('renders successfully', () => {
    mountWithIntl(
      <BrowserRouter>
        <RobotContent {...defaultProps} />
      </BrowserRouter>,
    );
  });

  it('renders Publish component after publishing bundle', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <RobotContent
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
          <RobotContent
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
          <RobotContent
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
          <RobotContent
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
