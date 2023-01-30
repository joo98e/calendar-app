import axios, { AxiosInstance } from "axios";
import ApiBaseUrl from "./constants/ApiBaseUrl";

export default function customAxiosInstance(): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: ApiBaseUrl,
    transformResponse: (data, headers, statusCode) => {
      const isSuccess = statusCode <= 400;

      return {
        data,
        success: isSuccess
      };
    }
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    ({ config, request, response, ...err }) => {
      return Promise.reject({
        config,
        response,
        ...err
      });
    }
  );

  return axiosInstance;
}
