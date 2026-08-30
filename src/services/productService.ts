import type { Product, ProductDetail, ProductFilters } from "../types/product";
import { mockProducts } from "../data/mockProducts";
import { mockProductDetails } from "../data/mockProductDetails";
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

export async function getProductDetailBySlug(
  slug: string
): Promise<ProductDetail | undefined> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  return mockProductDetails[slug];

  // ---- نسخه آینده ----
  // return getData<Product>({ endPoint: `/products/${slug}` });
}

export async function getRelatedProducts(
  currentSlug: string,
  limit = 6
): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

  return mockProducts
    .filter((p) => p.slug !== currentSlug)
    .slice(0, limit);

    // ---- نسخه آینده ----
    // return getData<Product[]>({ endPoint: `/products/${currentSlug}/related` });
}