import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthTypes, UserTypes, ErrorTypes } from '../../../types';

export interface AuthState {
  loading: boolean;
  user: UserTypes.User | null;
  error: ErrorTypes.AllErrors | null;
  credentials: AuthTypes.AuthLoginPayload | AuthTypes.AuthSignupPayload | null;
}

export const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
  credentials: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthTypes.AuthLoginPayload>) {
      state.loading = true;
      state.error = null;
      state.user = null;
      state.credentials = action.payload;
    },
    loginSuccess(state, action: PayloadAction<UserTypes.User>) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<ErrorTypes.AllErrors>) {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },

    register(state, action: PayloadAction<AuthTypes.AuthSignupPayload>) {
      state.loading = true;
      state.user = null;
      state.credentials = action.payload;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<UserTypes.User>) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    registerFailure(state, action: PayloadAction<ErrorTypes.AllErrors>) {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = authSlice;
