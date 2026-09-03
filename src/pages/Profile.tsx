import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "../components/ui/Button";
import MyOrderRow from "../components/Orders/MyOrderRow";
import { profileSchema } from "../schemas/profileSchema";
import { getProfile, updateProfile } from "../services/profileService";
import { getMyOrders } from "../services/orderService";
import type { ProfileFormValues } from "../types/profile";
import type { Order } from "../types/order";
import "../styles/Profile.css";

function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const formik = useFormik<ProfileFormValues>({
    initialValues: { fullName: "", phone: "", password: "" },
    validationSchema: profileSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(undefined);
      try {
        await updateProfile(values);
        setStatus("success");
        setIsPasswordEditing(false);
      } catch {
        setStatus("خطا در ذخیره تغییرات.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    let isMounted = true;

    Promise.all([getProfile(), getMyOrders()]).then(([profile, myOrders]) => {
      if (!isMounted) return;
      formik.setValues(profile);
      setOrders(myOrders);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <p className="profile-page__status">در حال بارگذاری...</p>;

  return (
    <div className="profile-page">
      <h1 className="profile-page__title">پروفایل و تنظیمات</h1>

      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="profile-page__section">
          <p className="profile-page__section-label">اطلاعات حساب کاربری</p>

          <div className="profile-page__grid">
            <div className="profile-page__field">
              <label htmlFor="fullName">نام و نام خانوادگی</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <span className="profile-page__error">{formik.errors.fullName}</span>
              )}
            </div>

            <div className="profile-page__field">
              <label htmlFor="phone">شماره موبایل</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                dir="ltr"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone && (
                <span className="profile-page__error">{formik.errors.phone}</span>
              )}
            </div>

            <div className="profile-page__field">
              <label htmlFor="password">رمز عبور</label>
              <div className="profile-page__password-row">
                <input
                  id="password"
                  name="password"
                  type={isPasswordEditing ? "text" : "password"}
                  readOnly={!isPasswordEditing}
                  dir="ltr"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="profile-page__edit-btn"
                  onClick={() => setIsPasswordEditing((prev) => !prev)}
                >
                  {isPasswordEditing ? "بستن" : "ویرایش"}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <span className="profile-page__error">{formik.errors.password}</span>
              )}
            </div>
          </div>

          <div className="profile-page__footer">
            {formik.status === "success" && (
              <span className="profile-page__success">تغییرات با موفقیت ذخیره شد.</span>
            )}
            {formik.status && formik.status !== "success" && (
              <span className="profile-page__error">{formik.status}</span>
            )}

            <Button type="submit" variant="main" size="md" radius="md" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
          </div>
        </div>
      </form>

      <div className="profile-page__section">
        <p className="profile-page__section-label">سفارش‌های من</p>

        {orders.length === 0 ? (
          <p className="profile-page__empty">هنوز سفارشی ثبت نکرده‌اید.</p>
        ) : (
          <div className="profile-page__orders">
            {orders.map((order) => (
              <MyOrderRow key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;