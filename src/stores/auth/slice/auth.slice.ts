import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthTypes, UserTypes } from '../../../types';

export interface AuthState {
  loading: boolean;
  user: UserTypes.User | null;
  error: any;
}

export const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthTypes.AuthLoginPayload>) {
      state.loading = true;
      state.error = null;
      state.user = null;
    },
    loginSuccess(state, action: PayloadAction<UserTypes.User>) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<any>) {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = authSlice;
