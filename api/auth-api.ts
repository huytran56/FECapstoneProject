import {
  IAccount,
  ICategory,
  IChangeStatus,
  IEditVoucher,
  IOrder,
  IProduct,
  IProductDetail,
  IProductFull,
  IProductRecommend,
  IProductSKU,
  IVoucher,
} from "@models/index";
import axiosClient from "./axios-client";

interface ILoginPayLoad {
  password: string;
  usernameOrEmail: string;
}
export interface ICreateAccountPayLoad {
  birthday: string;
  email: string;
  first_name: string;
  gender_id: number;
  last_name: string;
  password: string;
  phone_number: string;
  roles: string[];
  username: string;
}
export interface IUserInformationRes {
  id?: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  gender_id: number;
  birthday: string;
  roles?: null;
}
export interface IChangePasswordPayload {
  newPassword: string;
  oldPassword: string;
  repeatNewPassword: string;
}
export interface ICategoryPayLoad {
  category_name: string;
  id?: string;
  is_delete?: string;
}

export interface IEditRoleAccount {
  username: string;
  roles: string[];
}
export interface ICreateStaffRes {
  messege: string;
}
export interface IDeleteAccountRes {
  messege: string;
}
export interface IDeleteAccount {
  username: string;
}
interface ILoginRes {
  success: boolean;
  messege: string;
}
export const handleSignIn = async ({
  password,
  usernameOrEmail,
}: ILoginPayLoad): Promise<ILoginRes> => {
  try {
    const url = "/auth/signin";
    const res = await axiosClient.post(url, { password, usernameOrEmail });
    return { success: true, messege: "Login success" };
  } catch (error) {
    return { success: false, messege: "Login fail" };
  }
};

