import {
  IAccount,
  ICategory,
  IChangeStatus,
  IEditVoucher,
  IOrder,
  IOrderItemDtos,
  IProduct,
  IVoucher,
} from "@models/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import {
  ICreateAccountPayLoad,
  ICategoryPayLoad,
  IDeleteAccount,
  IEditRoleAccount,
  IUserInformationRes,
  IChangePasswordPayload,
} from "@api/index";

interface IInitialState {
  accountList: IAccount[];
  voucherList: IVoucher[];
  isOpenModal: boolean;
  isAddNew: boolean;
  openModalProduct: number;
  currentEditAccount: IAccount;
  currentEditCategory: ICategory;
  currentEditVoucher: IEditVoucher;
  currentOrderItem: IOrderItemDtos[];
  currentChangeStatusOrder: IOrder;
  pageIndex: number;
  categoryList: ICategory[];
  userInfo: IUserInformationRes;
  orderList: IOrder[];
  adminEditInformation: IUserInformationRes;
  isChangePasswordSuccess: boolean;
  productList: IProduct[];
  paginationIndex: number;
  searchKeyWord: string;
  isSearchingProduct: boolean;
  currentProduct: IProduct;
}
export interface IAdminPayLoad {
  accountList?: IAccount[];
  voucherList?: IVoucher[];
  currentEditVoucher?: IEditVoucher;
  isOpenModal?: boolean;
  createStaffPayload?: ICreateAccountPayLoad;
  editRoleAccountPayload?: IEditRoleAccount;
  isAddNew?: boolean;
  openModalProduct?: number;
  deleteAccountPayLoad?: IDeleteAccount;
  currentEditAccount?: IAccount;
  currentEditCategory?: ICategory;
  pageIndex?: number;
  categoryList?: ICategory[];
  createCategoryPayload?: ICategoryPayLoad;
  userInfo?: IUserInformationRes;
  deleteCategoryPayLoad?: ICategory;
  createVoucherPayLoad?: IVoucher;
  editVoucherPayLoad?: IEditVoucher;
  deleteVoucherPayLoad?: IVoucher;
  changeActivateVoucherPayLoad?: IVoucher;
  orderList?: IOrder[];
  currentOrderItem?: IOrderItemDtos[];
  currentChangeStatusOrder?: IOrder;
  changeStatusOrderPayLoad?: IChangeStatus;
  preUpdateAdminProfilePayload?: IUserInformationRes;
  adminEditInformation?: IUserInformationRes;
  changePasswordPayload?: IChangePasswordPayload;
  isChangePasswordSuccess?: boolean;
  productList?: IProduct[];
  paginationIndex?: number;
  searchKeyWord?: string;
  isSearchingProduct?: boolean;
  currentProduct?: IProduct;
  deleteProductPayload?: IProduct;
  createProductPayload?: IProduct;
}

