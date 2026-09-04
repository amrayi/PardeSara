export interface Achievement {
  id: string;
  value: string;
  label: string;
}

export const aboutUsIntro = {
  title: "درباره پرده‌سرا",
  paragraphs: [
    "پرده‌سرا از سال ۱۳۹۸ با هدف ارائه پارچه‌ها و پرده‌های باکیفیت و متناسب با سلیقه‌ی ایرانی فعالیت خود را آغاز کرد. ما معتقدیم هر خانه داستان خودش را دارد و پرده‌ها بخشی از این داستان‌اند.",
    "تیم ما با انتخاب دقیق پارچه‌ها از بهترین تولیدکنندگان داخلی و خارجی، تلاش می‌کند تجربه‌ای متفاوت از خرید آنلاین پرده را برای شما فراهم کند؛ از مشاوره رنگ و جنس گرفته تا ارسال و نصب.",
  ],
};

export const achievements: Achievement[] = [
  { id: "years", value: "+۷", label: "سال تجربه" },
  { id: "customers", value: "+۱۲,۰۰۰", label: "مشتری راضی" },
  { id: "products", value: "+۳۵۰", label: "محصول متنوع" },
  { id: "cities", value: "+۴۰", label: "شهر تحت پوشش ارسال" },
];