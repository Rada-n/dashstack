import { createSlice } from "@reduxjs/toolkit";

interface TodoState {
    todoes: string[] | Storage
}

const initialState = {
    todoes: JSON.parse(localStorage.getItem('todoes')) || []
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, action) {
            state.todoes.push(action.payload)
            localStorage.setItem('todoes', JSON.stringify(state.todoes))
        },
        deleteTodo(state, action) {
            state.todoes.splice(action.payload, 1)
            localStorage.setItem('todoes', JSON.stringify(state.todoes))
        },
        deleteCheckedtodoes(state, action) {
            state.todoes = state.todoes.filter((_: null, index: number) => !action.payload.includes(index))
            localStorage.setItem('todoes', JSON.stringify(state.todoes))
        }
    }
})

export const todoReducer = todoSlice.reducer
export const todoActions = todoSlice.actions

export type todoActions = typeof todoActions
export type { TodoState }