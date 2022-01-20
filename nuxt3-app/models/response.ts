import { AxiosResponse } from 'axios';

interface ErrorResponse {
  status: 'not ok';
  message: string;
}

interface SuccessResponse<T> {
  status: 'ok';
  data: T;
}

export type ResData<T> = AxiosResponse<ErrorResponse | SuccessResponse<T>>;
