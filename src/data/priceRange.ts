export interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

export const priceRanges: PriceRange[] = [
  { id: "under-1m", label: "زیر ۱,۰۰۰,۰۰۰", min: 0, max: 1000000 },
  { id: "1m-3m", label: "۱,۰۰۰,۰۰۰ تا ۳,۰۰۰,۰۰۰", min: 1000000, max: 3000000 },
  { id: "above-3m", label: "بالای ۳,۰۰۰,۰۰۰", min: 3000000, max: Infinity },
];