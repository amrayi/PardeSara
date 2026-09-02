export interface ProductFormValues {
  title: string;
  price: number | "";
  heightCm: number | "";
  widthCm: number | "";
  category: string;
  colorIds: string[];
  description: string;
}

export interface AvailableColor {
  id: string;
  name: string;
  hex: string;
}

export interface ProductCategory {
  id: string;
  name: string;
}