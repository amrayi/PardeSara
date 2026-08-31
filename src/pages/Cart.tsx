import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartItemRow from "../components/Cart/CartItemRow";
import OrderSummary from "../components/Cart/OrderSummary";
import ShippingForm from "../components/Cart/ShippingForm";
import type { ShippingInfo } from "../types/checkout";
import "../styles/Cart.css";

function Cart() {
  const { items, totalItems, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert("برای تکمیل خرید ابتدا باید وارد حساب کاربری شوید.");
      return;
    }
    console.log("shippingInfo:", shippingInfo);
  };

  return (
    <div className="cart-page">
      <div className="cart-page__header">
        <h1 className="cart-page__title">سبد خرید و تسویه حساب</h1>
        <p className="cart-page__subtitle">لطفاً سفارش خود را بررسی و اطلاعات ارسال را تکمیل کنید.</p>
      </div>

      {items.length === 0 ? (
        <p className="cart-page__empty">سبد خرید شما خالی است.</p>
      ) : (
        <div className="cart-page__content">
          <div className="cart-page__main">
            <div className="cart-page__items">
              <h2 className="cart-page__items-title">سبد خرید شما ({items.length} کالا)</h2>
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </div>

            <ShippingForm onChange={setShippingInfo} />
          </div>

          <OrderSummary
            totalItems={totalItems}
            totalPrice={totalPrice}
            onCheckout={handleCheckout}
          />
        </div>
      )}
    </div>
  );
}

export default Cart;