import React, { useState } from "react";
import Modal from "../../modal/Modal";
import AddButton from "../../addButton/AddButton";
import { useActions } from "../../../hooks/useActions";
import styles from './TodoForm.module.css'

const TodoForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [newTask, setNewTask] = useState<string>("");
  const { addTodo } = useActions();

  const handleAddNewTask = () => {
    addTodo(newTask);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.modalInner}>
        <h4>Write your new task</h4>
        <input
          type="textarea"
          className={styles.textInput}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setNewTask(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === 'Enter') {
                  handleAddNewTask()
                }
              }}
        />
        <AddButton add={handleAddNewTask}>Add!</AddButton>
      </div>
    </Modal>
  );
};

export default TodoForm;
