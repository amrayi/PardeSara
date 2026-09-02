import type { StoreSettings } from "../types/storeSettings";

const SIMULATED_DELAY = 500;

const mockStoreSettings: StoreSettings = {
  logoUrl: null,
  storeName: "پرده‌سرا",
  supportEmail: "support@pardehsara.com",
  phone: "021-88888888",
  address: "تهران، خیابان ولیعصر، نرسیده به تجریش، پلاک ۱۲۳",
};

export async function getStoreSettings(): Promise<StoreSettings> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  return mockStoreSettings;

  // ---- نسخه آینده ----
  // return getData<StoreSettings>({ endPoint: "/admin/store-settings" });
}

export async function updateStoreSettings(data: StoreSettings): Promise<StoreSettings> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  console.log("[mock] ذخیره تنظیمات فروشگاه:", data);
  return data;

  // ---- نسخه آینده ----
  // return putData({ endPoint: "/admin/store-settings", data });
}