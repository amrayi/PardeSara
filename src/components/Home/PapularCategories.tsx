import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { productCategories } from "../../data/mockProductFormOptions";
import "../../styles/Home.css";

export default function PopularCategories() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      viewport.style.cursor = "grabbing";
      viewport.style.scrollBehavior = "auto";
      startX.current = e.pageX - viewport.offsetLeft;
      scrollLeftStart.current = viewport.scrollLeft;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - viewport.offsetLeft;
      const walk = (x - startX.current) * 1.2;
      viewport.scrollLeft = scrollLeftStart.current - walk;
    };

    const onMouseUpOrLeave = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      viewport.style.cursor = "grab";
      viewport.style.scrollBehavior = "smooth";
    };

    const onTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].pageX - viewport.offsetLeft;
      scrollLeftStart.current = viewport.scrollLeft;
      viewport.style.scrollBehavior = "auto";
    };

    const onTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].pageX - viewport.offsetLeft;
      const walk = (x - startX.current) * 1.2;
      viewport.scrollLeft = scrollLeftStart.current - walk;
    };

    const onTouchEnd = () => {
      viewport.style.scrollBehavior = "smooth";
    };

    viewport.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUpOrLeave);
    viewport.addEventListener("mouseleave", onMouseUpOrLeave);
    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchmove", onTouchMove, { passive: true });
    viewport.addEventListener("touchend", onTouchEnd);

    return () => {
      viewport.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUpOrLeave);
      viewport.removeEventListener("mouseleave", onMouseUpOrLeave);
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchmove", onTouchMove);
      viewport.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section className="popular-categories">
      <div className="popular-categories__header">
        <div>
          <h2 className="popular-categories__title">دسته‌بندی‌های محبوب</h2>
          <span className="popular-categories__underline" />
        </div>
      </div>

      <div className="popular-categories__viewport" ref={viewportRef}>
        <div className="popular-categories__track">
          {productCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="popular-categories__card"
            >
              <div className="popular-categories__image-wrapper">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="popular-categories__image"
                  draggable={false}
                />
              </div>
              <span className="popular-categories__card-title">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}