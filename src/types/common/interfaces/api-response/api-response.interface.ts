import { MODELS } from '../../constants';

// TODO(juan): must update this interface
export type ApiResponse<T> = {
  status: number;
  data: { [key in MODELS]: T };
};
