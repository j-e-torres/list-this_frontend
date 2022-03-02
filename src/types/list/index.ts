import { User } from '../user/';

export interface List {
  id: string;
  listOwner: User,
  listName: string;
  listNotes: string;
}
