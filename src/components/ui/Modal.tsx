import { useEffect, useRef, type ReactNode } from "react";
import "../../styles/Modal.css";

type ModalSize = "sm" | "md" | "lg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  closeOnBackdropClick?: boolean;
}

function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnBackdropClick = true,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // هماهنگ کردن state بیرونی (isOpen) با API واقعی <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // رویداد "cancel" وقتی کاربر Escape می‌زنه فایر میشه؛ باید state بیرونی رو هم آپدیت کنیم
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault(); // جلوی رفتار پیش‌فرض مرورگر رو می‌گیریم تا کنترل کامل دست خودمون باشه
      onClose();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (!closeOnBackdropClick) return;
    // کلیک روی خود dialog (که کل صفحه رو پوشونده) یعنی کلیک روی بک‌دراپ بوده، نه محتوا
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={`modal modal--${size}`}
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {(title || description) && (
          <div className="modal__header">
            {title && <h3 className="modal__title">{title}</h3>}
            {description && <p className="modal__description">{description}</p>}
          </div>
        )}

        {children && <div className="modal__body">{children}</div>}

        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </dialog>
  );
}

export default Modal;