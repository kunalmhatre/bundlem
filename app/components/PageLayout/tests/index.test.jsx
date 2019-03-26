import React from 'react';
import { mount } from 'enzyme';

import PageLayout from '../index';

describe('<PageLayout />', () => {
  it('renders <header /> component', () => {
    expect(
      mount(
        <PageLayout setHeader />,
      ).find('header')
        .length,
    ).toBe(1);
  });

  it('renders <section /> component', () => {
    expect(
      mount(
        <PageLayout />,
      ).find('section')
        .length,
    ).toBe(1);
  });

  it('renders child component', () => {
    const TestComponent = () => <div />;

    expect(
      mount(
        <PageLayout>
          <TestComponent />
        </PageLayout>,
      ).find(TestComponent)
        .length,
    ).toBe(1);
  });

  it('renders <footer /> component', () => {
    expect(
      mount(
        <PageLayout setFooter />,
      ).find('footer')
        .length,
    ).toBe(1);
  });

  it('does not render <header /> component', () => {
    expect(
      mount(
        <PageLayout setHeader={false} />,
      ).find('header')
        .length,
    ).toBe(0);
  });

  it('does not render <footer /> component', () => {
    expect(
      mount(
        <PageLayout setFooter={false} />,
      ).find('footer')
        .length,
    ).toBe(0);
  });
});
