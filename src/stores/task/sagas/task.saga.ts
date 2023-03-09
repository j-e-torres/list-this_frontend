import { takeEvery, put, call, select, takeLatest } from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';

import { actions } from '../slice/task.slice';
import { taskApi } from '../../../api/task.api';
import { selectCompleteTaskPayload } from '../selectors/task.selectors';
import { ErrorTypes, ApiResponse, TaskTypes } from '../../../types';

function* completeTask() {
  const payload: TaskTypes.CompleteTaskPayload = yield select(
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

export function* completeTaskSaga() {
  yield takeEvery(actions.completeTask.type, completeTask);
}
