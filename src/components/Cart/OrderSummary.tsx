import Button from "../ui/Button";
import { formatPrice } from "../../utils/formatPrice";
import arrowIcon from "../../assets/icons/left.png";
import "../../styles/Cart.css";

interface OrderSummaryProps {
  totalItems: number;
  totalPrice: number;
  onCheckout: () => void;
}

function OrderSummary({ totalItems, totalPrice, onCheckout }: OrderSummaryProps) {
  return (
    <aside className="order-summary">
      <h2 className="order-summary__title">خلاصه سفارش</h2>

      <div className="order-summary__rows">
        <div className="order-summary__row">
          
          <span className="order-summary__label">مبلغ کل کالاها ({totalItems} عدد)</span>
          <span className="order-summary__value">{formatPrice(totalPrice)}</span>
        </div>
        <div className="order-summary__row">
          
          <span className="order-summary__label">هزینه ارسال</span>
          <span className="order-summary__value">رایگان</span>
        </div>
        <div className="order-summary__row">
          
          <span className="order-summary__label">تخفیف</span>
          <span className="order-summary__value">۰ تومان</span>
        </div>
      </div>

      <div className="order-summary__total">
        
        <span className="order-summary__total-label">مبلغ قابل پرداخت</span>
        <span className="order-summary__total-value">{formatPrice(totalPrice)}</span>
      </div>

      <Button variant="main" size="lg" className="order-summary__checkout-btn" onClick={onCheckout}>
        تایید و پرداخت نهایی
        <img src={arrowIcon} alt="" />
      </Button>

      <p className="order-summary__note">
        با ثبت سفارش، قوانین و مقررات فروشگاه را می‌پذیرم.
      </p>
    </aside>
  );
}

export default OrderSummary;