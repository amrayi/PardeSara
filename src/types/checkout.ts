export type PaymentMethod = "online" | "cash_on_delivery";

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  postalCode: string;
  paymentMethod: PaymentMethod;
}