import type { ProductFormValues } from "../types/productForm";

const SIMULATED_DELAY = 600;

// mock دیتای محصولات موجود برای تست ادیت
const mockAdminProductDetails: Record<string, ProductFormValues> = {
  "1": {
    title: "پرده کتان بافت‌دار طبیعی",
    price: 1850000,
    heightCm: 280,
    widthCm: 140,
    category: "bedroom",
    colorIds: ["beige", "white"],
    description: "این پرده از کتان طبیعی با کیفیت بالا تولید شده است.",
  },
};

export async function getAdminProductById(id: string): Promise<ProductFormValues | undefined> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  return mockAdminProductDetails[id];

  // ---- نسخه آینده ----
  // return getData<ProductFormValues>({ endPoint: `/admin/products/${id}` });
}

export async function createProduct(
  values: ProductFormValues,
  images: File[]
): Promise<{ id: string }> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  console.log("[mock] محصول جدید:", values, "تعداد عکس:", images.length);
  return { id: "new-product-id" };

  // ---- نسخه آینده ----
  // const formData = new FormData();
  // formData.append("data", JSON.stringify(values));
  // images.forEach((file) => formData.append("images", file));
  // return postImageData({ endPoint: "/admin/products", data: formData });
}

export async function updateProduct(
  id: string,
  values: ProductFormValues,
  images: File[]
): Promise<{ id: string }> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  console.log(`[mock] بروزرسانی محصول ${id}:`, values, "تعداد عکس جدید:", images.length);
  return { id };

  // ---- نسخه آینده ----
  // const formData = new FormData();
  // formData.append("data", JSON.stringify(values));
  // images.forEach((file) => formData.append("images", file));
  // return putImageData({ endPoint: `/admin/products/${id}`, data: formData });
}

export async function deleteProduct(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  console.log(`[mock] محصول ${id} حذف شد`);

  // ---- نسخه آینده ----
  // return deleteData({ endPoint: `/admin/products/${id}` });
}