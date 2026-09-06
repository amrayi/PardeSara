import { useEffect, useRef, useState } from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="order-status-menu" ref={menuRef}>
      <button
        className="admin-more-dots"
        type="button"
        aria-label="گزینه‌ها"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <span /><span /><span />
      </button>

      {isOpen && (
        <div className="order-status-menu__dropdown">
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
        </div>
      )}
    </div>
  );
}

export default OrderStatusMenu;