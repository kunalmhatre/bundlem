import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createComponentWithIntl from '../../../utils/createComponentWithIntl';
import history from '../../../utils/history';
import configureStore from '../../../configureStore';
import Create, { mapDispatchToProps } from '../index';
import { createBundleAction } from '../actions';

describe('<Create />', () => {
  const store = configureStore({}, history);

  it('renders old snapshot', () => {
    expect(
      createComponentWithIntl(
        <Provider store={store}>
          <BrowserRouter>
            <Create />
          </BrowserRouter>
        </Provider>,
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
