import {
  takeLatest,
  call,
  put,
} from 'redux-saga/effects';
import {
  FETCH_BUNDLE,
  FETCH_BUNDLE_SUCCESS,
  FETCH_BUNDLE_FAILED,
} from './constants';
import { getBundleAPI } from '../../utils/apis';

export function* fetchBundle(action) {
  try {
    const response = yield call(fetch, `${getBundleAPI}/${action.bundleID}`);

    switch (response.status) {
      case 200: {
        const data = yield response.json();

        yield put({
          bundle: data.bundle,
          type: FETCH_BUNDLE_SUCCESS,
        });
        break;
      }
      case 400:
        yield put({
          error: 'error400',
          type: FETCH_BUNDLE_FAILED,
        });
        break;
      case 404:
        yield put({
          error: 'error404',
          type: FETCH_BUNDLE_FAILED,
        });
        break;
      case 500:
        yield put({
          error: 'error500',
          type: FETCH_BUNDLE_FAILED,
        });
        break;
      default:
        yield put({
          error: 'errorDefault',
          type: FETCH_BUNDLE_FAILED,
        });
    }
  } catch (error) {
    yield put({
      error: 'errorDefault',
      type: FETCH_BUNDLE_FAILED,
    });
  }
}

export default function* bundleSaga() {
  yield takeLatest(FETCH_BUNDLE, fetchBundle);
}
