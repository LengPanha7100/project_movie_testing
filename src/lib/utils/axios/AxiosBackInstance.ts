import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getServerSession } from "next-auth";

export const axiosBackInstance: AxiosInstance = axios.create({
  baseURL: "http://34.87.39.167:9082/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosBackInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const session = await getServerSession(authOptions);

    if (session?.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
