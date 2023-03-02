import { takeEvery, put, call, select, takeLatest } from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';

import { actions } from '../slice/list.slice';
import { listApi } from '../../../api/list.api';
import {
  selectCreateListPayload,
  selectFetchListPayload,
  selectFetchListsPayload,
  selectUpdateListPayload,
} from '../selectors/list.selectors';
import { ErrorTypes, ApiResponse, ListTypes, TaskTypes } from '../../../types';

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

function* fetchLists() {
  const payload: ListTypes.FetchListsPayload = yield select(
    selectFetchListsPayload,
  );

  console.log('LISTSSSSSAGGGAAA');
  try {
    const listsResponse: ApiResponse<ListTypes.List[]> = yield call(
      listApi.fetchLists,
      payload,
    );

    yield put(actions.fetchListsSuccess(listsResponse.data.lists));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const _error = error as AxiosError<ErrorTypes.ApiErrorResponse>;
      yield put(actions.fetchListsFailure(_error.response?.data));
    } else {
      const _error = new Error(ErrorTypes.GeneralErrors.GENERAL_ERROR);
      yield put(actions.fetchListsFailure(_error));
    }
  }
}

function* updateList() {
  const payload: ListTypes.UpdateListPayload = yield select(
    selectUpdateListPayload,
  );

  // try {
  //   const response: ApiResponse<TaskTypes.Task[]> = yield call();
  // } catch (error) {}
}

function* fetchList() {
  console.log('BURTMAN');
  const payload: ListTypes.FetchListPayload = yield select(
    selectFetchListPayload,
  );

  try {
    const listResponse: ApiResponse<ListTypes.List> = yield call(
      listApi.fetchList,
      payload,
    );

    yield put(actions.fetchListSuccess(listResponse.data.list));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const _error = error as AxiosError<ErrorTypes.ApiErrorResponse>;
      yield put(actions.fetchListFailure(_error.response?.data));
    } else {
      const _error = new Error(ErrorTypes.GeneralErrors.GENERAL_ERROR);
      yield put(actions.fetchListFailure(_error));
    }
  }
}

export function* createListSaga() {
  yield takeEvery(actions.createList.type, createList);
}

export function* fetchListsSaga() {
  yield takeEvery(actions.fetchLists.type, fetchLists);
}

export function* updateListSaga() {
  yield takeEvery(actions.updateList.type, updateList);
}

export function* fetchListSaga() {
  yield takeEvery(actions.fetchList.type, fetchList);
}
