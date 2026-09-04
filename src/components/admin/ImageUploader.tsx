import { useRef } from "react";
import Button from "../ui/Button";
import trashIcon from "../../assets/icons/delete.png";
import "../../styles/admin.css";

interface ImageUploaderProps {
  images: File[];
  onAdd: (files: File[]) => void;
  onRemove: (index: number) => void;
}

function ImageUploader({ images, onAdd, onRemove }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) onAdd(files);
    e.target.value = "";
  };

  return (
    <div className="image-uploader">
      <div className="image-uploader__header">
        <Button
          type="button"
          variant="main"
          size="md"
          radius="md"
          onClick={() => inputRef.current?.click()}
        >
          افزودن عکس
        </Button>
        <p className="image-uploader__hint">فرمت‌های مجاز: JPG, PNG. حداکثر حجم هر عکس: ۲ مگابایت</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg"
          multiple
          className="image-uploader__input"
          onChange={handleFileChange}
        />
      </div>

      {images.length > 0 && (
        <div className="image-uploader__grid">
          {images.map((file, index) => (
            <div key={index} className="image-uploader__preview">
              <img src={URL.createObjectURL(file)} alt="" />
              <button
                type="button"
                className="image-uploader__remove"
                onClick={() => onRemove(index)}
                aria-label="حذف عکس"
              >
                <img src={trashIcon} alt="" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;