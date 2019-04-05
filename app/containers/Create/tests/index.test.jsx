import React from 'react';
import { Provider } from 'react-redux';
import createComponentWithIntl from '../../../../internals/testing/createComponentWithIntl';
import history from '../../../utils/history';
import configureStore from '../../../configureStore';
import Create, { mapDispatchToProps } from '../index';
import createBundleAction from '../actions';

describe('<Create />', () => {
  const store = configureStore({}, history);

  it('renders successfully', () => {
    expect(
      createComponentWithIntl(
        <Provider store={store}>
          <Create />
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
