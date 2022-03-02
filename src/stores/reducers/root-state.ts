import { AuthReducer} from '../auth/slice';

export interface RootState {
  auth?: AuthReducer
}
