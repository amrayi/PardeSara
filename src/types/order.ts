import type { CartItem } from "./cart";
import type { ShippingInfo } from "./checkout";

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
  shippingInfo: ShippingInfo;
}