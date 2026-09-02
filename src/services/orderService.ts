import type { Order } from "../types/order";
import { mockMyOrders } from "../data/mockMyOrders";

const SIMULATED_DELAY = 500;

export async function getMyOrders(): Promise<Order[]> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  return mockMyOrders;

  // ---- نسخه آینده ----
  // return getData<Order[]>({ endPoint: "/orders/me" });
}