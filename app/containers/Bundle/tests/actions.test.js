import {
  setBundleAction,
  fetchBundleAction,
} from '../actions';
import {
  SET_BUNDLE,
  FETCH_BUNDLE,
} from '../constants';

describe('Bundle actions', () => {
  describe('setBundleAction', () => {
    it('should return correct type and passed prop', () => {
      const expected = {
        bundle: {
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
        },
        type: SET_BUNDLE,
      };

      expect(setBundleAction(expected.bundle)).toEqual(expected);
    });
  });

  describe('fetchBundleAction', () => {
    it('should return correct type and passed prop', () => {
      const expected = {
        bundleID: 1337,
        type: FETCH_BUNDLE,
      };

      expect(fetchBundleAction(expected.bundleID)).toEqual(expected);
    });
  });
});
