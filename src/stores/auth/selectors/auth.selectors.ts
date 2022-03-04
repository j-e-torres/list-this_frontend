import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../../stores/reducers/root-state';

import { initialState } from '../slice/auth.slice';

const selectDomain = (state: RootState) => state.auth || initialState;

export const selectAuthUser = createSelector(
  [selectDomain],
  (state) => state.user,
);

export const selectAuthLoading = createSelector(
  [selectDomain],
  (state) => state.loading,
);

export const selectAuthError = createSelector(
  [selectDomain],
  (state) => state.error,
);
