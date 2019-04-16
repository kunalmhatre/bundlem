import React from 'react';

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
    mountWithIntl(<RobotContent {...defaultProps} />);
  });

  it('renders Publish component after publishing bundle', () => {
    expect(
      mountWithIntl(
        <RobotContent
          {...defaultProps}
          isBundlePublished
        />,
      ).find(Publish)
        .length,
    ).toBe(1);
  });

  it('renders RobotMessage while token verification is in progress', () => {
    expect(
      mountWithIntl(
        <RobotContent
          {...defaultProps}
          isVerifyingToken
        />,
      ).find(RobotMessage)
        .props()
        .message,
    ).toBe(messages.verifyingToken);
  });

  it('renders RobotMessage while publishing bundle', () => {
    expect(
      mountWithIntl(
        <RobotContent
          {...defaultProps}
          isPublishingBundle
        />,
      ).find(RobotMessage)
        .props()
        .message,
    ).toBe(messages.publishingBundle);
  });

  it('renders RobotMessage when there is an API error', () => {
    expect(
      mountWithIntl(
        <RobotContent
          {...defaultProps}
          error="error500"
        />,
      ).find(RobotMessage)
        .props()
        .message,
    ).toBe(messages.error500);
  });
});
