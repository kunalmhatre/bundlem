import { fromJS } from 'immutable';
import {
  setBundleAction,
  fetchBundleAction,
} from '../actions';
import {
  FETCH_BUNDLE_SUCCESS,
  FETCH_BUNDLE_FAILED,
} from '../constants';
import bundleReducer from '../reducer';

describe('bundleReducer', () => {
  const state = fromJS({
    bundle: null,
    isFetchingBundle: false,
    error: null,
  });

  it('returns the initial state', () => {
    expect(bundleReducer(undefined, {})).toEqual(state);
  });

  it('state changed correctly by setBundleAction', () => {
    const bundle = {
      id: 1337,
      title: 'testTitle',
      description: 'testDescription',
      resources: [
        {
          title: 'testTitle',
          notes: 'testNotes',
          link: 'https://google.com',
          resourceType: 'WEB PAGE',
        },
      ],
    };
    const expectedState = state
      .set('bundle', bundle);

    expect(
      bundleReducer(
        state,
        setBundleAction(bundle),
      ),
    ).toEqual(expectedState);
  });

  it('state changed correctly by fetchBundleAction', () => {
    const bundleID = 1337;
    const expectedState = state
      .set('isFetchingBundle', true);

    expect(
      bundleReducer(
        state,
        fetchBundleAction(bundleID),
      ),
    ).toEqual(expectedState);
  });

  it('state changed correctly by FETCH_BUNDLE_SUCCESS', () => {
    const bundle = {
      id: 1337,
      title: 'testTitle',
      description: 'testDescription',
      resources: [
        {
          title: 'testTitle',
          notes: 'testNotes',
          link: 'https://google.com',
          resourceType: 'WEB PAGE',
        },
      ],
    };
    const expectedState = state
      .set('bundle', bundle);

    expect(
      bundleReducer(
        state,
        {
          bundle,
          type: FETCH_BUNDLE_SUCCESS,
        },
      ),
    ).toEqual(expectedState);
  });

  it('state changed correctly by FETCH_BUNDLE_SUCCESS', () => {
    const error = 'error500';
    const expectedState = state
      .set('error', error);

    expect(
      bundleReducer(
        state,
        {
          error,
          type: FETCH_BUNDLE_FAILED,
        },
      ),
    ).toEqual(expectedState);
  });
});
