export interface ICartItem {
  id: number;
  cartId: number;
  productSKUId: number;
  productSKUName: string;
  quantity: number;
  price: number;
  imageUrl: string;
  unitPrice: number;
  stock: boolean;
}
export interface IAddress {
  id: number;
  receiverName: string;
  province: string;
  city: string;
  district: string;
  subDistrict: string;
  street: string;
  postalCode: string;
  phoneNumber: string;
}
export interface IVoucherValidate {
  cartTotal: number;
  voucherCode: string;
}
export interface IVoucherNewPrice {
  code: string;
  discountValue: number;
  newTotal: number;
}
export interface IVnpay {
  amount: number;
  bankCode: string;
  billingAddress: string;
  billingCity: string;
  billingCountry: string;
  billingEmail: string;
  billingFullname: string;
  billingMoblie: string;
  billingState: string;
  invAddress: string;
  invCompany: string;
  invCustomer: string;
  invEmail: string;
  invMoblie: string;
  invTaxcode: string;
  invType: string;
  language: string;
  vnpOrderInfo: number;
}
export interface IVnpayResponse {
  code: string;
  message: string;
  data: string;
}

export interface IReview {
  description: string;
  numberRating: number;
  orderId: number;
  productSKUId: number;
}
export interface IReviewResponse {
  description: string;
  numberRating: number;
  id: number;
  fullname: string;
}
