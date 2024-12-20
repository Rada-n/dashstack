import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TotalData, SalesData, DealsData } from "../interfaces/dashboardData";


export type DashboardData = (TotalData | SalesData | DealsData)[]

export const fetchDashboardData = createAsyncThunk<DashboardData, void>(
  "data/fetchDashboardData",
  async () => {
    try {
      const promises = [
        axios.get<TotalData>("http://localhost:3003/users"),
        axios.get<TotalData>("http://localhost:3003/orders"),
        axios.get<SalesData>("http://localhost:3002/sales"),
        axios.get<DealsData>("http://localhost:3000/deals"),
        axios.get('https://api.openweathermap.org/data/2.5/weather?lat=-8.335893&lon=112.642835&appid=3d426fedf00d9d3ef8cb36897488d7cb')
      ];

      const responses = await Promise.all(promises);
      return responses.map((response) => response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
