import {
  takeEvery,
  put,
  call,
  select,
  take,
  PutEffect,
} from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';

import { actions } from '../slice/list.slice';
import { listApi } from '../../../api/list.api';
import { selectCreateListPayload } from '../selectors/list.selectors';
import { ErrorTypes, ApiResponse, ListTypes } from '../../../types';

function* createList() {
  const payload: ListTypes.CreateListPayload = yield select(
    selectCreateListPayload,
  );

  try {
    const createListResponse: ApiResponse<ListTypes.List> = yield call(
      listApi.createList,
      payload,
    );

    yield put(actions.createListSuccess(createListResponse.data.list));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const _error = error as AxiosError<ErrorTypes.ApiErrorResponse>;
      yield put(actions.createListFailure(_error.response?.data));
    } else {
      const _error = new Error(ErrorTypes.GeneralErrors.GENERAL_ERROR);
      yield put(actions.createListFailure(_error));
    }
  }
}

export function* createListSaga() {
  yield takeEvery(actions.createList.type, createList);
}
