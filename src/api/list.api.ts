import axios from 'axios';

import { getBackendUrl } from '../utils/environment/environment';

import {
  ListTypes,
  ApiResponse,
  AuthTypes,
  TaskTypes,
  UserTypes,
} from '../types';

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

  fetchLists = async (
    payload: ListTypes.FetchListsPayload,
  ): Promise<ApiResponse<ListTypes.List[]>> => {
    const res = await axios.get<ApiResponse<ListTypes.List[]>>(
      `${this.backendApi}/users/${payload.userId}/lists`,
      {
        headers: {
          authorization: `Bearer ${payload.token}`,
        },
      },
    );
    return res.data;
  };

  fetchList = async (
    payload: ListTypes.FetchListPayload,
  ): Promise<ApiResponse<ListTypes.List>> => {
    const res = await axios.get<ApiResponse<ListTypes.List>>(
      `${this.backendApi}/lists/${payload.listId}`,
      {
        headers: {
          authorization: `Bearer ${payload.token}`,
        },
      },
    );

    return res.data;
  };

  fetchListUsers = async (
    payload: ListTypes.FetchListPayload,
  ): Promise<ApiResponse<UserTypes.User[]>> => {
    const res = await axios.get<ApiResponse<UserTypes.User[]>>(
      `${this.backendApi}/lists/${payload.listId}/users`,
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
