import React from "react";
import { DashboardData } from "../../../fetch/fetchDashboardData";
import styles from "./DealsSection.module.css";
import { DealsStatusButton } from "../dealsStatusButton/DealsStatusButton";
import { Deals } from "../../../interfaces/dashboardData";
import DealsAirPods from "../../../assets/dashboard/DealsAirPods.jpg";
import DealsAppleWatch from "../../../assets/dashboard/DealsAppleWatch.jpg";
import DealsIPhone14 from "../../../assets/dashboard/DealsIPhone14.jpg";
import DealsIPadAir from "../../../assets/dashboard/DealsIPadAir.jpg";
import DealsMacBookPro from "../../../assets/dashboard/DealsMacBookPro.jpg";

interface IconsProducts {
  [index: string]: string;
}

const iconsProducts: IconsProducts = {
  "Apple Watch": DealsAppleWatch,
  "iPhone 14": DealsIPhone14,
  "MacBook Pro": DealsMacBookPro,
  "iPad Air": DealsIPadAir,
  "AirPods Pro": DealsAirPods,
};

export const DealsSection: React.FC<{ dashboardData: DashboardData }> = ({
  dashboardData,
}) => {
  if (!dashboardData || !dashboardData[3]) {
    return
  }

  return (
    <section className={styles.dealsSection}>
      <h3 className={styles.title}>Deals Details</h3>
      <table className={styles.dealsTable}>
        <thead className={styles.dealsTableHead}>
          <tr className={styles.dealsTableHeadRow}>
            {['Product Name', 'Location', 'Date - Time', 'Piece', 'Amount', 'Status'].map(titleColumn => (
                <th key={titleColumn}>{titleColumn}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dashboardData[3].map((deal: Deals, index: number) => (
            <tr key={index} className={styles.dealsTableBodyRow}>
              <td className={styles.productNameColumn}>
                <img
                  src={iconsProducts[deal.product_name]}
                  alt={deal.product_name}
                  className={styles.iconProduct}
                />
                {deal.product_name}
              </td>
              <td>{deal.location}</td>
              <td>
                {deal.date} - {deal.time}
              </td>
              <td>{deal.piece}</td>
              <td>${deal.amount}</td>
              <td>
                <DealsStatusButton status={deal.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
