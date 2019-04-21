import {
  takeLatest,
  call,
  put,
  select,
  all,
} from 'redux-saga/effects';
import { verifyTokenAPI, publishBundleAPI } from '../../utils/apis';
import { makeSelectTitle, makeSelectDescription } from '../Create/selectors';
import { makeSelectResources } from '../Make/selectors';

import {
  TOKEN_VERIFICATION_INITIATED,
  TOKEN_VERIFICATION_SUCCESSFUL,
  TOKEN_VERIFICATION_FAILED,
  BUNDLE_PUBLISHING_INITIATED,
  BUNDLE_PUBLISHING_SUCCESSFUL,
  BUNDLE_PUBLISHING_FAILED,
  SET_BUNDLE_ID,
} from './constants';

export function* verifyToken(action) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: action.token,
    }),
  };

  try {
    const response = yield call(fetch, verifyTokenAPI, options);

    switch (response.status) {
      case 200:
        yield put({ type: TOKEN_VERIFICATION_SUCCESSFUL });
        yield put({ type: BUNDLE_PUBLISHING_INITIATED });
        break;
      case 406:
        yield put({
          error: 'error406',
          type: TOKEN_VERIFICATION_FAILED,
        });
        break;
      case 500:
        yield put({
          error: 'error500',
          type: TOKEN_VERIFICATION_FAILED,
        });
        break;
      default:
        yield put({
          error: 'errorDefault',
          type: TOKEN_VERIFICATION_FAILED,
        });
    }
  } catch (error) {
    yield put({
      error: 'errorDefault',
      type: TOKEN_VERIFICATION_FAILED,
    });
  }
}

export function* publishBundle() {
  const title = yield select(makeSelectTitle());
  const description = yield select(makeSelectDescription());
  const resources = yield select(makeSelectResources());
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      bundle: {
        title,
        description,
        resources,
      },
    }),
  };

  try {
    const response = yield call(fetch, publishBundleAPI, options);

    switch (response.status) {
      case 201: {
        const data = yield response.json();

        yield put({
          bundleID: data.id,
          type: SET_BUNDLE_ID,
        });
        yield put({ type: BUNDLE_PUBLISHING_SUCCESSFUL });
        break;
      }
      case 400:
        yield put({
          error: 'error400',
          type: BUNDLE_PUBLISHING_FAILED,
        });
        break;
      case 500:
        yield put({
          error: 'error500',
          type: BUNDLE_PUBLISHING_FAILED,
        });
        break;
      default:
        yield put({
          error: 'errorDefault',
          type: BUNDLE_PUBLISHING_FAILED,
        });
    }
  } catch (error) {
    yield put({
      error: 'errorDefault',
      type: BUNDLE_PUBLISHING_FAILED,
    });
  }
}

export function* watchVerifyToken() {
  yield takeLatest(TOKEN_VERIFICATION_INITIATED, verifyToken);
}

export function* watchPublishBundle() {
  yield takeLatest(BUNDLE_PUBLISHING_INITIATED, publishBundle);
}

export default function* robotSaga() {
  yield all([
    watchVerifyToken(),
    watchPublishBundle(),
  ]);
}
