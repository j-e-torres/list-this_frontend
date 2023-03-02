import { AuthState } from '../auth/slice/auth.slice';
import { ListState } from '../list/slice/list.slice';
import { TaskState } from '../task/slice/task.slice';

export interface RootState {
  auth?: AuthState;
  list?: ListState;
  task?: TaskState;
}
