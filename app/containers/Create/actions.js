/*
 *
 * Create actions
 *
 */

import {
  CREATE_BUNDLE,
  RESET_CREATE_DOMAIN,
} from './constants';

export function createBundleAction(title, description) {
  return {
    title,
    description,
    type: CREATE_BUNDLE,
  };
}

export function resetCreateDomainAction() {
  return {
    type: RESET_CREATE_DOMAIN,
  };
}
