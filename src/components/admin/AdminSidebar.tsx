import { NavLink } from "react-router-dom";
import dashboardIcon from "../../assets/icons/dashboard.png";
import productsIcon from "../../assets/icons/box.png";
import ordersIcon from "../../assets/icons/order.png";
import store from "../../assets/icons/store.png";
import Button from "../ui/Button";

const navItems = [
  { to: "/admin", label: "پیشخوان", icon: dashboardIcon, end: true },
  { to: "/admin/products", label: "محصولات", icon: productsIcon },
  { to: "/admin/orders", label: "سفارش‌ها", icon: ordersIcon },
  { to: "/admin/store-detail", label: "اطلاعات فروشگاه", icon: store },
];

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <a href="/">
        <div className="admin-sidebar__brand">پرده‌سرا</div>
      </a>

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
    </aside>
  );
}

export default AdminSidebar;