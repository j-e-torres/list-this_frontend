import {
  useInjectReducer as useReducer,
  useInjectSaga as useSaga,
} from 'redux-injectors';

import { InjectorTypes } from '../../types';
import { InjectSagaParams } from '../../types/injectors';

export function useInjectReducer<Key extends InjectorTypes.RootStateKeyType>(
  params: InjectorTypes.InjectReducerParams<Key>,
) {
  return useReducer(params);
}

export function useInjectSaga(params: InjectSagaParams) {
  return useSaga(params);
}
