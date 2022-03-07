import axios, { AxiosResponse } from 'axios';

import util from 'util';

import { getBackendUrl } from '../utils/environment/environment';

import { AuthTypes } from '../types';

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
  // userLogin = async (creditials) => {
  //   try {
  //     const res = await axios.post(`${this.backendApi}/auth/login`, creditials);
  //     return res.data;
  //   } catch (error: any) {
  //     console.log('------ERROR', error.response.data);
  //     console.log('------ERROR2', error.response.status);
  //     // console.log(
  //     //   '------ERROR',
  //     //   util.inspect(error, {
  //     //     depth: 3,
  //     //   }),
  //     // );
  //     // return `-----ERROR, ${error}`;
  //   }
  // };
}

export const authApi = new AuthApi();
