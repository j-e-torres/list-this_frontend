export interface ApiErrorResponse {
  status: string;
  message: string;
  errors?: Array<object>;
  stack?: string;
}

export type AllErrors = ApiErrorResponse | Error | undefined;

export enum GeneralErrors {
  GENERAL_ERROR = 'Something went wrong',
}
