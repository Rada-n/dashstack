import styles from "./NavButton.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useParams } from "react-router-dom";

interface navButtonProps {
  title: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

const navButton: React.FC<navButtonProps> = ({
  title,
  icon,
  isActive,
  onClick,
}) => {
  const { isClickedBurger } = useSelector((state: RootState) => state.navigate);

  return (
    <button
      className={`${isClickedBurger ? styles.navBtnClosed : styles.navBtn} ${
        isActive ? styles.active : styles.disable
      }`}
      onClick={onClick}
    >
      <img
        src={icon}
        alt={title}
        className={`${isClickedBurger ? styles.iconBtnClosed : styles.iconBtn}`}
      />
      <span>{title}</span>
    </button>
  );
};

export default navButton;
