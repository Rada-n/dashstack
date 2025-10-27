import styles from "./NavButton.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useParams } from "react-router-dom";
import DashboardIcon from "../NavIconsComponents/DashboardIcon";
import ProductsIcon from "../NavIconsComponents/ProductsIcon";
import OrdersIcon from "../NavIconsComponents/OrdersIcon";
import FavoritesIcon from "../NavIconsComponents/FavoritesIcon";
import CalenderIcon from "../NavIconsComponents/CalendarIcon";
import TodoIcon from "../NavIconsComponents/TodoIcon";
import InboxIcon from "../NavIconsComponents/InboxIcon";
import SettingsIcon from "../NavIconsComponents/SettingsIcon";
import LogoutIcon from "../NavIconsComponents/LogoutIcon";
import { useUser } from "../../../providers/UserProvider";

interface navButtonProps {
  title: string;
  iconClosed: string;
  isActive: boolean;
  onClick: () => void;
}

const navButton: React.FC<navButtonProps> = ({
  title,
  iconClosed,
  isActive,
  onClick,
}) => {
  const { isClickedBurger } = useSelector((state: RootState) => state.navigate);
  const { currentUser } = useUser();


  const navIconsOpen = () => {
    switch (title) {
      case 'Dashboard': return <DashboardIcon isActive={isActive} />;
      case 'Products': return <ProductsIcon isActive={isActive} />;
      case 'Order List': return <OrdersIcon isActive={isActive} />;
      case 'Favorites': return <FavoritesIcon isActive={isActive} />;
      case 'Calendar': return <CalenderIcon isActive={isActive}  />;
      case 'To-Do': return <TodoIcon isActive={isActive}  />;
      case 'Inbox': return <InboxIcon isActive={isActive}  />;
      case 'Settings': return <SettingsIcon isActive={isActive}  />;
      case 'Logout': return <LogoutIcon isActive={isActive}  />;
    }
  }

  return (
    <button
      className={`${isClickedBurger ? styles.navBtnClosed : styles.navBtn} ${
        isActive ? styles.active : styles.disable
      }`}
      onClick={onClick}
    > 
    {isClickedBurger ? <img
        src={iconClosed}
        alt={title}
        className={styles.iconBtnClosed}
      />
    : navIconsOpen()}
      <span>{!currentUser && title === 'Logout' ?
              'Log in'
              : title}
      </span>
    </button>
  );
};

export default navButton;
