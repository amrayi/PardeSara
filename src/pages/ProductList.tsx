import { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { useProductsQuery } from "../hooks/useProductsQuery";
import { filterProductsClientSide } from "../services/productService";
import Button from "../components/ui/Button";
import "../styles/ProductList.css";

const PAGE_SIZE = 21;

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: allProducts = [], isLoading, error } = useProductsQuery();
  
  const [page, setPage] = useState(1);

  const selectedPriceRangeIds = searchParams.getAll("price");
  const selectedCategoryIds = searchParams.getAll("category");

  const products = useMemo(
    () =>
      filterProductsClientSide(allProducts, {
        priceRangeIds: selectedPriceRangeIds,
        categoryIds: selectedCategoryIds,
      }),
    [allProducts, searchParams.toString()]
  );

  useEffect(() => {
    setPage(1);
  }, [searchParams.toString()]);

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

  const totalPages = Math.max(Math.ceil(products.length / PAGE_SIZE), 1);
  const currentPageProducts = products.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const getPageNumbers = (): number[] => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 2) return [1, 2, 3];
    if (page >= totalPages - 1) return [totalPages - 2, totalPages - 1, totalPages];
    return [page - 1, page, page + 1];
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
            <>
              <div className="product-list-page__grid">
                {currentPageProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="product-list-page__pagination">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  radius="sm"
                  className="admin-icon-btn"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  &lt;
                </Button>

                {getPageNumbers()[0] > 1 && (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      radius="sm"
                      className="admin-icon-btn"
                      onClick={() => setPage(1)}
                    >
                      1
                    </Button>
                    <span>...</span>
                  </>
                )}

                {getPageNumbers().map((p) => (
                  <Button
                    key={p}
                    type="button"
                    variant={p === page ? "main" : "secondary"}
                    size="sm"
                    radius="sm"
                    className="admin-icon-btn"
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </Button>
                ))}

                {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                  <>
                    <span>...</span>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      radius="sm"
                      className="admin-icon-btn"
                      onClick={() => setPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}

                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  radius="sm"
                  className="admin-icon-btn"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  &gt;
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;