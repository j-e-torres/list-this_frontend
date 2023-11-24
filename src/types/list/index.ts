import { User } from '../user';
import { Task } from '../task';

export interface List {
  id: string;
  listOwner: User;
  listName: string;
  listNotes: string;
  tasks: Task[];
}

export interface CreateListPayload {
  list: { listName: string; listOwner: string | undefined };
  tasks: { taskName: string }[];
  token: string | null;
}

export interface FetchListsPayload {
  userId: string;
  token: string | null;
}

export interface UpdateListPayload {
  tasks?: { taskName: string }[];
  token: string | null;
  listNotes?: string;
  listId: string;
}

export interface FetchListPayload {
  listId?: string;
  token: string | null;
}
