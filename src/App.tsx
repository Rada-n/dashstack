import { DashboardPage } from "./components/mainPageComponents/dashboardPage/DashboardPage";
import Menu from "./components/menuComponents/menu/Menu";
import Navigation from "./components/navigatinonComponents/navigation/Navigation";
import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsPage } from "./components/ProductsComponents/productsPageComponent/ProductsPage";
import FavoritesPage from "./components/favoritesPageComponents/favoritesPage/FavoritesPage";
import OrderPage from "./components/ordersPageComponents/orderPage/OrderPage";
import TodoPage from "./components/todoComponents/todoPage/TodoPage";
import CalenderPage from "./components/CalenderPageComponents/calendarPage/CalendarPage";
import SignUpPage from "./components/signUpComponents/SignUpPage";
import SignInPage from "./components/signInComponents/SignInPage";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.mainContainer}>
        <div className={styles.mainContentContainer}>
          {/* <Menu /> */}
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path='favorites' element={<FavoritesPage />} />
            <Route path='order-list' element={<OrderPage />}/>
            <Route path='/to-do' element={<TodoPage />}/>
            <Route path='/calender' element={<CalenderPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/signin' element={<SignInPage />} />
          </Routes>
        </div>
        {/* <Navigation /> */}
      </div>
    </BrowserRouter>
  );
}
export default App;
