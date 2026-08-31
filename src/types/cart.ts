export interface CartItem {
  id: string; // شناسه یکتای هر ردیف سبد (محصول + رنگ انتخابی)
  productId: string;
  slug: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  colorName?: string;
  widthCm?: number;
  heightCm?: number;
}