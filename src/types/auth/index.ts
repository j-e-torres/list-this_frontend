import { User } from '../user';

export interface AuthToken {
  accessToken: string;
  tokenType: string;
}

export interface AuthLoginPayload {
  username: string;
  password: string;
}

export interface AuthResponse {
  status: number;
  token: AuthToken;
  data: { user: User };
}

export interface AuthSignupPayload {
  username: string;
  password: string;
  displayName: string;
}
