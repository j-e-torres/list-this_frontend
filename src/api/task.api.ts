import axios from 'axios';

import { getBackendUrl } from '../utils/environment/environment';

import { ApiResponse, AuthTypes, TaskTypes } from '../types';

export class TaskApi {
  private backendApi: string;
  constructor() {
    this.backendApi = getBackendUrl();
  }

  completeTask = async (
    payload: TaskTypes.TaskPayload,
  ): Promise<ApiResponse<TaskTypes.Task>> => {
    const res = await axios.patch<ApiResponse<TaskTypes.Task>>(
      `${this.backendApi}/tasks/${payload.taskId}/complete`,
      {},
      {
        headers: {
          authorization: `Bearer ${payload.token}`,
        },
      },
    );
    return res.data;
  };
  deleteTask = async (
    payload: TaskTypes.TaskPayload,
  ): Promise<ApiResponse<TaskTypes.Task>> => {
    const res = await axios.delete<ApiResponse<TaskTypes.Task>>(
      `${this.backendApi}/tasks/${payload.taskId}`,
      {
        headers: {
          authorization: `Bearer ${payload.token}`,
        },
      },
    );
    return res.data;
  };
}

export const taskApi = new TaskApi();
