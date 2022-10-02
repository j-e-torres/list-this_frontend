import axios from 'axios';

import { getBackendUrl } from '../utils/environment/environment';

import { AuthTypes, UserTypes } from '../types';

export class AuthApi {
  private backendApi: string;

  constructor() {
    this.backendApi = getBackendUrl();
  }

  userLogin = async (
    creditials: AuthTypes.AuthLoginPayload,
  ): Promise<AuthTypes.AuthResponseWithToken> => {
    const res = await axios.post<AuthTypes.AuthResponseWithToken>(
      `${this.backendApi}/auth/login`,
      creditials,
    );
    return res.data;
  };

  registerUser = async (
    credentials: AuthTypes.AuthSignupPayload,
  ): Promise<AuthTypes.AuthResponseWithToken> => {
    const res = await axios.post<AuthTypes.AuthResponseWithToken>(
      `${this.backendApi}/auth/register`,
      credentials,
    );

    return res.data;
  };

  userLoginToken = async (
    token: AuthTypes.Token,
  ): Promise<AuthTypes.AuthResponse> => {
    const res = await axios.get<AuthTypes.AuthResponse>(
      `${this.backendApi}/auth/login`,
      { headers: { authorization: token } },
    );

    return res.data;
  };
}

export const authApi = new AuthApi();
