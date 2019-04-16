import React from 'react';
import { Icon } from 'antd';

import { mountWithIntl } from '../../../../internals/testing/reactIntlHelperFunction';
import RobotMessage from '../RobotMessage';

describe('<RobotMessage />', () => {
  const message = {
    id: 'testMessageID',
    defaultMessage: 'testMessage',
  };

  it('renders successfully', () => {
    mountWithIntl(
      <RobotMessage message={message} />,
    );
  });

  it('shows error message', () => {
    const errorMessage = {
      id: 'testErrorMessageID',
      defaultMessage: 'testErrorMessage',
    };

    expect(
      mountWithIntl(
        <RobotMessage
          isError
          message={errorMessage}
        />,
      ).find('span')
        .text(),
    ).toBe(errorMessage.defaultMessage);
  });

  it('shows message when default props are set', () => {
    expect(
      mountWithIntl(
        <RobotMessage message={message} />,
      ).find('span')
        .text(),
    ).toBe(message.defaultMessage);
  });

  it('shows loader when default props are set', () => {
    expect(
      mountWithIntl(
        <RobotMessage message={message} />,
      ).find(Icon)
        .length,
    ).toBe(1);
  });

  it('does not show loader when isLoading is set to false', () => {
    expect(
      mountWithIntl(
        <RobotMessage
          isLoading={false}
          message={message}
        />,
      ).find(Icon)
        .length,
    ).toBe(0);
  });
});
