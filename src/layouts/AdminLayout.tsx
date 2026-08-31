import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import { useAuth } from "../context/AuthContext";
import bellIcon from "../assets/icons/notif.png";
import chevronDownIcon from "../assets/icons/down.png";
import searchIcon from "../assets/icons/search.png";
import "../styles/Admin.css";

function AdminLayout() {
  const { user } = useAuth();

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar__search">
            <input type="text" placeholder="جستجو..." />
            <img src={searchIcon} alt="" />
          </div>

          <div className="admin-topbar__actions">
            <button className="admin-topbar__bell" type="button">
              <img src={bellIcon} alt="اعلان‌ها" />
            </button>

            <div className="admin-topbar__user">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.fullName} className="admin-topbar__avatar" />
              ) : (
                <div className="admin-topbar__avatar admin-topbar__avatar--placeholder">
                  {user?.fullName?.[0]}
                </div>
              )}
              <div className="admin-topbar__user-info">
                <span className="admin-topbar__user-name">{user?.fullName}</span>
                <span className="admin-topbar__user-role">مدیر سیستم</span>
              </div>
              <img src={chevronDownIcon} alt="" />
            </div>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;