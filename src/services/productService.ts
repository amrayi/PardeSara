import type { Product, ProductDetail, ProductFilters } from "../types/product";
import { mockProducts } from "../data/mockProducts";
import { mockProductDetails } from "../data/mockProductDetails";
import { priceRanges } from "../data/priceRange";
// وقتی API آماده شد این رو استفاده می‌کنیم:
// import { getData } from "./services";

const SIMULATED_DELAY = 400;

// این تابع تنها منبع داده‌ست که با React Query کش میشه؛ همیشه کل لیست رو بدون فیلتر برمی‌گردونه
export async function getAllProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  return [...mockProducts];

  // ---- نسخه آینده ----
  // return getData<Product[]>({ endPoint: "/products" });
}

// نگه داشته شده برای سازگاری با کدهای قبلی؛ ولی از این به بعد ترجیحاً به‌جاش
// از useProductsQuery + filterProducts (سمت کلاینت) استفاده کن تا درخواست تکراری نره
export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const all = await getAllProducts();
  return filterProductsClientSide(all, filters);
}

export function filterProductsClientSide(
  products: Product[],
  filters?: ProductFilters
): Product[] {
  let result = [...products];

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
}

export function searchProductsClientSide(products: Product[], query: string): Product[] {
  if (!query.trim()) return [];
  const normalized = query.trim().toLowerCase();
  return products.filter((p) => p.title.toLowerCase().includes(normalized));
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

  return mockProducts.filter((p) => p.slug !== currentSlug).slice(0, limit);

  // ---- نسخه آینده ----
  // return getData<Product[]>({ endPoint: `/products/${currentSlug}/related` });
}

export async function getNewestProducts(limit = 4): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
  return mockProducts.slice(0, limit);

  // ---- نسخه آینده ----
  // return getData<Product[]>({ endPoint: "/products/newest", params: { limit } });
}