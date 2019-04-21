/*
 *
 * Create reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATE_BUNDLE,
  RESET_CREATE_DOMAIN,
} from './constants';

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
    case RESET_CREATE_DOMAIN:
      return state
        .set('title', '')
        .set('description', '');
    default:
      return state;
  }
}

export default createReducer;
