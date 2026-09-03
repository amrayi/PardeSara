export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  image: string;
  categoryId: string;
  stock: number;
  description?: string;
  colorName?: string;
}

export interface ProductFilters {
  priceRangeIds?: string[];
  categoryIds?: string[];
}

// ---- نوع‌های مخصوص صفحه جزئیات محصول ----

export interface ProductColorVariant {
  id: string;
  name: string;
  colorHex: string;
}

export interface ProductMedia {
  type: "image" | "video";
  url: string;
  thumbnail?: string; // فقط برای ویدیو لازم است
}

export interface ProductDetailSection {
  id: string;
  title: string;
  content: string;
}

export interface ProductDetail extends Product {
  subtitle?: string; // مثلا: "مدل آرامش - رنگ سبز مریم‌گلی"
  colorVariants: ProductColorVariant[];
  heightCm: number;
  widthCm: number;
  media: ProductMedia[];
  sections: ProductDetailSection[];
}