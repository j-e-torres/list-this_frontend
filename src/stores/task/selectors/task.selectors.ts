import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../stores/reducers/root-state';

import { initialState } from '../slice/task.slice';

const selectDomain = (state: RootState) => state.task || initialState;

export const selectTask = createSelector([selectDomain], (state) => state.task);

export const selectTaskLoading = createSelector(
  [selectDomain],
  (state) => state.loading,
);

export const selectTaskError = createSelector(
  [selectDomain],
  (state) => state.error,
);

export const selectCompleteTaskPayload = createSelector(
  [selectDomain],
  (state) => state.completeTaskPayload,
);

export const selectDeleteTaskPayload = createSelector(
  [selectDomain],
  (state) => state.deleteTaskPayload,
);
