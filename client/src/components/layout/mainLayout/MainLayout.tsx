import React from "react";
import Menu from "../../menuComponents/menu/Menu";
import { Outlet } from "react-router-dom";
import Navigation from "../../navigatinonComponents/navigation/Navigation";
import styles from './MainLayout.module.css'

const MainLayout: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContentContainer}>
        <Menu />
        <Outlet />
      </div>
      <Navigation />
    </div>
  );
};

export default MainLayout;
