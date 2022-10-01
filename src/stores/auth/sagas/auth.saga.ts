import { takeEvery, put, call, select, take } from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';

import { actions } from '../slice/auth.slice';
import { authApi } from '../../../api/auth.api';
import { selectAuthCredentials } from '../selectors/auth.selectors';
import { AuthTypes, ErrorTypes } from '../../../types';
import { storeToken } from '../../../utils/async-storage';

function* userLogin() {
  const credentials: AuthTypes.AuthLoginPayload = yield select(
    selectAuthCredentials,
  );

  try {
    const authLoginResponse: AuthTypes.AuthResponseWithToken = yield call(
      authApi.userLogin,
      credentials,
    );
    console.log('JJJJJJJ', authLoginResponse);
    storeToken(authLoginResponse.token.accessToken);

    yield put(actions.loginSuccess(authLoginResponse.data.user));
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

function* registerUser() {
  const credentials: AuthTypes.AuthSignupPayload = yield select(
    selectAuthCredentials,
  );

  try {
    const authRegisterResponse: AuthTypes.AuthResponseWithToken = yield call(
      authApi.registerUser,
      credentials,
    );

    storeToken(authRegisterResponse.token.accessToken);

    yield put(actions.registerSuccess(authRegisterResponse.data.user));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const _error = error as AxiosError<ErrorTypes.ApiErrorResponse>;
      yield put(actions.registerFailure(_error.response?.data));
    } else {
      const _error = new Error(ErrorTypes.GeneralErrors.GENERAL_ERROR);
      yield put(actions.registerFailure(_error));
    }
  }
}

function* userTokenLogin() {}

export function* userLoginSaga() {
  yield takeEvery(actions.login.type, userLogin);
}

export function* userTokenLoginSaga() {
  yield takeEvery(actions.login.type, userTokenLogin);
}

export function* registerUserSaga() {
  yield takeEvery(actions.register.type, registerUser);
}
