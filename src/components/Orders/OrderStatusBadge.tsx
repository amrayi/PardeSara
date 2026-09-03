import type { OrderStatus } from "../../types/order";

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "در انتظار بررسی",
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  delivered: "تحویل شده",
  cancelled: "لغو شده",
};

const STATUS_CLASS: Record<OrderStatus, string> = {
  pending: "status-badge--pending",
  processing: "status-badge--processing",
  shipped: "status-badge--shipped",
  delivered: "status-badge--delivered",
  cancelled: "status-badge--cancelled",
};

function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`status-badge ${STATUS_CLASS[status]}`}>
      <span className="status-badge__dot" />
      {STATUS_LABEL[status]}
    </span>
  );
}

export default OrderStatusBadge;