import * as yup from "yup";

export const loginSchema = yup.object({
  phone: yup
    .string()
    .required("شماره تلفن اجباری است.")
    .matches(/^09[0-9]{9}$/, "شماره تلفن معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)"),
});

export const otpSchema = yup.object({
  code: yup
    .string()
    .required("کد تایید اجباری است.")
    .matches(/^[0-9]{5}$/, "کد تایید باید ۵ رقم باشد."),
});