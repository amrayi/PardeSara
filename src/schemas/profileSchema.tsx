import * as yup from "yup";

export const profileSchema = yup.object({
  fullName: yup.string().required("نام و نام خانوادگی اجباری است."),
  phone: yup
    .string()
    .required("شماره موبایل اجباری است.")
    .matches(/^09[0-9]{9}$/, "شماره موبایل معتبر نیست."),
  password: yup
    .string()
    .test(
      "min-if-changed",
      "رمز عبور باید حداقل ۶ کاراکتر باشد.",
      (value) => !value || value.length >= 6
    ),
});