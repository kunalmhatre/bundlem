import React from 'react';

import createComponentWithIntl from '../../../utils/createComponentWithIntl';
import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';
import BundleInfo from '../index';

describe('<BundleInfo />', () => {
  const bundleTitle = 'testTitle';
  const resourceCount = 1337;

  it('renders old snapshot', () => {
    expect(
      createComponentWithIntl(
        <BundleInfo
          bundleTitle={bundleTitle}
          resourcesCount={resourceCount}
        />,
      ).toJSON(),
    ).toMatchSnapshot();
  });

  it('shows bundle description when provided with one', () => {
    const testDescription = 'testDescription';

    expect(
      mountWithIntl(
        <BundleInfo
          bundleTitle={bundleTitle}
          resourcesCount={resourceCount}
          bundleDescription={testDescription}
        />,
      ).find('div.bundle-info-description')
        .text(),
    ).toBe(testDescription);
  });
});
