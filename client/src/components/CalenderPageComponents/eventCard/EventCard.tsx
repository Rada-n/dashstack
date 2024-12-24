import React from "react";
import styles from "./EventCard.module.css";
import { CalendarEvent } from "../../../fetch/calendarApi";

const EventCard: React.FC<{ event: CalendarEvent }> = ({ event }) => {
    const formatDate = (eventDate) => {
        const date = new Date(eventDate)
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
 
        return `${day} ${month} ${year} at ${hours}.${minutes.toString().padStart(2, '0')} ${ampm}`;}


  const date = (): string | null => {
    const start = event.dateRange?.firstDate;
    const end = event.dateRange?.lastDate;
    return start && end ? `${formatDate(start)} - ${formatDate(end)}` : formatDate(event.date);
  };

  return (
    <article className={styles.cardContainer}>
      <div className={styles.cardInner}>
        <img src={event.imageUrl} alt={event.title} className={styles.image} />
        <div className={styles.eventInfo}>
          <h5 className={styles.title}>{event.title}</h5>
          <p>{date()}</p>
          <p className={styles.address}>{event.address}</p>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
