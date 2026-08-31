import { NavLink } from "react-router-dom";
import dashboardIcon from "../../assets/icons/dashboard.svg";
import productsIcon from "../../assets/icons/products.svg";
import ordersIcon from "../../assets/icons/orders.svg";
import customersIcon from "../../assets/icons/customers.svg";
import settingsIcon from "../../assets/icons/settings.svg";

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

      <button className="admin-sidebar__settings" type="button">
        <img src={settingsIcon} alt="" />
        <span>تنظیمات</span>
      </button>
    </aside>
  );
}

export default AdminSidebar;