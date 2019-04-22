import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import createComponentWithIntl from '../../../utils/createComponentWithIntl';
import { mapDispatchToProps, CreateComponent } from '../index';
import { createBundleAction } from '../actions';

describe('<Create />', () => {
  it('renders old snapshot', () => {
    expect(
      createComponentWithIntl(
        <BrowserRouter>
          <CreateComponent
            title=""
            description=""
            createBundle={() => null}
          />
        </BrowserRouter>,
      ).toJSON(),
    ).toMatchSnapshot();
  });

  it('dispatches createBundleAction', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const title = 'testTitle';
    const description = 'testDescription';

    props.createBundle(title, description);
    expect(dispatch).toHaveBeenCalledWith(createBundleAction(title, description));
  });
});
