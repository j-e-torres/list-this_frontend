import { Reducer, AnyAction } from '@reduxjs/toolkit';
import { Saga } from 'redux-saga';
import { SagaInjectionModes } from 'redux-injectors';

import { RootState } from '../../stores/reducers/root-state'

type RequiredRootState = Required<RootState>;

export type RootStateKeyType = keyof RootState;

export type InjectReducersType = {
  [P in RootStateKeyType]? : Reducer<RequiredRootState[P], AnyAction>;
}
