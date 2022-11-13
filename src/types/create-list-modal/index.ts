export interface CreateListModalState {
  listName: string;
  taskName: string;
  tasks: CreateListModalTask[];
  error: string;
  success: string;
}

export interface CreateListModalTask {
  taskName: string;
}
