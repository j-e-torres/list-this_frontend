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
  data: { user: User };
}

export interface AuthResponseWithToken extends AuthResponse {
  token: AuthToken;
}

export interface AuthSignupPayload extends AuthLoginPayload {
  displayName: string;
}
