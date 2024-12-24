import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import TodoList from '../todoList/TodoList'
import styles from './TodoPage.module.css'
import AddButton from '../../addButton/AddButton'
import TodoForm from '../todoForm/TodoForm'

const TodoPage:React.FC = () => {
    const [isAddBtnClicked, setIsAddBtnClicked] = useState<boolean>(false)

  return (
    <Layout>
        <div className={styles.header}>
            <h1>To-Do List</h1>
            <AddButton add={setIsAddBtnClicked}>Add New Task</AddButton>
            {isAddBtnClicked && <TodoForm onClose={setIsAddBtnClicked} />}
        </div>
        <TodoList />
    </Layout>
  )
}

export default TodoPage
