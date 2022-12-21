import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../stores/reducers/root-state';

import { initialState } from '../slice/list.slice';

const selectDomain = (state: RootState) => state.list || initialState;

export const selectCreateListPayload = createSelector(
  [selectDomain],
  (state) => state.createListPayload,
);

export const selectList = createSelector([selectDomain], (state) => state.list);

export const selectListLoading = createSelector(
  [selectDomain],
  (state) => state.loading,
);

export const selectListError = createSelector(
  [selectDomain],
  (state) => state.error,
);

export const selectLists = createSelector(
  [selectDomain],
  (state) => state.lists,
);

export const selectFetchListsPayload = createSelector(
  [selectDomain],
  (state) => state.fetchListsPayload,
);

export const selectUpdateListPayload = createSelector(
  [selectDomain],
  (state) => state.updateListPayload,
);
