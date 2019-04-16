import { takeLatest, all } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import robotSaga, {
  watchVerifyToken,
  verifyToken,
  watchPublishBundle,
  publishBundle,
} from '../saga';
import * as createSelectors from '../../Create/selectors';
import * as makeSelectors from '../../Make/selectors';
import {
  TOKEN_VERIFICATION_INITIATED,
  TOKEN_VERIFICATION_SUCCESSFUL,
  TOKEN_VERIFICATION_FAILED,
  BUNDLE_PUBLISHING_INITIATED,
  BUNDLE_PUBLISHING_SUCCESSFUL,
  BUNDLE_PUBLISHING_FAILED,
  SET_BUNDLE_ID,
} from '../constants';

describe('robotSaga Saga', () => {
  const generator = robotSaga();

  it('starts tasks to watch TOKEN_VERIFICATION_INITIATED action and BUNDLE_PUBLISHING_INITIATED action', () => {
    expect(
      generator.next().value,
    ).toEqual(
      all([
        watchVerifyToken(),
        watchPublishBundle(),
      ]),
    );
  });
});

describe('watchVerifyToken Saga', () => {
  const generator = watchVerifyToken();

  it('starts task to watch TOKEN_VERIFICATION_INITIATED action', () => {
    expect(
      generator.next().value,
    ).toEqual(
      takeLatest(TOKEN_VERIFICATION_INITIATED, verifyToken),
    );
  });
});

describe('watchPublishBundle Saga', () => {
  const generator = watchPublishBundle();

  it('starts task to watch BUNDLE_PUBLISHING_INITIATED action', () => {
    expect(
      generator.next().value,
    ).toEqual(
      takeLatest(BUNDLE_PUBLISHING_INITIATED, publishBundle),
    );
  });
});

describe('verifyToken Saga', () => {
  let dispatched;
  const fakeStore = {
    dispatch: action => dispatched.push(action),
  };
  const token = { token: 'testToken' };

  beforeEach(() => {
    dispatched = [];
  });

  it('calls TOKEN_VERIFICATION_SUCCESSFUL action and BUNDLE_PUBLISHING_INITIATED action on 200', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => ({ status: 200 }));

    await runSaga(
      fakeStore,
      verifyToken,
      token,
    ).done;

    expect(
      dispatched,
    ).toEqual([
      { type: TOKEN_VERIFICATION_SUCCESSFUL },
      { type: BUNDLE_PUBLISHING_INITIATED },
    ]);
  });

  it('calls TOKEN_VERIFICATION_FAILED action on 406', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => ({ status: 406 }));

    await runSaga(
      fakeStore,
      verifyToken,
      token,
    ).done;

    expect(
      dispatched,
    ).toEqual([
      {
        error: 'error406',
        type: TOKEN_VERIFICATION_FAILED,
      },
    ]);
  });

  it('calls TOKEN_VERIFICATION_FAILED action on 500', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => ({ status: 500 }));

    await runSaga(
      fakeStore,
      verifyToken,
      token,
    ).done;

    expect(
      dispatched,
    ).toEqual([
      {
        error: 'error500',
        type: TOKEN_VERIFICATION_FAILED,
      },
    ]);
  });

  it('calls TOKEN_VERIFICATION_FAILED actions on 1337 (default case)', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => ({ status: 1337 }));

    await runSaga(
      fakeStore,
      verifyToken,
      token,
    ).done;

    expect(
      dispatched,
    ).toEqual([
      {
        error: 'errorDefault',
        type: TOKEN_VERIFICATION_FAILED,
      },
    ]);
  });

  it('calls TOKEN_VERIFICATION_FAILED action when API call fails due to some error', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => { throw new Error('Network request failed'); });

    await runSaga(
      fakeStore,
      verifyToken,
      token,
    ).done;

    expect(
      dispatched,
    ).toEqual([
      {
        error: 'errorDefault',
        type: TOKEN_VERIFICATION_FAILED,
      },
    ]);
  });
});

describe('publishBundle Saga', () => {
  let dispatched;
  const fakeStore = {
    dispatch: action => dispatched.push(action),
  };

  beforeEach(() => {
    dispatched = [];
    createSelectors.makeSelectTitle = jest.fn(() => () => 'testTitle');
    createSelectors.makeSelectDescription = jest.fn(() => () => 'testDescription');
    makeSelectors.makeSelectResources = jest.fn(() => () => [{
      title: 'testTitle',
      resourceType: 'WEB PAGE',
      link: 'https://google.com',
      notes: 'testNotes',
    }]);
  });

  it('calls BUNDLE_PUBLISHING_SUCCESSFUL action and SET_BUNDLE_ID action on 201', async () => {
    const bundleID = 1337;

    global.fetch = jest
      .fn()
      .mockImplementation(() => ({
        status: 201,
        json: () => Promise.resolve({ id: bundleID }),
      }));

    await runSaga(
      fakeStore,
      publishBundle,
    ).done;

    expect(
      dispatched,
    ).toEqual([
      { type: BUNDLE_PUBLISHING_SUCCESSFUL },
      {
        bundleID,
        type: SET_BUNDLE_ID,
      },
    ]);
  });

  it('calls BUNDLE_PUBLISHING_FAILED action on 400', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => ({ status: 400 }));

    await runSaga(
      fakeStore,
      publishBundle,
    ).done;

    expect(
      dispatched,
    ).toEqual([
      {
        error: 'error400',
        type: BUNDLE_PUBLISHING_FAILED,
      },
    ]);
  });

  it('calls BUNDLE_PUBLISHING_FAILED action on 500', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => ({ status: 500 }));

    await runSaga(
      fakeStore,
      publishBundle,
    ).done;

    expect(
      dispatched,
    ).toEqual([
      {
        error: 'error500',
        type: BUNDLE_PUBLISHING_FAILED,
      },
    ]);
  });

  it('calls BUNDLE_PUBLISHING_FAILED action on 1337 (default case)', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => ({ status: 1337 }));

    await runSaga(
      fakeStore,
      publishBundle,
    ).done;

    expect(
      dispatched,
    ).toEqual([
      {
        error: 'errorDefault',
        type: BUNDLE_PUBLISHING_FAILED,
      },
    ]);
  });

  it('calls BUNDLE_PUBLISHING_FAILED action when API call fails due to some error', async () => {
    global.fetch = jest
      .fn()
      .mockImplementation(() => { throw new Error('Network request failed'); });

    await runSaga(
      fakeStore,
      publishBundle,
    ).done;

    expect(
      dispatched,
    ).toEqual([
      {
        error: 'errorDefault',
        type: BUNDLE_PUBLISHING_FAILED,
      },
    ]);
  });
});
