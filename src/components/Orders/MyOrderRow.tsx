import { Link } from "react-router-dom";
import type { Order } from "../../types/order";
import OrderStatusBadge from "./OrderStatusBadge";
import { formatPrice } from "../../utils/formatPrice";
import "../../styles/MyOrderRow.css";

interface MyOrderRowProps {
  order: Order;
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("fa-IR").format(new Date(dateStr));
}

function MyOrderRow({ order }: MyOrderRowProps) {
  return (
    <Link to={`/orders/${order.id}`} className="my-order-row">
      <div className="my-order-row__info">
        <span className="my-order-row__number">سفارش #{order.orderNumber}</span>
        <span className="my-order-row__date">{formatDate(order.createdAt)}</span>
      </div>

      <span className="my-order-row__items-count">{order.itemsCount} کالا</span>
      <span className="my-order-row__price">{formatPrice(order.totalPrice)}</span>
      <OrderStatusBadge status={order.status} />
    </Link>
  );
}

export default MyOrderRow;