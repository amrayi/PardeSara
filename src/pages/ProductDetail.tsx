import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccordionItem from "../components/productDetail/AccordionItem";
import ProductGallery from "../components/productDetail/ProductGallery";
import ColorSwatchSelector from "../components/productDetail/ColorSwatchSelector";
import ProductCarousel from "../components/productDetail/ProductCarousel";
import { getProductDetailBySlug, getRelatedProducts } from "../services/productService";
import { useCart } from "../context/CartContext";
import type { Product, ProductDetail as ProductDetailType } from "../types/product";
import { formatPrice } from "../utils/formatPrice";
import "../styles/ProductDetail.css";
import Button from "../components/ui/Button";
import CartIcon from "../assets/icons/Icon (9).png";

function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductDetailType | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedColorId, setSelectedColorId] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let isMounted = true;

    async function fetchProduct() {
      try {
        setIsLoading(true);
        const data = await getProductDetailBySlug(slug!);
        if (!isMounted) return;

        if (!data) {
          setError("محصول یافت نشد");
        } else {
          setProduct(data);
          setSelectedColorId(data.colorVariants[0]?.id ?? "");
          const related = await getRelatedProducts(slug!);
          if (isMounted) setRelatedProducts(related);
        }
      } catch {
        if (isMounted) setError("خطا در دریافت اطلاعات محصول");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) return <p className="product-detail__status">در حال بارگذاری...</p>;
  if (error || !product)
    return <p className="product-detail__status product-detail__status--error">{error}</p>;

  const selectedColor = product.colorVariants.find((v) => v.id === selectedColorId);

  const handleAddToCart = () => {
    console.log("زده شد", { productId: product.id, selectedColorId });
    addToCart(
      {
        id: `${product.id}-${selectedColorId}`,
        productId: product.id,
        slug: product.slug,
        title: product.title,
        image: product.image,
        price: product.price,
        colorName: selectedColor?.name,
        widthCm: product.widthCm,
        heightCm: product.heightCm,
      },
      1
    );
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail">
        <div className="product-detail__gallery">
          <ProductGallery media={product.media} />
        </div>

        <div className="product-detail__info">
          <nav className="product-detail__breadcrumb">
            <Link to="/products">پرده‌ها</Link>
            <span>{" > "}</span>
            <span>{product.categoryId}</span>
          </nav>

          <h1 className="product-detail__title">{product.title}</h1>
          {product.subtitle && (
            <p className="product-detail__subtitle">{product.subtitle}</p>
          )}

          <p className="product-detail__price">{formatPrice(product.price)}</p>

          <div className="product-detail__section">
            <p className="product-detail__label">
              انتخاب رنگ: {selectedColor?.name}
            </p>
            <ColorSwatchSelector
              variants={product.colorVariants}
              selectedId={selectedColorId}
              onSelect={setSelectedColorId}
            />
          </div>

          <div className="product-detail__dimensions">
            <div className="product-detail__dimension-box">
              <p className="product-detail__label">ارتفاع (سانتی‌متر)</p>
              <div className="product-detail__dimension-value">{product.heightCm}</div>
            </div>
            <div className="product-detail__dimension-box">
              <p className="product-detail__label">عرض (سانتی‌متر)</p>
              <div className="product-detail__dimension-value">{product.widthCm}</div>
            </div>
          </div>

          <div className="product-detail__actions">
            <Button
              variant="main"
              size="md"
              radius="md"
              className="product-detail__add-to-cart"
              onClick={handleAddToCart}
            >
              <img src={CartIcon} className="product-detail__cart-icon" alt="" />
              افزودن به سبد خرید
            </Button>
          </div>

          <div className="product-detail__sections">
            {product.sections.map((section, index) => (
              <AccordionItem
                key={section.id}
                title={section.title}
                defaultOpen={index === 0}
              >
                {section.content}
              </AccordionItem>
            ))}
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <ProductCarousel title="محصولات مشابه" products={relatedProducts} />
      )}
    </div>
  );
}

export default ProductDetail;