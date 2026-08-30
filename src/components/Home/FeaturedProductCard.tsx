import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/product";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";
import plusIcon from "../../assets/icons/plus.png";
import "../../styles/Home.css";

interface FeaturedProductCardProps {
  product: Product;
}

function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite((prev) => !prev);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
  e.preventDefault();
  addToCart({
    id: product.id,
    productId: product.id,
    slug: product.slug,
    title: product.title,
    image: product.image,
    price: product.price,
    colorName: product.colorName,
  });
};

  return (
    <div className="featured-product-card">
      <Link to={`/products/${product.slug}`} className="featured-product-card__media">
        <img src={product.image} alt={product.title} />
        <button
          type="button"
          className={`featured-product-card__favorite ${
            isFavorite ? "featured-product-card__favorite--active" : ""
          }`}
          onClick={handleToggleFavorite}
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </Link>

      <div className="featured-product-card__info">
        <Link to={`/products/${product.slug}`} className="featured-product-card__title">
          {product.title}
        </Link>

        {product.colorName && (
          <p className="featured-product-card__color">رنگ: {product.colorName}</p>
        )}

        <div className="featured-product-card__bottom">
          <span className="featured-product-card__price">{formatPrice(product.price)}</span>
          <button
            type="button"
            className="featured-product-card__quick-add"
            onClick={handleQuickAdd}
            aria-label="افزودن سریع به سبد خرید"
          >
            <img src={plusIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProductCard;