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
