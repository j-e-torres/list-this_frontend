import axios, { AxiosResponse, AxiosError } from 'axios';

import { getBackendUrl } from '../utils/environment/environment';

import { AuthTypes, ErrorTypes } from '../types';

class AuthApi {
  private backendApi: string;

  constructor() {
    this.backendApi = getBackendUrl();
  }

  userLogin = async (
    creditials: AuthTypes.AuthLoginPayload,
  ): Promise<AuthTypes.AuthLoginResponse> => {
    const res = await axios.post<AuthTypes.AuthLoginResponse>(
      `${this.backendApi}/auth/login`,
      creditials,
    );
    return res.data;
  };
}

export const authApi = new AuthApi();
