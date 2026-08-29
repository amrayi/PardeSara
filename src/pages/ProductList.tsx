import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { getProducts } from "../services/productService";
import type { Product } from "../types/product";
import "../styles/ProductList.css";

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        setIsLoading(true);
        const data = await getProducts();
        if (isMounted) setProducts(data);
      } catch {
        if (isMounted) setError("خطا در دریافت محصولات");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="product-list-page">
      <div className="product-list-page__header">
        <nav className="product-list-page__breadcrumb">
          <Link to="/">خانه</Link>
          <span>{" < "}</span>
          <span>محصولات</span>
        </nav>
        <h1 className="product-list-page__title">کالکشن پرده‌ها</h1>
      </div>

      <div className="product-list-page__content">
        <div className="product-list-page__grid-wrapper">
          {isLoading && <p className="product-list-page__status">در حال بارگذاری...</p>}
          {error && <p className="product-list-page__status product-list-page__status--error">{error}</p>}

          {!isLoading && !error && (
            <div className="product-list-page__grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        <FilterSidebar />
      </div>
    </div>
  );
}

export default ProductList;