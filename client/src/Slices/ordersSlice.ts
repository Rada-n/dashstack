import { createSlice } from "@reduxjs/toolkit";
import { Order, ordersApi } from "../fetch/ordersApi";

const ordersTypeSubcategories = {
  "Health & Medicine": ["Medicine"],
  "Book & Stationary": ["Book"],
  "Services & Industry": ["Watch"],
  "Fashion & Beauty": ["Bag"],
  "Home & Living": ["Lamp"],
  'Electronics': ["Electric"],
  "Mobile & Phone": ["IPhone"],
  'Accessories': ["Chain"],
};

export interface DateState {
  from: string | null;
  to: string | null;
}

interface OrdersState {
  ordersType: string[];
  ordersStatus: string[];
  date: DateState;
  totalOrders: Order[];
  filtredOrders: Order[];
  loading: boolean;
  error: any;
}

const initialState: OrdersState = {
  ordersType: [],
  ordersStatus: [],
  date: { from: "", to: "" },
  totalOrders: [],
  filtredOrders: [],
  loading: false,
  error: ''
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setDate(state, action) {
      const { from, to } = action.payload;
      state.date.from = from;
      state.date.to = to;
    },

    toggleOptionType: (state, action) => {
      const val = action.payload;
      state.ordersType = state.ordersType.includes(val)
        ? state.ordersType.filter(x => x !== val)
        : [...state.ordersType, val];
    },

    toggleOptionStatus: (state, action) => {
      const val = action.payload;
      state.ordersStatus = state.ordersStatus.includes(val)
        ? state.ordersStatus.filter(x => x !== val)
        : [...state.ordersStatus, val];
    },    

    setOptionsType(state, action) {
      const index = state.ordersType.indexOf(action.payload);
      if (index === -1) {
        state.ordersType.push(action.payload);
      } else {
        state.ordersType.splice(index, 1);
      }
    },

    setOptionsStatus(state, action) {
      const index = state.ordersStatus.indexOf(action.payload);
      if (index === -1) {
        state.ordersStatus.push(action.payload);
      } else {
        state.ordersStatus.splice(index, 1);
      }
    },

    setTotalOrders(state, action) {
      const { data, meta } = action.payload;
      state.totalOrders = data;
      state.meta = meta || null;
      state.filtredOrders = data; 
    },

    applyFilters(state) {
      const { date, totalOrders, ordersType, ordersStatus } = state;
      if (!Array.isArray(totalOrders)) return;

      let filteredOrders = [...totalOrders];

      if (date.from && date.to) {
        const firstDay = new Date(date.from);
        const lastDay = new Date(date.to);
        filteredOrders = filteredOrders.filter((order) => {
          const orderDate = new Date(order.date);
          return orderDate <= lastDay && orderDate >= firstDay;
        });
      } else if (date.from) {
        filteredOrders = filteredOrders.filter((order) => {
          const orderDate = new Date(order.date);
          return (
            orderDate.toDateString() === new Date(date.from).toDateString()
          );
        });
      }

      if (ordersType.length > 0) {
        const selectedSubcategories = new Set();
        ordersType.forEach((type: string) => {
          const subcategories = ordersTypeSubcategories[type];
          if (subcategories) {
            subcategories.forEach((subcategory: string) =>
              selectedSubcategories.add(subcategory)
            );
          }
        });
        filteredOrders = filteredOrders.filter((order) =>
          selectedSubcategories.has(order.type)
        );
      }

      if (ordersStatus.length > 0) {
        filteredOrders = filteredOrders.filter((order) =>
          ordersStatus.includes(order.status)
        );
      }

      if (
        ordersType.length === 0 &&
        ordersStatus.length === 0 &&
        !date.from &&
        !date.to
      ) {
        filteredOrders = totalOrders;
      }

      state.filtredOrders = filteredOrders;
    },

    resetAllFilters(state) {
      state.filtredOrders = state.totalOrders;
      state.ordersType = [];
      state.ordersStatus = [];
      state.date.from = "";
      state.date.to = "";
    },
  },
});


export const ordersActions = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;

export type ordersActions = typeof ordersActions;
export type { OrdersState };
