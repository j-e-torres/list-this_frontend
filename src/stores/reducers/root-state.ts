import { AuthState } from '../auth/slice/auth.slice';
import { ListState } from '../list/slice/list.slice';

export interface RootState {
  auth?: AuthState;
  list?: ListState;
}
