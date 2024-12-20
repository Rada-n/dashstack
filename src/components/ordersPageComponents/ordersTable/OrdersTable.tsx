import React, { useEffect, useState } from "react";
import { useGetOrdersQuery, useGetTotalOrdersQuery } from "../../../fetch/ordersApi";
import { Order } from "../../../fetch/ordersApi";
import ChangePageButton from "../changePageButton/ChangePageButton";
import styles from './OrdersTable.module.css'
import StatusButton  from "../statusButton/StatusButton";
import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/store";
import Loading from "../../loading/Loading";

export interface UseGetProductsQuery {
  data: Order[];
  isLoading: boolean;
  isError: boolean;
  error: any;
}

const OrdersTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersInPage = 9;
//   const { data, isLoading, isError, error }: UseGetProductsQuery =
//     useGetOrdersQuery({ page: currentPage, limit: ordersInPage });
    const { data: totalOrders, isLoading: loading } = useGetTotalOrdersQuery()
    const { setTotalOrders } = useActions()
    const { filtredOrders } = useSelector((state: AppState) => state.orders)

    useEffect(() => {
      if (!loading && totalOrders.length > 0) {
          setTotalOrders(totalOrders);
      }
  }, [loading, totalOrders]);


  if (loading) {
    return <Loading />
  }

  const indexOfLastOrder = currentPage * ordersInPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersInPage;
  // const currentOrders = totalOrders?.slice(indexOfFirstOrder, indexOfLastOrder) || [];
  const currentFiltredOrders = filtredOrders?.slice(indexOfFirstOrder, indexOfLastOrder) || []
  const totalPages = Math.ceil((filtredOrders?.length + 1) / ordersInPage);

  return (
    <>
      <table className={styles.ordersTable}>
        <thead>
          <tr>
            {["id", "name", "address", "date", "type", "status"].map(
              (columnName: string) => (
                <th className={styles.columntitle}>{columnName.toUpperCase()}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {currentFiltredOrders.map((order: Order) => (
            <tr key={order.id} className={styles.ordersTableRows}>
              <td>{order.id}</td>
              <td>{order.name}</td>
              <td>{order.address}</td>
              <td>{order.date}</td>
              <td>{order.type}</td>
              <td><StatusButton status={order.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <section className={styles.pagesInfoContainer}>
          <span className={styles.showingPages}>Showing {currentPage}-{totalPages < 10 ? '0' + totalPages : totalPages} of {totalOrders?.length}</span>
          <div className={styles.changePageButtonsContainer}>
            <ChangePageButton
              prevPage={true}
              isLastPage={currentPage <= 1 ? true : false}
              changePage={() => setCurrentPage((prevPage: number) => prevPage > 1 ? prevPage - 1 : prevPage)}
            />
            <ChangePageButton
              prevPage={false}
              isLastPage={currentPage >= totalPages ? true : false}
              changePage={() => setCurrentPage((prevPage: number) => prevPage < totalPages ? prevPage + 1 : prevPage)}
          
            />
          </div>
      </section>
    </>
  );
};

export default OrdersTable;
