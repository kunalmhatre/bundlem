import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the make state domain
 */

const selectMakeDomain = state => state.get('make', initialState);

/**
 * Other specific selectors
 */

const makeSelectCurrentResource = () => createSelector(
  selectMakeDomain,
  substate => substate.get('currentResource'),
);

const makeSelectResources = () => createSelector(
  selectMakeDomain,
  substate => substate.get('resources').toJS(),
);

export {
  selectMakeDomain,
  makeSelectCurrentResource,
  makeSelectResources,
};
