import { useState } from "react";
import type { PaymentMethod, ShippingInfo } from "../../types/checkout";
import PaymentMethodOption from "./PaymentMethodOption";
import truckIcon from "../../assets/icons/truck.png";
import onlinePaymentIcon from "../../assets/icons/card.png";
import cashPaymentIcon from "../../assets/icons/cash.png";
import "../../styles/Cart.css";

interface ShippingFormProps {
  onChange?: (info: ShippingInfo) => void;
}

function ShippingForm({ onChange }: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    postalCode: "",
    paymentMethod: "online",
  });

  const updateField = (field: keyof ShippingInfo, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onChange?.(updated);
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    updateField("paymentMethod", method);
  };

  return (
    <div className="shipping-form">
      <h2 className="shipping-form__title">اطلاعات ارسال و پرداخت</h2>

      <div className="shipping-form__section">
        <div className="shipping-form__section-header">
          <img src={truckIcon} alt="" className="shipping-form__section-icon" />
          <span>آدرس تحویل</span>
        </div>

        <div className="shipping-form__grid">
          <div className="shipping-form__field">
            <label htmlFor="firstName">نام</label>
            <input
              id="firstName"
              type="text"
              placeholder="نام خود را وارد کنید"
              value={formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
            />
          </div>

          <div className="shipping-form__field">
            <label htmlFor="lastName">نام خانوادگی</label>
            <input
              id="lastName"
              type="text"
              placeholder="نام خانوادگی خود را وارد کنید"
              value={formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
            />
          </div>

          <div className="shipping-form__field shipping-form__field--full">
            <label htmlFor="address">آدرس دقیق</label>
            <input
              id="address"
              type="text"
              placeholder="استان، شهر، خیابان، کوچه، پلاک، واحد"
              value={formData.address}
              onChange={(e) => updateField("address", e.target.value)}
            />
          </div>

          <div className="shipping-form__field">
            <label htmlFor="phone">شماره تماس</label>
            <input
              id="phone"
              type="tel"
              placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>

          <div className="shipping-form__field">
            <label htmlFor="postalCode">کد پستی</label>
            <input
              id="postalCode"
              type="text"
              placeholder="کد پستی ۱۰ رقمی"
              value={formData.postalCode}
              onChange={(e) => updateField("postalCode", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="shipping-form__section">
        <div className="shipping-form__section-header">
          <span>روش پرداخت</span>
        </div>

        <div className="shipping-form__payment-options">
          <PaymentMethodOption
            id="cash_on_delivery"
            icon={cashPaymentIcon}
            title="پرداخت در محل"
            description="فقط برای سفارش‌های تهران"
            selected={formData.paymentMethod === "cash_on_delivery"}
            onSelect={handlePaymentSelect}
          />
          <PaymentMethodOption
            id="online"
            icon={onlinePaymentIcon}
            title="پرداخت اینترنتی"
            description="از طریق درگاه‌های بانکی معتبر"
            selected={formData.paymentMethod === "online"}
            onSelect={handlePaymentSelect}
          />
        </div>
      </div>
    </div>
  );
}

export default ShippingForm;