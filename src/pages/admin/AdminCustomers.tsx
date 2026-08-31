import { useEffect, useState } from "react";
import { getAdminCustomers } from "../../services/adminService";
import type { AdminCustomer } from "../../types/admin";
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
        <button className="admin-add-btn" type="button">
          <img src={plusIcon} alt="" />
          مشتری جدید
        </button>
        <h1>لیست مشتریان</h1>
      </div>

      <div className="admin-table admin-table--customers">
        <div className="admin-table__header-row">
          <span>عملیات</span>
          <span>تعداد سفارش</span>
          <span>شماره تماس</span>
          <span>مشتری</span>
        </div>

        {customers.map((customer) => (
          <div key={customer.id} className="admin-table__row">
            <div className="admin-table__actions">
              <button type="button" onClick={() => handleDelete(customer.id)}>
                <img src={trashIcon} alt="حذف" />
              </button>
              <button type="button" onClick={() => handleEdit(customer.id)}>
                <img src={editIcon} alt="ویرایش" />
              </button>
            </div>

            <span className="admin-table__badge">{customer.ordersCount} سفارش</span>

            <span dir="ltr">{customer.phone}</span>

            <div className="admin-table__customer">
              <div>
                <span className="admin-table__customer-name">{customer.fullName}</span>
                <span className="admin-table__customer-email">{customer.email}</span>
              </div>
              {customer.avatar ? (
                <img src={customer.avatar} alt="" className="admin-table__avatar" />
              ) : (
                <div className="admin-table__avatar admin-table__avatar--placeholder">
                  {customer.fullName[0]}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="admin-pagination admin-pagination--simple">
        <span>نمایش ۱ تا ۴ از ۵۰</span>
        <div>
          <button type="button">&gt;</button>
          <button type="button" className="admin-pagination__active">۱</button>
          <button type="button">۲</button>
          <button type="button">۳</button>
          <button type="button">&lt;</button>
        </div>
      </div>
    </div>
  );
}

export default AdminCustomers;