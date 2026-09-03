import type { CartItem } from "../../types/cart";
import { formatPrice } from "../../utils/formatPrice";
import "../../styles/OrderItemRow.css";

interface OrderItemRowProps {
  item: CartItem;
}

function OrderItemRow({ item }: OrderItemRowProps) {
  const dimensionsLabel =
    item.widthCm && item.heightCm ? `${item.widthCm} در ${item.heightCm}` : null;

  return (
    <div className="order-item-row">
      <div className="order-item-row__content">
        <h3 className="order-item-row__title">{item.title}</h3>
        <p className="order-item-row__subtitle">
          {item.colorName && <>رنگ: {item.colorName}</>}
          {item.colorName && dimensionsLabel && " | "}
          {dimensionsLabel && <>ابعاد: {dimensionsLabel}</>}
        </p>

        <div className="order-item-row__bottom">
          <span className="order-item-row__price">{formatPrice(item.price)}</span>
          <span className="order-item-row__quantity">تعداد: {item.quantity}</span>
        </div>
      </div>

      <img src={item.image} alt="" className="order-item-row__image" />
    </div>
  );
}

export default OrderItemRow;