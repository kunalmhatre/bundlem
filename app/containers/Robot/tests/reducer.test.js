import { fromJS } from 'immutable';
import robotReducer from '../reducer';
import verifyTokenAction from '../actions';
import {
  TOKEN_VERIFICATION_SUCCESSFUL,
  TOKEN_VERIFICATION_FAILED,
  BUNDLE_PUBLISHING_INITIATED,
  BUNDLE_PUBLISHING_SUCCESSFUL,
  BUNDLE_PUBLISHING_FAILED,
  SET_BUNDLE_ID,
} from '../constants';

describe('robotReducer', () => {
  const state = fromJS({
    isVerifyingToken: false,
    isPublishingBundle: false,
    isBundlePublished: false,
    bundleID: null,
    error: null,
  });

  it('returns the initial state', () => {
    expect(robotReducer(undefined, {})).toEqual(state);
  });

  it('state changed correctly by verifyTokenAction', () => {
    const isVerifyingToken = true;
    const token = 'testToken';
    const expectedState = state
      .set('isVerifyingToken', isVerifyingToken);

    expect(
      robotReducer(
        state,
        verifyTokenAction(token),
      ),
    ).toEqual(expectedState);
  });

  it('state changed correctly by TOKEN_VERIFICATION_SUCCESSFUL action', () => {
    expect(
      robotReducer(
        state,
        { type: TOKEN_VERIFICATION_SUCCESSFUL },
      ),
    ).toEqual(state);
  });

  it('state changed correctly by TOKEN_VERIFICATION_FAILED action', () => {
    const error = 'error500';
    const expectedState = state
      .set('error', error);

    expect(
      robotReducer(
        state,
        {
          error,
          type: TOKEN_VERIFICATION_FAILED,
        },
      ),
    ).toEqual(expectedState);
  });

  it('state changed correctly by BUNDLE_PUBLISHING_INITIATED action', () => {
    const isPublishingBundle = true;
    const expectedState = state
      .set('isPublishingBundle', isPublishingBundle);

    expect(
      robotReducer(
        state,
        { type: BUNDLE_PUBLISHING_INITIATED },
      ),
    ).toEqual(expectedState);
  });

  it('state changed correctly by BUNDLE_PUBLISHING_SUCCESSFUL action', () => {
    const isBundlePublished = true;
    const expectedState = state
      .set('isBundlePublished', isBundlePublished);

    expect(
      robotReducer(
        state,
        { type: BUNDLE_PUBLISHING_SUCCESSFUL },
      ),
    ).toEqual(expectedState);
  });

  it('state changed correctly by BUNDLE_PUBLISHING_FAILED action', () => {
    const error = 'error400';
    const expectedState = state
      .set('error', error);

    expect(
      robotReducer(
        state,
        {
          error: 'error400',
          type: BUNDLE_PUBLISHING_FAILED,
        },
      ),
    ).toEqual(expectedState);
  });

  it('state changed correctly by SET_BUNDLE_ID action', () => {
    const bundleID = '1337';
    const expectedState = state
      .set('bundleID', bundleID);

    expect(
      robotReducer(
        state,
        {
          bundleID,
          type: SET_BUNDLE_ID,
        },
      ),
    ).toEqual(expectedState);
  });
});
