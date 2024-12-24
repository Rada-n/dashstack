import React from 'react'
import Layout from '../../layout/Layout'
import Calendar from '../calendar/Calendar'
import { useGetCalendarEventsQuery } from '../../../fetch/calendarApi'
import Loading from '../../loading/Loading'
import EventList from '../eventList/EventList'
import styles from './CalendarPage.module.css'

const CalendarPage:React.FC = () => {
  const { error, isLoading, data: eventsData } = useGetCalendarEventsQuery()

  if (isLoading) {
    return <Loading />
}

  return (
    <Layout>
      <h1>Calendar</h1>
      <section className={styles.calendarContainer}>
        <EventList eventsData={eventsData} />
        <Calendar eventsData={eventsData} />
      </section>
    </Layout>
  )
}

export default CalendarPage
