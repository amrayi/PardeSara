import { useEffect, useState } from "react";
import OrderStatusBadge from "../../components/admin/OrderStatusBadge";
import { getAdminOrders } from "../../services/adminService";
import type { AdminOrderSummary } from "../../types/admin";
import { formatPrice } from "../../utils/formatPrice";
import searchIcon from "../../assets/icons/search.png";
import filterIcon from "../../assets/icons/filter.png";
import moreIcon from "../../assets/icons/more.png";
import documentIcon from "../../assets/icons/document.png";
import truckIcon from "../../assets/icons/truck.png";
import checkCircleIcon from "../../assets/icons/check-circle.png";

const STATUS_ICON: Record<AdminOrderSummary["status"], string> = {
  pending: documentIcon,
  processing: documentIcon,
  shipped: truckIcon,
  delivered: checkCircleIcon,
  cancelled: documentIcon,
};

function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrderSummary[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAdminOrders().then(setOrders);
  }, []);

  const filteredOrders = orders.filter(
    (o) => o.customerName.includes(search) || o.orderNumber.includes(search)
  );

  return (
    <div className="admin-orders">
      <div className="admin-page-header">
        <div className="admin-search-bar">
          <img src={searchIcon} alt="" />
          <input
            type="text"
            placeholder="جستجو سفارش..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <h1>سفارشات</h1>
          <p>مدیریت و پیگیری سفارشات ثبت شده</p>
        </div>
        <button className="admin-filter-btn" type="button">
          <img src={filterIcon} alt="" />
          فیلتر
        </button>
      </div>

      <div className="admin-table">
        {filteredOrders.map((order) => (
          <div key={order.id} className="admin-table__row">
            <button className="admin-table__more" type="button">
              <img src={moreIcon} alt="گزینه‌ها" />
            </button>

            <div className="admin-table__cell">
              <OrderStatusBadge status={order.status} />
            </div>

            <div className="admin-table__cell">
              <span className="admin-table__label">مبلغ کل</span>
              <span>{formatPrice(order.totalPrice)} تومان</span>
            </div>

            <div className="admin-table__cell">
              <span className="admin-table__label">تاریخ ثبت</span>
              <span>{order.createdAt}</span>
            </div>

            <div className="admin-table__cell">
              <span className="admin-table__label">مشتری</span>
              <span>{order.customerName}</span>
            </div>

            <div className="admin-table__cell">
              <span className="admin-table__label">شماره سفارش</span>
              <span>{order.orderNumber}</span>
            </div>

            <div className="admin-table__icon">
              <img src={STATUS_ICON[order.status]} alt="" />
            </div>
          </div>
        ))}
      </div>

      <div className="admin-pagination">
        <button type="button" onClick={() => setPage((p) => Math.max(1, p - 1))}>&lt;</button>
        {[1, 2, 3].map((p) => (
          <button
            key={p}
            type="button"
            className={p === page ? "admin-pagination__active" : ""}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
        <span>...</span>
        <button type="button" onClick={() => setPage((p) => p + 1)}>&gt;</button>
      </div>
    </div>
  );
}

export default AdminOrders;