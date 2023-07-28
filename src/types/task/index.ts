export interface Task {
  id: string;
  taskName: string;
  completed: boolean;
  listId: number;
}

export interface TaskPayload {
  taskId: string;
  token: string | null;
}
