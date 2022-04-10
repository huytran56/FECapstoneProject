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
  active: boolean;
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
}
export interface IOrder {
  id: number;
  orderStatus: string;
  username: string;
  paymentStatus: string;
  payment: number;
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

export interface IProductDetail {
    product_id: string;
    product_status_id: string;
    product_name: string;
    description_list: string,
    description_details: string,
    price: number;
    imageUrl: string;
}
export interface ICreateProduct {
    fileImage: string[],
    product_id: string,
    product_status_id: string,
    product_name: string,
    description_list: string,
    description_details: string,
    search_word: string
}
