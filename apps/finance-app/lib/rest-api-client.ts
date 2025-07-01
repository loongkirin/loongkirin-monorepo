import axios from 'axios'
import { siteConfig } from '@/config/site'
import { getAccessToken } from '../features/accounts/actions';

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

const RestApiClient = axios.create({
  baseURL: siteConfig.baseApiUrl,
  headers: { "Content-Type": "application/json" },
});

RestApiClient.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken()
    // getAccessToken().then(token => {
    //   console.log("request config accessToken", token)
    //   if (token && token.length > 0) {
    //     config.headers.Authorization = `Bearer ${token}`
    //     config.headers["x-authorization"] =`x-bearer ${token}`
    //   }
    // })
    console.log("request config accessToken", token)
    // if (token && token.length > 0) {
    //   config.headers.Authorization = `Bearer ${token}`
    //   config.headers["x-authorization"] =`x-bearer ${token}`
    // }
    config.headers.Authorization = `Bearer ${token}`
    config.headers["x-authorization"] =`x-bearer ${token}`  
    console.log("request config", config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
);

RestApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("response", error);
    // Handle errors globally
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
    }
    return Promise.reject(error)
  }
);

export default RestApiClient