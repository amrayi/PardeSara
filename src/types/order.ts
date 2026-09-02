import type { CartItem } from "./cart";

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  itemsCount: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  userId: string;
}