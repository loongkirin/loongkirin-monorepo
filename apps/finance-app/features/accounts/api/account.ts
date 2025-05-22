
export interface Request<T> {
  data: T;
}

export const createRequest = <T>(data: T): Request<T> => ({
  data: data,
});

export interface Response<T> {
  code: number;
  message: string;
  result: {data: T};
  isSuccess(): boolean;
}

export const createResponse = <T>(code: number, message: string, data: T): Response<T> => ({
  code,
  message,
  result: {data: data},
  isSuccess() {
    return this.code === 200;
  }
});

export interface Tenant {
  tenant_id: string;
  tenant_name: string;
  created_at: number;
}

export interface OAuth {
  session_id: string;
  access_token: string;
  refresh_token: string;
  expired_at: number;
}

export interface User {
  user_id: string;
  user_name: string;
  phone: string;
  email: string;
  password: string;
  tenant: Tenant;
  oauth: OAuth;
}

