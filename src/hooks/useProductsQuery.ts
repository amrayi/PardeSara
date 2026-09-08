import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/productService";

export function useProductsQuery() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5, // ۵ دقیقه؛ در این بازه دوباره فچ نمی‌شه
  });
}