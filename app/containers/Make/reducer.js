/*
 *
 * Make reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_CURRENT_RESOURCE,
  ADD_RESOURCE,
  REMOVE_RESOURCE,
  RESET_MAKE_DOMAIN,
} from './constants';

export const initialState = fromJS({
  currentResource: 0,
  resources: [],
});

function makeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_RESOURCE:
      return state
        .set('currentResource', action.currentResource);
    case ADD_RESOURCE:
      return state
        .setIn(['resources', action.resourceNumber], action.resource);
    case REMOVE_RESOURCE:
      return state
        .deleteIn(['resources', action.resourceNumber]);
    case RESET_MAKE_DOMAIN:
      return state
        .set('currentResource', 0)
        .set('resources', []);
    default:
      return state;
  }
}

export default makeReducer;
