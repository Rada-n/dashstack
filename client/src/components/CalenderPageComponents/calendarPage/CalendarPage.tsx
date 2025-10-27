import React from 'react'
import Layout from '../../layout/Layout'
import Calendar from '../calendar/Calendar'
import { useGetCalendarEventsQuery } from '../../../fetch/calendarApi'
import Loading from '../../loading/Loading'
import EventList from '../eventList/EventList'
import styles from './CalendarPage.module.css'

const CalendarPage: React.FC = () => {
  const { error, isLoading, data: eventsData, refetch } = useGetCalendarEventsQuery();

  return (
    <Layout>
      <h1>Calendar</h1>
      <section className={styles.calendarContainer}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <EventList eventsData={eventsData.data} refetch={refetch} />
            <Calendar eventsData={eventsData.data} />
          </>
        )}
      </section>
    </Layout>
  );
};

export default CalendarPage;

