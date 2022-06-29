import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAuthUser, selectAuthError } from '../selectors/auth.selectors';
import { actions } from '../slice/auth.slice';
import { AuthTypes, ErrorTypes, UserTypes } from '../../../types';

export const AuthFacadeService = () => {
  const dispatch = useDispatch();
  const authUser: UserTypes.User | null = useSelector(selectAuthUser);
  const authError: ErrorTypes.AllErrors | null = useSelector(selectAuthError);

  const login = (credentials: AuthTypes.AuthLoginPayload) => {
    dispatch(actions.login(credentials));
  };

  const signup = (credentials: AuthTypes.AuthSignupPayload) => {
    dispatch(actions.register(credentials));
  };

  const clearError = () => {
    dispatch(actions.clearError(null));
  };

  return { authUser, login, authError, signup, clearError };
};
