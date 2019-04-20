import React from 'react';
import messages from '../messages';
import Form from '../Form';
import { mountWithIntl } from '../../../utils/reactIntlHelperFunction';

describe('<Form />', () => {
  describe('setBundle', () => {
    const bundle = {
      id: 1337,
      title: 'testTitle',
      description: 'testDescription',
      resources: [
        {
          title: 'testTitle',
          notes: 'testNotes',
          link: 'https://google.com',
          resourceType: 'WEB PAGE',
        },
      ],
    };
    const setBundle = jest.fn(fetchedBundle => fetchedBundle);
    const tree = mountWithIntl(
      <Form setBundle={setBundle} />,
    );
    const bundleIDField = tree.find('input#bundle-id');

    bundleIDField.simulate(
      'change',
      {
        target: {
          name: 'bundleID',
          value: '1337',
        },
      },
    );
    bundleIDField.simulate('blur');

    it('setBundle is called after fetching the bundle', async () => {
      global.fetch = jest
        .fn()
        .mockImplementation(() => ({
          status: 200,
          json: () => Promise.resolve({ bundle }),
        }));

      tree
        .update()
        .find('button')
        .simulate('click');

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(setBundle).toHaveReturnedWith(bundle);
    });
  });

  describe('API error while fetching bundle', () => {
    const setBundle = jest.fn(fetchedBundle => fetchedBundle);
    const tree = mountWithIntl(
      <Form setBundle={setBundle} />,
    );
    const bundleIDField = tree.find('input#bundle-id');

    bundleIDField.simulate(
      'change',
      {
        target: {
          name: 'bundleID',
          value: '1337',
        },
      },
    );
    bundleIDField.simulate('blur');

    it('does not call setBundle due to API error', async () => {
      global.fetch = jest
        .fn()
        .mockImplementation(() => ({ status: 404 }));

      tree
        .update()
        .find('button')
        .simulate('click');

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(setBundle).not.toHaveBeenCalled();
    });
  });

  describe('Bundle ID field', () => {
    const tree = mountWithIntl(
      <Form setBundle={() => null} />,
    );
    const bundleIDField = tree.find('input#bundle-id');

    bundleIDField.simulate(
      'change',
      {
        target: {
          name: 'bundleID',
          value: 'test',
        },
      },
    );
    bundleIDField.simulate('blur');

    it('shows error when bundle ID is non-numeric', async () => {
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(
        tree
          .update()
          .find('div.input-error-message')
          .text(),
      ).toBe(messages.errorBundleIDInvalid.defaultMessage);
    });
  });
});
