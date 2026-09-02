import type { ProductFormValues } from "../types/productForm";

const SIMULATED_DELAY = 600;

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