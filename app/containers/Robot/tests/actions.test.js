import { verifyTokenAction, resetRobotDomainAction } from '../actions';
import { TOKEN_VERIFICATION_INITIATED, RESET_ROBOT_DOMAIN } from '../constants';

describe('Robot actions', () => {
  describe('verifyTokenAction', () => {
    it('should return correct type and passed prop', () => {
      const expected = {
        token: 'testToken',
        type: TOKEN_VERIFICATION_INITIATED,
      };

      expect(verifyTokenAction(expected.token)).toEqual(expected);
    });
  });

  describe('resetRobotDomainAction', () => {
    it('should return correct type', () => {
      const expected = {
        type: RESET_ROBOT_DOMAIN,
      };

      expect(resetRobotDomainAction()).toEqual(expected);
    });
  });
});
