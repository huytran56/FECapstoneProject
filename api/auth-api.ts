import {
  IAccount,
  IAddress,
  ICartItem,
  ICategory,
  IChangeStatus,
  ICreateProduct,
  IDashboard,
  IEditVoucher,
  IOrder,
  IOrderItemDetail,
  IProduct,
  IProductDetail,
  IProductFull,
  IProductRecommend,
  IProductSKU,
  IReview,
  IReviewResponse,
  IVnpay,
  IVnpayResponse,
  IVoucher,
  IVoucherNewPrice,
  IVoucherValidate,
} from "@models/index";
import axiosClient, { axiosServer } from "./axios-client";

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
  token: string;
}
export const handleSignIn = async ({
  password,
  usernameOrEmail,
}: ILoginPayLoad): Promise<ILoginRes> => {
  try {
    const url = "/auth/signin";
    const res = await axiosClient.post(url, { password, usernameOrEmail });
    return { success: true, messege: "Login success", token: res.data };
  } catch (error) {
    return { success: false, messege: "Login fail", token: "" };
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
  const url = `/category/admin/createCategory`;
  const res = await axiosClient.post(url, {
    category_name,
    is_deleted: false,
  });
  return res.data;
};

export const handlerUpdateCategory = async ({
  id,
  category_name,
}: ICategoryPayLoad): Promise<boolean> => {
  const url = `/category/admin/updateCategoryById/${id}`;
  console.log(url);
  const res = await axiosClient.put(url, {
    id,
    category_name,
    is_delete: false,
  });

  return res.data;
};
export const handleDeleteCategory = async ({ id }: ICategoryPayLoad) => {
  const url = `/category/admin/deleteCatgoryById/${id}`;
  const res = await axiosClient.delete(url);
  return res.data;
};

export const handleUserInfomation = async (): Promise<IUserInformationRes> => {
  try {
    const url = `/user/profile`;
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    return null!;
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
  quantity,
  fromDate,
  toDate,
}: IVoucher): Promise<boolean> => {
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
    quantity,
    fromDate,
    toDate,
  });
  return res.data;
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
  quantity,
  fromDate,
  toDate,
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
      quantity,
      fromDate,
      toDate,
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
}): Promise<[IProductFull] | false> => {
  try {
    // const id = product_id;
    const url = `/product/getProductById/${product_id}`;
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    return false;
  }
};
export const handleGetProductDetailFullServer = async ({
  product_id,
  token,
}: {
  product_id: string;
  token: string;
}): Promise<[IProductFull] | false> => {
  try {
    // const id = product_id;
    const url = `/product/getProductById/${product_id}`;
    const res = await axiosServer.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return false;
  }
};

