/*
 *
 * Robot reducer
 *
 */

import { fromJS } from 'immutable';
import {
  TOKEN_VERIFICATION_INITIATED,
  TOKEN_VERIFICATION_SUCCESSFUL,
  TOKEN_VERIFICATION_FAILED,
  BUNDLE_PUBLISHING_INITIATED,
  BUNDLE_PUBLISHING_SUCCESSFUL,
  BUNDLE_PUBLISHING_FAILED,
  SET_BUNDLE_ID,
} from './constants';

export const initialState = fromJS({
  isVerifyingToken: false,
  isPublishingBundle: false,
  isBundlePublished: false,
  bundleID: null,
  error: null,
});

function robotReducer(state = initialState, action) {
  switch (action.type) {
    case TOKEN_VERIFICATION_INITIATED:
      return state
        .set('error', null)
        .set('isVerifyingToken', true);
    case TOKEN_VERIFICATION_SUCCESSFUL:
      return state
        .set('isVerifyingToken', false);
    case TOKEN_VERIFICATION_FAILED:
      return state
        .set('isVerifyingToken', false)
        .set('error', action.error);
    case BUNDLE_PUBLISHING_INITIATED:
      return state
        .set('error', null)
        .set('isPublishingBundle', true);
    case BUNDLE_PUBLISHING_SUCCESSFUL:
      return state
        .set('isPublishingBundle', false)
        .set('isBundlePublished', true);
    case BUNDLE_PUBLISHING_FAILED:
      return state
        .set('isPublishingBundle', false)
        .set('error', action.error);
    case SET_BUNDLE_ID:
      return state
        .set('bundleID', action.bundleID);
    default:
      return state;
  }
}

export default robotReducer;
