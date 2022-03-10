import { takeEvery, put, call, select, take } from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';

import { actions } from '../slice/auth.slice';
import { authApi } from '../../../api/auth.api';
import { selectAuthCredentials } from '../selectors/auth.selectors';
import { AuthTypes, ErrorTypes } from '../../../types';

import { storeToken } from '../../../utils/async-storage';

export function* userLogin() {
  const credentials: AuthTypes.AuthLoginPayload = yield select(
    selectAuthCredentials,
  );

  try {
    const authLoginResponse: AuthTypes.AuthLoginResponse = yield call(
      authApi.userLogin,
      credentials,
    );

    storeToken(authLoginResponse.token);

    yield put(actions.loginSuccess(authLoginResponse.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const _error = error as AxiosError<ErrorTypes.ApiErrorResponse>;
      yield put(actions.loginFailure(_error.response?.data));
    } else {
      const _error = new Error(ErrorTypes.GeneralErrors.GENERAL_ERROR);
      yield put(actions.loginFailure(_error));
    }
  }
}

export function* userLoginSaga() {
  yield takeEvery(actions.login.type, userLogin);
}
