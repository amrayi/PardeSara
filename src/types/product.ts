export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  discountPrice?: number;
  description: string;
  images: string[];
  stock: number;
  category: string;
  createdAt: string;
}