import React, { useState } from "react";
import { CalendarEvent } from "../../../fetch/calendarApi";
import AddButton from "../../addButton/AddButton";
import EventCard from "../eventCard/EventCard";
import styles from "./EventList.module.css";
import SeeMoreButton from "../seeMoreButton/SeeMoreButton";
import AddNewEvent from "../addNewEvent/AddNewEvent";
import { useMediaQuery } from "react-responsive";
import { useUser } from "../../../providers/UserProvider";
import ModalAuthUser from "../../modalAuthUser/ModalAuthUser";


const EventList: React.FC<{ eventsData: CalendarEvent[], refetch: () => void }> = ({
  eventsData, refetch
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAddButtonClicked, seTsAddButtonClicked] = useState<boolean>(false);
  const { currentUser } = useUser();

  const isSmallScreen = useMediaQuery({ query: "(max-width: 1000px)" });
  const isVerySmallScreen = useMediaQuery({ query: "(max-width: 750px)" });
  const isTinyScreen = useMediaQuery({ query: "(max-width: 456px)" });

  const getEventDate = (event: CalendarEvent): number =>
    new Date(event.dateRange?.firstDate || event.date).getTime();

  const filtredEvents = [...eventsData].sort(
    (a, b) => getEventDate(b) - getEventDate(a)
  );

  const eventsInPage: number = isVerySmallScreen ? 1 : isSmallScreen ? 2 : 4;
  const totalPages: number = Math.ceil((filtredEvents.length + 1) / eventsInPage);
  const indexOfLastEvent: number = currentPage * eventsInPage;
  const indexOfFirstEvent: number = indexOfLastEvent - eventsInPage;
  const currentFiltredEvents = filtredEvents.slice(indexOfFirstEvent, indexOfLastEvent) || [];
  const isLastPage: boolean = currentPage < totalPages;

  return (
    <aside className={`${styles.asideContainer} ${isTinyScreen ? styles.tinyScreenLayout : ""}`}>
      {isAddButtonClicked ? (
  currentUser ? (
    <AddNewEvent onClose={() => { seTsAddButtonClicked(false); refetch(); }} />
  ) : (
    <ModalAuthUser onClose={() => seTsAddButtonClicked(false)} />
  )
) : null}
      <div className={styles.asideInner}>
        <AddButton add={() => seTsAddButtonClicked(true)}>+ Add New Event</AddButton>
        <h4 className={styles.title}>You are going to</h4>
      </div>

      <section className={styles.eventsList}>
        {currentFiltredEvents.map((event: CalendarEvent) => (
          <EventCard key={event.id} event={event} />
        ))}
      </section>

      <SeeMoreButton setMore={() => setCurrentPage(isLastPage ? prev => prev + 1 : 1)}>
        {isLastPage ? "See more" : "<< Back"}
      </SeeMoreButton>
    </aside>
  );
};

export default EventList;
