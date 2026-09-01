import type {
  AdminProductListItem,
  AdminOrderSummary,
  DashboardStats,
} from "../types/admin";
// وقتی API آماده شد:
// import { getData } from "./services";

const SIMULATED_DELAY = 400;

const mockStats: DashboardStats = {
  activeProductsCount: 312,
  lowStockCount: 15,
  newOrdersCount: 48,
  newOrdersWeeklyChangePercent: -3.2,
  totalRevenue: 124500000,
  revenueMonthlyChangePercent: 12.5,
};

const mockRecentOrders: AdminOrderSummary[] = [
  { id: "1", orderNumber: "#8412", customerName: "سارا احمدی", productName: "پرده کتان کلاسیک", totalPrice: 4500000, createdAt: "1402-08-24", status: "processing" },
  { id: "2", orderNumber: "#8104", customerName: "محمد کریمی", productName: "حریر ساده سفید", totalPrice: 3200000, createdAt: "1402-08-23", status: "shipped" },
  { id: "3", orderNumber: "#8551", customerName: "گروه معماری آتلیه", productName: "مخمل ضخیم طوسی", totalPrice: 9800000, createdAt: "1402-08-22", status: "delivered" },
  { id: "4", orderNumber: "#8990", customerName: "رضا موسوی", productName: "سفارش سفارشی", totalPrice: 5200000, createdAt: "1402-08-21", status: "processing" },
];

const mockOrders: AdminOrderSummary[] = [
  { id: "1", orderNumber: "#ORD-2024-001", customerName: "علی محمدی", totalPrice: 12500000, createdAt: "1402/08/15 - 10:30", status: "pending" },
  { id: "2", orderNumber: "#ORD-2024-002", customerName: "سارا احمدی", totalPrice: 8200000, createdAt: "1402/08/14 - 16:45", status: "shipped" },
  { id: "3", orderNumber: "#ORD-2024-003", customerName: "رضا کریمی", totalPrice: 24000000, createdAt: "1402/08/10 - 09:15", status: "delivered" },
];

const mockProducts: AdminProductListItem[] = [
  { id: "1", slug: "harir-baftdar-alghans", name: "پرده حریر بافت‌دار الگانس", category: "حریر مینیمال", pricePerMeter: 850000, stockStatus: "in_stock", stockMeters: 45, image: "" },
  { id: "2", slug: "makhmal-zoghali", name: "مخمل ضخیم کلاسیک زغالی", category: "مخمل", pricePerMeter: 1200000, stockStatus: "low_stock", stockMeters: 5, image: "" },
  { id: "3", slug: "katan-tabiei-dorosht", name: "کتان طبیعی بافت درشت", category: "کتان ارگانیک", pricePerMeter: 650000, stockStatus: "out_of_stock", image: "" },
];

export async function getDashboardStats(): Promise<DashboardStats> {
  await new Promise((r) => setTimeout(r, SIMULATED_DELAY));
  return mockStats;
}

export async function getRecentOrders(limit = 4): Promise<AdminOrderSummary[]> {
  await new Promise((r) => setTimeout(r, SIMULATED_DELAY));
  return mockRecentOrders.slice(0, limit);
}

export async function getAdminOrders(): Promise<AdminOrderSummary[]> {
  await new Promise((r) => setTimeout(r, SIMULATED_DELAY));
  return mockOrders;
}


export async function getAdminProducts(categoryFilter?: string): Promise<AdminProductListItem[]> {
  await new Promise((r) => setTimeout(r, SIMULATED_DELAY));
  if (!categoryFilter || categoryFilter === "همه") return mockProducts;
  return mockProducts.filter((p) => p.category.includes(categoryFilter));
}