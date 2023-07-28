// rootTaskSaga.js
import { all } from 'redux-saga/effects';
import { deleteTaskSaga, completeTaskSaga } from './task.saga';

export default function* rootTaskSaga() {
  yield all([
    completeTaskSaga(),
    deleteTaskSaga(),
    // Add other sagas related to 'taskSliceKey' here
  ]);
}
