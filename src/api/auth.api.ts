import axios from 'axios';

import { getBackendUrl } from '../utils/environment/environment';

import { AuthTypes } from '../types';

export class AuthApi {
  private backendApi: string;

  constructor() {
    this.backendApi = getBackendUrl();
  }

  userLogin = async (
    creditials: AuthTypes.AuthLoginPayload,
  ): Promise<AuthTypes.AuthResponse> => {
    const res = await axios.post<AuthTypes.AuthResponse>(
      `${this.backendApi}/auth/login`,
      creditials,
    );
    return res.data;
  };

  registerUser = async (
    credentials: AuthTypes.AuthSignupPayload,
  ): Promise<AuthTypes.AuthResponse> => {
    const res = await axios.post<AuthTypes.AuthResponse>(
      `${this.backendApi}/auth/register`,
      credentials,
    );

    return res.data;
  };
}

export const authApi = new AuthApi();
