import { useEffect, useState } from "react";
import OrderStatusBadge from "../../components/Orders/OrderStatusBadge";
import OrderStatusMenu from "../../components/Orders/OrderStatusMenu";
import { getAdminOrders, updateAdminOrderStatus } from "../../services/adminService";
import type { AdminOrderSummary } from "../../types/admin";
import { formatPrice } from "../../utils/formatPrice";
import searchIcon from "../../assets/icons/search.png";
import filterIcon from "../../assets/icons/filter.png";
import documentIcon from "../../assets/icons/document.png";
import truckIcon from "../../assets/icons/truck.png";
import checkCircleIcon from "../../assets/icons/check-circle.png";
import Button from "../../components/ui/Button";

const STATUS_ICON: Record<AdminOrderSummary["status"], string> = {
  pending: documentIcon,
  processing: documentIcon,
  shipped: truckIcon,
  delivered: checkCircleIcon,
  cancelled: documentIcon,
};

const STATUS_FILTERS = ["همه", "در انتظار بررسی", "ارسال شده", "تحویل شده"];

const STATUS_MAP: Record<string, AdminOrderSummary["status"] | null> = {
  "همه": null,
  "در انتظار بررسی": "pending",
  "ارسال شده": "shipped",
  "تحویل شده": "delivered",
};

const PAGE_SIZE = 10;

function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrderSummary[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activeStatus, setActiveStatus] = useState("همه");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    getAdminOrders().then(setOrders);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, activeStatus]);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = o.customerName.includes(search) || o.orderNumber.includes(search);
    const selectedStatus = STATUS_MAP[activeStatus];
    const matchesStatus = selectedStatus === null || o.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(Math.ceil(filteredOrders.length / PAGE_SIZE), 1);
  const currentPageOrders = filteredOrders.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const handleStatusChange = async (
    orderId: string,
    newStatus: AdminOrderSummary["status"]
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    try {
      await updateAdminOrderStatus(orderId, newStatus);
    } catch {
      // اگه درخواست شکست خورد، می‌تونیم اینجا state رو برگردونیم یا خطا نشون بدیم
    }
  };

  const getPageNumbers = (): number[] => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 2) return [1, 2, 3];
    if (page >= totalPages - 1) return [totalPages - 2, totalPages - 1, totalPages];
    return [page - 1, page, page + 1];
  };

  return (
    <div className="admin-orders">
      <div className="admin-page-header">
        <div>
          <h1>سفارشات</h1>
          <p>مدیریت و پیگیری سفارشات ثبت شده</p>
        </div>
      </div>

      <div className="admin-orders__toolbar">
        <div className="admin-search-bar">
          <img src={searchIcon} alt="" />
          <input
            type="text"
            placeholder="جستجو سفارش..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="admin-orders__toolbar-filters">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            radius="sm"
            className="admin-icon-btn"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <img src={filterIcon} alt="فیلتر" />
          </Button>

          <div
            className={`admin-products__categories ${
              showFilters ? "admin-products__categories--open" : ""
            }`}
          >
            {STATUS_FILTERS.map((status) => (
              <Button
                key={status}
                type="button"
                variant={activeStatus === status ? "main" : "secondary"}
                size="sm"
                radius="pill"
                className="admin-chip"
                onClick={() => setActiveStatus(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-table">
        {currentPageOrders.map((order) => (
          <div key={order.id} className="admin-table__row">
            <div className="admin-table__icon">
              <img src={STATUS_ICON[order.status]} alt="" />
            </div>

            <div className="admin-table__cell">
              <span className="admin-table__label">شماره سفارش</span>
              <span>{order.orderNumber}</span>
            </div>

            <div className="admin-table__cell">
              <span className="admin-table__label">مشتری</span>
              <span>{order.customerName}</span>
            </div>

            <div className="admin-table__cell">
              <span className="admin-table__label">تاریخ ثبت</span>
              <span>{order.createdAt}</span>
            </div>

            <div className="admin-table__cell">
              <span className="admin-table__label">مبلغ کل</span>
              <span>{formatPrice(order.totalPrice)}</span>
            </div>

            <OrderStatusBadge status={order.status} />

            <OrderStatusMenu
              currentStatus={order.status}
              onSelect={(newStatus) => handleStatusChange(order.id, newStatus)}
            />
          </div>
        ))}
      </div>

      <div className="admin-pagination">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          radius="sm"
          className="admin-icon-btn"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          &lt;
        </Button>

        {getPageNumbers()[0] > 1 && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              radius="sm"
              className="admin-icon-btn"
              onClick={() => setPage(1)}
            >
              1
            </Button>
            <span>...</span>
          </>
        )}

        {getPageNumbers().map((p) => (
          <Button
            key={p}
            type="button"
            variant={p === page ? "main" : "secondary"}
            size="sm"
            radius="sm"
            className="admin-icon-btn"
            onClick={() => setPage(p)}
          >
            {p}
          </Button>
        ))}

        {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
          <>
            <span>...</span>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              radius="sm"
              className="admin-icon-btn"
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          type="button"
          variant="secondary"
          size="sm"
          radius="sm"
          className="admin-icon-btn"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
}

export default AdminOrders;