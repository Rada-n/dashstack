import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import TodoList from '../todoList/TodoList'
import styles from './TodoPage.module.css'
import AddButton from '../../addButton/AddButton'
import TodoForm from '../todoForm/TodoForm'
import { TodoState } from '../../../Slices/todoSlice'
import api from '../../../api/axiosInstance'

export interface Todo {
  id: number;
  body: string;
}

const TodoPage:React.FC = () => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState(true);
    const [todoes, setTodoes] = useState<Todo[]>([]);

    const fetchTodoes = async () => {
      setIsLoading(true);
      try {
        const response = await api.get<TodoState[]>("/api/todoes");
        setTodoes(response.data.data);
      } catch (e) {
        console.error(e);
      }  finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      fetchTodoes();
    }, []);

  return (
    <Layout>
        <div className={styles.header}>
            <h1>To-Do List</h1>
            <AddButton add={setIsAddBtnClicked}>Add New Task</AddButton>
            {isAddBtnClicked && <TodoForm onClose={setIsAddBtnClicked} fetchTodoes={fetchTodoes}  />}
        </div>
        {todoes.length !== 0 ? 
        (<TodoList fetchTodoes={fetchTodoes} todoes={todoes} isLoading={isLoading} setTodoes={setTodoes} />)
        : <p className={styles.emptyTasks}>There are no any tasks!</p>}      
    </Layout>
  )
}

export default TodoPage
