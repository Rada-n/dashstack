import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TotalData, SalesData, DealsData } from "../interfaces/dashboardData";
import api from "../api/axiosInstance";


export type DashboardData = (TotalData | SalesData | DealsData)[]

export const fetchDashboardData = createAsyncThunk<DashboardData, void>(
  "data/fetchDashboardData",
  async () => {
    try {
      const promises = [
        api.get<TotalData>("/api/users"),
        api.get<TotalData>("/api/orders"),
        api.get<SalesData>("/api/sales"),
        api.get<DealsData>("/api/deals"),
        // axios.get('https://api.openweathermap.org/data/2.5/weather?lat=-8.335893&lon=112.642835&appid=3d426fedf00d9d3ef8cb36897488d7cb')
      ];

      const responses = await Promise.all(promises);
      return responses.map((response) => response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
