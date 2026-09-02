import type { AvailableColor, ProductCategory } from "../types/productForm";

export const availableColors: AvailableColor[] = [
  { id: "gray", name: "طوسی", hex: "#8a8a8a" },
  { id: "beige", name: "بژ روشن", hex: "#d8d3c9" },
  { id: "green", name: "سبز مریم‌گلی", hex: "#7f9b8a" },
  { id: "rose", name: "رز خاکی", hex: "#b97b6a" },
  { id: "white", name: "سفید برفی", hex: "#f2f2f2" },
];

export const productCategories: ProductCategory[] = [
  { id: "bedroom", name: "اتاق خواب" },
  { id: "livingroom", name: "پذیرایی" },
  { id: "shade", name: "شید" },
  { id: "zebra", name: "زبرا" },
  { id: "dayNight", name: "شب و روز" },
  { id: "metalShutter", name: "کرکره فلزی" },
];