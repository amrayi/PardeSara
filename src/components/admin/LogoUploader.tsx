import { useRef } from "react";
import Button from "../ui/Button";
// import imagePlaceholderIcon from "../../assets/icons/image-placeholder.png";
import "../../styles/admin.css";

interface LogoUploaderProps {
  logoUrl: string | null;
  onChange: (file: File) => void;
}

function LogoUploader({ onChange }: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange(file);
  };

  return (
    <div className="logo-uploader">
      <p className="logo-uploader__label">لوگوی فروشگاه</p>

      <div className="logo-uploader__row">
        <div className="logo-uploader__controls">
          <Button
            type="button"
            variant="main"
            size="md"
            radius="md"
            onClick={() => inputRef.current?.click()}
          >
            آپلود لوگوی جدید
          </Button>
          <p className="logo-uploader__hint">
            فرمت‌های مجاز: JPG, PNG. حداکثر حجم: 2MB
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/png, image/jpeg"
            className="logo-uploader__input"
            onChange={handleFileChange}
          />
        </div>

        <div className="logo-uploader__preview">
          {/* {logoUrl ? (
            <img src={logoUrl} alt="لوگوی فروشگاه" />
          ) : (
            <img src={imagePlaceholderIcon} alt="" className="logo-uploader__placeholder-icon" />
          )} */}
        </div>
      </div>
    </div>
  );
}

export default LogoUploader;