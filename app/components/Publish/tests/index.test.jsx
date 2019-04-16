import React from 'react';

import createComponentWithIntl from '../../../../internals/testing/createComponentWithIntl';
import Publish from '../index';

describe('<Publish />', () => {
  it('renders old snapshot', () => {
    expect(
      createComponentWithIntl(
        <Publish />,
      ).toJSON(),
    ).toMatchSnapshot();
  });
});
