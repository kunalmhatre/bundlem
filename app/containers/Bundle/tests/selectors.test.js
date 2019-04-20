import { fromJS } from 'immutable';
import {
  selectBundleDomain,
  makeSelectBundle,
  makeSelectIsFetchingBundle,
  makeSelectError,
} from '../selectors';

describe('Bundle selectors', () => {
  const mockedState = fromJS({
    bundle: {
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
      isFetchingBundle: false,
      error: null,
    },
  });

  describe('selectBundleDomain', () => {
    it('should select the bundle domain from the state', () => {
      expect(
        selectBundleDomain(mockedState),
      ).toEqual(mockedState.get('bundle'));
    });
  });

  describe('makeSelectBundle', () => {
    it('should select bundle from the state', () => {
      expect(
        makeSelectBundle()(mockedState),
      ).toEqual(mockedState.getIn(['bundle', 'bundle']));
    });
  });

  describe('makeSelectIsFetchingBundle', () => {
    it('should select isFetchingBundle from the state', () => {
      expect(
        makeSelectIsFetchingBundle()(mockedState),
      ).toEqual(mockedState.getIn(['bundle', 'isFetchingBundle']));
    });
  });

  describe('makeSelectError', () => {
    it('should select error from the state', () => {
      expect(
        makeSelectError()(mockedState),
      ).toEqual(mockedState.getIn(['bundle', 'error']));
    });
  });
});
