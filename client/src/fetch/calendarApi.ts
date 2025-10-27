import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../api/axiosBaseQuery";

export type DateRange = { firstDate: string, lastDate: string} | null

export interface CalendarEvent {
    id: string
    title: string
    description: string
    date: string | null
    dateRange: DateRange
    address: string
    image_url: string
}

export const calendarApi = createApi({
    reducerPath: 'calendarApi',
    baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
    endpoints: (builder) => ({
        getCalendarEvents: builder.query({
            query: () => {
              return '/calendar';
            },
          }),
          postNewEvent: builder.mutation({
            query: (formData) => {
              return {
                url: '/calendar',
                method: 'POST',
                data: formData,
              };
            },
          })
          
    })
})

export const { useGetCalendarEventsQuery, usePostNewEventMutation } = calendarApi