export const handleSignOut = async (): Promise<boolean> => {
  try {
    const url = "/auth/signout";
    const res = await axiosClient.post(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const handleCreateStaffAccount = async ({
  birthday,
  email,
  first_name,
  gender_id,
  last_name,
  password,
  phone_number,
  roles,
  username,
}: ICreateAccountPayLoad): Promise<ICreateStaffRes> => {
  try {
    const url = "/auth/signup";
    const res = await axiosClient.post(url, {
      birthday,
      email,
      first_name,
      gender_id,
      last_name,
      password,
      phone_number,
      roles,
      username,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const handleGetAccount = async (): Promise<[IAccount]> => {
  try {
    const url = "admin/account/";
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleEditRoleAccount = async ({
  username,
  roles,
}: IEditRoleAccount) => {
  try {
    const url = `/admin/account/change_role/${username}`;
    const res = await axiosClient.put(url, { roles });
    return res.data;
  } catch (error) {
    return console.log(error);
  }
};
export const handleDeleteAccount = async ({ username }: IDeleteAccount) => {
  try {
    const url = `/admin/account/delete/${username}`;
    const res = await axiosClient.delete(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetCategory = async (): Promise<ICategory> => {
  try {
    const url = `/category/listCategory`;
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    return null!;
  }
};

export const handleCreateCategory = async ({
  category_name,
}: ICategoryPayLoad): Promise<boolean> => {
  try {
    const url = `/category/admin/createCategory`;
    const res = await axiosClient.post(url, {
      category_name,
      is_deleted: false,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const handlerUpdateCategory = async ({
  id,
  category_name,
}: ICategoryPayLoad): Promise<boolean> => {
  try {
    const url = `/category/admin/updateCategoryById/${id}`;
    console.log(url);
    const res = await axiosClient.put(url, {
      id,
      category_name,
      is_delete: false,
    });

    return true;
  } catch (error) {
    return false;
  }
};
export const handleDeleteCategory = async ({ id }: ICategoryPayLoad) => {
  try {
    const url = `/category/admin/deleteCatgoryById/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleUserInfomation = async (): Promise<IUserInformationRes> => {
  try {
    const url = `/user/profile`;
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    return error!;
  }
};
export const handleGetVoucher = async (): Promise<[IVoucher]> => {
  try {
    const url = "/voucher/";
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const handleCreateVoucher = async ({
  id,
  code,
  name,
  description,
  type,
  minSpend,
  maxDiscount,
  discountAmount,
  active,
}: IVoucher): Promise<boolean> => {
  try {
    console.log({
      id,
      code,
      name,
      description,
      type,
      minSpend,
      maxDiscount,
      discountAmount,
      active,
    });
    const url = `/voucher/create`;
    const res = await axiosClient.post(url, {
      id,
      code,
      name,
      description,
      type,
      minSpend,
      maxDiscount,
      discountAmount,
      active,
    });
    return true;
  } catch (error) {
    return false;
  }
};
export const handleEditVoucher = async ({
  id,
  active,
  code,
  description,
  discountAmount,
  maxDiscount,
  minSpend,
  name,
  type,
}: IEditVoucher) => {
  try {
    const url = `/voucher/update/${id}`;
    const res = await axiosClient.put(url, {
      active,
      code,
      description,
      discountAmount,
      maxDiscount,
      minSpend,
      name,
      type,
    });
    return res.data;
  } catch (error) {
    return console.log(error);
  }
};
export const handleDeleteVoucher = async ({ id }: IVoucher) => {
  try {
    const url = `/voucher/delete/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const handleChangeActivate = async ({ id }: IVoucher) => {
  try {
    const url = `/voucher/activation/${id}`;
    const res = await axiosClient.put(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const handleGetOrder = async (): Promise<[IOrder]> => {
  try {
    const url = "/admin/order/";
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const handleChangeStatus = async ({
  id,
  orderStatus,
  paymentStatus,
}: IChangeStatus) => {
  try {
    console.log(id, orderStatus, paymentStatus);
    const url = `/admin/order/change_status/${id}`;
    const res = await axiosClient.put(url, null, {
      params: { orderStatus, paymentStatus },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const handlerUpdateUserInformation = async ({
  username,
  email,
  first_name,
  last_name,
  phone_number,
  gender_id,
  birthday,
}: IUserInformationRes): Promise<boolean> => {
  try {
    const url = `/user/profile/updateInfo`;
    const res = await axiosClient.post(url, {
      username,
      email,
      first_name,
      last_name,
      phone_number,
      gender_id,
      birthday,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const handlerChangePassword = async ({
  newPassword,
  oldPassword,
  repeatNewPassword,
}: IChangePasswordPayload): Promise<boolean> => {
  try {
    const url = `/user/changePassword`;
    const res = await axiosClient.post(url, {
      newPassword,
      oldPassword,
      repeatNewPassword,
    });
    return true;
  } catch (error) {
    return false;
  }
};
export const handleGetProduct = async (fromIndex): Promise<[IProduct]> => {
  try {
    const url = `/product/web/listAllProductIncludeImage/${fromIndex}`;
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const handleSearchProduct = async ({
  keyword,
}: {
  keyword: string;
}): Promise<[IProduct]> => {
  try {
    const url = `/product/search`;
    const res = await axiosClient.get(url, { params: { keyword } });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const handleDeleteProduct = async ({ product_id }: IProduct) => {
  try {
    const id = product_id;
    console.log(id);
    const url = `/product/admin/deleteProductById/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const handleGetRecommendationList = async (): Promise<
  [IProductRecommend]
> => {
  try {
    const url = "/recommendation/list";
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const handleGetProductSKUList = async ({
  product_id,
}: IProduct): Promise<[IProductSKU]> => {
  try {
    const id = product_id;
    const url = `/productSKU/getSKUByProductId/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleEditProduct = async ({
  product_id,
  description_details,
  description_list,
  price,
  product_name,
  product_status_id,
  search_word,
}: IProductDetail): Promise<boolean> => {
  try {
    const id = product_id;
    const url = `/product/admin/updateProductById/${id}`;
    const res = await axiosClient.put(url, {
      description_details,
      description_list,
      price,
      product_name,
      product_status_id,
      search_word,
    });
    return true;
  } catch (error) {
    return false;
  }
};
export const handleGetProductDetailFull = async ({
  product_id,
}: {
  product_id: string;
}): Promise<[IProductFull]> => {
  try {
    // const id = product_id;
    const url = `/product/getProductById/${product_id}`;
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleEditProductSKU = async ({
  id,
  sale_limit,
  size,
  stock,
}: IProductSKU): Promise<boolean> => {
  try {
    const url = `/admin/productSKU/updateProductBySKUId/${id}`;
    const res = await axiosClient.put(url, {
      sale_limit,
      size,
      stock,
    });
    return true;
  } catch (error) {
    return false;
  }
};
