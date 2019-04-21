import { fromJS } from 'immutable';

import {
  setCurrentResourceAction,
  addResourceAction,
  removeResourceAction,
  resetMakeDomainAction,
} from '../actions';
import {
  SET_CURRENT_RESOURCE,
  ADD_RESOURCE,
  REMOVE_RESOURCE,
  RESET_MAKE_DOMAIN,
} from '../constants';

describe('Make actions', () => {
  describe('setCurrentResourceAction', () => {
    it('should return correct type and passed props', () => {
      const expected = {
        currentResource: 1337,
        type: SET_CURRENT_RESOURCE,
      };

      expect(setCurrentResourceAction(expected.currentResource)).toEqual(expected);
    });
  });

  describe('addResourceAction', () => {
    it('should return correct type and passed props', () => {
      const resource = {
        resourceType: 'WEB PAGE',
        link: 'https://google.com',
        title: 'Google',
        notes: 'A good search engine.',
      };
      const expected = {
        resourceNumber: 1337,
        resource: fromJS(resource),
        type: ADD_RESOURCE,
      };

      expect(addResourceAction(expected.resourceNumber, resource)).toEqual(expected);
    });
  });

  describe('removeResourceAction', () => {
    it('should return correct type and passed props', () => {
      const expected = {
        resourceNumber: 1337,
        type: REMOVE_RESOURCE,
      };

      expect(removeResourceAction(expected.resourceNumber)).toEqual(expected);
    });
  });

  describe('resetMakeDomainAction', () => {
    it('should return correct type', () => {
      const expected = { type: RESET_MAKE_DOMAIN };

      expect(resetMakeDomainAction()).toEqual(expected);
    });
  });
});
