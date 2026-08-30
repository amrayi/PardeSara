import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { formatPrice } from "../utils/formatPrice";
import "../styles/ProductCard.css";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.slug}`} className="product-card">
      <div className="product-card__image-wrapper">
        <img src={product.image} alt={product.title} className="product-card__image" />
      </div>
      <div className="product-card__info">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__price">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

export default ProductCard;