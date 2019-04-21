import { fromJS } from 'immutable';

import {
  setCurrentResourceAction,
  addResourceAction,
  removeResourceAction,
  resetMakeDomainAction,
} from '../actions';
import makeReducer from '../reducer';

describe('makeReducer', () => {
  const state = fromJS({
    currentResource: 0,
    resources: [],
  });

  it('returns the initial state', () => {
    expect(makeReducer(undefined, {})).toEqual(state);
  });

  it('state changed correctly by setCurrentResourceAction', () => {
    const currentResource = 1337;
    const expectedState = state
      .set('currentResource', currentResource);

    expect(
      makeReducer(
        state,
        setCurrentResourceAction(currentResource),
      ),
    ).toEqual(expectedState);
  });

  it('state changed correctly by addResourceAction', () => {
    const resourceNumber = 0;
    const resource = {
      resourceType: 'WEB PAGE',
      link: 'https://google.com',
      title: 'Google',
      notes: 'A good search engine.',
    };
    const expectedState = state
      .setIn(['resources', resourceNumber], fromJS(resource));

    expect(
      makeReducer(
        state,
        addResourceAction(
          resourceNumber,
          resource,
        ),
      ),
    ).toEqual(expectedState);
  });

  it('state changed correctly by removeResourceAction', () => {
    const newState = fromJS({
      currentResource: 2,
      resources: [
        {
          resourceType: 'WEB PAGE',
          link: 'https://google.com',
          title: 'Google',
          notes: 'A good search engine.',
        },
      ],
    });
    const resourceNumber = 0;
    const expectedState = newState
      .deleteIn(['resources', resourceNumber]);

    expect(
      makeReducer(
        newState,
        removeResourceAction(resourceNumber),
      ),
    ).toEqual(expectedState);
  });

  it('state changed correctly by resetMakeDomainAction', () => {
    const testState = fromJS({
      currentResource: 2,
      resources: [
        {
          resourceType: 'WEB PAGE',
          link: 'https://google.com',
          title: 'Google',
          notes: 'A good search engine.',
        },
      ],
    });
    const expectedState = testState
      .set('currentResource', 0)
      .set('resources', []);

    expect(
      makeReducer(
        testState,
        resetMakeDomainAction(),
      ),
    ).toEqual(expectedState);
  });
});
