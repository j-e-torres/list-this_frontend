import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ErrorTypes, TaskTypes } from '../../../types';

export interface TaskState {
  loading: boolean;
  error: ErrorTypes.AllErrors | null;
  completeTaskPayload: TaskTypes.CompleteTaskPayload | null;
  task: TaskTypes.Task | null;
}

export const initialState: TaskState = {
  loading: false,
  error: null,
  completeTaskPayload: null,
  task: null,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    completeTask(state, action: PayloadAction<TaskTypes.CompleteTaskPayload>) {
      state.loading = true;
      state.error = null;
      state.completeTaskPayload = action.payload;
    },
    completeTaskSuccess(state, action: PayloadAction<TaskTypes.Task>) {
      state.loading = true;
      state.error = null;
      state.task = action.payload;
      state.completeTaskPayload = null;
    },
    completeTaskFailure(state, action: PayloadAction<ErrorTypes.AllErrors>) {
      state.loading = true;
      state.error = action.payload;
      state.completeTaskPayload = null;
      state.task = null;
    },
  },
});

export const { actions, reducer, name: sliceKey } = taskSlice;
