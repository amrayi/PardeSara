import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/ui/Button";
import { loginSchema } from "../schemas/loginSchema";
import { sendOtp } from "../services/authService";
import phoneIcon from "../assets/icons/phone.png";
import arrowDark from "../assets/icons/left.png";
import arrowLight from "../assets/icons/Icon (10).png";
import "../styles/AuthForm.css";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { phone: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(undefined);
      try {
        await sendOtp(values.phone);
        navigate("/login/verify", { state: { phone: values.phone } });
      } catch {
        setStatus("خطا در ارسال کد تایید. دوباره تلاش کنید.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout>
      <form className="auth-form" onSubmit={formik.handleSubmit} noValidate>
        <h2 className="auth-form__title">ورود یا ثبت‌نام</h2>
        <p className="auth-form__subtitle">برای ادامه، شماره موبایل خود را وارد کنید.</p>

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

        {formik.status && <p className="auth-form__status-error">{formik.status}</p>}

        <Button
          type="submit"
          variant="main"
          size="lg"
          radius="md"
          className="auth-form__submit"
          disabled={formik.isSubmitting}
        >
            
          {formik.isSubmitting ? "در حال ارسال..." : "دریافت کد تایید"}
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

export default Login;