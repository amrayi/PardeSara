import { NavLink } from "react-router-dom";
import Button from "../ui/Button";
import dashboardIcon from "../../assets/icons/dashboard.png";
import productsIcon from "../../assets/icons/box.png";
import ordersIcon from "../../assets/icons/order.png";
import customersIcon from "../../assets/icons/profile.png";
import settingsIcon from "../../assets/icons/setting.png";

const navItems = [
  { to: "/admin", label: "پیشخوان", icon: dashboardIcon, end: true },
  { to: "/admin/products", label: "محصولات", icon: productsIcon },
  { to: "/admin/orders", label: "سفارش‌ها", icon: ordersIcon },
  { to: "/admin/customers", label: "مشتریان", icon: customersIcon },
];

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">پرده‌سرا</div>

      <nav className="admin-sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `admin-sidebar__link ${isActive ? "admin-sidebar__link--active" : ""}`
            }
          >
            <img src={item.icon} alt="" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <Button
        type="button"
        variant="text"
        size="sm"
        radius="sm"
        className="admin-sidebar__settings"
      >
        <img src={settingsIcon} alt="" />
        <span>تنظیمات</span>
      </Button>
    </aside>
  );
}

export default AdminSidebar;