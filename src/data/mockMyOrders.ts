import type { Order } from "../types/order";

export const mockMyOrders: Order[] = [
  {
    id: "o1",
    orderNumber: "1004521",
    items: [],
    itemsCount: 2,
    totalPrice: 4250000,
    status: "shipped",
    createdAt: "2026-08-20",
    userId: "u1",
  },
  {
    id: "o2",
    orderNumber: "1004498",
    items: [],
    itemsCount: 1,
    totalPrice: 1800000,
    status: "delivered",
    createdAt: "2026-08-05",
    userId: "u1",
  },
  {
    id: "o3",
    orderNumber: "1004460",
    items: [],
    itemsCount: 3,
    totalPrice: 6100000,
    status: "cancelled",
    createdAt: "2026-07-22",
    userId: "u1",
  },
  {
    id: "o4",
    orderNumber: "1004512",
    items: [],
    itemsCount: 1,
    totalPrice: 2450000,
    status: "pending",
    createdAt: "2026-08-28",
    userId: "u1",
  },
];