import React from "react";
import styles from "./SelectOrderType.module.css";
import OptionButton from "../optionButton/OptionButton";
import { useActions } from "../../../hooks/useActions";
import Calendar from "../calendar/Calendar";
import { useDispatch } from "react-redux";

const ordersTypes = [
  "Health & Medicine",
  "Book & Stationary",
  "Services & Industry",
  "Fashion & Beauty",
  "Home & Living",
  "Electronics",
  "Mobile & Phone",
  "Accessories",
];

const ordersStatus = [
  "Completed",
  "Processing",
  "Rejected",
  "On hold",
  "In transit",
];

const SelectOrderType: React.FC<{ title: string, onClose: () => void }> = ({ title, onClose }) => {
    const { applyFilters } = useActions();

    const handleApllyFilters = () => {
        applyFilters()
        onClose()
    }

  return (
    <>
    {(title === 'Type' || title === 'Status') &&
      (<>
          <h3 className={styles.title}>Select Order {title}</h3>
          <ul className={styles.optionsContainer}>
            {(title === "Type" ? ordersTypes : ordersStatus).map(
              (option: string) => (
                <li key={option}>
                  <OptionButton option={option} title={title} />
                </li>))}
            </ul>
      </>
          )}
          {title === 'Date' && <Calendar />}
      <hr className={styles.border} />
      <span className={styles.addition}>
        *You can choose multiple {title === 'Date' ? 'date' : `Order ${title}`}
      </span>
      <button className={styles.applyButton} onClick={() => handleApllyFilters()}>Apply Now</button>
    </>
  );
};

export default SelectOrderType;
