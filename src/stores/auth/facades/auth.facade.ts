import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAuthUser } from '../selectors/auth.selectors';
import { actions } from '../slice/auth.slice';
import { AuthTypes, UserTypes } from '../../../types';

export const AuthFacadeService = () => {
  const dispatch = useDispatch();
  const user: UserTypes.User | null = useSelector(selectAuthUser);

  const login = (credentials: AuthTypes.AuthLoginPayload) => {
    dispatch(actions.login(credentials));
  };

  return { user, login };
};

// export class AuthFacadeService {
//   readonly authUser: UserTypes.User | null = useSelector(selectAuthUser);

//   constructor( private authApi: AuthApi) {}
// }
