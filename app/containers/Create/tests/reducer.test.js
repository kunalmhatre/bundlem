import { fromJS } from 'immutable';
import createBundleAction from '../actions';

import createReducer from '../reducer';

describe('createReducer', () => {
  const state = fromJS({
    title: '',
    description: '',
  });

  it('returns the initial state', () => {
    expect(createReducer(undefined, {})).toEqual(state);
  });

  it('state changed correctly by createBundleAction', () => {
    const title = 'testTitle';
    const description = 'testDescription';
    const expectedState = state
      .set('title', title)
      .set('description', description);

    expect(
      createReducer(
        state,
        createBundleAction(
          title,
          description,
        ),
      ),
    ).toEqual(expectedState);
  });
});
