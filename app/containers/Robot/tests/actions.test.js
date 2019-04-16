import verifyTokenAction from '../actions';
import { TOKEN_VERIFICATION_INITIATED } from '../constants';

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
});
