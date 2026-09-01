import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/ui/Button";
import { signupSchema } from "../schemas/loginSchema";
import { signup } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import userIcon from "../assets/icons/profile.png";
import phoneIcon from "../assets/icons/phone.png";
import lockIcon from "../assets/icons/lock.png";
import arrowDark from "../assets/icons/left.png";
import arrowLight from "../assets/icons/left-light.png";
import "../styles/AuthForm.css";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: { fullName: "", phone: "", password: "" },
    validationSchema: signupSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(undefined);
      try {
        const { user, token } = await signup(values.fullName, values.phone, values.password);
        login(user, token);
        navigate("/");
      } catch (error) {
        setStatus("خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout>
      <form className="auth-form" onSubmit={formik.handleSubmit} noValidate>
        <h2 className="auth-form__title">ثبت‌نام</h2>
        <p className="auth-form__subtitle">برای ایجاد حساب کاربری، اطلاعات خود را وارد کنید.</p>

        <div className="auth-form__field">
          <label htmlFor="fullName">نام و نام خانوادگی</label>
          <div
            className={`auth-form__input-wrapper ${
              formik.touched.fullName && formik.errors.fullName
                ? "auth-form__input-wrapper--error"
                : ""
            }`}
          >
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="نام و نام خانوادگی خود را وارد کنید"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <img src={userIcon} alt="" className="auth-form__input-name-icon" />
          </div>
          {formik.touched.fullName && formik.errors.fullName && (
            <span className="auth-form__error">{formik.errors.fullName}</span>
          )}
        </div>

        <div className="auth-form__field">
          <label htmlFor="phone">شماره موبایل</label>
          <div
            className={`auth-form__input-wrapper ${
              formik.touched.phone && formik.errors.phone
                ? "auth-form__input-wrapper--error"
                : ""
            }`}
          >
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              placeholder="0912 345 6789"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <img src={phoneIcon} alt="" className="auth-form__input-icon" />
          </div>
          {formik.touched.phone && formik.errors.phone && (
            <span className="auth-form__error">{formik.errors.phone}</span>
          )}
        </div>

        <div className="auth-form__field">
          <label htmlFor="password">رمز عبور</label>
          <div
            className={`auth-form__input-wrapper ${
              formik.touched.password && formik.errors.password
                ? "auth-form__input-wrapper--error"
                : ""
            }`}
          >
            <input
              id="password"
              name="password"
              type="password"
              placeholder="رمز عبور خود را وارد کنید"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <img src={lockIcon} alt="" className="auth-form__input-icon" />
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="auth-form__error">{formik.errors.password}</span>
          )}
        </div>

        <p className="auth-form__redirect">
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="auth-form__redirect-link"
          >
            وارد شوید
          </button>
        </p>

        {formik.status && <p className="auth-form__status-error">{formik.status}</p>}

        <Button
          type="submit"
          variant="main"
          size="lg"
          radius="md"
          className="auth-form__submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          <span className="btn-icon-swap">
            <img src={arrowDark} alt="" className="btn-icon-swap__dark" />
            <img src={arrowLight} alt="" className="btn-icon-swap__light" />
          </span>
        </Button>

        <p className="auth-form__terms">
          با ورود و یا ثبت‌نام در پرده‌سرا{" "}
          <a href="/terms">قوانین و مقررات</a> استفاده از سرویس‌های سایت را
          می‌پذیرم.
        </p>
      </form>
    </AuthLayout>
  );
}

export default Signup;