import { AuthState } from '../auth/slice/auth.slice';

export interface RootState {
  auth?: AuthState;
}
