import React, { useEffect, useState } from "react";
import { useGetOrdersQuery } from "../../../fetch/ordersApi";
import { Order } from "../../../fetch/ordersApi";
import ChangePageButton from "../changePageButton/ChangePageButton";
import styles from './OrdersTable.module.css'
import StatusButton  from "../statusButton/StatusButton";
import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";

export interface UseGetProductsQuery {
  data: Order[];
  isLoading: boolean;
  isError: boolean;
  error: any;
}

const ordersTypeSubcategories: Record<string, string[]> = {
  "Health & Medicine": ["Medicine"],
  "Book & Stationary": ["Book"],
  "Services & Industry": ["Watch"],
  "Fashion & Beauty": ["Bag"],
  "Home & Living": ["Lamp"],
  "Electronics": ["Electric"],
  "Mobile & Phone": ["IPhone"],
  "Accessories": ["Chain"],
};

const OrdersTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersInPage = 9;

  const { ordersType, ordersStatus, date } = useSelector(
    (state: AppState) => state.orders
  );

  const { setTotalOrders } = useActions();

  const subcategories = ordersType.flatMap(
    (type) => ordersTypeSubcategories[type] || []
  );

  const {
    data: ordersData,
  } = useGetOrdersQuery({
    page: currentPage,
    limit: ordersInPage,
    type: subcategories,
    status: ordersStatus,
    from: date.from || undefined,
    to: date.to || undefined,
  });

  useEffect(() => {
    if (ordersData) {
      setTotalOrders(ordersData.data);
    }
  }, [ordersData, setTotalOrders]);

  const currentOrders = ordersData?.data || [];
  const totalPages = ordersData?.meta?.last_page || 1;
  const totalOrdersCount = ordersData?.meta?.total || 0;

  return (
    <>
      <section className={styles.tableWrapper}>
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              {["id", "name", "address", "date", "type", "status"].map(
                (columnName) => (
                  <th key={columnName} className={styles.columntitle}>
                    {columnName.toUpperCase()}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id} className={styles.ordersTableRows}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.address}</td>
                <td>{order.date}</td>
                <td>{order.type}</td>
                <td>
                  <StatusButton status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.pagesInfoContainer}>
        <span className={styles.showingPages}>
          Showing {currentPage}-{totalPages} of {totalOrdersCount}
        </span>
        <div className={styles.changePageButtonsContainer}>
          <ChangePageButton
            prevPage
            isLastPage={currentPage <= 1}
            changePage={() =>
              setCurrentPage((prev) => Math.max(prev - 1, 1))
            }
          />
          <ChangePageButton
            prevPage={false}
            isLastPage={currentPage >= totalPages}
            changePage={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          />
        </div>
      </section>
    </>
  );
};

export default OrdersTable;
