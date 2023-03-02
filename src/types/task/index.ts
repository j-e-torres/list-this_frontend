export interface Task {
  id: string;
  taskName: string;
  completed: boolean;
  listId: number;
}

export interface CompleteTaskPayload {
  taskId: string;
  token: string | null;
}
