import React from 'react';

import createComponentWithIntl from '../../../utils/createComponentWithIntl';
import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';
import ResourceInfo from '../index';

describe('<ResourceInfo />', () => {
  it('renders old snapshot', () => {
    expect(
      createComponentWithIntl(
        <ResourceInfo />,
      ).toJSON(),
    ).toMatchSnapshot();
  });

  it('shows resource notes when provided with one', () => {
    const testNotes = 'testNotes';

    expect(
      mountWithIntl(
        <ResourceInfo resourceNotes={testNotes} />,
      ).find('div.resource-info-notes')
        .text(),
    ).toBe(testNotes);
  });

  it('shows resource title when provided with one', () => {
    const testCount = 1;
    const testTitle = 'testTitle';

    expect(
      mountWithIntl(
        <ResourceInfo
          resourceCount={testCount}
          resourceTitle={testTitle}
        />,
      ).find('div.resource-info-title')
        .text(),
    ).toBe(`${testCount}. ${testTitle}`);
  });

  it('resource action is functional', () => {
    const testLink = 'https://google.com';
    window.open = jest.fn(resourceLink => resourceLink);

    mountWithIntl(
      <ResourceInfo resourceLink={testLink} />,
    ).find('div.resource-info-action button')
      .simulate('click');

    expect(window.open).toHaveReturnedWith(testLink);
  });

  it('calls default onLoad handler', () => {
    mountWithIntl(
      <ResourceInfo />,
    ).find('div.resource-info')
      .simulate('load');
  });
});
