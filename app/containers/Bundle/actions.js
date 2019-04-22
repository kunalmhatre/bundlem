/*
 *
 * Bundle actions
 *
 */

import {
  SET_BUNDLE,
  FETCH_BUNDLE,
} from './constants';

export function setBundleAction(bundle) {
  return {
    bundle,
    type: SET_BUNDLE,
  };
}

export function fetchBundleAction(bundleID) {
  return {
    bundleID,
    type: FETCH_BUNDLE,
  };
}
