import React from 'react';

import { mountWithIntl } from '../../../../internals/testing/reactIntlHelperFunction';
import Input from '../index';

describe('<Input />', () => {
  const testFM = {
    id: 'testID',
    defaultMessage: 'testMessage',
  };

  it('renders label', () => {
    expect(
      mountWithIntl(
        <Input label={testFM} />,
      ).find('div.input-label span')
        .text(),
    ).toBe('testMessage');
  });

  it('renders placeholder', () => {
    expect(
      mountWithIntl(
        <Input placeholder={testFM} />,
      ).find('input')
        .prop('placeholder'),
    ).toBe('testMessage');
  });

  it('renders error message', () => {
    expect(
      mountWithIntl(
        <Input
          showError
          errorMessage={testFM}
        />,
      ).find('div.input-error-message span')
        .text(),
    ).toBe('testMessage');
  });

  it('calls provided on change handler function', () => {
    const onChange = jest.fn(event => event.target.value);

    mountWithIntl(
      <Input onChange={onChange} />,
    ).find('input')
      .simulate(
        'change',
        {
          target: {
            value: 'testMessage',
          },
        },
      );

    expect(onChange).toHaveReturnedWith('testMessage');
  });

  it('calls default on change handler function', () => {
    mountWithIntl(
      <Input />,
    ).find('input')
      .simulate(
        'change',
        {
          target: {
            value: 'testMessage',
          },
        },
      );
  });

  it('calls default on blur handler function', () => {
    mountWithIntl(
      <Input />,
    ).find('input')
      .simulate('blur');
  });
});
