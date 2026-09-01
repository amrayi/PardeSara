import * as yup from "yup";

export const storeSettingsSchema = yup.object({
  storeName: yup.string().required("نام فروشگاه اجباری است."),
  supportEmail: yup
    .string()
    .required("ایمیل پشتیبانی اجباری است.")
    .email("ایمیل معتبر نیست."),
  phone: yup.string().required("تلفن تماس اجباری است."),
  address: yup.string().required("آدرس اجباری است."),
});