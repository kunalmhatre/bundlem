import React from 'react';
import numeral from 'numeral';
import { Link, BrowserRouter } from 'react-router-dom';

import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';
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
        <BrowserRouter>
          <BundleCard {...testProps} />
        </BrowserRouter>,
      ).find(Link)
        .at(0)
        .prop('to'),
    ).toBe(`/bundle/${testProps.bundleID}`);
  });

  it('renders card with no link for bundle title', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <BundleCard
            {...testProps}
            clickable={false}
          />
        </BrowserRouter>,
      ).find(Link)
        .length,
    ).toBe(0);
  });

  it('renders card with correct link for view action', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <BundleCard {...testProps} />
        </BrowserRouter>,
      ).find(Link)
        .at(1)
        .prop('to'),
    ).toBe(`/bundle/${testProps.bundleID}`);
  });

  it('renders card with correct title', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <BundleCard {...testProps} />
        </BrowserRouter>,
      ).find(Link)
        .at(0)
        .props()
        .children,
    ).toBe(testProps.bundleTitle);
  });

  it('renders card with correct number of resources', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <BundleCard {...testProps} />
        </BrowserRouter>,
      ).find('div.bundle-card-actions > div:first-child > span:first-child')
        .text(),
    ).toBe(numeral(testProps.resourcesCount).format('0a'));
  });
});
