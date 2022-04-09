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
