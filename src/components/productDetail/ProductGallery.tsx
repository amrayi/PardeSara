import { useState } from "react";
import type { ProductMedia } from "../../types/product";
import "../../styles/ProductDetail.css";

interface ProductGalleryProps {
  media: ProductMedia[];
}

function ProductGallery({ media }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeMedia = media[activeIndex];

  return (
    <div className="product-gallery">
      <div className="product-gallery__main">
        {activeMedia.type === "video" ? (
          <video
            src={activeMedia.url}
            controls
            className="product-gallery__main-media"
          />
        ) : (
          <img
            src={activeMedia.url}
            alt=""
            className="product-gallery__main-media"
          />
        )}
      </div>

      <div className="product-gallery__thumbs">
        {media.map((item, index) => (
          <button
            key={index}
            type="button"
            className={`product-gallery__thumb ${
              index === activeIndex ? "product-gallery__thumb--active" : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <img
              src={item.type === "video" ? item.thumbnail : item.url}
              alt=""
              className="product-gallery__thumb-image"
            />
            {item.type === "video" && (
              <span className="product-gallery__play-icon">▶</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;