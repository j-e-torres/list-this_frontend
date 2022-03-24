import { User } from '../user';

export interface AuthLoginPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  status: number;
  token: string;
  data: User;
}

export interface AuthSignupPayload {
  username: string;
  password: string;
  displayName: string;
}
