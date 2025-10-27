import styles from "./Navigation.module.css";
import NavButton from "../navButton/NavButton";
import { useState, useEffect } from "react";
import { navIcons, navClosedIcons } from "./navigationIcons";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useActions } from "../../../hooks/useActions";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";
import { useUser } from "../../../providers/UserProvider";
import api from "../../../api/axiosInstance";

const Navigation: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const { isClickedBurger } = useSelector((state: RootState) => state.navigate);
  const { setIsClickedBurger } = useActions();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1420px)" });
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, refreshUser } = useUser();
  const currentPath =
    location.pathname === "/" ? "dashboard" : location.pathname.slice(1);

  const protectedPages = ["Favorites", "To-Do", "Inbox", "Settings"];

  const handleButtonClick = (title: string) => {
    if (title !== "Home") setActiveButton(title);

    if (title === "Home" && !isSmallScreen) setIsClickedBurger(false);

    if (title === "Logout") handleLogout();
  };

  const handleLogout = async () => {
    try {
      await api.post("/api/logout");
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("authToken");
      setActiveButton(null);
      navigate("/signin");
      refreshUser();
    }
  };

  useEffect(() => {
    if (isSmallScreen) setIsClickedBurger(true);
  }, [isSmallScreen, setIsClickedBurger]);

  return (
    <aside
      className={`${
        isClickedBurger ? styles.navContainerClosed : styles.navContainer
      }`}
    >
      {!isClickedBurger && (
        <div className={styles.mainLogo}>
          Dash<span>Stack</span>
        </div>
      )}

      <div className={styles.navList}>
        {isClickedBurger && (
          <div className={styles.navItem}>
            <NavButton
              title={isClickedBurger ? "" : "Home"}
              iconClosed={navClosedIcons["Home"]}
              isActive={activeButton === "Home"}
              onClick={() => handleButtonClick("Home")}
            />
          </div>
        )}

        {[
          ["Dashboard", "Products", "Favorites", "Order List"],
          ["Calendar", "To-Do", "Inbox"],
          ["Settings", "Logout"],
        ].map((group, index) => (
          <ul
            key={index}
            className={
              isClickedBurger || isSmallScreen
                ? styles.navButtonsUngroup
                : styles.navButtonsGroup
            }
          >
            {!isClickedBurger && index === 1 && (
              <p className={styles.textPages}>PAGES</p>
            )}

            {group
              .filter(
                (title) => !(protectedPages.includes(title) && !currentUser)
              )
              .map((title) => {
                const content = (
                  <li
                    key={title}
                    className={`${styles.navItem} ${
                      activeButton === title ? styles.active : ""
                    }`}
                  >
                    <NavButton
                      title={isClickedBurger ? "" : title}
                      iconClosed={navClosedIcons[title]}
                      isActive={
                        currentPath === title.toLowerCase().replace(/ /g, "-")
                      }
                      onClick={() => handleButtonClick(title)}
                    />
                  </li>
                );

                return title === "Logout" ? (
                  content
                ) : (
                  <Link
                    to={`/${
                      title === "Dashboard"
                        ? ""
                        : title.toLowerCase().replace(/ /g, "-")
                    }`}
                    key={title}
                    className="link"
                  >
                    {content}
                  </Link>
                );
              })}
          </ul>
        ))}
      </div>
    </aside>
  );
};

export default Navigation;
