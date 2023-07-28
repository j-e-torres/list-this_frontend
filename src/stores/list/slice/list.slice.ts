import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ErrorTypes, ListTypes, TaskTypes } from '../../../types';

export interface ListState {
  loading: boolean;
  error: ErrorTypes.AllErrors | null;
  createListPayload: ListTypes.CreateListPayload | null;
  list: ListTypes.List | null;
  lists: ListTypes.List[];
  fetchListsPayload: ListTypes.FetchListsPayload | null;
  updateListPayload: ListTypes.UpdateListPayload | null;
  fetchListPayload: ListTypes.FetchListPayload | null;
  completeTaskPayload: TaskTypes.TaskPayload | null;
  task: TaskTypes.Task | null;
}

export const initialState: ListState = {
  loading: false,
  error: null,
  createListPayload: null,
  list: null,
  lists: [],
  fetchListsPayload: null,
  updateListPayload: null,
  fetchListPayload: null,
  completeTaskPayload: null,
  task: null,
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
      state.lists = [...state.lists, action.payload];
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
    fetchLists(state, action: PayloadAction<ListTypes.FetchListsPayload>) {
      state.loading = true;
      state.error = null;
      state.fetchListsPayload = action.payload;
    },
    fetchListsSuccess(state, action: PayloadAction<ListTypes.List[]>) {
      state.loading = false;
      state.error = null;
      state.fetchListsPayload = null;
      state.lists = action.payload;
    },
    fetchListsFailure(state, action: PayloadAction<ErrorTypes.AllErrors>) {
      state.loading = false;
      state.error = action.payload;
      state.fetchListsPayload = null;
      state.lists = [];
    },
    updateList(state, action: PayloadAction<ListTypes.UpdateListPayload>) {
      state.loading = true;
      state.error = null;
      state.updateListPayload = action.payload;
    },
    updateListSuccess(state, action: PayloadAction<TaskTypes.Task[]>) {
      state.loading = false;
      state.error = null;
      state.lists = [...state.lists];
      state.updateListPayload = null;
    },
    updateListFailure(state, action: PayloadAction<ErrorTypes.AllErrors>) {
      state.loading = false;
      state.error = action.payload;
      state.updateListPayload = null;
    },
    fetchList(state, action: PayloadAction<ListTypes.FetchListPayload>) {
      state.loading = true;
      state.error = null;
      state.fetchListPayload = action.payload;
    },
    fetchListSuccess(state, action: PayloadAction<ListTypes.List>) {
      state.loading = false;
      state.error = null;
      state.fetchListPayload = null;
      state.list = action.payload;
    },
    fetchListFailure(state, action: PayloadAction<ErrorTypes.AllErrors>) {
      state.loading = false;
      state.error = action.payload;
      state.fetchListPayload = null;
      state.list = null;
    },
  },
});

export const { actions, reducer, name: sliceKey } = listSlice;
