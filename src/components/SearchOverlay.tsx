import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import type { Product } from "../types/product";
import "../styles/SearchOverlay.css";

interface SearchOverlayProps {
  isOpen: boolean;
  query: string;
  results: Product[];
  isLoading: boolean;
  onClose: () => void;
}

function SearchOverlay({ isOpen, query, results, isLoading, onClose }: SearchOverlayProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-overlay__panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-overlay__header">
          <h2 className="search-overlay__title">
            نتایج جستجو برای «{query}»
          </h2>
          <button
            type="button"
            className="search-overlay__close"
            onClick={onClose}
            aria-label="بستن"
          >
            ✕
          </button>
        </div>

        {isLoading && <p className="search-overlay__status">در حال جستجو...</p>}

        {!isLoading && results.length === 0 && (
          <p className="search-overlay__status">محصولی با این عنوان یافت نشد.</p>
        )}

        {!isLoading && results.length > 0 && (
          <div className="search-overlay__grid">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <button
            type="button"
            className="search-overlay__view-all"
            onClick={() => {
              onClose();
              navigate("/products");
            }}
          >
            مشاهده همه محصولات
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchOverlay;