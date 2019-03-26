import React from 'react';
import { mountWithIntl } from '../../../reactIntlHelperFunction';

import Header from '../index';

describe('<Header />', () => {
  it('renders header title', () => {
    const headerTitle = {
      id: 'testID',
      defaultMessage: 'testMessage',
    };

    expect(
      mountWithIntl(
        <Header headerTitle={headerTitle} />,
      ).find('span')
        .text(),
    ).toBe('testMessage');
  });

  it('renders default title', () => {
    expect(
      mountWithIntl(
        <Header />,
      ).find('span')
        .text(),
    ).toBe('Bundlem');
  });
});
