import { IAccount, ICategory } from "@models/index";
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
  token: object;
}

export interface IChangePasswordPayload {
  newPassword: string;
  oldPassword: string;
  repeatNewPassword: string;
}

export const handleSignIn = async ({
  password,
  usernameOrEmail,
}: ILoginPayLoad): Promise<ILoginRes> => {
  try {
    const url = "/auth/signin";
    const res = await axiosClient.post(url, { password, usernameOrEmail });
    return { success: true, messege: "Login success", token: res };
  } catch (error) {
    return { success: false, messege: "Login fail", token: undefined };
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
    const url = `/admin/category/listCategory`;
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
    const url = `admin/category/createCategory`;
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
    const url = `/admin/category/updateCategoryById/${id}`;
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
    const url = `/admin/category/deleteCatgoryById/${id}`;
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
