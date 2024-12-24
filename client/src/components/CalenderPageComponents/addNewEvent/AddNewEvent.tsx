import React, { useCallback, useState } from "react";
import Modal from "../../modal/Modal";
import Calendar from "../../ordersPageComponents/calendar/Calendar";
import { CalendarEvent, usePostNewEventMutation } from "../../../fetch/calendarApi";
import { useDropzone } from 'react-dropzone';
import styles from './AddNewEvent.module.css'

const AddNewEvent: React.FC = ({ onClose }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [dateEvent, setDateEvent] = useState<{from: string; to: string}>({from: '', to: ''});
  const [isValid, setIsValid] = useState<boolean>(false)
  const [newEventData, setNewEventData] = useState<CalendarEvent>({
    title: "",
    description: "",
    address: "",
    imageUrl: "",
    dateRange: {},
    date: "",
    id: '',
  });
  const [postNewEvent] = usePostNewEventMutation()
  const onDrop = useCallback((acceptedFiles: any) => {
    setNewEventData((prevData) => ({
      ...prevData,
      imageUrl: acceptedFiles[0],
    }));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const formatDate = () => {
    let formatedDate;
    if (dateEvent.from && dateEvent.to) {
        const firstDay = new Date(dateEvent.from);
        const lastDay = new Date(dateEvent.to);
        return formatedDate = {from: firstDay, to: lastDay}
      } else if (dateEvent.from) {
       return formatedDate = new Date(dateEvent.from).toDateString()
      } else formatedDate = ''
      return formatedDate
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newEvent = {
        id: new Date().toString(),
        title: newEventData.title,
        description: newEventData.description,
        address: newEventData.address,
        date: dateEvent.to ? '' : formatDate(),
        dateRange: dateEvent.to ? formatDate() : '',
        imageUrl: newEventData.imageUrl ? newEventData.imageUrl.name : ''}

    try {
        if (!newEventData.title || !newEventData.description || !newEventData.address){
            setIsValid(true)
            return
        }
        const result = await postNewEvent(newEvent).unwrap();
        onClose()
        }
     catch (err) {
        console.error("Ошибка при отправке:", err);
      }
  }

  return (
    <Modal onClose={onClose}>
      <h2>Add new Event!</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {["Title", "Description", "Address"].map(
          (fieldName: string) => (
            <label key={fieldName}>
              {fieldName}:
              <input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewEventData((prevData: CalendarEvent) => ({
                    ...prevData,
                    [fieldName.toLowerCase()]: e.target.value,
                  }))
                }
              />
            </label>
          )
        )}
        {newEventData.imageUrl && (
          <p>Selected file: {newEventData.imageUrl.name}</p>
        )}
        <p>
          Date or date range:{" "}
          <button onClick={(e) => {setIsCalendarOpen(!isCalendarOpen); e.preventDefault()}} className={styles.openCalendarButton}>
            Open Calendar
          </button>
        </p>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <strong className={styles.dropImage}>Drop the image here ...</strong>
          ) : (
            <strong className={styles.dropImage}>Drag 'n' drop some image here, or click to select image</strong>
          )}
        </div>
        <button type="submit" className={styles.submitButton}>ADD</button>
        {isValid && <p className={styles.invalidWarning}>All fields must be filled!</p>}
      </form>
      {isCalendarOpen && (
          <div className={styles.calendarContainer} style={{ display: isCalendarOpen ? 'block' : 'none' }}>
              <Calendar
                setDateEvent={setDateEvent}
                isCalendarOpen={isCalendarOpen}
              />
          </div>
        )}
    </Modal>
  );
};

export default AddNewEvent;
