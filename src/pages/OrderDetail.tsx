import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderItemRow from "../components/Orders/OrderItemRow";
import OrderStatusBadge from "../components/Orders/OrderStatusBadge";
import ShippingInfoDisplay from "../components/Orders/ShippingInfo";
import { getOrderById } from "../services/orderService";
import type { Order } from "../types/order";
import { formatPrice } from "../utils/formatPrice";
import "../styles/OrderDetail.css";

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("fa-IR").format(new Date(dateStr));
}

function OrderDetail() {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;
    let isMounted = true;

    getOrderById(orderId)
      .then((data) => {
        if (!isMounted) return;
        if (!data) {
          setError("سفارش یافت نشد");
        } else {
          setOrder(data);
        }
      })
      .catch(() => {
        if (isMounted) setError("خطا در دریافت اطلاعات سفارش");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  if (isLoading) return <p className="order-detail-page__status">در حال بارگذاری...</p>;
  if (error || !order)
    return <p className="order-detail-page__status order-detail-page__status--error">{error}</p>;

  return (
    <div className="order-detail-page">
      <div className="order-detail-page__header">
        <div className="order-detail-page__title-row">
          <div>
            <h1 className="order-detail-page__title">سفارش #{order.orderNumber}</h1>
            <p className="order-detail-page__date">ثبت شده در {formatDate(order.createdAt)}</p>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      <div className="order-detail-page__content">
        <div className="order-detail-page__main">
          <div className="order-detail-page__items">
            <h2 className="order-detail-page__items-title">
              کالاهای سفارش ({order.itemsCount} کالا)
            </h2>
            {order.items.map((item) => (
              <OrderItemRow key={item.id} item={item} />
            ))}
          </div>

          <div className="order-detail-page__shipping">
            <ShippingInfoDisplay shippingInfo={order.shippingInfo} />
          </div>
        </div>

        <aside className="order-detail-page__summary">
          <h2 className="order-detail-page__summary-title">خلاصه پرداخت</h2>
          <div className="order-detail-page__summary-row">
            <span>{formatPrice(order.totalPrice)}</span>
            <span>مبلغ کل کالاها</span>
          </div>
          <div className="order-detail-page__summary-row">
            <span>رایگان</span>
            <span>هزینه ارسال</span>
          </div>
          <div className="order-detail-page__summary-total">
            <span>{formatPrice(order.totalPrice)}</span>
            <span>مبلغ نهایی</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default OrderDetail;