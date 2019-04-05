import React from 'react';
import numeral from 'numeral';

import { mountWithIntl } from '../../../../internals/testing/reactIntlHelperFunction';
import BundleCard from '../index';

describe('<BundleCard />', () => {
  const testProps = {
    bundleID: 1337,
    bundleTitle: 'testTitle',
    resourcesCount: 1000,
  };

  it('renders card with correct link for bundle title', () => {
    expect(
      mountWithIntl(
        <BundleCard {...testProps} />,
      ).find('div.bundle-card-title a')
        .prop('href'),
    ).toBe(`https://bundlem.in/bundle/${testProps.bundleID}`);
  });

  it('renders card with no link for bundle title', () => {
    expect(
      mountWithIntl(
        <BundleCard
          {...testProps}
          clickable={false}
        />,
      ).find('div.bundle-card-title a')
        .prop('href'),
    ).toBe(null);
  });

  it('renders card with correct link for view action', () => {
    expect(
      mountWithIntl(
        <BundleCard {...testProps} />,
      ).find('div.bundle-card-actions a')
        .prop('href'),
    ).toBe(`https://bundlem.in/bundle/${testProps.bundleID}`);
  });

  it('renders card with no link for view action', () => {
    expect(
      mountWithIntl(
        <BundleCard
          {...testProps}
          clickable={false}
        />,
      ).find('div.bundle-card-actions a')
        .prop('href'),
    ).toBe(null);
  });

  it('renders card with correct title', () => {
    expect(
      mountWithIntl(
        <BundleCard {...testProps} />,
      ).find('div.bundle-card-title a')
        .text(),
    ).toBe(testProps.bundleTitle);
  });

  it('renders card with correct number of resources', () => {
    expect(
      mountWithIntl(
        <BundleCard {...testProps} />,
      ).find('div.bundle-card-actions > div:first-child > span:first-child')
        .text(),
    ).toBe(numeral(testProps.resourcesCount).format('0a'));
  });
});
