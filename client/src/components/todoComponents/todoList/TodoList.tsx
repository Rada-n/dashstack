import React, { useEffect, useState } from "react";
import TodoItem from "../todoItem/TodoItem";
import styles from "./TodoList.module.css";
import { AnimatePresence } from "framer-motion";
import axios from "axios";
import Loading from "../../loading/Loading";
import { Todo } from "../todoPage/TodoPage";
import api from "../../../api/axiosInstance";

interface TodoProps {
  fetchTodoes: () => void;
  todoes: Todo[];
  isLoading: boolean;
  setTodoes: () => Todo[];
}


const TodoList: React.FC<TodoProps> = ({fetchTodoes, todoes, isLoading, setTodoes}) => {

  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchTodoes();
  }, []);
  

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

  const handleDeleteCheckedTodoes = async (): Promise<void> => {
    try {
      const idsToDelete = Array.from(checkedItems);
      await Promise.all(idsToDelete.map(async (id) => {
        await api.delete(`/api/delete_todoes/${id}`);
      }));
      setTodoes(prevTodoes => prevTodoes.filter(todo => !idsToDelete.includes(todo.id)));
      setCheckedItems(new Set());
    } catch (e) {
      console.log(e)
    }
  };

  const handleDeleteTodo = async (id: number): Promise<void> => {
    try {
      await api.delete(`/api/delete_todoes/${id}`);

      setTodoes(prevTodoes => prevTodoes.filter(todo => todo.id !== id));

      setCheckedItems(prevCheckedItems => {
        const newCheckedItems = new Set(prevCheckedItems);
        newCheckedItems.delete(id);
        return newCheckedItems;
      });
    } catch (e) {
      console.error("Ошибка при удалении задачи:", e);
    }
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <section className={styles.todoListContainer}>
      <AnimatePresence>
        {todoes && todoes.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            text={todo.body}
            id={todo.id}
            isChecked={checkedItems.has(todo.id)}
            toggleCheck={toggleCheck}
            handleDeleteTodo={handleDeleteTodo}
            handleDeleteCheckedTodoes={handleDeleteCheckedTodoes}
          />
        ))}
      </AnimatePresence>
    </section>
  );
};

export default TodoList;
