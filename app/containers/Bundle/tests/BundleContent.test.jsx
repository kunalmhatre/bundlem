import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import BundleInfo from '../../../components/BundleInfo';
import BundleContent from '../BundleContent';
import { mountWithIntl } from '../../../../internals/testing/reactIntlHelperFunction';

describe('<BundleContent />', () => {
  it('calls fetchBundle when bundleID is provided as a URL parameter', () => {
    const testBundleID = '1337';
    const location = {
      search: `?bundleID=${testBundleID}`,
    };
    const fetchBundle = jest.fn(bundleID => bundleID);

    mountWithIntl(
      <BrowserRouter>
        <BundleContent
          isFetchingBundle={false}
          setBundle={() => null}
          fetchBundle={fetchBundle}
          location={location}
        />
      </BrowserRouter>,
    );

    expect(fetchBundle).toHaveReturnedWith(testBundleID);
  });

  it('shows bundle data when provided with one', () => {
    const location = {
      search: '',
    };
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
          <BundleContent
            isFetchingBundle={false}
            setBundle={() => null}
            fetchBundle={() => null}
            location={location}
            bundle={bundle}
          />
        </BrowserRouter>,
      ).find(BundleInfo)
        .length,
    ).toBe(1);
  });

  it('shows fetching messages', () => {
    const location = {
      search: '',
    };

    expect(
      mountWithIntl(
        <BrowserRouter>
          <BundleContent
            isFetchingBundle
            setBundle={() => null}
            fetchBundle={() => null}
            location={location}
          />
        </BrowserRouter>,
      ).find('div.bundle-fetching-message')
        .length,
    ).toBe(1);
  });

  it('shows error messages', () => {
    const location = {
      search: '',
    };
    const error = 'error404';

    expect(
      mountWithIntl(
        <BrowserRouter>
          <BundleContent
            isFetchingBundle={false}
            setBundle={() => null}
            fetchBundle={() => null}
            location={location}
            error={error}
          />
        </BrowserRouter>,
      ).find('div.bundle-fetching-error')
        .length,
    ).toBe(1);
  });
});
