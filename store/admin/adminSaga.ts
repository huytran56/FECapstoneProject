import {
  handleChangeActivate,
  handleChangeStatus,
  handleCreateCategory,
  handleCreateStaffAccount,
  handleCreateVoucher,
  handleDeleteAccount,
  handleDeleteCategory,
  handleDeleteProduct,
  handleDeleteVoucher,
  handleEditRoleAccount,
  handleEditVoucher,
  handleGetAccount,
  handleGetCategory,
  handleGetOrder,
  handleGetProduct,
  handleGetVoucher,
  handlerChangePassword,
  handlerUpdateCategory,
  handlerUpdateUserInformation,
  handleSearchProduct,
  handleSignOut,
  handleUserInfomation,
  ICreateStaffRes,
  IDeleteAccount,
  IDeleteAccountRes,
  IUserInformationRes,
} from "@api/auth-api";
import { IAccount, ICategory, IOrder, IProduct, IVoucher } from "@models/admin";
import { put, takeLatest, call } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { IAdminPayLoad } from "@store/index";
import { adminAction } from "./adminSlice";

function* getAccountList(action: PayloadAction<IAdminPayLoad>) {
  try {
    const accountList: IAccount[] = yield call(handleGetAccount);
    yield put(adminAction.setAccountList({ accountList }));
  } catch (error) {
    console.log(error);
  }
}
function* createStaff(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createStaffPayload);
  try {
    const addStaffRes: ICreateStaffRes = yield call(
      handleCreateStaffAccount,
      action.payload.createStaffPayload
    );
    const accountList: IAccount[] = yield call(handleGetAccount);
    yield put(adminAction.setAccountList({ accountList }));
    yield put(adminAction.setIsOpenModal({ isOpenModal: false }));
  } catch (error) {
    console.log(error);
  }
}
function* editRoleAccount(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createStaffPayload);
  try {
    const addStaffRes: ICreateStaffRes = yield call(
      handleEditRoleAccount,
      action.payload.editRoleAccountPayload
    );
    const accountList: IAccount[] = yield call(handleGetAccount);
    yield put(adminAction.setAccountList({ accountList }));
    yield put(adminAction.setIsOpenModal({ isOpenModal: false }));
  } catch (error) {
    console.log(error);
  }
}
function* deleteAccount(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createStaffPayload);
  try {
    const deleteAccount: IDeleteAccountRes = yield call(
      handleDeleteAccount,
      action.payload.deleteAccountPayLoad
    );
    const accountList: IAccount[] = yield call(handleGetAccount);
    yield put(adminAction.setAccountList({ accountList }));
  } catch (error) {
    console.log(error);
  }
}

function* getCategory(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createStaffPayload);
  try {
    const categoryList: ICategory[] = yield call(handleGetCategory);
    yield put(adminAction.setCategoryList({ categoryList }));
  } catch (error) {
    console.log(error);
  }
}

function* createCategory(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createStaffPayload);
  try {
    const res: boolean = yield call(
      handleCreateCategory,
      action.payload.createCategoryPayload
    );
    if (res) {
      const categoryList: ICategory[] = yield call(handleGetCategory);
      yield put(adminAction.setCategoryList({ categoryList }));
      yield put(adminAction.setIsOpenModal({ isOpenModal: false }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateCategory(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createCategoryPayload);

  try {
    const res: boolean = yield call(
      handlerUpdateCategory,
      action.payload.createCategoryPayload
    );
    if (res) {
      const categoryList: ICategory[] = yield call(handleGetCategory);
      yield put(adminAction.setCategoryList({ categoryList }));
      yield put(adminAction.setIsOpenModal({ isOpenModal: false }));
    }
  } catch (error) {
    console.log(error);
  }
}
function* deleteCategory(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createStaffPayload);
  try {
    const deleteCategory: IDeleteAccountRes = yield call(
      handleDeleteCategory,
      action.payload.deleteCategoryPayLoad
    );
    const categoryList: ICategory[] = yield call(handleGetCategory);
    yield put(adminAction.setCategoryList({ categoryList }));
  } catch (error) {
    console.log(error);
  }
}
function* getUserInfo(action: PayloadAction<IAdminPayLoad>) {
  try {
    const userInfo: IUserInformationRes = yield call(handleUserInfomation);

    yield put(adminAction.setUserInfo({ userInfo }));
  } catch (error) {
    console.log(error);
  }
}
function* getVoucherList(action: PayloadAction<IAdminPayLoad>) {
  try {
    const voucherList: IVoucher[] = yield call(handleGetVoucher);
    yield put(adminAction.setVoucherList({ voucherList }));
  } catch (error) {
    console.log(error);
  }
}
function* createVoucher(action: PayloadAction<IAdminPayLoad>) {
  console.log(action.payload.createVoucherPayLoad);
  try {
    const res: boolean = yield call(
      handleCreateVoucher,
      action.payload.createVoucherPayLoad
    );
    if (res) {
      const voucherList: IVoucher[] = yield call(handleGetVoucher);
      yield put(adminAction.setVoucherList({ voucherList }));
      yield put(adminAction.setIsOpenModal({ isOpenModal: false }));
    }
  } catch (error) {
    console.log(error);
  }
}
function* editVoucher(action: PayloadAction<IAdminPayLoad>) {
  console.log(action.payload.editVoucherPayLoad);
  try {
    const editVoucher: boolean = yield call(
      handleEditVoucher,
      action.payload.editVoucherPayLoad
    );
    const voucherList: IVoucher[] = yield call(handleGetVoucher);
    console.log(voucherList);
    yield put(adminAction.setVoucherList({ voucherList }));
    yield put(adminAction.setIsOpenModal({ isOpenModal: false }));
  } catch (error) {
    console.log(error);
  }
}
function* deleteVoucher(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createStaffPayload);
  try {
    const deleteVoucher: boolean = yield call(
      handleDeleteVoucher,
      action.payload.deleteVoucherPayLoad
    );
    const voucherList: IVoucher[] = yield call(handleGetVoucher);
    yield put(adminAction.setVoucherList({ voucherList }));
  } catch (error) {
    console.log(error);
  }
}

function* changeActivate(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createStaffPayload);
  try {
    const changleActivate: boolean = yield call(
      handleChangeActivate,
      action.payload.changeActivateVoucherPayLoad
    );
    const voucherList: IVoucher[] = yield call(handleGetVoucher);
    yield put(adminAction.setVoucherList({ voucherList }));
  } catch (error) {
    console.log(error);
  }
}
function* getOrderList(action: PayloadAction<IAdminPayLoad>) {
  try {
    const orderList: IOrder[] = yield call(handleGetOrder);
    yield put(adminAction.setOrderList({ orderList }));
  } catch (error) {
    console.log(error);
  }
}
function* changeStatusOrder(action: PayloadAction<IAdminPayLoad>) {
  try {
    const changeStatus: boolean = yield call(
      handleChangeStatus,
      action.payload.changeStatusOrderPayLoad
    );
    const orderList: IOrder[] = yield call(handleGetOrder);
    yield put(adminAction.setOrderList({ orderList }));
    yield put(adminAction.setIsOpenModal({ isOpenModal: false }));
  } catch (error) {
    console.log(error);
  }
}
function* signOut(action: PayloadAction<IAdminPayLoad>) {
  try {
    const logout: boolean = yield call(handleSignOut);
    console.log(logout);
  } catch (error) {
    console.log(error);
  }
}
function* updateAdminProfile(action: PayloadAction<IAdminPayLoad>) {
  try {
    const res = yield call(
      handlerUpdateUserInformation,
      action.payload.preUpdateAdminProfilePayload
    );
    if (res) {
      const userInfo: IUserInformationRes = yield call(handleUserInfomation);

      yield put(adminAction.setUserInfo({ userInfo }));
    }
  } catch (error) {
    console.log(error);
  }
}

