import React from 'react';
import messages from '../messages';

import Form from '../Form';
import { mountWithIntl } from '../../../../internals/testing/reactIntlHelperFunction';

describe('<Form />', () => {
  it('calls default previousResource when clicked on previous resource button', () => {
    mountWithIntl(<Form currentResource={1} />)
      .find('button')
      .at(0)
      .simulate('click');
  });

  it('calls removeResource when clicked on Remove button', () => {
    const removeResource = jest.fn();

    mountWithIntl(
      <Form
        isAddedResource
        removeResource={removeResource}
      />,
    ).find('button')
      .at(0)
      .simulate('click');

    expect(removeResource).toBeCalled();
  });

  it('calls default removeResource when clicked on Remove button', () => {
    mountWithIntl(<Form isAddedResource />)
      .find('button')
      .at(0)
      .simulate('click');
  });

  describe('Next resource', () => {
    const tree = mountWithIntl(<Form />);
    const resourceTypeField = tree.find('input#radio-input-0');
    const linkField = tree.find('input#link');

    resourceTypeField.simulate(
      'change',
      {
        target: {
          name: 'resourceType',
          value: 'WEB PAGE',
          checked: true,
        },
      },
    );
    resourceTypeField.simulate('blur');

    linkField.simulate(
      'change',
      {
        target: {
          name: 'link',
          value: 'https://google.com',
        },
      },
    );
    linkField.simulate('blur');

    it('calls default nextResource when clicked on next resource button', async () => {
      await new Promise(resolve => setTimeout(resolve, 0));

      tree
        .update()
        .find('button')
        .at(0)
        .simulate('click');
    });
  });

  describe('Title field', () => {
    const tree = mountWithIntl(<Form />);
    const titleField = tree.find('input#title');

    titleField.simulate(
      'change',
      {
        target: {
          name: 'title',
          value: 'TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTT',
        },
      },
    );
    titleField.simulate('blur');

    it('shows error when title contains more than 120 characters', async () => {
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(
        tree
          .update()
          .find('div.input-error-message')
          .find('span')
          .text(),
      ).toBe(messages.errorTitleInputLength.defaultMessage);
    });
  });
});
