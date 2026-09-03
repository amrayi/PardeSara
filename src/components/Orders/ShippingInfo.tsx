import type { ShippingInfo } from "../../types/checkout";
import truckIcon from "../../assets/icons/truck.png";
import "../../styles/ShippingInfo.css";

interface ShippingInfoDisplayProps {
  shippingInfo: ShippingInfo;
}

const PAYMENT_METHOD_LABEL: Record<ShippingInfo["paymentMethod"], string> = {
  online: "پرداخت اینترنتی",
  cash_on_delivery: "پرداخت در محل",
};

function ShippingInfoDisplay({ shippingInfo }: ShippingInfoDisplayProps) {
  return (
    <div className="shipping-info-display">
      <div className="shipping-info-display__header">
        <img src={truckIcon} alt="" className="shipping-info-display__icon" />
        <span>اطلاعات ارسال و پرداخت</span>
      </div>

      <div className="shipping-info-display__grid">
        <div className="shipping-info-display__field">
          <span className="shipping-info-display__label">نام گیرنده</span>
          <span className="shipping-info-display__value">
            {shippingInfo.firstName} {shippingInfo.lastName}
          </span>
        </div>

        <div className="shipping-info-display__field">
          <span className="shipping-info-display__label">شماره تماس</span>
          <span className="shipping-info-display__value">{shippingInfo.phone}</span>
        </div>

        <div className="shipping-info-display__field shipping-info-display__field--full">
          <span className="shipping-info-display__label">آدرس</span>
          <span className="shipping-info-display__value">{shippingInfo.address}</span>
        </div>

        <div className="shipping-info-display__field">
          <span className="shipping-info-display__label">کد پستی</span>
          <span className="shipping-info-display__value">{shippingInfo.postalCode}</span>
        </div>

        <div className="shipping-info-display__field">
          <span className="shipping-info-display__label">روش پرداخت</span>
          <span className="shipping-info-display__value">
            {PAYMENT_METHOD_LABEL[shippingInfo.paymentMethod]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ShippingInfoDisplay;