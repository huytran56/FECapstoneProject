import { Tracing } from "trace_events";

type role = "ROLE_STAFF" | "ROLE_ADMIN" | "ROLE_USER";

export interface IAccount {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  gender_id: number;
  birthday: string;
  roles: role[];
  id?: string;
}

export interface ICategory {
  id: string;
  category_name: string;
  is_deleted: boolean;
}

export interface IVoucher {
  id: number;
  code: string;
  name: string;
  description: string;
  type: string;
  minSpend: number;
  maxDiscount: number;
  discountAmount: number;
  quantity: number;
  active: boolean;
  fromDate: string;
  toDate: string;
}
export interface IEditVoucher {
  id: number;
  active: boolean;
  code: string;
  description: string;
  discountAmount: number;
  maxDiscount: number;
  minSpend: number;
  name: string;
  type: string;
  quantity: number;
  fromDate: string;
  toDate: string;
}
export interface IOrder {
  id: number;
  orderStatus: string;
  username: string;
  paymentStatus: string;
  payment: string;
  orderItemDtos: IOrderItemDtos[];
  subTotal: number;
  voucherCode: string;
  deliveryFeeTotal: number;
  paymentTotal: number;
  orderDate: string;
  paymentDate: string;
  addressId: number;
}
export interface IOrderItemDtos {
  orderId: number;
  productSKUId: number;
  quantity: number;
  price: number;
  review: boolean;
}

export interface IOrderItemDetail extends IOrderItemDtos {
  productSKU: IProductSKUDetail | IProductSKU;
}

export interface IProductSKUDetail extends IProductSKU {
  product: IProductFull;
}
export interface IChangeStatus {
  id: number;
  orderStatus: string;
  paymentStatus: string;
}
export interface IProduct {
  product_id: string;
  product_status_id: string;
  product_name: string;
  search_word: string;
  price: number;
  imageUrl: string;
}
export interface IProductRecommend {
  product_id: string;
  product_status_id: string;
  product_name: string;
  price: number;
  imageUrl: string;
}

// export interface IProductDetail {
//   product_id: string;
//   product_status_id: string;
//   product_name: string;
//   description_list: string;
//   description_details: string;
//   price: number;
//   imageUrl: string;
// }
export interface IProductDetail {
  product_id: string;
  product_status_id: string;
  product_name: string;
  description_list: string;
  description_details: string;
  price: number;
  search_word: string;
}
export interface ICreateProduct {
  fileImage: File[];
  product_id: string;
  product_status_id: string;
  product_name: string;
  description_details: string;
  price: number;
  category: string[];
}
export interface ICreateProductSKU {}
export interface IProductSKU {
  id: number;
  stock: number;
  sale_limit: number;
  size: string;
  product_id: string;
}

export interface IProductImage {
  product_image_id: number;
  name: string;
  url: string;
  productId: null;
  primaries: boolean;
}
export interface IProductFull {
  category: ICategory[];
  productImage: IProductImage[];
  product_id: string;
  product_status_id: string;
  product_name: string;
  description_list: string;
  description_details: string;
  price: number;
  search_word: string;
  productSKUs: IProductSKU[];
}
