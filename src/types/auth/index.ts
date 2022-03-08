import { User } from '../user';

export interface AuthLoginPayload {
  username: string;
  password: string;
}

export interface AuthLoginResponse {
  status: number;
  token: string;
  data: User;
}
