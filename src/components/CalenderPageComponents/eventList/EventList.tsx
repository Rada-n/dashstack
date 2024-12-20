import React, { useState } from "react";
import { CalendarEvent } from "../../../fetch/calendarApi";
import AddButton from "../../addButton/AddButton";
import EventCard from "../eventCard/EventCard";
import styles from "./EventList.module.css";
import SeeMoreButton from "../seeMoreButton/SeeMoreButton";
import AddNewEvent from "../addNewEvent/AddNewEvent";

const EventList: React.FC<{ eventsData: CalendarEvent[] }> = ({
  eventsData,
}) => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isAddButtonClicked, seTsAddButtonClicked] = useState<boolean>(false)
  const getEventDate = (event: CalendarEvent): number =>
    new Date(event.dateRange?.firstDate || event.date).getTime();

  const filtredEvents = [...eventsData].sort(
      (a: CalendarEvent, b: CalendarEvent): number =>
        getEventDate(b) - getEventDate(a)
    );

    const eventsInPage:number = 4;
    const totalPages:number = Math.ceil((filtredEvents.length + 1) / eventsInPage);
    const indexOfLastEvent:number = currentPage * eventsInPage;
    const indexOfFirstEvent:number = indexOfLastEvent - eventsInPage;
    const currentFiltredEvents:CalendarEvent[] = filtredEvents?.slice(indexOfFirstEvent, indexOfLastEvent) || [];
    const isLastPage:boolean = currentPage < totalPages;

  return (
    <aside className={styles.asideContainer}>
        {isAddButtonClicked && <AddNewEvent onClose={() => seTsAddButtonClicked(false)} />}
      <div className={styles.asideInner}>
          <AddButton add={() => seTsAddButtonClicked(true)}>+ Add New Event</AddButton>
          <h4 className={styles.title}>You are going to</h4>
      </div>
      <section className={styles.eventsList}>
        {currentFiltredEvents.map((event: CalendarEvent) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>
      <SeeMoreButton setMore={() => setCurrentPage(isLastPage ? prevPage => prevPage + 1 : 1)}>
        {isLastPage ? 'See more' : '<< Back' }
      </SeeMoreButton>
    </aside>
  );
};

export default EventList;
