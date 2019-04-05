/*
 *
 * Create actions
 *
 */

import CREATE_BUNDLE from './constants';

export default function createBundleAction(title, description) {
  return {
    title,
    description,
    type: CREATE_BUNDLE,
  };
}
