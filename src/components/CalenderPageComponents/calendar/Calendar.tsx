import React, { useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import EventInfo from '../eventInfo/EventInfo'
import { CalendarEvent } from '../../../fetch/calendarApi'

const Calendar:React.FC<{eventsData: CalendarEvent[]}> = ({ eventsData }) => {
    const [hoveredEvent, setHoveredEvent] = useState('')
    const calendarRef = useRef<any>(null);

    const handleEventMouseover = (info) => {
        setHoveredEvent(info.event.title);
    };

    const handleEventMouseout = () => {
        setHoveredEvent('');
    };


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
    <div style={{width: '834px'}}>
        <FullCalendar
         ref={calendarRef}
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={formattedEvents}
        eventMouseover={handleEventMouseover}
        eventMouseout={handleEventMouseout}
          />
          {hoveredEvent && (
        <EventInfo event={hoveredEvent} />
        )}
    </div>
  )
}

export default Calendar