const initialState: IInitialState = {
  accountList: [],
  voucherList: [],
  currentEditVoucher: null,
  isOpenModal: false,
  isAddNew: false,
  openModalProduct: 0,
  currentEditAccount: null,
  pageIndex: 1,
  categoryList: [],
  currentEditCategory: null,
  userInfo: null,
  orderList: [],
  currentOrderItem: [],
  currentChangeStatusOrder: null,
  adminEditInformation: null,
  isChangePasswordSuccess: true,
  productList: [],
  paginationIndex: 0,
  searchKeyWord: null,
  isSearchingProduct: true,
  currentProduct: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    preSetAccountList(state, action: PayloadAction<any>) {},
    setAccountList(state, action: PayloadAction<IAdminPayLoad>) {
      state.accountList = action.payload.accountList;
    },

    setIsOpenModal(state, action: PayloadAction<IAdminPayLoad>) {
      state.isOpenModal = action.payload.isOpenModal;
    },
    addNewStaff(state, action: PayloadAction<IAdminPayLoad>) {},
    editRoleAccount(state, action: PayloadAction<IAdminPayLoad>) {},
    setIsAddNewState(state, action: PayloadAction<IAdminPayLoad>) {
      state.isAddNew = action.payload.isAddNew;
    },
    setOpenModalProduct(state, action: PayloadAction<IAdminPayLoad>) {
      state.openModalProduct = action.payload.openModalProduct;
    },
    setCurrentEditAccount(state, action: PayloadAction<IAdminPayLoad>) {
      state.currentEditAccount = action.payload.currentEditAccount;
    },
    setDeleteAccount(state, action: PayloadAction<IAdminPayLoad>) {},
    setPageIndex(state, action: PayloadAction<IAdminPayLoad>) {
      state.pageIndex = action.payload.pageIndex;
    },
    preSetCategoryList(state, action: PayloadAction<IAdminPayLoad>) {},
    setCategoryList(state, action: PayloadAction<IAdminPayLoad>) {
      state.categoryList = action.payload.categoryList;
    },
    preCreateCategoryList(state, action: PayloadAction<IAdminPayLoad>) {},
    setCurrentEditCategory(state, action: PayloadAction<IAdminPayLoad>) {
      state.currentEditCategory = action.payload.currentEditCategory;
    },
    setCurrentEditVoucher(state, action: PayloadAction<IAdminPayLoad>) {
      state.currentEditVoucher = action.payload.currentEditVoucher;
    },
    preUpdateCategory(state, action: PayloadAction<IAdminPayLoad>) {},
    preSetVoucherList(state, action: PayloadAction<IAdminPayLoad>) {},
    setVoucherList(state, action: PayloadAction<IAdminPayLoad>) {
      state.voucherList = action.payload.voucherList;
    },
    preUpdateVoucher(state, action: PayloadAction<IAdminPayLoad>) {},
    setDeleteCategory(state, action: PayloadAction<IAdminPayLoad>) {},
    preSetUserInfo(state, action: PayloadAction<IAdminPayLoad>) {},
    setUserInfo(state, action: PayloadAction<IAdminPayLoad>) {
      state.userInfo = action.payload.userInfo;
    },
    preSetCreateVoucherList(state, action: PayloadAction<IAdminPayLoad>) {},
    preEditVoucher(state, action: PayloadAction<IAdminPayLoad>) {},
    setDeleteVoucher(state, action: PayloadAction<IAdminPayLoad>) {},
    setChangeActivateVoucher(state, action: PayloadAction<IAdminPayLoad>) {},
    preSetOrderList(state, action: PayloadAction<IAdminPayLoad>) {},
    setOrderList(state, action: PayloadAction<IAdminPayLoad>) {
      state.orderList = action.payload.orderList;
    },
    setCurrentOrderItem(state, action: PayloadAction<IAdminPayLoad>) {
      state.currentOrderItem = action.payload.currentOrderItem;
    },
    preChangeStatusOrder(state, action: PayloadAction<IAdminPayLoad>) {},
    setChangeStatusOrder(state, action: PayloadAction<IAdminPayLoad>) {
      state.currentChangeStatusOrder = action.payload.currentChangeStatusOrder;
    },
    preUpdateAdminProfile(state, action: PayloadAction<IAdminPayLoad>) {},
    setEditAdminInformation(state, action: PayloadAction<IAdminPayLoad>) {
      state.adminEditInformation = action.payload.adminEditInformation;
    },
    preUpdatePassword(state, action: PayloadAction<IAdminPayLoad>) {},
    setIsChangePasswordSuccess(state, action: PayloadAction<IAdminPayLoad>) {
      state.isChangePasswordSuccess = action.payload.isChangePasswordSuccess;
    },
    preSignout(state, action: PayloadAction<IAdminPayLoad>) {},
    preSetProductList(state, action: PayloadAction<IAdminPayLoad>) {},
    setProductList(state, action: PayloadAction<IAdminPayLoad>) {
      state.productList = action.payload.productList;
    },
    setPaginationIndex(state, action: PayloadAction<IAdminPayLoad>) {
      state.paginationIndex = action.payload.paginationIndex;
    },
    setSearchKeyWord(state, action: PayloadAction<IAdminPayLoad>) {
      state.searchKeyWord = action.payload.searchKeyWord;
    },
    preSearchProduct(state, action: PayloadAction<IAdminPayLoad>) {},
    setSearchingKeyWord(state, action: PayloadAction<IAdminPayLoad>) {
      state.isSearchingProduct = action.payload.isSearchingProduct;
    },
    setCurrentProduct(state, action: PayloadAction<IAdminPayLoad>) {
      state.currentProduct = action.payload.currentProduct;
    },
    setDeleteProduct(state, action: PayloadAction<IAdminPayLoad>){},

  },
});

export const adminAction = adminSlice.actions;
export const selectAccountList = (state: RootState) => state.admin.accountList;
export const selectVoucherList = (state: RootState) => state.admin.voucherList;
export const selectIsOpenModal = (state: RootState) => state.admin.isOpenModal;
export const selectIsAddNewState = (state: RootState) => state.admin.isAddNew;
export const selectCurrentEditAccount = (state: RootState) =>
  state.admin.currentEditAccount;
export const selectNumberIndex = (state: RootState) => state.admin.pageIndex;
export const selectCategoryList = (state: RootState) =>
  state.admin.categoryList;
export const selectUserInfo = (state: RootState) => state.admin.userInfo;
export const selectCurrentEditCategory = (state: RootState) =>
  state.admin.currentEditCategory;
export const selectCurrentEditVoucher = (state: RootState) =>
  state.admin.currentEditVoucher;
export const selectOrderList = (state: RootState) => state.admin.orderList;
export const selectCurrentOrderItem = (state: RootState) =>
  state.admin.currentOrderItem;
export const selectCurrentChangeStatusOrder = (state: RootState) =>
  state.admin.currentChangeStatusOrder;
export const selectAdminEditInformation = (state: RootState) =>
  state.admin.adminEditInformation;
export const selectIsChangePasswordSuccess = (state: RootState) =>
  state.admin.isChangePasswordSuccess;
export const selectProductList = (state: RootState) => state.admin.productList;
export const selectPaginationIndex = (state: RootState) =>
  state.admin.paginationIndex;
export const selectSearchKeyWord = (state: RootState) =>
  state.admin.searchKeyWord;
export const selectIsSearchKeyword = (state: RootState) =>
  state.admin.isSearchingProduct;
export const selectCurrentProduct = (state: RootState) =>
  state.admin.currentProduct;
export const selectOpenModalProduct = (state: RootState) =>
  state.admin.openModalProduct;
export const adminReducer = adminSlice.reducer;
