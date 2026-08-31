import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AuthLayout from "../layouts/AuthLayout";
import Button from "../components/ui/Button";
import { otpSchema } from "../schemas/loginSchema";
import { sendOtp, verifyOtp } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "../styles/AuthForm.css";

const OTP_LENGTH = 5;
const RESEND_SECONDS = 55;

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const phone = (location.state as { phone?: string } | null)?.phone;

  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const formik = useFormik({
    initialValues: { code: "" },
    validationSchema: otpSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      if (!phone) return;
      setStatus(undefined);
      try {
        const { user, token } = await verifyOtp(phone, values.code);
        login(user, token);
        navigate("/");
      } catch (err) {
        setStatus(err instanceof Error ? err.message : "خطا در تایید کد.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  if (!phone) {
    return <Navigate to="/login" replace />;
  }

  const digits = formik.values.code.split("");

  const handleDigitChange = (index: number, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = cleanValue;
    while (newDigits.length < OTP_LENGTH) newDigits.push("");
    const newCode = newDigits.join("").slice(0, OTP_LENGTH);
    formik.setFieldValue("code", newCode);

    if (cleanValue && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0) return;
    await sendOtp(phone);
    setSecondsLeft(RESEND_SECONDS);
  };

  const formattedTime = `00:${String(secondsLeft).padStart(2, "0")}`;

  return (
    <AuthLayout>
      <form className="auth-form" onSubmit={formik.handleSubmit} noValidate>
        <h2 className="auth-form__title">کد تایید</h2>
        <p className="auth-form__subtitle">
          کد ۵ رقمی ارسال شده به شماره {phone} را وارد کنید.
        </p>

        <div className="auth-form__otp-boxes" dir="ltr">
          {Array.from({ length: OTP_LENGTH }).map((_, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="auth-form__otp-box"
              value={digits[index] ?? ""}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>

        {formik.touched.code && formik.errors.code && (
          <span className="auth-form__error" style={{ textAlign: "center" }}>
            {formik.errors.code}
          </span>
        )}
        {formik.status && <p className="auth-form__status-error">{formik.status}</p>}

        <div className="auth-form__otp-actions">
          <button type="button" className="auth-form__link-btn" onClick={() => navigate("/login")}>
            تغییر شماره
          </button>

          {secondsLeft > 0 ? (
            <span className="auth-form__timer">ارسال مجدد تا {formattedTime}</span>
          ) : (
            <button type="button" className="auth-form__link-btn" onClick={handleResend}>
              ارسال مجدد کد
            </button>
          )}
        </div>

        <Button
          type="submit"
          variant="main"
          size="lg"
          radius="md"
          className="auth-form__submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "در حال بررسی..." : "تایید و ورود"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default VerifyOtp;