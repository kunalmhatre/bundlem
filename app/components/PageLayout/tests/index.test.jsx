import React from 'react';

import { mountWithIntl } from '../../../../internals/testing/reactIntlHelperFunction';
import PageLayout from '../index';
import Header from '../../Header';

describe('<PageLayout />', () => {
  const TestComponent = () => <div />;

  it('renders <Header /> component', () => {
    expect(
      mountWithIntl(
        <PageLayout setHeader>
          <TestComponent />
        </PageLayout>,
      ).find('Header')
        .length,
    ).toBe(1);
  });

  it('renders <section /> component', () => {
    expect(
      mountWithIntl(
        <PageLayout>
          <TestComponent />
        </PageLayout>,
      ).find('section')
        .length,
    ).toBe(1);
  });

  it('renders child component', () => {
    expect(
      mountWithIntl(
        <PageLayout>
          <TestComponent />
        </PageLayout>,
      ).find(TestComponent)
        .length,
    ).toBe(1);
  });

  it('renders <footer /> component', () => {
    expect(
      mountWithIntl(
        <PageLayout setFooter>
          <TestComponent />
        </PageLayout>,
      ).find('footer')
        .length,
    ).toBe(1);
  });

  it('does not render <Header /> component', () => {
    expect(
      mountWithIntl(
        <PageLayout setHeader={false}>
          <TestComponent />
        </PageLayout>,
      ).find(Header)
        .length,
    ).toBe(0);
  });

  it('does not render <footer /> component', () => {
    expect(
      mountWithIntl(
        <PageLayout setFooter={false}>
          <TestComponent />
        </PageLayout>,
      ).find('footer')
        .length,
    ).toBe(0);
  });
});
