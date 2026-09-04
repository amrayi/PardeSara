import type { ProductDetail } from "../types/product";

export const mockProductDetails: Record<string, ProductDetail> = {
  "silk-minimal": {
    id: "3",
    title: "پرده کتان مینیمال",
    slug: "silk-minimal",
    subtitle: "مدل آرامش - رنگ سبز مریم‌گلی",
    price: 2450000,
    image: "/src/assets/products/curtain-3.jpg",
    categoryId: "پرده",
    stock: 15,
    heightCm: 280,
    widthCm: 140,
    colorVariants: [
      { id: "gray", name: "طوسی", colorHex: "#8a8a8a" },
      { id: "beige", name: "بژ روشن", colorHex: "#d8d3c9" },
      { id: "green", name: "سبز مریم‌گلی", colorHex: "#7f9b8a" },
    ],
    media: [
      { type: "image", url: "/src/assets/products/curtain-3-main.jpg" },
      {
        type: "video",
        url: "/src/assets/products/curtain-3-video.mp4",
        thumbnail: "/src/assets/products/curtain-3-video-thumb.jpg",
      },
      { type: "image", url: "/src/assets/products/curtain-3-detail-1.jpg" },
      { type: "image", url: "/src/assets/products/curtain-3-detail-2.jpg" },
      { type: "image", url: "/src/assets/products/curtain-3-detail-3.jpg" },
    ],
    sections: [
      {
        id: "material",
        title: "جنس و متریال",
        content:
          "این پرده از ۱۰۰٪ کتان خالص طبیعی بافته شده است. بافت باز و ارگانیک آن اجازه می‌دهد نور به زیبایی فیلتر شود و در عین حال حریم خصوصی را حفظ می‌کند. متریال استفاده‌شده ضد حساسیت بوده و حس لمسی بسیار لطیف و خنکی دارد.",
      },
      {
        id: "care",
        title: "راهنمای شستشو و نگهداری",
        content:
          "شستشو با آب سرد و برنامه ملایم ماشین لباسشویی توصیه می‌شود. از استفاده مواد سفیدکننده خودداری کنید. خشک کردن در سایه و اتو با حرارت ملایم روی پارچه کتان توصیه می‌شود.",
      },
    ],
  },
};