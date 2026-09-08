import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { filterProductsClientSide } from "../services/productService";
import "../styles/ProductList.css";

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: allProducts = [], isLoading, error } = useProductsQuery();

  const selectedPriceRangeIds = searchParams.getAll("price");
  const selectedCategoryIds = searchParams.getAll("category");

  const products = useMemo(
    () =>
      filterProductsClientSide(allProducts, {
        priceRangeIds: selectedPriceRangeIds,
        categoryIds: selectedCategoryIds,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allProducts, searchParams.toString()]
  );

  const toggleParam = (key: "price" | "category", value: string) => {
    const current = searchParams.getAll(key);
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    updated.forEach((v) => newParams.append(key, v));
    setSearchParams(newParams);
  };

  return (
    <div className="product-list-page">
      <div className="product-list-page__header">
        <nav className="product-list-page__breadcrumb">
          <Link to="/">خانه</Link>
          <span>{" > "}</span>
          <span>محصولات</span>
        </nav>
        <h1 className="product-list-page__title">کالکشن پرده‌ها</h1>
      </div>

      <div className="product-list-page__content">
        <FilterSidebar
          selectedPriceRangeIds={selectedPriceRangeIds}
          selectedCategoryIds={selectedCategoryIds}
          onTogglePriceRange={(id) => toggleParam("price", id)}
          onToggleCategory={(id) => toggleParam("category", id)}
        />

        <div className="product-list-page__grid-wrapper">
          {isLoading && <p className="product-list-page__status">در حال بارگذاری...</p>}
          {error && (
            <p className="product-list-page__status product-list-page__status--error">
              خطا در دریافت محصولات
            </p>
          )}

          {!isLoading && !error && products.length === 0 && (
            <p className="product-list-page__status">محصولی با این فیلترها یافت نشد.</p>
          )}

          {!isLoading && !error && products.length > 0 && (
            <div className="product-list-page__grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;