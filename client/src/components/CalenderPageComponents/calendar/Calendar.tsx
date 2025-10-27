import React, { useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import EventInfo from '../eventInfo/EventInfo'
import { CalendarEvent } from '../../../fetch/calendarApi'
import styles from './Calendar.module.css'

const Calendar:React.FC<{eventsData: CalendarEvent[]}> = ({ eventsData }) => {
    const calendarRef = useRef<any>(null);


    const formattedEvents = eventsData?.map(event => {
        const start = event.dateRange?.firstDate;
        const end = event.dateRange?.lastDate;

        return {
            title: event.title,
            start: start || event.date,
            end: end || undefined,
            description: event.description,
            extendedProps: {
                address: event.address,
                imageUrl: event.imageUrl
            }
        };
    }) || [];

  return (
    <div className={styles.calendar}>
        <FullCalendar
         ref={calendarRef}
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={formattedEvents}
          />
    </div>
  )
}

export default Calendar
