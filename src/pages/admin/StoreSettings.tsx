import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Button from "../../components/ui/Button";
import LogoUploader from "../../components/admin/LogoUploader";
import { storeSettingsSchema } from "../../schemas/storeSettingsSchema";
import { getStoreSettings, updateStoreSettings } from "../../services/storeSettingsService";
import type { StoreSettings as StoreSettingsType } from "../../types/storeSettings";
import "../../styles/admin.css";

function StoreSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);

  const formik = useFormik<StoreSettingsType>({
    initialValues: {
      logoUrl: null,
      storeName: "",
      supportEmail: "",
      phone: "",
      address: "",
    },
    validationSchema: storeSettingsSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setStatus(undefined);
      try {
        if (logoFile) {
          // TODO: وقتی API آماده شد، اینجا logoFile واقعی آپلود میشه
          // مثلاً: const uploadResult = await postImageData({ endPoint: "/admin/store-logo", data: formData });
          // و logoUrl واقعی از پاسخ سرور میاد
          console.log("[mock] فایل لوگوی جدید برای آپلود:", logoFile.name);
        }

        await updateStoreSettings({ ...values, logoUrl: logoPreviewUrl ?? values.logoUrl });
        setStatus("success");
      } catch {
        setStatus("خطا در ذخیره تغییرات.");
      } finally {
        setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    let isMounted = true;

    getStoreSettings().then((data) => {
      if (!isMounted) return;
      formik.setValues(data);
      setLogoPreviewUrl(data.logoUrl);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogoChange = (file: File) => {
    setLogoFile(file);
    setLogoPreviewUrl(URL.createObjectURL(file));
  };

  if (isLoading) return <p className="store-settings__status">در حال بارگذاری...</p>;

  return (
    <div className="store-settings">
      <h1 className="store-settings__title">اطلاعات فروشگاه</h1>

      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="store-settings__section">
          <LogoUploader logoUrl={logoPreviewUrl} onChange={handleLogoChange} />
        </div>

        <div className="store-settings__section">
          <div className="store-settings__grid">
            <div className="store-settings__field">
              <label htmlFor="storeName">نام فروشگاه</label>
              <input
                id="storeName"
                name="storeName"
                type="text"
                value={formik.values.storeName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.storeName && formik.errors.storeName && (
                <span className="store-settings__error">{formik.errors.storeName}</span>
              )}
            </div>

            <div className="store-settings__field">
              <label htmlFor="supportEmail">ایمیل پشتیبانی</label>
              <input
                id="supportEmail"
                name="supportEmail"
                type="email"
                dir="ltr"
                value={formik.values.supportEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.supportEmail && formik.errors.supportEmail && (
                <span className="store-settings__error">{formik.errors.supportEmail}</span>
              )}
            </div>

            <div className="store-settings__field store-settings__field--full">
              <label htmlFor="phone">تلفن تماس</label>
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
                <span className="store-settings__error">{formik.errors.phone}</span>
              )}
            </div>
          </div>
        </div>

        <div className="store-settings__section">
          <div className="store-settings__field">
            <label htmlFor="address">آدرس</label>
            <textarea
              id="address"
              name="address"
              rows={3}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address && (
              <span className="store-settings__error">{formik.errors.address}</span>
            )}
          </div>
        </div>

        <div className="store-settings__footer">
          {formik.status === "success" && (
            <span className="store-settings__success">تغییرات با موفقیت ذخیره شد.</span>
          )}
          {formik.status && formik.status !== "success" && (
            <span className="store-settings__error">{formik.status}</span>
          )}

          <Button type="submit" variant="main" size="md" radius="md" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default StoreSettings;