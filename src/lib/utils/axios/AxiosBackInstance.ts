import axios, { AxiosInstance } from "axios";

export const axiosBackInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_END_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
