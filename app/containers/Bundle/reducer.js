/*
 *
 * Bundle reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_BUNDLE,
  FETCH_BUNDLE,
  FETCH_BUNDLE_SUCCESS,
  FETCH_BUNDLE_FAILED,
} from './constants';

export const initialState = fromJS({
  bundle: null,
  isFetchingBundle: false,
  error: null,
});

function bundleReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BUNDLE:
      return state
        .set('error', null)
        .set('bundle', action.bundle);
    case FETCH_BUNDLE:
      return state
        .set('error', null)
        .set('isFetchingBundle', true);
    case FETCH_BUNDLE_SUCCESS:
      return state
        .set('isFetchingBundle', false)
        .set('bundle', action.bundle);
    case FETCH_BUNDLE_FAILED:
      return state
        .set('isFetchingBundle', false)
        .set('error', action.error);
    default:
      return state;
  }
}

export default bundleReducer;
