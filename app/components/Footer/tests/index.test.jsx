import React from 'react';
import { mountWithIntl } from '../../../../internals/testing/reactIntlHelperFunction';

import Footer from '../index';

describe('<Footer />', () => {
  it('renders 4 default items', () => {
    expect(
      mountWithIntl(
        <Footer />,
      ).find('a')
        .length,
    ).toBe(4);
  });

  it('renders nothing when number of linkTitles and links are unequal', () => {
    const linkTitles = [
      {
        id: 'testID',
        defaultMessage: 'testMessage',
      },
    ];
    const links = [
      '#test-1',
      '#test-2',
    ];

    expect(
      mountWithIntl(
        <Footer
          linkTitles={linkTitles}
          links={links}
        />,
      ).find('a')
        .length,
    ).toBe(0);
  });
});
