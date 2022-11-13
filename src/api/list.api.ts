import axios from 'axios';

import { getBackendUrl } from '../utils/environment/environment';

import { ListTypes, ApiResponse, AuthTypes } from '../types';

export class ListApi {
  private backendApi: string;

  constructor() {
    this.backendApi = getBackendUrl();
  }

  createList = async (
    payload: ListTypes.CreateListPayload,
  ): Promise<ApiResponse<ListTypes.List>> => {
    const res = await axios.post<ApiResponse<ListTypes.List>>(
      `${this.backendApi}/lists`,
      payload,
      {
        headers: {
          authorization: `Bearer ${payload.token}`,
        },
      },
    );

    return res.data;
  };

  //   userLogin = async (
  //     creditials: AuthTypes.AuthLoginPayload,
  //   ): Promise<AuthTypes.AuthResponseWithToken> => {
  //     const res = await axios.post<AuthTypes.AuthResponseWithToken>(
  //       `${this.backendApi}/auth/login`,
  //       creditials,
  //     );
  //     return res.data;
  //   };

  //   registerUser = async (
  //     credentials: AuthTypes.AuthSignupPayload,
  //   ): Promise<AuthTypes.AuthResponseWithToken> => {
  //     const res = await axios.post<AuthTypes.AuthResponseWithToken>(
  //       `${this.backendApi}/auth/register`,
  //       credentials,
  //     );

  //     return res.data;
  //   };

  //   userLoginToken = async (
  //     token: AuthTypes.Token,
  //   ): Promise<AuthTypes.AuthResponse> => {
  //     const res = await axios.get<AuthTypes.AuthResponse>(
  //       `${this.backendApi}/auth/login`,
  //       { headers: { authorization: token } },
  //     );

  //     return res.data;
  //   };
}

export const listApi = new ListApi();
