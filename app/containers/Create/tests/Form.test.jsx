import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import messages from '../messages';
import Form from '../Form';
import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';

describe('<Form />', () => {
  const onSubmit = jest.fn((title, description) => ({ title, description }));
  const expected = {
    title: 'testTitle',
    description: 'testDescription',
  };

  it('calls onSubmit with correct title and description', () => {
    mountWithIntl(
      <BrowserRouter>
        <Form
          title={expected.title}
          description={expected.description}
          onSubmit={onSubmit}
        />
      </BrowserRouter>,
    ).find('button')
      .simulate('click');

    expect(onSubmit).toHaveReturnedWith(expected);
  });

  it('calls default on submit handler when none is provided', () => {
    mountWithIntl(
      <BrowserRouter>
        <Form
          title={expected.title}
          description={expected.description}
        />
      </BrowserRouter>,
    ).find('button')
      .simulate('click');
  });

  describe('Title input', () => {
    const tree = mountWithIntl(
      <BrowserRouter>
        <Form />
      </BrowserRouter>,
    );
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
          .at(0)
          .find('span')
          .text(),
      ).toBe(messages.errorTitleLength.defaultMessage);
    });
  });

  describe('Description input', () => {
    const tree = mountWithIntl(
      <BrowserRouter>
        <Form />
      </BrowserRouter>,
    );
    const titleField = tree.find('input#title');
    const descriptionField = tree.find('input#description');

    titleField.simulate('blur');
    descriptionField.simulate(
      'change',
      {
        target: {
          name: 'description',
          value: 'TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTT',
        },
      },
    );
    descriptionField.simulate('blur');

    it('shows error when no title is provided', async () => {
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(
        tree
          .update()
          .find('div.input-error-message')
          .at(0)
          .find('span')
          .text(),
      ).toBe(messages.errorTitleEmpty.defaultMessage);
    });

    it('shows error when description contains more than 320 characters', async () => {
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(
        tree
          .update()
          .find('div.input-error-message')
          .at(1)
          .find('span')
          .text(),
      ).toBe(messages.errorDescriptionLength.defaultMessage);
    });
  });
});
