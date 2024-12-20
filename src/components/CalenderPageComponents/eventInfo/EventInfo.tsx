import React from 'react'
import styles from './EventInfo.module.css'
import { CalendarEvent } from '../../../fetch/calendarApi'

const EventInfo:React.FC = ({ event }) => {
  return (
    <article className={styles.infoContainer}>
      <img src={event.extendedProps.imageUrl} alt={event.title} className={styles.image} />
      <h3 className={styles.title}>{event.title}</h3>
      <p className={styles.description}>{event.description}</p>
      <span className={styles.date}>{event.date}</span>
      <span className={styles.address}>{event.extendedProps.address}</span>
    </article>
  )
}

export default EventInfo
