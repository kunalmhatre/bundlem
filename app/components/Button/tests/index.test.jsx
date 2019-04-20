import React from 'react';

import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';
import Button from '../index';

describe('<Button />', () => {
  it('renders with given text', () => {
    const text = {
      id: 'testID',
      defaultMessage: 'testMessage',
    };

    expect(
      mountWithIntl(
        <Button text={text} />,
      ).find('span')
        .text(),
    ).toBe('testMessage');
  });

  it('renders with block style', () => {
    expect(
      mountWithIntl(
        <Button size="block" />,
      ).find('button')
        .hasClass('button-block'),
    ).toBe(true);
  });

  it('renders with block style', () => {
    expect(
      mountWithIntl(
        <Button highlight={false} />,
      ).find('button')
        .hasClass('theme-blue'),
    ).toBe(true);
  });

  it('calls provided on click handler function', () => {
    const onClick = jest.fn();

    mountWithIntl(
      <Button onClick={onClick} />,
    ).find('button')
      .simulate('click');

    expect(onClick).toBeCalled();
  });

  it('calls default on click handler function', () => {
    mountWithIntl(
      <Button />,
    ).find('button')
      .simulate('click');
  });
});
