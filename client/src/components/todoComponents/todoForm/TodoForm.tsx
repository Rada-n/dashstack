import React, { useEffect, useState } from "react";
import Modal from "../../modal/Modal";
import AddButton from "../../addButton/AddButton";
import styles from './TodoForm.module.css'
import api from "../../../api/axiosInstance";


const TodoForm: React.FC<{ onClose: () => void; fetchTodoes: () => void }> = ({ onClose, fetchTodoes }) => {
  const [newTask, setNewTask] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleAddNewTask = async () => {
    if (!newTask.trim() || isLoading) return;

    try {
      setIsLoading(true);
      await api.post("/api/new_todo", { body: newTask });
      await fetchTodoes();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.modalInner}>
        <h4>Write your new task</h4>
        <textarea
          className={styles.textInput}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddNewTask();
            }
          }}
        />
        {error && <p className={styles.error}>{error}</p>}
        <AddButton add={handleAddNewTask} disabled={isLoading}>
          {isLoading ? "Loading..." : "Add!"}
        </AddButton>
      </div>
    </Modal>
  );
};

export default TodoForm;
