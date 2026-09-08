import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { AdminOrderSummary } from "../../types/admin";
import "../../styles/admin.css";

const STATUS_OPTIONS: { value: AdminOrderSummary["status"]; label: string }[] = [
  { value: "pending", label: "در انتظار بررسی" },
  { value: "shipped", label: "ارسال شده" },
  { value: "delivered", label: "تحویل شده" },
];

interface OrderStatusMenuProps {
  currentStatus: AdminOrderSummary["status"];
  onSelect: (status: AdminOrderSummary["status"]) => void;
}

function OrderStatusMenu({ currentStatus, onSelect }: OrderStatusMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 6,
        left: rect.left,
      });
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button
        ref={buttonRef}
        className="admin-more-dots"
        type="button"
        aria-label="گزینه‌ها"
        onClick={handleToggle}
      >
        <span /><span /><span />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="order-status-menu__dropdown"
            style={{ top: position.top, left: position.left }}
          >
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`order-status-menu__item ${
                  option.value === currentStatus ? "order-status-menu__item--active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelect(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

export default OrderStatusMenu;