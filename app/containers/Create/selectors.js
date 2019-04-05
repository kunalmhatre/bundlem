import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the create state domain
 */

const selectCreateDomain = state => state.get('create', initialState);

/**
 * Other specific selectors
 */

const makeSelectTitle = () => createSelector(
  selectCreateDomain,
  substate => substate.get('title'),
);
const makeSelectDescription = () => createSelector(
  selectCreateDomain,
  substate => substate.get('description'),
);

export {
  selectCreateDomain,
  makeSelectTitle,
  makeSelectDescription,
};
