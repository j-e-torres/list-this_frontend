export interface CreateListModalState {
  listName: string;
  taskName: string;
  tasks: CreateListModalTask[];
  error: string;
}

export interface CreateListModalTask {
  taskName: string;
}
