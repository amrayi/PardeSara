import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeaturedProductCard from "./FeaturedProductCard";
import { getNewestProducts } from "../../services/productService";
import type { Product } from "../../types/product";
import "../../styles/Home.css";
import icon from '../../assets/icons/left-light.png';

function NewestProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let isMounted = true;

    getNewestProducts(4).then((data) => {
      if (isMounted) setProducts(data);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="newest-products">
      <div className="newest-products__header">
        <div>
          <h2 className="newest-products__title">جدیدترین محصولات</h2>
          <p className="newest-products__subtitle">
            تازه‌ترین طرح‌ها برای زیباتر کردن فضای شما
          </p>
        </div>

        <Link to="/products" className="newest-products__view-all">
          مشاهده همه
          <img src={icon} className="newest-products__view-all-icon"/>
        </Link>
      </div>

      <div className="newest-products__grid">
        {products.map((product) => (
          <FeaturedProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default NewestProductsSection;