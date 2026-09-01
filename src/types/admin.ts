import type { OrderStatus } from "./order";

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface AdminProductListItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  pricePerMeter: number;
  stockStatus: StockStatus;
  stockMeters?: number;
  image: string;
}

export interface AdminOrderSummary {
  id: string;
  orderNumber: string;
  customerName: string;
  productName?: string;
  productImage?: string;
  totalPrice: number;
  createdAt: string;
  status: OrderStatus;
}

export interface AdminCustomer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar?: string;
  ordersCount: number;
}

export interface DashboardStats {
  activeProductsCount: number;
  lowStockCount: number;
  newOrdersCount: number;
  newOrdersWeeklyChangePercent: number;
  totalRevenue: number;
  revenueMonthlyChangePercent: number;
}

