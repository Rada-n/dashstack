import Search from "../../searchComponent/Search";
import styles from "./Menu.module.css";
import Notification from "../../../assets/menu/Notification.svg";
import UKFlag from "../../../assets/menu/UKFlag.png";
import Avatar from "../../../assets/menu/Avatar.png";
import React from "react";
import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useMediaQuery } from "react-responsive";


const Menu: React.FC = () => {
  const { setIsClickedBurger } = useActions();
  const { isClickedBurger } = useSelector((state: RootState) => state.navigate);
  const isSmallScreen = useMediaQuery({ query: '(min-width: 1420px)'})

  return (
    <nav className={styles.navContainer}>
      {isSmallScreen && <button
        className={`${
          isClickedBurger ? styles.burgerMenuClosed : styles.burgerMenu
        }`}
        onClick={() => setIsClickedBurger(true)}
      >
        <span></span>
      </button>}
      <Search placeholder={"Search"} />
      <div className={styles.navUserInfo}>
        <img src={Notification} alt="Notification" />
        <img src={UKFlag} alt="UK Flag" />
        <select className={styles.selectLanguage}>
          {["English", "Spanish", "Russian"].map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
        <img src={Avatar} className={styles.avatar} alt="Avatar" />
        <div className={styles.userInfoContainer}>
          <strong>Moni Roy</strong>
          <span>Admin</span>
        </div>
        <button className={styles.showMore}></button>
      </div>
    </nav>
  );
};

export default Menu;
