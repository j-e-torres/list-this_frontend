import { MODELS } from '../../constants';

export type ApiResponse<T> = {
  status: number;
  data: { [key in MODELS]: T };
};
