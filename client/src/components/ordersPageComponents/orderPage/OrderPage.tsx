import React from 'react'
import OrdersTable from '../ordersTable/OrdersTable'
import Layout from '../../layout/Layout'
import OrdersFilter from '../ordersFilter/OrdersFilter'
import { useGetOrdersQuery } from '../../../fetch/ordersApi'
import Loading from '../../loading/Loading'

const OrderPage: React.FC = () => {

  const {
    isLoading
  } = useGetOrdersQuery([]);

  return (
    <Layout>
      <h1>Order Lists</h1>
      {isLoading ? <Loading />
      : (<>
      <OrdersFilter />
      <OrdersTable /></>)}
      
    </Layout>
  )
}

export default OrderPage
