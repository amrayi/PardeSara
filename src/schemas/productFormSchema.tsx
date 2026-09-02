import * as yup from "yup";

export const productFormSchema = yup.object({
  title: yup.string().required("نام محصول اجباری است."),
  price: yup
    .number()
    .typeError("قیمت باید عدد باشد.")
    .required("قیمت اجباری است.")
    .positive("قیمت باید بیشتر از صفر باشد."),
  heightCm: yup
    .number()
    .typeError("طول باید عدد باشد.")
    .required("طول اجباری است.")
    .positive("طول باید بیشتر از صفر باشد."),
  widthCm: yup
    .number()
    .typeError("عرض باید عدد باشد.")
    .required("عرض اجباری است.")
    .positive("عرض باید بیشتر از صفر باشد."),
  category: yup.string().required("انتخاب دسته‌بندی اجباری است."),
  colorIds: yup.array().of(yup.string()).min(1, "حداقل یک رنگ انتخاب کنید."),
  description: yup.string().required("توضیحات اجباری است."),
});