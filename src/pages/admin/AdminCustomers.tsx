import { useEffect, useState } from "react";
import { getAdminCustomers } from "../../services/adminService";
import type { AdminCustomer } from "../../types/admin";
import Button from "../../components/ui/Button";
import plusIcon from "../../assets/icons/plus.svg";
import editIcon from "../../assets/icons/edit.png";
import trashIcon from "../../assets/icons/delete.png";

function AdminCustomers() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);

  useEffect(() => {
    getAdminCustomers().then(setCustomers);
  }, []);

  const handleDelete = (id: string) => {
    // بعداً: صدا زدن API حذف مشتری
    console.log("delete customer", id);
  };

  const handleEdit = (id: string) => {
    // بعداً: باز شدن فرم ویرایش مشتری
    console.log("edit customer", id);
  };

  return (
    <div className="admin-customers">
      <div className="admin-page-header">
        <Button type="button" variant="main" size="sm" radius="md" className="admin-add-btn">
          <img src={plusIcon} alt="" />
          مشتری جدید
        </Button>
        <h1>لیست مشتریان</h1>
      </div>

      <div className="admin-table admin-table--customers">
        <div className="admin-table__header-row">
          <span>مشتری</span>
          <span>شماره تماس</span>
          <span>تعداد سفارش</span>
          <span>عملیات</span>
        </div>

        {customers.map((customer) => (
          <div key={customer.id} className="admin-table__row">
            <div className="admin-table__customer">
              {customer.avatar ? (
                <img src={customer.avatar} alt="" className="admin-table__avatar" />
              ) : (
                <div className="admin-table__avatar admin-table__avatar--placeholder">
                  {customer.fullName[0]}
                </div>
              )}
              <div>
                <span className="admin-table__customer-name">{customer.fullName}</span>
                <span className="admin-table__customer-email">{customer.email}</span>
              </div>
            </div>

            <span dir="ltr">{customer.phone}</span>

            <span className="admin-table__badge">{customer.ordersCount} سفارش</span>

            <div className="admin-table__actions">
              <Button type="button" variant="secondary" size="sm" radius="sm" className="admin-icon-btn" onClick={() => handleEdit(customer.id)}>
                <img src={editIcon} alt="ویرایش" />
              </Button>
              <Button type="button" variant="secondary" size="sm" radius="sm" className="admin-icon-btn" onClick={() => handleDelete(customer.id)}>
                <img src={trashIcon} alt="حذف" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-pagination admin-pagination--simple">
        <span>نمایش ۱ تا ۴ از ۵۰</span>
        <div>
          <Button type="button" variant="secondary" size="sm" radius="sm" className="admin-icon-btn">&lt;</Button>
          <Button type="button" variant="main" size="sm" radius="sm" className="admin-icon-btn">۱</Button>
          <Button type="button" variant="secondary" size="sm" radius="sm" className="admin-icon-btn">۲</Button>
          <Button type="button" variant="secondary" size="sm" radius="sm" className="admin-icon-btn">۳</Button>
          <Button type="button" variant="secondary" size="sm" radius="sm" className="admin-icon-btn">&gt;</Button>
        </div>
      </div>
    </div>
  );
}

export default AdminCustomers;