import { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  loading: boolean;
  user
}

export const initialState =
