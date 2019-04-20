import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import history from '../../../utils/history';
import configureStore from '../../../configureStore';
import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';
import Bundle, { mapDispatchToProps } from '../index';
import {
  setBundleAction,
  fetchBundleAction,
} from '../actions';

describe('<Bundle />', () => {
  const store = configureStore({}, history);

  it('renders successfully', () => {
    mountWithIntl(
      <Provider store={store}>
        <BrowserRouter>
          <Bundle />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('dispatches setBundleAction', () => {
    const bundle = {
      id: 1337,
      title: 'testTitle',
      description: 'testDescription',
      resources: [
        {
          title: 'testTitle',
          notes: 'testNotes',
          link: 'https://google.com',
          resourceType: 'WEB PAGE',
        },
      ],
    };
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);

    props.setBundle(bundle);
    expect(dispatch).toHaveBeenCalledWith(
      setBundleAction(bundle),
    );
  });

  it('dispatches fetchBundleAction', () => {
    const bundleID = 1337;

    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);

    props.fetchBundle(bundleID);
    expect(dispatch).toHaveBeenCalledWith(
      fetchBundleAction(bundleID),
    );
  });
});
