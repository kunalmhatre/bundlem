import { fromJS } from 'immutable';
import {
  selectRobotDomain,
  makeSelectIsVerifyingToken,
  makeSelectIsPublishingBundle,
  makeSelectIsBundlePublished,
  makeSelectBundleID,
  makeSelectError,
} from '../selectors';

describe('Robot selectors', () => {
  const mockedState = fromJS({
    robot: {
      isVerifyingToken: false,
      isPublishingBundle: false,
      isBundlePublished: true,
      bundleID: 1337,
      error: null,
    },
  });

  describe('selectRobotDomain', () => {
    it('should select the robot domain from the state', () => {
      expect(
        selectRobotDomain(mockedState),
      ).toEqual(mockedState.get('robot'));
    });
  });

  describe('makeSelectIsVerifyingToken', () => {
    it('should select the isVerifyingToken from the state', () => {
      expect(
        makeSelectIsVerifyingToken()(mockedState),
      ).toEqual(mockedState.getIn(['robot', 'isVerifyingToken']));
    });
  });

  describe('makeSelectIsPublishingBundle', () => {
    it('should select the isPublishingBundle from the state', () => {
      expect(
        makeSelectIsPublishingBundle()(mockedState),
      ).toEqual(mockedState.getIn(['robot', 'isPublishingBundle']));
    });
  });

  describe('makeSelectIsBundlePublished', () => {
    it('should select the isBundlePublished from the state', () => {
      expect(
        makeSelectIsBundlePublished()(mockedState),
      ).toEqual(mockedState.getIn(['robot', 'isBundlePublished']));
    });
  });

  describe('makeSelectBundleID', () => {
    it('should select the bundleID from the state', () => {
      expect(
        makeSelectBundleID()(mockedState),
      ).toEqual(mockedState.getIn(['robot', 'bundleID']));
    });
  });

  describe('makeSelectError', () => {
    it('should select the error from the state', () => {
      expect(
        makeSelectError()(mockedState),
      ).toEqual(mockedState.getIn(['robot', 'error']));
    });
  });
});
