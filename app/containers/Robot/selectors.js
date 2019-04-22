import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the robot state domain
 */

const selectRobotDomain = state => state.get('robot', initialState);

/**
 * Other specific selectors
 */

const makeSelectIsVerifyingToken = () => createSelector(
  selectRobotDomain,
  substate => substate.get('isVerifyingToken'),
);

const makeSelectIsPublishingBundle = () => createSelector(
  selectRobotDomain,
  substate => substate.get('isPublishingBundle'),
);

const makeSelectIsBundlePublished = () => createSelector(
  selectRobotDomain,
  substate => substate.get('isBundlePublished'),
);

const makeSelectError = () => createSelector(
  selectRobotDomain,
  substate => substate.get('error'),
);

const makeSelectBundleID = () => createSelector(
  selectRobotDomain,
  substate => substate.get('bundleID'),
);

export {
  selectRobotDomain,
  makeSelectIsVerifyingToken,
  makeSelectIsPublishingBundle,
  makeSelectIsBundlePublished,
  makeSelectError,
  makeSelectBundleID,
};
