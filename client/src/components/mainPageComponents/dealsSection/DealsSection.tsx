import React from "react";
import { DashboardData } from "../../../fetch/fetchDashboardData";
import styles from "./DealsSection.module.css";
import { DealsStatusButton } from "../dealsStatusButton/DealsStatusButton";
import { Deals } from "../../../interfaces/dashboardData";


export const DealsSection: React.FC<{ dashboardData: DashboardData }> = ({
  dashboardData,
}) => {
  if (!dashboardData || !dashboardData[3]) {
    return
  }

  return (
    <section className={styles.dealsSection}>
      <h3 className={styles.title}>Deals Details</h3>
      <div className={styles.tableWrapper}>
        <table className={styles.dealsTable}>
          <thead className={styles.dealsTableHead}>
            <tr className={styles.dealsTableHeadRow}>
              {['Product Name', 'Location', 'Date - Time', 'Piece', 'Amount', 'Status'].map(titleColumn => (
                  <th key={titleColumn}>{titleColumn}</th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.dealsTableBody}>
            {dashboardData[3].data.map((deal: Deals, index: number) => (
              <tr key={index} className={styles.dealsTableBodyRow}>
                <td className={styles.productNameColumn}>
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className={styles.iconProduct}
                  />
                  {deal.name}
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
      </div>
    </section>
  );
};
