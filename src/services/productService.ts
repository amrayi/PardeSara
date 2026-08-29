import type { Product, ProductFilters } from "../types/product";
import { mockProducts } from "../data/mockProducts";
// وقتی API آماده شد این رو استفاده می‌کنیم:
// import { getData } from "./services";

const SIMULATED_DELAY = 400;

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  // ---- نسخه فعلی: Mock ----
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

  let result = [...mockProducts];

  if (filters?.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters?.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters?.fabricTypes && filters.fabricTypes.length > 0) {
    result = result.filter((p) => filters.fabricTypes!.includes(p.fabricType));
  }

  return result;

  // ---- نسخه آینده: API واقعی ----
  // return getData<Product[]>({
  //   endPoint: "/products",
  //   params: filters,
  // });
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  return mockProducts.find((p) => p.slug === slug);

  // ---- نسخه آینده ----
  // return getData<Product>({ endPoint: `/products/${slug}` });
}