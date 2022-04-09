import { IAccount, ICategory, IEditVoucher, IVoucher } from "@models/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import {
  ICreateAccountPayLoad,
  ICategoryPayLoad,
  IDeleteAccount,
  IEditRoleAccount,
  IUserInformationRes,
} from "@api/index";

interface IInitialState {
  accountList: IAccount[];
  voucherList: IVoucher[];
  isOpenModal: boolean;
  isAddNew: boolean;
  currentEditAccount: IAccount;
  currentEditCategory: ICategory;
  currentEditVoucher: IEditVoucher;
  pageIndex: number;
  categoryList: ICategory[];
  userInfo: IUserInformationRes;
}
export interface IAdminPayLoad {
  accountList?: IAccount[];
  voucherList?: IVoucher[];
  currentEditVoucher?: IEditVoucher;
  isOpenModal?: boolean;
  createStaffPayload?: ICreateAccountPayLoad;
  editRoleAccountPayload?: IEditRoleAccount;
  isAddNew?: boolean;
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
}

const initialState: IInitialState = {
  accountList: [],
  voucherList: [],
  currentEditVoucher: null,
  isOpenModal: false,
  isAddNew: false,
  currentEditAccount: null,
  pageIndex: 1,
  categoryList: [],
  currentEditCategory: null,
  userInfo: null,
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
export const adminReducer = adminSlice.reducer;
