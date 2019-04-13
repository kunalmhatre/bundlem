import { fromJS } from 'immutable';
import {
  selectMakeDomain,
  makeSelectCurrentResource,
  makeSelectResources,
} from '../selectors';

describe('Create selectors', () => {
  const mockedState = fromJS({
    make: {
      currentResource: 1,
      resources: [
        {
          resourceType: 'WEB PAGE',
          link: 'https://google.com',
          title: 'Google',
          notes: 'A good search engine.',
        },
      ],
    },
  });

  describe('selectMakeDomain', () => {
    it('should select the make domain from the state', () => {
      expect(
        selectMakeDomain(mockedState),
      ).toEqual(mockedState.get('make'));
    });
  });

  describe('makeSelectCurrentResource', () => {
    it('should select the currentResource from the state', () => {
      expect(
        makeSelectCurrentResource()(mockedState),
      ).toEqual(mockedState.getIn(['make', 'currentResource']));
    });
  });

  describe('makeSelectResources', () => {
    it('should select the resources from the state', () => {
      expect(
        makeSelectResources()(mockedState),
      ).toEqual(mockedState.getIn(['make', 'resources']).toJS());
    });
  });
});
