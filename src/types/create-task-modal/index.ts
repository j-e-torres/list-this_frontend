import { CreateListModalTask } from '../create-list-modal';

export interface CreateTaskModalState {
  taskName: string;
  success: '';
  error: string;
  tasks: CreateListModalTask[];
}
