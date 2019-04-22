import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';
import Header from '../index';

describe('<Header />', () => {
  it('renders header title', () => {
    const headerTitle = {
      id: 'testID',
      defaultMessage: 'testMessage',
    };

    expect(
      mountWithIntl(
        <BrowserRouter>
          <Header headerTitle={headerTitle} />
        </BrowserRouter>,
      ).find('span')
        .text(),
    ).toBe('testMessage');
  });

  it('renders default title', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <Header />
        </BrowserRouter>,
      ).find('span')
        .text(),
    ).toBe('Bundlem');
  });

  it('renders title in string format', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <Header
            setString
            headerTitleString="testTitle"
          />
        </BrowserRouter>,
      ).find('header')
        .text(),
    ).toBe('testTitle');
  });

  it('does not redirects to / when homeRedirection is set to false', () => {
    expect(
      mountWithIntl(
        <BrowserRouter>
          <Header homeRedirection={false} />
        </BrowserRouter>,
      ).find(Link)
        .length,
    ).toBe(0);
  });
});
