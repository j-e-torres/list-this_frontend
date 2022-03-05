import axios, { AxiosResponse } from 'axios';

import { getBackendUrl } from '../utils/environment/environment';

import { AuthTypes } from '../types';

class AuthApi {
  backendApi: string;

  constructor() {
    this.backendApi = getBackendUrl();
  }

  userLogin = async (
    creditials: AuthTypes.AuthCredentials,
  ): Promise<AuthTypes.AuthLoginResponse> => {
    const res = await axios.post<AuthTypes.AuthLoginResponse>(
      `${this.backendApi}/auth/login`,
      creditials,
    );
    return res.data;
  };
}

export const authApi = new AuthApi();
