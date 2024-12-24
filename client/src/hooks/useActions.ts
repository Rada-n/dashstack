import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { navigationActions } from "../Slices/navigationSlice";
import { dashboardDataActions } from "../Slices/dashboardDataSlice";
import { fetchDashboardData } from "../fetch/fetchDashboardData";
import { favoriteProductActions } from "../Slices/favoriteProductSlice";
import { addProduct, deleteProduct, editProduct, productActions } from "../fetch/productsApi";
import { ordersActions } from "../Slices/ordersSlice";
import { todoActions } from "../Slices/todoSlice";

const rootActions = {
  ...navigationActions,
  ...dashboardDataActions,
  fetchDashboardData,
  ...favoriteProductActions,
  editProduct,
  deleteProduct,
  addProduct,
  ...ordersActions,
  ...todoActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
