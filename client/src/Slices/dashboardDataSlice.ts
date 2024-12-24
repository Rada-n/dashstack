import { createSlice } from "@reduxjs/toolkit";
import { DashboardData, fetchDashboardData } from "../fetch/fetchDashboardData";

interface DashboardDataState {
  loading: boolean;
  error: string | undefined;
  dashboardData: DashboardData;
}

const initialState: DashboardDataState = {
  loading: false,
  error: "",
  dashboardData: [],
};

const dashboardDataSlice = createSlice({
  name: "dashboardData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const dashboardDataReducer = dashboardDataSlice.reducer;
export const dashboardDataActions = dashboardDataSlice.actions;

export type DashboardDataActions = typeof dashboardDataActions;
export type {DashboardDataState};

