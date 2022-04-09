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
