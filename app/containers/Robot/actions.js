/*
 *
 * Robot actions
 *
 */

import { TOKEN_VERIFICATION_INITIATED } from './constants';

export default function verifyTokenAction(token) {
  return {
    token,
    type: TOKEN_VERIFICATION_INITIATED,
  };
}
