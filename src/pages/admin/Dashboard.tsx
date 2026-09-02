import { useEffect, useState } from "react";
import StatCard from "../../components/admin/StatCard";
import OrderStatusBadge from "../../components/OrderStatusBadge";
import { getDashboardStats, getRecentOrders } from "../../services/adminService";
import type { DashboardStats, AdminOrderSummary } from "../../types/admin";
import { formatPrice } from "../../utils/formatPrice";
import Button from "../../components/ui/Button";
import boxIcon from "../../assets/icons/box.png";
import truckIcon from "../../assets/icons/truck.png";
import walletIcon from "../../assets/icons/cash.png";
import plusIcon_light from "../../assets/icons/plus.svg";
import plusIcon_dark from "../../assets/icons/plus-dark.png";

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<AdminOrderSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDashboardStats(), getRecentOrders(4)]).then(([statsData, ordersData]) => {
      setStats(statsData);
      setRecentOrders(ordersData);
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !stats) return <div className="admin-loading">در حال بارگذاری...</div>;

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <div>
          <h1>خلاصه وضعیت</h1>
          <p>امروز {new Date().toLocaleDateString("fa-IR", { weekday: "long", day: "numeric", month: "long" })}</p>
        </div>
        <a href="/admin/add-product">
          <Button type="button" variant="main" size="sm" radius="md" className="admin-add-btn">
            <span className="btn-icon-swap">
              <img src={plusIcon_light} alt="" className="btn-icon-swap__light"/>
              <img src={plusIcon_dark} alt="" className="btn-icon-swap__dark"/>
            </span>
            افزودن محصول
          </Button>
          </a>
      </div>

      <div className="stat-cards-grid">
        <StatCard
          icon={boxIcon}
          title="محصولات فعال"
          value={String(stats.activeProductsCount)}
          footer={<span className="stat-card__badge">{stats.lowStockCount} طرح ناموجود در انبار</span>}
        />
        <StatCard
          icon={truckIcon}
          title="سفارش‌های جدید"
          value={String(stats.newOrdersCount)}
          footer={
            <span className={`stat-card__change ${stats.newOrdersWeeklyChangePercent < 0 ? "stat-card__change--down" : "stat-card__change--up"}`}>
              {stats.newOrdersWeeklyChangePercent > 0 ? "+" : ""}
              {stats.newOrdersWeeklyChangePercent}% نسبت به هفته قبل
            </span>
          }
        />
        <StatCard
          icon={walletIcon}
          title="فروش کل (ماه جاری)"
          value={`${formatPrice(stats.totalRevenue)} تومان`}
          footer={
            <span className="stat-card__change stat-card__change--up">
              +{stats.revenueMonthlyChangePercent}% نسبت به ماه قبل
            </span>
          }
        />
      </div>

      <div className="admin-recent-orders">
        <div className="admin-recent-orders__header">
          <button className="admin-link-btn" type="button">مشاهده همه</button>
          <h2>سفارش‌های اخیر</h2>
        </div>

        <ul className="admin-recent-orders__list">
          {recentOrders.map((order) => (
            <li key={order.id} className="admin-recent-orders__item">
              <div className="admin-recent-orders__thumb">
                {order.productImage ? (
                  <img src={order.productImage} alt="" />
                ) : (
                  <div className="admin-recent-orders__thumb--empty" />
                )}
              </div>

              <div className="admin-recent-orders__info">
                <span className="admin-recent-orders__customer">{order.customerName}</span>
                <span className="admin-recent-orders__product">{order.productName}</span>
              </div>

              <span className="admin-recent-orders__number">{order.orderNumber}</span>

              <OrderStatusBadge status={order.status} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;