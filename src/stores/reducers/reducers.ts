import { combineReducers } from '@reduxjs/toolkit';

import { InjectorTypes } from '../../types';

export const createReducer = (injectedReducers: InjectorTypes.InjectReducersType = {}) => {
  if (Object.keys(injectedReducers).length === 0) {
    return state => state;
  } else {
    return combineReducers({...injectedReducers});
  }
};
