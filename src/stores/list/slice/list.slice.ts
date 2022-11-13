import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthTypes, UserTypes, ErrorTypes, ListTypes } from '../../../types';

export interface ListState {
  loading: boolean;
  error: ErrorTypes.AllErrors | null;
  createListPayload: ListTypes.CreateListPayload | null;
  list: ListTypes.List | null;
}

export const initialState: ListState = {
  loading: false,
  error: null,
  createListPayload: null,
  list: null,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    createList(state, action: PayloadAction<ListTypes.CreateListPayload>) {
      state.loading = true;
      state.error = null;
      state.createListPayload = action.payload;
    },
    createListSuccess(state, action: PayloadAction<ListTypes.List>) {
      state.loading = false;
      state.error = null;
      state.createListPayload = null;
      state.list = action.payload;
    },
    createListFailure(state, action: PayloadAction<ErrorTypes.AllErrors>) {
      state.loading = false;
      state.error = action.payload;
      state.createListPayload = null;
      state.list = null;
    },
    clearList(state, action: PayloadAction<null>) {
      state.list = null;
    },
  },
});

export const { actions, reducer, name: sliceKey } = listSlice;
