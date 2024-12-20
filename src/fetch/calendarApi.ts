import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type DateRange = { firstDate: string, lastDate: string} | null

export interface CalendarEvent {
    id: string
    title: string
    description: string
    date: string | null
    dateRange: DateRange
    address: string
    imageUrl: string
}

export const calendarApi = createApi({
    reducerPath: 'calendarApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005/' }),
    endpoints: (builder) => ({
        getCalendarEvents: builder.query<CalendarEvent[], void>({
            query: () => '/calendar'
        }),
        postNewEvent: builder.mutation({
            query: (newEvent) => ({
                url: '/calendar',
                method: 'POST',
                body: JSON.stringify(newEvent),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
        })
    })
})

export const { useGetCalendarEventsQuery, usePostNewEventMutation } = calendarApi