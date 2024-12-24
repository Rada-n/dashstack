import { DashboardPage } from "./components/mainPageComponents/dashboardPage/DashboardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsPage } from "./components/ProductsComponents/productsPageComponent/ProductsPage";
import FavoritesPage from "./components/favoritesPageComponents/favoritesPage/FavoritesPage";
import OrderPage from "./components/ordersPageComponents/orderPage/OrderPage";
import TodoPage from "./components/todoComponents/todoPage/TodoPage";
import CalenderPage from "./components/CalenderPageComponents/calendarPage/CalendarPage";
import SignUpPage from "./components/signUpComponents/SignUpPage";
import SignInPage from "./components/signInComponents/SignInPage";
import MainLayout from "./components/layout/mainLayout/MainLayout";
import AuthLayout from "./components/layout/authLayout/AuthLayout";
import InboxPage from "./components/inboxPageComponents/inboxPage/InboxPage";
import SettingsPage from "./components/settingsPage/SettingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="order-list" element={<OrderPage />} />
          <Route path="/to-do" element={<TodoPage />} />
          <Route path="/calender" element={<CalenderPage />} />
          <Route path='inbox' element={<InboxPage />} />
          <Route path='settings' element={<SettingsPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
