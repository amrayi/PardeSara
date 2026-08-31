import type { PaymentMethod } from "../../types/checkout";
import "../../styles/Cart.css";

interface PaymentMethodOptionProps {
  id: PaymentMethod;
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onSelect: (id: PaymentMethod) => void;
}

function PaymentMethodOption({
  id,
  icon,
  title,
  description,
  selected,
  onSelect,
}: PaymentMethodOptionProps) {
  return (
    <label
      className={`payment-option ${selected ? "payment-option--selected" : ""}`}
    >
      <img src={icon} alt="" className="payment-option__icon" />

      <div className="payment-option__text">
        <span className="payment-option__title">{title}</span>
        <span className="payment-option__description">{description}</span>
      </div>

      <input
        type="radio"
        name="paymentMethod"
        checked={selected}
        onChange={() => onSelect(id)}
        className="payment-option__radio"
      />
    </label>
  );
}

export default PaymentMethodOption;