function* updatePassword(action: PayloadAction<IAdminPayLoad>) {
  try {
    const res = yield call(
      handlerChangePassword,
      action.payload.changePasswordPayload
    );
    console.log({ res });

    if (res) {
      yield put(adminAction.setIsOpenModal({ isOpenModal: false }));
    } else {
      yield put(
        adminAction.setIsChangePasswordSuccess({
          isChangePasswordSuccess: false,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
}
function* getProductList(action: PayloadAction<IAdminPayLoad>) {
  try {
    const productList: IProduct[] = yield call(
      handleGetProduct,
      action.payload.paginationIndex
    );
    yield put(adminAction.setProductList({ productList }));
  } catch (error) {
    console.log(error);
  }
}
function* getSearchProduct(action: PayloadAction<IAdminPayLoad>) {
  try {
    const productList: IProduct[] = yield call(handleSearchProduct, {
      keyword: action.payload.searchKeyWord,
    });
    yield put(adminAction.setProductList({ productList }));
  } catch (error) {
    console.log(error);
  }
}
function* deleteProduct(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createStaffPayload);
  try {
    const deleteProduct: boolean = yield call(
      handleDeleteProduct,
      action.payload.deleteProductPayload
    );
    yield put(adminAction.setPaginationIndex({ paginationIndex: 0 }));
    const productList: IProduct[] = yield call(handleGetProduct, 0);

    yield put(adminAction.setProductList({ productList }));
  } catch (error) {
    console.log(error);
  }
}
export function* adminSaga() {
  yield takeLatest(adminAction.preSetAccountList, getAccountList);
  yield takeLatest(adminAction.addNewStaff, createStaff);
  yield takeLatest(adminAction.editRoleAccount, editRoleAccount);
  yield takeLatest(adminAction.setDeleteAccount, deleteAccount);
  yield takeLatest(adminAction.preSetCategoryList, getCategory);
  yield takeLatest(adminAction.preCreateCategoryList, createCategory);
  yield takeLatest(adminAction.preUpdateCategory, updateCategory);
  yield takeLatest(adminAction.setDeleteCategory, deleteCategory);
  yield takeLatest(adminAction.preSetUserInfo, getUserInfo);
  yield takeLatest(adminAction.preSetVoucherList, getVoucherList);
  yield takeLatest(adminAction.preSetCreateVoucherList, createVoucher);
  yield takeLatest(adminAction.preEditVoucher, editVoucher);
  yield takeLatest(adminAction.setDeleteVoucher, deleteVoucher);
  yield takeLatest(adminAction.setChangeActivateVoucher, changeActivate);
  yield takeLatest(adminAction.preSetOrderList, getOrderList);
  yield takeLatest(adminAction.preChangeStatusOrder, changeStatusOrder);
  yield takeLatest(adminAction.preUpdateAdminProfile, updateAdminProfile);
  yield takeLatest(adminAction.preUpdatePassword, updatePassword);
  yield takeLatest(adminAction.preSignout, signOut);
  yield takeLatest(adminAction.preSetProductList, getProductList);
  yield takeLatest(adminAction.preSearchProduct, getSearchProduct);
  yield takeLatest(adminAction.setDeleteProduct, deleteProduct);
}
