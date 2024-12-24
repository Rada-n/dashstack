export interface Users {
  id: number;
  name: string;
  date: string;
}

export interface Orders {
  id: number;
  status: string;
  amount: string;
  date: string;
}

export interface TotalData {
  users: Users[];
  orders: Orders[];
}

export interface Sales {
  date: string;
  total: string;
}

export interface SalesData {
  sales: Sales[];
}

export interface Deals {
  product_name: string;
  location: string;
  date: string;
  time: string;
  piece: number;
  amount: number;
  status: string;
}

export interface DealsData {
  deals: Deals[];
}
