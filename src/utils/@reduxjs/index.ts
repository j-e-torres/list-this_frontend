import { RootStateKeyType } from '../../types/injectors/';

import { AuthTypes } from '../../types';

import {
  createSlice as createSliceOriginal,
  SliceCaseReducers,
  CreateSliceOptions,
} from '@reduxjs/toolkit';

// export const createSlice = <State, CaseReducers extends SliceCaseReducers<State>, Name extends RootStateKeyType>
