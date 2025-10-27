import Search from "../../searchComponent/Search";
import styles from "./Menu.module.css";
import Notification from "../../../assets/menu/Notification.svg";
import UKFlag from "../../../assets/menu/UKFlag.png";
import React, { useEffect, useState } from "react";
import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useMediaQuery } from "react-responsive";
import Avatar from "../../avatar/Avatar";
import axios from "axios";
import { UserData } from "../../../hooks/useLocalStrorage";
import { Link } from "react-router-dom";
import { useUser } from "../../../providers/UserProvider";


const Menu: React.FC = () => {
  const { setIsClickedBurger } = useActions();
  const { isClickedBurger } = useSelector((state: RootState) => state.navigate);
  const isSmallScreen = useMediaQuery({ query: '(min-width: 1420px)'})
  const isVerySmallScreen = useMediaQuery({ query: '(min-width: 600px)'})
  const isVeryVerySmallScreen = useMediaQuery({ query: '(min-width: 280px)'})
  const { currentUser } = useUser();

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
        {currentUser && <img src={Notification} alt="Notification" className={styles.notification} />}
        <img src={UKFlag} alt="UK Flag" className={styles.flags}/>
        <select className={styles.selectLanguage}>
          {["English", "Spanish", "Russian"].map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
        {currentUser ? isVeryVerySmallScreen ? <Avatar image={currentUser.image} /> : '' : ''}
        <div className={styles.userInfoContainer}>
          {isVerySmallScreen ?  <Link to={"/settings"} className='link'><strong>{currentUser?.name}</strong></Link> : ''}
        </div>
      </div>
    </nav>
  );
};

export default Menu;
