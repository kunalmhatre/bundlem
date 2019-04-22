/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import bundleSaga, { fetchBundle } from '../saga';
import {
  FETCH_BUNDLE,
  FETCH_BUNDLE_SUCCESS,
  FETCH_BUNDLE_FAILED,
} from '../constants';

describe('bundleSaga Saga', () => {
  const generator = bundleSaga();

  it('starts task to watch FETCH_BUNDLE action', () => {
    expect(
      generator.next().value,
    ).toEqual(
      takeLatest(FETCH_BUNDLE, fetchBundle),
    );
  });
});

describe('fetchBundle Saga', () => {
  let dispatched;
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
  const bundleID = { bundleID: 1337 };
  const fakeStore = {
    dispatch: action => dispatched.push(action),
  };

  beforeEach(() => {
    dispatched = [];
  });

  it('calls FETCH_BUNDLE_SUCCESS action on 200', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => ({
        status: 200,
        json: () => Promise.resolve({ bundle }),
      }));

    await runSaga(
      fakeStore,
      fetchBundle,
      bundleID,
    ).done;

    expect(
      dispatched,
    ).toEqual([
      {
        bundle,
        type: FETCH_BUNDLE_SUCCESS,
      },
    ]);
  });

  it('calls FETCH_BUNDLE_FAILED action on 400', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => ({ status: 400 }));

    await runSaga(
      fakeStore,
      fetchBundle,
      bundleID,
    ).done;

    expect(
      dispatched,
    ).toEqual([
      {
        error: 'error400',
        type: FETCH_BUNDLE_FAILED,
      },
    ]);
  });

  it('calls FETCH_BUNDLE_FAILED action on 404', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => ({ status: 404 }));

    await runSaga(
      fakeStore,
      fetchBundle,
      bundleID,
    ).done;

    expect(
      dispatched,
    ).toEqual([
      {
        error: 'error404',
        type: FETCH_BUNDLE_FAILED,
      },
    ]);
  });

  it('calls FETCH_BUNDLE_FAILED action on 500', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => ({ status: 500 }));

    await runSaga(
      fakeStore,
      fetchBundle,
      bundleID,
    ).done;

    expect(
      dispatched,
    ).toEqual([
      {
        error: 'error500',
        type: FETCH_BUNDLE_FAILED,
      },
    ]);
  });

  it('calls FETCH_BUNDLE_FAILED action on 1337 (default case)', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => ({ status: 1337 }));

    await runSaga(
      fakeStore,
      fetchBundle,
      bundleID,
    ).done;

    expect(
      dispatched,
    ).toEqual([
      {
        error: 'errorDefault',
        type: FETCH_BUNDLE_FAILED,
      },
    ]);
  });

  it('calls FETCH_BUNDLE_FAILED action when API call fails due to some error', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => { throw new Error('Network request failed'); });

    await runSaga(
      fakeStore,
      fetchBundle,
      bundleID,
    ).done;

    expect(
      dispatched,
    ).toEqual([
      {
        error: 'errorDefault',
        type: FETCH_BUNDLE_FAILED,
      },
    ]);
  });
});
