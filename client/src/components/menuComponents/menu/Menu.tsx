import Search from "../../searchComponent/Search";
import styles from "./Menu.module.css";
import Notification from "../../../assets/menu/Notification.svg";
import UKFlag from "../../../assets/menu/UKFlag.png";
import React from "react";
import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useMediaQuery } from "react-responsive";
import { useLocalStrorage } from "../../../hooks/useLocalStrorage";
import { useUser } from "../../../providers/UserProvider";
import Avatar from "../../avatar/Avatar";


const Menu: React.FC = () => {
  const { setIsClickedBurger } = useActions();
  const { isClickedBurger } = useSelector((state: RootState) => state.navigate);
  const isSmallScreen = useMediaQuery({ query: '(min-width: 1420px)'})
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
        <img src={Notification} alt="Notification" className={styles.notification} />
        <img src={UKFlag} alt="UK Flag" className={styles.flags}/>
        <select className={styles.selectLanguage}>
          {["English", "Spanish", "Russian"].map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
        <Avatar />
        <div className={styles.userInfoContainer}>
          <strong>{currentUser.username}</strong>
          <span>Admin</span>
        </div>
        <button className={styles.showMore}></button>
      </div>
    </nav>
  );
};

export default Menu;
