import type { AvailableColor, ProductCategory } from "../types/productForm";
import livingroom from "@/assets/home/livingroom.png";
import bedroom from "@/assets/home/room.png";
import zebra from "@/assets/home/zebra.png";
import shade from "@/assets/home/room.png";
import dayNight from "@/assets/home/zebra.png";
import metalShutter from "@/assets/home/livingroom.png";

export const availableColors: AvailableColor[] = [
  { id: "gray", name: "طوسی", hex: "#8a8a8a" },
  { id: "beige", name: "بژ روشن", hex: "#d8d3c9" },
  { id: "green", name: "سبز مریم‌گلی", hex: "#7f9b8a" },
  { id: "rose", name: "رز خاکی", hex: "#b97b6a" },
  { id: "white", name: "سفید برفی", hex: "#f2f2f2" },
];

export const productCategories: (ProductCategory & { image: string })[] = [
  { id: "bedroom", name: "اتاق خواب", image: bedroom },
  { id: "livingroom", name: "پذیرایی", image: livingroom },
  { id: "shade", name: "شید", image: shade },
  { id: "zebra", name: "زبرا", image: zebra },
  { id: "dayNight", name: "شب و روز", image: dayNight },
  { id: "metalShutter", name: "کرکره فلزی", image: metalShutter },
];