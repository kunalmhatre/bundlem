import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { mountWithIntl } from '../../../../internals/testing/reactIntlHelperFunction';
import PageLayout from '../index';
import Header from '../../Header';

describe('<PageLayout />', () => {
  const TestComponent = () => <div />;

  it('renders <Header /> component', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <PageLayout setHeader>
            <TestComponent />
          </PageLayout>
        </BrowserRouter>,
      ).find('Header')
        .length,
    ).toBe(1);
  });

  it('renders <section /> component', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <PageLayout>
            <TestComponent />
          </PageLayout>
        </BrowserRouter>,
      ).find('section')
        .length,
    ).toBe(1);
  });

  it('renders child component', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <PageLayout>
            <TestComponent />
          </PageLayout>
        </BrowserRouter>,
      ).find(TestComponent)
        .length,
    ).toBe(1);
  });

  it('renders <footer /> component', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <PageLayout setFooter>
            <TestComponent />
          </PageLayout>
        </BrowserRouter>,
      ).find('footer')
        .length,
    ).toBe(1);
  });

  it('does not render <Header /> component', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <PageLayout setHeader={false}>
            <TestComponent />
          </PageLayout>
        </BrowserRouter>,
      ).find(Header)
        .length,
    ).toBe(0);
  });

  it('does not render <footer /> component', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <PageLayout setFooter={false}>
            <TestComponent />
          </PageLayout>
        </BrowserRouter>,
      ).find('footer')
        .length,
    ).toBe(0);
  });
});
