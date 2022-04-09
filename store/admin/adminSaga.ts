import {
  handleCreateCategory,
  handleCreateStaffAccount,
  handleDeleteAccount,
  handleDeleteCategory,
  handleEditRoleAccount,
  handleGetAccount,
  handleGetCategory,
  handlerChangePassword,
  handlerUpdateCategory,
  handlerUpdateUserInformation,
  handleUserInfomation,
  ICreateStaffRes,
  IDeleteAccount,
  IDeleteAccountRes,
  IUserInformationRes,
} from "@api/auth-api";
import { IAccount, ICategory } from "@models/admin";
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
  yield takeLatest(adminAction.preUpdateAdminProfile, updateAdminProfile);
  yield takeLatest(adminAction.preUpdatePassword, updatePassword);
}
