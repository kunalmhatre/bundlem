/*
 *
 * Create reducer
 *
 */

import { fromJS } from 'immutable';
import CREATE_BUNDLE from './constants';

export const initialState = fromJS({
  title: '',
  description: '',
});

function createReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_BUNDLE:
      return state
        .set('title', action.title)
        .set('description', action.description);
    default:
      return state;
  }
}

export default createReducer;
