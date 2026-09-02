import { useState } from "react";
import { useFormik } from "formik";
import Button from "../../components/ui/Button";
import ColorCheckboxList from "../../components/admin/ColorCheckboxList";
import ImageUploader from "../../components/admin/ImageUploader";
import { productFormSchema } from "../../schemas/productFormSchema";
import { availableColors, productCategories } from "../../data/mockProductFormOptions";
import { createProduct } from "../../services/adminProductService";
import type { ProductFormValues } from "../../types/productForm";
import "../../styles/admin.css";

function ProductForm() {
  const [images, setImages] = useState<File[]>([]);

  const formik = useFormik<ProductFormValues>({
    initialValues: {
      title: "",
      price: "",
      heightCm: "",
      widthCm: "",
      category: "",
      colorIds: [],
      description: "",
    },
    validationSchema: productFormSchema,
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      setStatus(undefined);
      try {
        await createProduct(values, images);
        setStatus("success");
        resetForm();
        setImages([]);
      } catch {
        setStatus("خطا در ثبت محصول.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const toggleColor = (id: string) => {
    const current = formik.values.colorIds;
    const updated = current.includes(id)
      ? current.filter((c) => c !== id)
      : [...current, id];
    formik.setFieldValue("colorIds", updated);
  };

  return (
    <div className="product-form-page">
      <div className="product-form">
        <h1 className="product-form__title">افزودن محصول جدید</h1>

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="product-form__section">
            <div className="product-form__grid">
              <div className="product-form__field product-form__field--full">
                <label htmlFor="title">نام محصول</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="مثلاً: پرده کتان مینیمال"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title && (
                  <span className="product-form__error">{formik.errors.title}</span>
                )}
              </div>

              <div className="product-form__field">
                <label htmlFor="price">قیمت (تومان)</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  dir="ltr"
                  placeholder="0"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.price && formik.errors.price && (
                  <span className="product-form__error">{formik.errors.price}</span>
                )}
              </div>

              <div className="product-form__field">
                <label htmlFor="category">دسته‌بندی</label>
                <select
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">انتخاب کنید</option>
                  {productCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {formik.touched.category && formik.errors.category && (
                  <span className="product-form__error">{formik.errors.category}</span>
                )}
              </div>

              <div className="product-form__field">
                <label htmlFor="heightCm">ارتفاع (سانتی‌متر)</label>
                <input
                  id="heightCm"
                  name="heightCm"
                  type="number"
                  dir="ltr"
                  placeholder="0"
                  value={formik.values.heightCm}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.heightCm && formik.errors.heightCm && (
                  <span className="product-form__error">{formik.errors.heightCm}</span>
                )}
              </div>

              <div className="product-form__field">
                <label htmlFor="widthCm">عرض (سانتی‌متر)</label>
                <input
                  id="widthCm"
                  name="widthCm"
                  type="number"
                  dir="ltr"
                  placeholder="0"
                  value={formik.values.widthCm}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.widthCm && formik.errors.widthCm && (
                  <span className="product-form__error">{formik.errors.widthCm}</span>
                )}
              </div>
            </div>
          </div>

          <div className="product-form__section">
            <p className="product-form__section-label">رنگ‌های موجود</p>
            <ColorCheckboxList
              colors={availableColors}
              selectedIds={formik.values.colorIds}
              onToggle={toggleColor}
            />
            {formik.touched.colorIds && formik.errors.colorIds && (
              <span className="product-form__error">{formik.errors.colorIds as string}</span>
            )}
          </div>

          <div className="product-form__section">
            <div className="product-form__field">
              <label htmlFor="description">توضیحات محصول</label>
              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="توضیحات کامل درباره جنس، بافت و ویژگی‌های محصول را بنویسید..."
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <span className="product-form__error">{formik.errors.description}</span>
              )}
            </div>
          </div>

          <div className="product-form__section">
            <p className="product-form__section-label">تصاویر محصول</p>
            <ImageUploader
              images={images}
              onAdd={(files) => setImages((prev) => [...prev, ...files])}
              onRemove={(index) => setImages((prev) => prev.filter((_, i) => i !== index))}
            />
          </div>

          <div className="product-form__footer">
            {formik.status === "success" && (
              <span className="product-form__success">محصول با موفقیت ثبت شد.</span>
            )}
            {formik.status && formik.status !== "success" && (
              <span className="product-form__error">{formik.status}</span>
            )}

            <Button type="submit" variant="main" size="md" radius="md" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "در حال ثبت..." : "ثبت محصول"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;