import { createBundleAction, resetCreateDomainAction } from '../actions';
import { CREATE_BUNDLE, RESET_CREATE_DOMAIN } from '../constants';

describe('Create actions', () => {
  describe('createBundleAction', () => {
    it('should return correct type and passed props', () => {
      const title = 'testTitle';
      const description = 'testDescription';
      const expected = {
        title,
        description,
        type: CREATE_BUNDLE,
      };
      expect(createBundleAction(title, description)).toEqual(expected);
    });
  });

  describe('resetCreateDomainAction', () => {
    it('should return correct type', () => {
      const expected = {
        type: RESET_CREATE_DOMAIN,
      };
      expect(resetCreateDomainAction()).toEqual(expected);
    });
  });
});
