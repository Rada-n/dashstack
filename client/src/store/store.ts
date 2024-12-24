import { configureStore } from "@reduxjs/toolkit";
import { navigationReducer, NavigationState } from "../Slices/navigationSlice";
import {
  dashboardDataReducer,
  DashboardDataState,
} from "../Slices/dashboardDataSlice";
import {
  productsApi,
  productReducer,
  ProductsState,
} from "../fetch/productsApi";
import {
  favoriteProductReduce,
  FavoriteProductsState,
} from "../Slices/favoriteProductSlice";
import { ordersApi } from "../fetch/ordersApi";
import { ordersReducer, OrdersState } from "../Slices/ordersSlice";
import { todoReducer, TodoState } from "../Slices/todoSlice";
import { calendarApi } from "../fetch/calendarApi";

export interface RootState {
  navigate: NavigationState;
  dashboardData: DashboardDataState;
  [productsApi.reducerPath]: productsApi.reducer;
  favoriteProduct: FavoriteProductsState;
  products: ProductsState;
  [ordersApi.reducerPath]: ordersApi.reducer;
  orders: OrdersState;
  todo: TodoState;
  [calendarApi.reducerPath]: calendarApi.reducer;
}

const rootReducer = {
  navigate: navigationReducer,
  dashboardData: dashboardDataReducer,
  [productsApi.reducerPath]: productsApi.reducer,
  favoriteProduct: favoriteProductReduce,
  products: productReducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
  orders: ordersReducer,
  todo: todoReducer,
  [calendarApi.reducerPath]: calendarApi.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(ordersApi.middleware)
      .concat(calendarApi.middleware)
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
