import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UseGetProductsQuery } from "../components/ordersPageComponents/ordersTable/OrdersTable";
import { axiosBaseQuery } from "../api/axiosBaseQuery";

export interface Order {
    id: number
    name: string
    address: string
    date: string
    type: string
    status: string
}

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8000/api" }),
    endpoints: (builder) => ({
        getOrders: builder.query<any, { 
            page: number; 
            limit: number;
            type?: string[]; 
            status?: string[];
            from?: string;
            to?: string;
          }>({
            query: ({ page, limit, type, status, from, to }) => ({
              url: `/orders`,
              method: "get",
              params: {
                page,
                limit,
                type: type && type.length > 0 ? type : undefined,
                status: status && status.length > 0 ? status : undefined,
                from,
                to,
              },
            }),
          }),
        })
          
  });
  
  export const { useGetOrdersQuery } = ordersApi;
  
