/*
 *
 * Robot actions
 *
 */

import { TOKEN_VERIFICATION_INITIATED, RESET_ROBOT_DOMAIN } from './constants';

export function verifyTokenAction(token) {
  return {
    token,
    type: TOKEN_VERIFICATION_INITIATED,
  };
}

export function resetRobotDomainAction() {
  return {
    type: RESET_ROBOT_DOMAIN,
  };
}
