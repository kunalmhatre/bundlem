import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import createComponentWithIntl from '../../../../internals/testing/createComponentWithIntl';
import Publish from '../index';

describe('<Publish />', () => {
  it('renders old snapshot', () => {
    expect(
      createComponentWithIntl(
        <BrowserRouter>
          <Publish />
        </BrowserRouter>,
      ).toJSON(),
    ).toMatchSnapshot();
  });
});
