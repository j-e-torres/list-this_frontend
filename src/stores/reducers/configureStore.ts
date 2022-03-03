import { configureStore } from '@reduxjs/toolkit';
import { createInjectorsEnhancer, forceReducerReload } from 'redux-injectors';
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';

import { createReducer } from './reducers';

export const configureStoreApp = () => {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  const middlewares = [sagaMiddleware, logger];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: createReducer(),
    middleware: [...middlewares],
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });


  if (module.hot) {
    module.hot.accept('./reducers', () => {
      forceReducerReload(store);
    });
  }

  return store;
};
