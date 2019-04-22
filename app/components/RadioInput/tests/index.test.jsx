import React from 'react';
import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';

import RadioInput from '../index';

describe('<RadioInput />', () => {
  const items = [
    {
      id: 'testID1',
      defaultMessage: 'testMessage1',
    },
    {
      id: 'testID2',
      defaultMessage: 'testMessage2',
    },
  ];

  it('renders 2 radio inputs', () => {
    expect(
      mountWithIntl(
        <RadioInput items={items} />,
      ).find('input')
        .length,
    ).toBe(2);
  });

  it('calls on change handler', () => {
    const onChange = jest.fn(event => event.target.value);

    mountWithIntl(
      <RadioInput
        items={items}
        onChange={onChange}
      />,
    ).find('input')
      .at(0)
      .simulate(
        'change',
        {
          target: {
            checked: true,
            value: items[0].defaultMessage,
          },
        },
      );

    expect(onChange).toHaveReturnedWith('testMessage1');
  });

  it('calls default on change handler when none is provided', () => {
    mountWithIntl(
      <RadioInput items={items} />,
    ).find('input')
      .at(0)
      .simulate(
        'change',
        {
          target: {
            checked: true,
          },
        },
      );
  });

  it('calls default on blur handler function', () => {
    mountWithIntl(
      <RadioInput items={items} />,
    ).find('input')
      .at(0)
      .simulate('blur');
  });

  it('shows correct error message', () => {
    expect(
      mountWithIntl(
        <RadioInput
          showError
          items={items}
          errorMessage={items[1]}
        />,
      ).find('div.radio-input-error-message')
        .text(),
    ).toBe(items[1].defaultMessage);
  });
});
