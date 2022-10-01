import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectAuthUser,
  selectAuthError,
  selectAuthLoading,
  selectAuthToken,
} from '../selectors/auth.selectors';
import { actions } from '../slice/auth.slice';
import { AuthTypes, ErrorTypes, UserTypes } from '../../../types';

export const AuthFacadeService = () => {
  const dispatch = useDispatch();

  const authUser: UserTypes.User | null = useSelector(selectAuthUser);
  const authError: ErrorTypes.AllErrors | null = useSelector(selectAuthError);
  const authLoading: boolean = useSelector(selectAuthLoading);
  const authToken: AuthTypes.Token | null = useSelector(selectAuthToken);

  const login = (credentials: AuthTypes.AuthLoginPayload): void => {
    dispatch(actions.login(credentials));
  };

  const signup = (credentials: AuthTypes.AuthSignupPayload): void => {
    dispatch(actions.register(credentials));
  };

  const clearError = (): void => {
    dispatch(actions.clearError(null));
  };

  const loginToken = (token: AuthTypes.Token): void => {
    dispatch(actions.tokenLogin(token));
  };

  return {
    authUser,
    authError,
    authLoading,
    authToken,
    login,
    signup,
    clearError,
    loginToken,
  };
};
