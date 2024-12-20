import styles from "./Navigation.module.css";
import NavButton from "../navButton/NavButton";
import { useState, useEffect } from "react";
import { navIcons, navClosedIcons } from "./navigationIcons";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useActions } from "../../../hooks/useActions";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router-dom";

const Navigation: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const { isClickedBurger } = useSelector((state: RootState) => state.navigate);
  const { setIsClickedBurger } = useActions();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1420px)" });
  const location = useLocation()

  const handleButtonClick = (title: string) => {
    if (title !== "Home") {
      setActiveButton(title);
    }

    if (title === "Home" && !isSmallScreen) {
      setIsClickedBurger(false);
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
      {isClickedBurger ? (
        ""
      ) : (
        <div className={styles.mainLogo}>
          Dash<span>Stack</span>
        </div>
      )}
      <div className={styles.navList}>
        {isClickedBurger && (
          <div className={styles.navItem}>
            <NavButton
              title={isClickedBurger ? "" : "Home"}
              icon={isClickedBurger ? navClosedIcons["Home"] : navIcons["Home"]}
              isActive={activeButton === "Home"}
              onClick={() => handleButtonClick("Home")}
            />
          </div>
        )}
        {[
          [
            "Dashboard",
            "Products",
            "Favorites",
            "Inbox",
            "Order List",
            "Product Stock",
            "Pricing",
          ],
          [
            "Calender",
            "To-Do",
            "Contact",
            "Invoice",
            "UI Elements",
            "Team",
            ...(isClickedBurger ? [] : ["Table"]),
          ],
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
            {isClickedBurger
              ? ""
              : index === 1 && <p className={styles.textPages}>PAGES</p>}
            {group.map((title) => (
              <Link
                to={`/${title.toLowerCase().replace(/ /g, "-")}`}
                key={title}
                className="link"
              >
                <li
                  className={`${styles.navItem} ${
                    activeButton === title ? styles.active : ""
                  }`}
                >
                  <NavButton
                    title={isClickedBurger ? "" : title}
                    icon={
                      isClickedBurger ? navClosedIcons[title] : navIcons[title]
                    }
                    isActive={location.pathname.slice(1) === title.toLowerCase().replace(/ /g, "-")}
                    onClick={() => handleButtonClick(title)}
                  />
                </li>
              </Link>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
};

export default Navigation;
