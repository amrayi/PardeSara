import { useEffect, useRef, useState } from "react";
import type { Product } from "../../types/product";
import ProductCard from "../ProductCard";
import "../../styles/ProductDetail.css";

interface ProductCarouselProps {
  title: string;
  products: Product[];
  visibleCount?: number;
}

function ProductCarousel({ title, products, visibleCount = 3 }: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stepPx, setStepPx] = useState(0);

  const maxIndex = Math.max(products.length - visibleCount, 0);
  const showArrows = products.length > visibleCount;

  useEffect(() => {
    function measure() {
      const track = trackRef.current;
      if (!track) return;
      const firstCard = track.children[0] as HTMLElement | undefined;
      if (!firstCard) return;

      const gap = parseFloat(getComputedStyle(track).gap || "0");
      setStepPx(firstCard.offsetWidth + gap);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [products]);

  useEffect(() => {
    // اگه تعداد محصولات کم شد، مطمئن شو ایندکس از رنج خارج نشه
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

  if (products.length === 0) return null;

  return (
    <section className="product-carousel">
      <div className="product-carousel__header">
        <h2 className="product-carousel__title">{title}</h2>

        {showArrows && (
          <div className="product-carousel__nav">
            <button
              type="button"
              className="product-carousel__nav-btn"
              onClick={goPrev}
              disabled={currentIndex === 0}
              aria-label="نمایش محصولات قبلی"
            >
              ‹
            </button>
            <button
              type="button"
              className="product-carousel__nav-btn"
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
              aria-label="نمایش محصولات بعدی"
            >
              ›
            </button>
          </div>
        )}
      </div>

      <div className="product-carousel__viewport">
        <div
          ref={trackRef}
          className="product-carousel__track"
          style={{
            transform: `translateX(${currentIndex * stepPx}px)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="product-carousel__item"
              style={{ flexBasis: `calc((100% - ${(visibleCount - 1) * 20}px) / ${visibleCount})` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductCarousel;