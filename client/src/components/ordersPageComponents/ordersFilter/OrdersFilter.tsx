import React, { useEffect, useRef, useState } from "react";
import styles from "./OrdersFilter.module.css";
import SelectOrderType from "../selectOrderType/SelectOrderType";
import filter from "../../../assets/orders/filter/filter.svg";
import Arrow from "../../../assets/orders/filter/Arrow.svg";
import Reset from "../../../assets/orders/filter/Reset.svg";
import { useActions } from "../../../hooks/useActions";
import { useMediaQuery } from "react-responsive";

const OrdersFilter: React.FC = () => {
  const [openSelect, setOpenSelect] = useState<boolean | null>(false);
  const selectRef = useRef<HTMLDivElement | null>(null)
  const { resetAllFilters } = useActions()
  const isSmallScreen = useMediaQuery({ query: '(max-width: 800px)'})

  const handleOpenSelect = (selectType: string | null) => {
    setOpenSelect(prevOpenSelect => (selectType === prevOpenSelect ? null : selectType));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpenSelect(true);
      }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className={styles.filtersContainer}>
      <ul className={styles.filterList}>
        <li>
          <img src={filter} alt="filter" />
        </li>
        <li>Filter By</li>
        {["Date", "Order Type", "Order Status"].map((typeFilter) => (
          <li>
            {typeFilter}
            <img src={Arrow} alt="arrow" className={styles.filtersIcons} onClick={() => handleOpenSelect(typeFilter)}/>
        </li>
        ))}
        <li className={styles.resetTitle}>
            <img src={Reset} className={styles.filtersIcons} onClick={() => resetAllFilters()}/>
            Reset Filter
        </li>
      </ul>
      {openSelect === 'Date' && (<section ref={selectRef} className={styles.selectContainer} style={{left: isSmallScreen ? '' : '70px'}}>
          <SelectOrderType title={"Date"} onClose={() => setOpenSelect(true)} />
      </section>)}
      {openSelect === "Order Type" && (<section ref={selectRef} className={styles.selectContainer} style={{left:  isSmallScreen ? '' :  '201px'}}>
          <SelectOrderType title={"Type"} onClose={() => setOpenSelect(true)} />
      </section>)}
      {openSelect === "Order Status" && (<section ref={selectRef} className={styles.selectContainer} style={{left: isSmallScreen ? '' : '321px'}}>
          <SelectOrderType title={"Status"} onClose={() => setOpenSelect(true)} />
      </section>)}
    </section>
  );
};

export default OrdersFilter;