export const handleEditProductSKU = async ({
  id,
  sale_limit,
  size,
  stock,
}: IProductSKU): Promise<boolean> => {
  const url = `/admin/productSKU/updateProductBySKUId/${id}`;
  const res = await axiosClient.put(url, {
    sale_limit,
    size,
    stock,
  });
  return res.data;
};
export const handleCreateProduct = async ({
  fileImage,
  product_id,
  product_status_id,
  product_name,
  description_details,
  price,
  category,
}: ICreateProduct): Promise<boolean> => {
  // console.log(product_status_id);
  const url = `/product/admin/createProductAll`;
  const formData = new FormData();
  console.log({ fileImage, category });
  Object.keys(fileImage).map((key) => {
    formData.append("fileImage", fileImage[key]);
  });
  formData.append("product_id", product_id);
  formData.append("product_status_id", product_status_id);
  formData.append("product_name", product_name);
  formData.append("description_details", description_details);
  formData.append("price", price.toString());
  category.map((c) => {
    formData.append("category[0]", c);
  });
  // console.log({ formData });
  const res = await axiosClient.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export const handleGetCartItemList = async (): Promise<[ICartItem]> => {
  try {
    const url = "/cart/";
    const res = await axiosClient.get(url);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const handleAddToCartItem = async ({
  quantity,
  price,
  productSKUId,
}: ICartItem): Promise<boolean> => {
  try {
    const url = `/cart/add`;
    const res = await axiosClient.post(url, {
      quantity,
      price,
      productSKUId,
    });
    return true;
  } catch (error) {
    return false;
  }
};
export const handleDeleteCartItem = async ({
  id,
}: {
  id: Number;
}): Promise<boolean> => {
  console.log(id);
  try {
    const url = `/cart/delete/${id}`;
    const res = await axiosClient.delete(url);
    return true;
  } catch (error) {
    return false;
  }
};
export const handleChangeQuantityCart = async ({
  id,
  price,
  productSKUId,
  quantity,
}: ICartItem): Promise<boolean> => {
  try {
    const url = `/cart/change_quantity`;
    const res = await axiosClient.put(url, {
      id,
      price,
      productSKUId,
      quantity,
    });
    return true;
  } catch (error) {
    return false;
  }
};
export const handleGetAddressList = async (): Promise<[IAddress]> => {
  try {
    const url = "/address/";
    const res = await axiosClient.get(url);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const handleAddNewAddress = async ({
  city,
  district,
  id,
  phoneNumber,
  postalCode,
  province,
  receiverName,
  street,
  subDistrict,
}: IAddress): Promise<boolean> => {
  try {
    const url = `/address/create`;
    const res = await axiosClient.post(url, {
      city,
      district,
      id,
      phoneNumber,
      postalCode,
      province,
      receiverName,
      street,
      subDistrict,
    });
    return true;
  } catch (error) {
    return false;
  }
};
export const handleDeleteAddress = async ({
  id,
}: {
  id: Number;
}): Promise<boolean> => {
  console.log(id);
  try {
    const url = `/address/delete/${id}`;
    const res = await axiosClient.delete(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const handleCreateOrder = async ({
  username,
  payment,
  orderItemDtos,
  subTotal,
  voucherCode,
  deliveryFeeTotal,
  paymentTotal,
  addressId,
}: IOrder): Promise<IOrder> => {
  // console.log(orderItemDtos, payment);
  try {
    const url = `/user/order/create`;
    const res = await axiosClient.post(url, {
      username,
      payment,
      orderItemDtos,
      subTotal,
      voucherCode,
      deliveryFeeTotal,
      paymentTotal,
      addressId,
    });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const handleApplyVoucher = async ({
  cartTotal,
  voucherCode,
}: IVoucherValidate): Promise<IVoucherNewPrice> => {
  try {
    const url = `/voucher/validate`;
    const res = await axiosClient.post(url, {
      cartTotal,
      voucherCode,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const handleVnpay = async ({
  amount,
  bankCode,
  billingFullname,
  language,
  vnpOrderInfo,
}: IVnpay): Promise<IVnpayResponse> => {
  try {
    console.log(amount, bankCode);
    const url = `/payment/vnpay/`;
    const res = await axiosClient.post(url, {
      amount,
      bankCode,
      billingFullname,
      language,
      vnpOrderInfo,
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
export const handleSaveOrder = async (): Promise<boolean> => {
  try {
    const url = "/recommendation/save";
    const res = await axiosClient.get(url);
    return true;
  } catch (error) {
    return false;
  }
};
export const handleGetOrderUser = async (): Promise<[IOrder]> => {
  try {
    const url = "/user/order/";
    const res = await axiosClient.get(url);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetProductSKU = async ({
  id,
}: {
  id: Number;
}): Promise<IProductSKU> => {
  console.log(id);
  try {
    const url = `/admin/productSKU/getProductBySKUId/${id}`;
    const res = await axiosClient.get(url);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetProductDetail = async ({
  product_id,
}: {
  product_id: string;
}): Promise<IProductFull> => {
  try {
    const url = `/product/getProductById/${product_id}`;
    const res = await axiosClient.get(url);
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleGetOrderInformation = async ({
  order,
}: {
  order: IOrder;
}): Promise<IOrderItemDetail[]> => {
  console.log("aaaa");
  try {
    let { orderItemDtos } = order;
    const productSKUListPromise = orderItemDtos.map((order) =>
      handleGetProductSKU({ id: order.productSKUId })
    );
    const productSKUList = await Promise.all(productSKUListPromise);
    let orderDetail: IOrderItemDetail[] = orderItemDtos.map((order, index) => ({
      ...order,
      productSKU: productSKUList[index],
    }));
    const productListPromise = orderDetail.map((order) =>
      handleGetProductDetail({ product_id: order.productSKU.product_id })
    );
    const productList = await Promise.all(productListPromise);
    orderDetail = orderDetail.map((order, index) => ({
      ...order,
      productSKU: { ...order.productSKU, product: productList[index] },
    }));
    return orderDetail;
  } catch (error) {
    console.log(error);
  }
};
export const handleAddReview = async ({
  description,
  numberRating,
  orderId,
  productSKUId,
}: IReview): Promise<boolean> => {
  // console.log(orderItemDtos, payment);
  try {
    const url = `/review/create`;
    const res = await axiosClient.post(url, {
      description,
      numberRating,
      orderId,
      productSKUId,
    });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const handleGetReviewList = async ({
  product_id,
}: {
  product_id: string;
}): Promise<[IReviewResponse]> => {
  try {
    const url = `/review/${product_id}`;
    const res = await axiosClient.get(url);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const handleCancelOrder = async ({
  id,
}: {
  id: Number;
}): Promise<boolean> => {
  try {
    const url = `/user/order/cancel/${id}`;
    const res = await axiosClient.put(url);
    return true;
  } catch (error) {
    return false;
  }
};
export const handleGetRecommendListByProduct = async ({
  product_id,
}: {
  product_id: string;
}): Promise<[IProductRecommend]> => {
  try {
    const url = `/recommendation/get_list_by_product/${product_id}`;
    const res = await axiosClient.get(url);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const handleGetAddressById = async ({
  id,
}: {
  id: number;
}): Promise<[IAddress]> => {
  try {
    const url = `/address/${id}`;
    const res = await axiosClient.get(url);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const handleCreateProductSKU = async ({
  product_id,
  id,
  sale_limit,
  size,
  stock,
}: IProductSKU): Promise<IOrder> => {
  // console.log(orderItemDtos, payment);
  try {
    const url = `/admin/productSKU/createSKU/${product_id}`;
    const res = await axiosClient.post(url, {
      id,
      sale_limit,
      size,
      stock,
    });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const handleGetUserRole = async (): Promise<[string]> => {
  try {
    const url = "/user/roles";
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    return null;
  }
};
export const handleGetDashboard = async (): Promise<IDashboard> => {
  try {
    const url = "/admin/order/statistic_by_month";
    const res = await axiosClient.get(url);
    return res.data;
  } catch (error) {
    return null;
  }
};
