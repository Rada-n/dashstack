import React from 'react'
import OrdersTable from '../ordersTable/OrdersTable'
import Layout from '../../layout/Layout'
import OrdersFilter from '../ordersFilter/OrdersFilter'

const OrderPage: React.FC = () => {
  return (
    <Layout>
      <h1>Order Lists</h1>
      <OrdersFilter />
      <OrdersTable />
    </Layout>
  )
}

export default OrderPage
