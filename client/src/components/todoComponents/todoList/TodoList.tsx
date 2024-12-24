import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import TodoItem from "../todoItem/TodoItem";
import styles from "./TodoList.module.css";
import { useActions } from "../../../hooks/useActions";
import { AnimatePresence } from "framer-motion";

const TodoList: React.FC = () => {
  const { todoes } = useSelector((state: AppState) => state.todo);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const { deleteCheckedtodoes } = useActions();

  const toggleCheck = (index: number): void => {
    setCheckedItems((prev) => {
      const newCheckedItems = new Set(prev);
      if (newCheckedItems.has(index)) {
        newCheckedItems.delete(index);
      } else {
        newCheckedItems.add(index);
      }
      return newCheckedItems;
    });
  };

  const handleDeleteCheckedTodoes = (): void => {
    deleteCheckedtodoes(Array.from(checkedItems));
    setCheckedItems(new Set());
  };

  return (
    <section className={styles.todoListContainer}>
      <AnimatePresence>
        {todoes.map((todo: string, index: number) => (
          <TodoItem
            key={index}
            text={todo}
            index={index}
            isChecked={checkedItems.has(index)}
            toggleCheck={toggleCheck}
            handleDeleteCheckedTodoes={handleDeleteCheckedTodoes}
          />
        ))}
      </AnimatePresence>
    </section>
  );
};

export default TodoList;
