import { Reducer, AnyAction } from '@reduxjs/toolkit';
import { Saga } from 'redux-saga';
import { SagaInjectionModes } from 'redux-injectors';

import { RootState } from '../../stores/reducers/root-state';

type RequiredRootState = Required<RootState>;

export type RootStateKeyType = keyof RootState;

export type InjectReducersType = {
  [P in RootStateKeyType]?: Reducer<RequiredRootState[P], AnyAction>;
};

export interface InjectReducerParams<Key extends RootStateKeyType> {
  key: Key;
  reducer: Reducer<RequiredRootState[Key], AnyAction>;
}

export interface InjectSagaParams {
  key: RootStateKeyType | string;
  saga: Saga;
  mode?: SagaInjectionModes;
}
