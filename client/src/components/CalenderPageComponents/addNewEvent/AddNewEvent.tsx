import React, { useCallback, useEffect, useRef, useState } from "react";
import Modal from "../../modal/Modal";
import Calendar from "../../ordersPageComponents/calendar/Calendar";
import { CalendarEvent, usePostNewEventMutation } from "../../../fetch/calendarApi";
import { useDropzone } from 'react-dropzone';
import styles from './AddNewEvent.module.css'

const AddNewEvent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [dateEvent, setDateEvent] = useState<{ from: string; to: string }>({ from: "", to: "" });
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");


  const [newEventData, setNewEventData] = useState<CalendarEvent>({
    title: "",
    description: "",
    address: "",
    imageUrl: "",
    dateRange: {},
    date: "",
    id: "",
  });

  const [postNewEvent] = usePostNewEventMutation();
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const onDrop = useCallback((acceptedFiles: any) => {
    setNewEventData((prevData) => ({
      ...prevData,
      imageUrl: acceptedFiles[0],
    }));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isCalendarOpen && calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!newEventData.title || !newEventData.description || !newEventData.address) {
      setIsValid(true);
      setIsSubmitting(false);
      return;
    }

    const hasRange = !!dateEvent.to;
    const formData = new FormData();

    formData.append("title", newEventData.title);
    formData.append("description", newEventData.description);
    formData.append("address", newEventData.address);

    if (hasRange) {
      formData.append("first_date", new Date(dateEvent.from).toISOString());
      formData.append("last_date", new Date(dateEvent.to).toISOString());
    } else if (dateEvent.from) {
      formData.append("date", new Date(dateEvent.from).toISOString());
    }

    if (newEventData.imageUrl) {
      formData.append("image_url", newEventData.imageUrl);
    }

    try {
      await postNewEvent(formData).unwrap();
      onClose();
    } catch (err) {
      setError(err.data.message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <h2>Add new Event!</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {["Title", "Description", "Address"].map((fieldName) => (
          <label key={fieldName}>
            {fieldName}:
            <input
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewEventData((prevData) => ({
                  ...prevData,
                  [fieldName.toLowerCase()]: e.target.value,
                }))
              }
            />
          </label>
        ))}

        {newEventData.imageUrl && (
          <p className={styles.selectedFile}>Selected file: {newEventData.imageUrl.name}</p>
        )}

        <p className={styles.dateContainer}>
          Date or date range:{" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsCalendarOpen(!isCalendarOpen);
            }}
            className={styles.openCalendarButton}
            type="button"
          >
            {isCalendarOpen ? "Close Calendar" : "Open Calendar"}
          </button>
        </p>

        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <strong className={styles.dropImage}>Drop the image here ...</strong>
          ) : (
            <strong className={styles.dropImage}>
              Drag 'n' drop some image here, or click to select image
            </strong>
          )}
        </div>

        {isValid && <p className={styles.invalidWarning}>All fields must be filled!</p>}
        {error && <p className={styles.invalidWarning}>{error}</p>}

        <button
          type="submit"
          className={`${styles.submitButton} ${isSubmitting ? styles.disabledButton : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Add!"}
        </button>
      </form>

      {isCalendarOpen && (
        <div
          className={styles.calendarContainer}
          ref={calendarRef}
          style={{ display: isCalendarOpen ? "block" : "none" }}
        >
          <Calendar setDateEvent={setDateEvent} isCalendarOpen={isCalendarOpen} />
        </div>
      )}
    </Modal>
  );
};

export default AddNewEvent;
