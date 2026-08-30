import type { CartItem } from "../../types/cart";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";
import QuantityStepper from "./QuantityStepper";
import trashIcon from "../../assets/icons/delete.png";
import "../../styles/Cart.css";

interface CartItemRowProps {
  item: CartItem;
}

function CartItemRow({ item }: CartItemRowProps) {
  const { removeFromCart, updateQuantity } = useCart();

  const dimensionsLabel =
    item.widthCm && item.heightCm ? `${item.widthCm} در ${item.heightCm}` : null;

  return (
    <div className="cart-item-row">
      <img src={item.image} alt="" className="cart-item-row__image" />
      
      <div className="cart-item-row__content">
        <h3 className="cart-item-row__title">{item.title}</h3>
        <p className="cart-item-row__subtitle">
          {item.colorName && <>رنگ: {item.colorName}</>}
          {item.colorName && dimensionsLabel && " | "}
          {dimensionsLabel && <>ابعاد: {dimensionsLabel}</>}
        </p>

        <div className="cart-item-row__bottom">
          <QuantityStepper
            quantity={item.quantity}
            onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
          />
          <span className="cart-item-row__price">{formatPrice(item.price)}</span>
        </div>
      </div>

      <button
        type="button"
        className="cart-item-row__remove"
        onClick={() => removeFromCart(item.id)}
        aria-label="حذف از سبد خرید"
      >
        <img src={trashIcon} alt="" />
      </button>

    </div>
  );
}

export default CartItemRow;