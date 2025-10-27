import axios, { AxiosRequestConfig } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";

export const axiosBaseQuery =
  ({ baseUrl }: { baseUrl: string } = { baseUrl: "" }) =>
  async (args) => {
    try {
      const { url, method = "get", data, params } =
        typeof args === "string"
          ? { url: args, method: "get" }
          : args;

      const token = localStorage.getItem("authToken");

      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      return { data: result.data };
    } catch (axiosError: any) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };

