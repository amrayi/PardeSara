import type { Order } from "../types/order";
import { mockMyOrders } from "../data/mockMyOrders";

const SIMULATED_DELAY = 500;

export async function getMyOrders(): Promise<Order[]> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  return mockMyOrders;

  // ---- نسخه آینده ----
  // return getData<Order[]>({ endPoint: "/orders/me" });
}

export async function getOrderById(orderId: string): Promise<Order | undefined> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  return mockMyOrders.find((o) => o.id === orderId);

  // ---- نسخه آینده ----
  // return getData<Order>({ endPoint: `/orders/${orderId}` });
}