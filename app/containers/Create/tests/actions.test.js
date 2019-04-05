import createBundleAction from '../actions';
import CREATE_BUNDLE from '../constants';

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
});
