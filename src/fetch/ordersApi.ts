import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UseGetProductsQuery } from "../components/ordersPageComponents/ordersTable/OrdersTable";

export interface Order {
    id: number
    name: string
    address: string
    date: string
    type: string
    status: string
}

export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004/'}),
    endpoints: (builder) => ({
        getOrders: builder.query<UseGetProductsQuery, {page: number, limit: number}>({
            query: ({page, limit}) => `/orders?_page=${page}&_limit=${limit}`,
        }),
        getTotalOrders: builder.query<Order[], void>({
            query: () => '/orders'
        })
    })
})

export const { useGetOrdersQuery, useGetTotalOrdersQuery } = ordersApi