import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Col } from 'antd';

import BundleInfo from '../../../components/BundleInfo';
import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';
import { mapDispatchToProps, BundleComponent } from '../index';
import {
  setBundleAction,
  fetchBundleAction,
} from '../actions';

describe('<Bundle />', () => {
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

describe('<BundleComponent />', () => {
  const testBundleID = '1337';
  const match = {
    params: { bundleID: testBundleID },
  };

  it('calls fetchBundle when bundleID is provided as a URL parameter', () => {
    const fetchBundle = jest.fn(bundleID => bundleID);

    mountWithIntl(
      <BrowserRouter>
        <BundleComponent
          isFetchingBundle={false}
          setBundle={() => null}
          fetchBundle={fetchBundle}
          match={match}
        />
      </BrowserRouter>,
    );

    expect(fetchBundle).toHaveReturnedWith(testBundleID);
  });

  it('shows bundle data when provided with one', () => {
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

    expect(
      mountWithIntl(
        <BrowserRouter>
          <BundleComponent
            isFetchingBundle={false}
            setBundle={() => null}
            fetchBundle={() => null}
            match={match}
            bundle={bundle}
          />
        </BrowserRouter>,
      ).find(BundleInfo)
        .length,
    ).toBe(1);
  });

  it('shows fetching messages', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <BundleComponent
            isFetchingBundle
            setBundle={() => null}
            fetchBundle={() => null}
            match={match}
          />
        </BrowserRouter>,
      ).find('div.bundle-fetching-message')
        .length,
    ).toBe(1);
  });

  it('shows error messages', () => {
    const error = 'error404';

    expect(
      mountWithIntl(
        <BrowserRouter>
          <BundleComponent
            isFetchingBundle={false}
            setBundle={() => null}
            fetchBundle={() => null}
            match={match}
            error={error}
          />
        </BrowserRouter>,
      ).find('div.bundle-fetching-error')
        .length,
    ).toBe(1);
  });

  it('renders only search box when redirected to /bundle/search', () => {
    const testMatch = {
      params: {
        bundleID: 'search',
      },
    };

    expect(
      mountWithIntl(
        <BrowserRouter>
          <BundleComponent
            isFetchingBundle={false}
            setBundle={() => null}
            fetchBundle={() => null}
            match={testMatch}
          />
        </BrowserRouter>,
      ).find(Col)
        .at(2)
        .props()
        .span,
    ).toBe(24);
  });
});
