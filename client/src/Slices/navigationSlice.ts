import { createSlice } from "@reduxjs/toolkit";

interface NavigationState {
    isClickedBurger: boolean
    inputSearchProduct: string
}

const initialState: NavigationState = {isClickedBurger: false, inputSearchProduct: ''}

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setIsClickedBurger (state, action) {
            state.isClickedBurger = action.payload;
        },
        setInputSearchProduct (state, action) {
            state.inputSearchProduct = action.payload;
        }
    }
})

export const navigationActions = navigationSlice.actions;
export const navigationReducer = navigationSlice.reducer;

export type NavigationActions = typeof navigationActions;
export type {NavigationState}