import * as yup from "yup";

export const loginSchema = yup.object({
  phone: yup
    .string()
    .required("شماره تلفن اجباری است.")
    .matches(/^09[0-9]{9}$/, "شماره تلفن معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)"),
  password: yup
    .string()
    .required("رمز عبور اجباری است.")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد."),
});

export const signupSchema = yup.object({
  fullName: yup
    .string()
    .required("نام و نام خانوادگی اجباری است.")
    .min(3, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد."),
  phone: yup
    .string()
    .required("شماره تلفن اجباری است.")
    .matches(/^09[0-9]{9}$/, "شماره تلفن معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)"),
  password: yup
    .string()
    .required("رمز عبور اجباری است.")
    .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد."),
});

export const otpSchema = yup.object({
  code: yup
    .string()
    .required("کد تایید اجباری است.")
    .matches(/^[0-9]{5}$/, "کد تایید باید ۵ رقم باشد."),
});