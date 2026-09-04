import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { productCategories } from "../../data/mockProductFormOptions";
import "../../styles/Home.css";

const VISIBLE_COUNT = 3;
const GAP_PX = 20;

export default function PopularCategories() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stepPx, setStepPx] = useState(0);

  const maxIndex = Math.max(productCategories.length - VISIBLE_COUNT, 0);
  const showArrows = productCategories.length > VISIBLE_COUNT;

  useEffect(() => {
    function measure() {
      const track = trackRef.current;
      if (!track) return;
      const firstCard = track.children[0] as HTMLElement | undefined;
      if (!firstCard) return;
      setStepPx(firstCard.offsetWidth + GAP_PX);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const goPrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const goNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));

  return (
    <section className="popular-categories">
      <div className="popular-categories__header">
        <div>
          <h2 className="popular-categories__title">دسته‌بندی‌های محبوب</h2>
          <span className="popular-categories__underline" />
        </div>

        {showArrows && (
          <div className="popular-categories__nav">
            <button
              type="button"
              className="popular-categories__nav-btn"
              onClick={goPrev}
              disabled={currentIndex === 0}
              aria-label="نمایش دسته‌های قبلی"
            >
              ›
            </button>
            <button
              type="button"
              className="popular-categories__nav-btn"
              onClick={goNext}
              disabled={currentIndex >= maxIndex}
              aria-label="نمایش دسته‌های بعدی"
            >
              ‹
            </button>
          </div>
        )}
      </div>

      <div className="popular-categories__viewport">
        <div
          ref={trackRef}
          className="popular-categories__grid"
          style={{ transform: `translateX(${currentIndex * stepPx}px)` }}
        >
          {productCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="popular-categories__card"
            >
              <div className="popular-categories__image-wrapper">
                <img src={cat.image} alt={cat.name} className="popular-categories__image" />
              </div>
              <span className="popular-categories__card-title">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}