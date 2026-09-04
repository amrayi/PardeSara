import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import { useAuth } from "../context/AuthContext";
import chevronDownIcon from "../assets/icons/down.png";
import "../styles/Admin.css";
// import Button from "../components/ui/Button";

function AdminLayout() {
  const { user } = useAuth();

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar__actions">
            {/* <Button type="button" variant="text" size="sm" radius="pill" className="admin-topbar__bell">
              <img src={bellIcon} alt="اعلان‌ها" />
            </Button> */}

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
              <img src={chevronDownIcon} alt=""/>
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