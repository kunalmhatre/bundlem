import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import history from '../../../utils/history';
import configureStore from '../../../configureStore';
import { mountWithIntl } from '../../../../internals/testing/reactIntlHelperFunction';
import Robot, { mapDispatchToProps } from '../index';
import verifyTokenAction from '../actions';

describe('<Robot />', () => {
  const store = configureStore({}, history);

  it('renders successfully', () => {
    mountWithIntl(
      <Provider store={store}>
        <BrowserRouter>
          <Robot />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('dispatches verifyTokenAction', () => {
    const token = 'testToken';
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);

    props.verifyToken(token);
    expect(dispatch).toHaveBeenCalledWith(
      verifyTokenAction(token),
    );
  });
});
