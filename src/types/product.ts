export type FabricType = "حریر" | "مخمل" | "کتان";

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  image: string;
  fabricType: FabricType;
  category: string;
  stock: number;
  description?: string;
}

export interface ProductFilters {
  minPrice?: number;
  maxPrice?: number;
  fabricTypes?: FabricType[];
}