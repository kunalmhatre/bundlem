import React from 'react';

import createComponentWithIntl from '../../../../internals/testing/createComponentWithIntl';
import Welcome from '../index';

describe('<Welcome />', () => {
  it('renders old snapshot', () => {
    expect(
      createComponentWithIntl(
        <Welcome />,
      ).toJSON(),
    ).toMatchSnapshot();
  });
});
