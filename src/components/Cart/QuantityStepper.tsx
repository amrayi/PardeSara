import plusIcon from "../../assets/icons/plus.svg";
import minusIcon from "../../assets/icons/minus.svg";
import "../../styles/Cart.css";

interface QuantityStepperProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

function QuantityStepper({ quantity, onIncrease, onDecrease }: QuantityStepperProps) {
  return (
    <div className="quantity-stepper">
      <button type="button" className="quantity-stepper__btn" onClick={onIncrease} aria-label="افزایش تعداد">
        <img src={plusIcon} alt="" />
      </button>
      <span className="quantity-stepper__value">{quantity}</span>
      <button
        type="button"
        className="quantity-stepper__btn"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="کاهش تعداد"
      >
        <img src={minusIcon} alt="" />
      </button>
    </div>
  );
}

export default QuantityStepper;