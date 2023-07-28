import {
  takeEvery,
  put,
  call,
  select,
  takeLatest,
  fork,
  all,
} from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';

import { actions } from '../slice/task.slice';
import { taskApi } from '../../../api/task.api';
import {
  selectCompleteTaskPayload,
  selectDeleteTaskPayload,
} from '../selectors/task.selectors';
import { ErrorTypes, ApiResponse, TaskTypes } from '../../../types';

export function* completeTask() {
  const payload: TaskTypes.TaskPayload = yield select(
    selectCompleteTaskPayload,
  );

  try {
    const taskResponse: ApiResponse<TaskTypes.Task> = yield call(
      taskApi.completeTask,
      payload,
    );

    yield put(actions.completeTaskSuccess(taskResponse.data.task));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const _error = error as AxiosError<ErrorTypes.ApiErrorResponse>;
      yield put(actions.completeTaskFailure(_error.response?.data));
    } else {
      const _error = new Error(ErrorTypes.GeneralErrors.GENERAL_ERROR);
      yield put(actions.completeTaskFailure(_error));
    }
  }
}
export function* deleteTask() {
  const payload: TaskTypes.TaskPayload = yield select(selectDeleteTaskPayload);

  try {
    const taskResponse: ApiResponse<TaskTypes.Task> = yield call(
      taskApi.deleteTask,
      payload,
    );

    yield put(actions.deleteTaskSuccess(taskResponse.data.task));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const _error = error as AxiosError<ErrorTypes.ApiErrorResponse>;
      yield put(actions.deleteTaskFailure(_error.response?.data));
    } else {
      const _error = new Error(ErrorTypes.GeneralErrors.GENERAL_ERROR);
      yield put(actions.deleteTaskFailure(_error));
    }
  }
}

export function* completeTaskSaga() {
  yield takeEvery(actions.completeTask.type, completeTask);
}

export function* deleteTaskSaga() {
  yield takeEvery(actions.deleteTask.type, deleteTask);
}

export function* rootTaskSaga() {
  yield all([
    fork(completeTaskSaga),
    fork(deleteTaskSaga),
    // Add other sagas related to 'taskSliceKey' here
  ]);
}
