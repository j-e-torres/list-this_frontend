import { List } from '../list';

export interface User {
  id: string;
  role: Role,
  username: string;
  displayName: string;
  lists: List[];
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin'
}
