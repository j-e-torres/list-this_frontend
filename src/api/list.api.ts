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
}

export const listApi = new ListApi();
