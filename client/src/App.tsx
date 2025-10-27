import { DashboardPage } from "./components/mainPageComponents/dashboardPage/DashboardPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsPage } from "./components/ProductsComponents/productsPageComponent/ProductsPage";
import FavoritesPage from "./components/favoritesPageComponents/favoritesPage/FavoritesPage";
import OrderPage from "./components/ordersPageComponents/orderPage/OrderPage";
import TodoPage from "./components/todoComponents/todoPage/TodoPage";
import SignUpPage from "./components/signUpComponents/SignUpPage";
import SignInPage from "./components/signInComponents/SignInPage";
import MainLayout from "./components/layout/mainLayout/MainLayout";
import AuthLayout from "./components/layout/authLayout/AuthLayout";
import InboxPage from "./components/inboxPageComponents/inboxPage/InboxPage";
import SettingsPage from "./components/settingsPage/SettingsPage";
import CalendarPage from "./components/CalenderPageComponents/calendarPage/CalendarPage";
import { AxiosInterceptorProvider } from "./providers/AxiosInterceptorProvider";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="favorites" element={<ProtectedRoute> <FavoritesPage /> </ProtectedRoute>} />
            <Route path="order-list" element={<OrderPage />} />
            <Route path="/to-do" element={<ProtectedRoute> <TodoPage /> </ProtectedRoute>} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="inbox" element={<ProtectedRoute> <InboxPage /> </ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute> <SettingsPage /> </ProtectedRoute>} />
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
