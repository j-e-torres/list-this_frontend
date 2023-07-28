import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ErrorTypes, TaskTypes } from '../../../types';

export interface TaskState {
  loading: boolean;
  error: ErrorTypes.AllErrors | null;
  completeTaskPayload: TaskTypes.TaskPayload | null;
  task: TaskTypes.Task | null;
  isDeleting: boolean;
  deleteTaskPayload: TaskTypes.TaskPayload | null;
}

export const initialState: TaskState = {
  loading: false,
  error: null,
  completeTaskPayload: null,
  task: null,
  isDeleting: false,
  deleteTaskPayload: null,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    completeTask(state, action: PayloadAction<TaskTypes.TaskPayload>) {
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
      state.loading = false;
      state.error = action.payload;
      state.completeTaskPayload = null;
      state.task = null;
    },

    deleteTask(state, action: PayloadAction<TaskTypes.TaskPayload>) {
      state.isDeleting = true;
      state.error = null;
      state.deleteTaskPayload = action.payload;
    },
    deleteTaskSuccess(state, action: PayloadAction<TaskTypes.Task>) {
      state.isDeleting = false;
      state.error = null;
      state.deleteTaskPayload = null;
      state.task = action.payload;
    },
    deleteTaskFailure(state, action: PayloadAction<ErrorTypes.AllErrors>) {
      state.isDeleting = false;
      state.error = action.payload;
      state.task = null;
      state.deleteTaskPayload = null;
    },
  },
});

export const { actions, reducer, name: sliceKey } = taskSlice;
