import type { Product, ProductDetail, ProductFilters } from "../types/product";
import { mockProducts } from "../data/mockProducts";
import { mockProductDetails } from "../data/mockProductDetails";
import { priceRanges } from "../data/priceRange";
// وقتی API آماده شد این رو استفاده می‌کنیم:
// import { getData } from "./services";

const SIMULATED_DELAY = 400;

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));

  let result = [...mockProducts];

  if (filters?.categoryIds && filters.categoryIds.length > 0) {
    result = result.filter((p) => filters.categoryIds!.includes(p.categoryId));
  }

  if (filters?.priceRangeIds && filters.priceRangeIds.length > 0) {
    const selectedRanges = priceRanges.filter((r) => filters.priceRangeIds!.includes(r.id));
    result = result.filter((p) =>
      selectedRanges.some((range) => p.price >= range.min && p.price < range.max)
    );
  }

  return result;

  // ---- نسخه آینده ----
  // return getData<Product[]>({ endPoint: "/products", params: filters });
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

export async function getNewestProducts(limit = 4): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  return mockProducts.slice(0, limit);

  // ---- نسخه آینده ----
  // return getData<Product[]>({ endPoint: "/products/newest", params: { limit } });
}