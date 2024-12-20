import React from "react";
import styles from "./TodoItem.module.css";
import Star from "../star/Star";
import Close from "../../../assets/todo/Close.svg";
import Delete from "../../../assets/todo/Delete.svg";
import { useActions } from "../../../hooks/useActions";
import { motion } from 'framer-motion';

interface TodoItemProps {
    text: string
    index: number
    isChecked: boolean
    toggleCheck: (index: number) => void
    handleDeleteCheckedTodoes: () => void
}

const TodoItem: React.FC<TodoItemProps> = ({ text, index, isChecked, toggleCheck, handleDeleteCheckedTodoes }) => {
  const { deleteTodo } = useActions()

  const itemVariants = {
    hidden: { opacity: 0.5, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.1 } },
    exit: { opacity: 0.5, x: 100, transition: { duration: 0.1 } },
  };


  return (
    <motion.article
    variants={itemVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
      className={`${styles.todoContainer} ${isChecked ? styles.selected : ""}`}
    >
      <div className={styles.contentContainer}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => toggleCheck(index)}
          className={styles.checkbox}
        />
        <span className={styles.task}>{text}</span>
      </div>
      <div className={styles.contentContainer}>
        {isChecked ? (
          <button className={styles.deleteCheckedButton} onClick={() => handleDeleteCheckedTodoes()}>
            <img src={Delete} />
          </button>
        ) : (
          <>
            <button className={styles.star}>
                <Star />
            </button>
            <button className={styles.deleteButton} onClick={() => deleteTodo(index)}>
              <img src={Close} />
            </button>
          </>
        )}
      </div>
    </motion.article>
  );
};

export default TodoItem;
