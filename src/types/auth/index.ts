import { User } from '../user';
import { MODELS } from '../common';
import { ApiResponse } from '../common';

export interface AuthToken {
  accessToken: string;
  tokenType: string;
}

export interface AuthLoginPayload {
  username: string;
  password: string;
}

export interface AuthResponseWithToken extends ApiResponse<User> {
  token: AuthToken;
}

export interface AuthSignupPayload extends AuthLoginPayload {
  displayName: string;
}

export type Token = string;
