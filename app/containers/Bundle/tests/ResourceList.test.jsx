import React from 'react';

import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';
import ResourceList from '../ResourceList';

describe('<ResourceList />', () => {
  const testResources = [
    {
      resourceType: 'WEB PAGE',
      link: 'https://google.com',
      notes: 'testNotes',
      title: 'testTitle 1',
    },
    {
      resourceType: 'WEB PAGE',
      link: 'https://google.com',
      title: 'testTitle 2',
      notes: '',
    },
  ];

  it('renders successfully for desktop or bigger screens', () => {
    const tree = mountWithIntl(
      <ResourceList resources={testResources} />,
    );

    window.innerWidth = 1700;
    window.dispatchEvent(new Event('resize'));

    tree.update();
  });

  it('renders successfully for mobile or smaller screens', async () => {
    const tree = mountWithIntl(
      <ResourceList resources={testResources} />,
    );

    window.innerWidth = 766;
    window.dispatchEvent(new Event('resize'));

    expect(
      tree
        .update()
        .find('section')
        .length,
    ).toBe(1);
  });
});
