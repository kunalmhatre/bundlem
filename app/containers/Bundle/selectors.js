import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the bundle state domain
 */

const selectBundleDomain = state => state.get('bundle', initialState);

/**
 * Other specific selectors
 */

const makeSelectBundle = () => createSelector(selectBundleDomain, substate => substate.get('bundle'));

const makeSelectIsFetchingBundle = () => createSelector(selectBundleDomain, substate => substate.get('isFetchingBundle'));

const makeSelectError = () => createSelector(selectBundleDomain, substate => substate.get('error'));

export {
  selectBundleDomain,
  makeSelectBundle,
  makeSelectIsFetchingBundle,
  makeSelectError,
};
