import { User } from '../user';

export interface AuthLoginPayload {
  username: string;
  password: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthLoginResponse {
  status: string;
  token: string;
  data: User;
}
