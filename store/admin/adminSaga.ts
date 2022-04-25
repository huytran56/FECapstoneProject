import {
  handleChangeActivate,
  handleChangeStatus,
  handleCreateCategory,
  handleCreateProduct,
  handleCreateProductSKU,
  handleCreateStaffAccount,
  handleCreateVoucher,
  handleDeleteAccount,
  handleDeleteCategory,
  handleDeleteProduct,
  handleDeleteVoucher,
  handleEditProduct,
  handleEditProductSKU,
  handleEditRoleAccount,
  handleEditVoucher,
  handleGetAccount,
  handleGetCategory,
  handleGetDashboard,
  handleGetOrder,
  handleGetProduct,
  handleGetProductDetailFull,
  handleGetRecommendationList,
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
import { EditProductSKU } from "@components/ui";
import {
  IAccount,
  ICategory,
  IDashboard,
  IOrder,
  IProduct,
  IProductFull,
  IProductRecommend,
  IProductSKU,
  IVoucher,
} from "@models/admin";
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
  yield put(adminAction.setError({ errorPopup: null }));
  yield put(adminAction.setWarning({ warningPopup: null }));
  try {
    const addStaffRes: ICreateStaffRes = yield call(
      handleCreateStaffAccount,
      action.payload.createStaffPayload
    );
    const accountList: IAccount[] = yield call(handleGetAccount);
    yield put(adminAction.setAccountList({ accountList }));
    yield put(adminAction.setIsOpenModal({ isOpenModal: false }));
    yield put(
      adminAction.setWarning({
        warningPopup: "Truy cập email xác nhận và sử dụng tài khoản",
      })
    );
  } catch (error) {
    yield put(adminAction.setError({ errorPopup: error.response.data }));
  }
}
function* editRoleAccount(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createStaffPayload);
  yield put(adminAction.setSuccess({ successPopup: null }));
  try {
    const addStaffRes: ICreateStaffRes = yield call(
      handleEditRoleAccount,
      action.payload.editRoleAccountPayload
    );
    const accountList: IAccount[] = yield call(handleGetAccount);
    yield put(adminAction.setAccountList({ accountList }));
    yield put(adminAction.setIsOpenModal({ isOpenModal: false }));
    yield put(
      adminAction.setSuccess({ successPopup: "Thay đổi role thành công" })
    );
  } catch (error) {
    console.log(error);
  }
}
function* deleteAccount(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createStaffPayload);
  yield put(adminAction.setSuccess({ successPopup: null }));
  yield put(adminAction.setError({ errorPopup: null }));
  try {
    const deleteAccount: IDeleteAccountRes = yield call(
      handleDeleteAccount,
      action.payload.deleteAccountPayLoad
    );
    const accountList: IAccount[] = yield call(handleGetAccount);
    yield put(adminAction.setAccountList({ accountList }));
    yield put(
      adminAction.setSuccess({ successPopup: "Xoá tài khoản thành công" })
    );
  } catch (error) {
    yield put(
      adminAction.setError({ errorPopup: "Tài khoản phải được xác nhận" })
    );
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
  yield put(adminAction.setError({ errorPopup: null }));
  yield put(adminAction.setSuccess({ successPopup: null }));
  try {
    const res: boolean = yield call(
      handleCreateCategory,
      action.payload.createCategoryPayload
    );

    const categoryList: ICategory[] = yield call(handleGetCategory);
    yield put(adminAction.setCategoryList({ categoryList }));
    yield put(adminAction.setIsOpenModal({ isOpenModal: false }));
    yield put(
      adminAction.setSuccess({ successPopup: "Tạo danh mục thành công" })
    );
  } catch (error) {
    yield put(adminAction.setError({ errorPopup: error.response.data }));
  }
}

function* updateCategory(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createCategoryPayload);
  yield put(adminAction.setError({ errorPopup: null }));
  yield put(adminAction.setSuccess({ successPopup: null }));
  try {
    const res: boolean = yield call(
      handlerUpdateCategory,
      action.payload.createCategoryPayload
    );

    const categoryList: ICategory[] = yield call(handleGetCategory);
    yield put(adminAction.setCategoryList({ categoryList }));
    yield put(adminAction.setIsOpenModal({ isOpenModal: false }));
    yield put(
      adminAction.setSuccess({ successPopup: "Chỉnh sửa danh mục thành công" })
    );
  } catch (error) {
    yield put(adminAction.setError({ errorPopup: error.response.data }));
  }
}
function* deleteCategory(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createStaffPayload);
  yield put(adminAction.setSuccess({ successPopup: null }));
  try {
    const deleteCategory: IDeleteAccountRes = yield call(
      handleDeleteCategory,
      action.payload.deleteCategoryPayLoad
    );
    const categoryList: ICategory[] = yield call(handleGetCategory);
    yield put(adminAction.setCategoryList({ categoryList }));
    yield put(
      adminAction.setSuccess({ successPopup: "Xoá danh mục thành công" })
    );
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
  // console.log(action.payload.createVoucherPayLoad);
  yield put(adminAction.setError({ errorPopup: null }));
  yield put(adminAction.setSuccess({ successPopup: null }));
  try {
    const res: boolean = yield call(
      handleCreateVoucher,
      action.payload.createVoucherPayLoad
    );

    const voucherList: IVoucher[] = yield call(handleGetVoucher);
    yield put(adminAction.setVoucherList({ voucherList }));
    yield put(adminAction.setIsOpenModal({ isOpenModal: false }));
    yield put(
      adminAction.setSuccess({ successPopup: "Tạo mã giảm giá thành công" })
    );
  } catch (error) {
    yield put(adminAction.setError({ errorPopup: error.response.data }));
  }
}
function* editVoucher(action: PayloadAction<IAdminPayLoad>) {
  // console.log(action.payload.editVoucherPayLoad);
  yield put(adminAction.setSuccess({ successPopup: null }));
  try {
    const editVoucher: boolean = yield call(
      handleEditVoucher,
      action.payload.editVoucherPayLoad
    );
    const voucherList: IVoucher[] = yield call(handleGetVoucher);
    console.log(voucherList);
    yield put(adminAction.setVoucherList({ voucherList }));
    yield put(adminAction.setIsOpenModal({ isOpenModal: false }));
    yield put(
      adminAction.setSuccess({
        successPopup: "Thay đổi mã giảm giá thành công",
      })
    );
  } catch (error) {
    console.log(error);
  }
}
function* deleteVoucher(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createStaffPayload);
  yield put(adminAction.setSuccess({ successPopup: null }));
  try {
    const deleteVoucher: boolean = yield call(
      handleDeleteVoucher,
      action.payload.deleteVoucherPayLoad
    );
    const voucherList: IVoucher[] = yield call(handleGetVoucher);
    yield put(adminAction.setVoucherList({ voucherList }));
    yield put(
      adminAction.setSuccess({ successPopup: "Xoá mã giảm giá thành công" })
    );
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
  yield put(adminAction.setSuccess({ successPopup: null }));
  try {
    const res = yield call(
      handlerUpdateUserInformation,
      action.payload.preUpdateAdminProfilePayload
    );

    const userInfo: IUserInformationRes = yield call(handleUserInfomation);

    yield put(adminAction.setUserInfo({ userInfo }));
    yield put(
      adminAction.setSuccess({ successPopup: "Thay đổi thông tin thành công" })
    );
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
  yield put(adminAction.setSuccess({ successPopup: null }));
  try {
    const deleteProduct: boolean = yield call(
      handleDeleteProduct,
      action.payload.deleteProductPayload
    );
    yield put(adminAction.setPaginationIndex({ paginationIndex: 0 }));
    const productList: IProduct[] = yield call(handleGetProduct, 0);

    yield put(adminAction.setProductList({ productList }));
    yield put(
      adminAction.setSuccess({ successPopup: "Xoá sản phẩm thành công" })
    );
  } catch (error) {
    console.log(error);
  }
}

function* getRecommendationList(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createStaffPayload);
  try {
    const recommendationList: IProductRecommend[] = yield call(
      handleGetRecommendationList
    );
    yield put(adminAction.setRecommendationList({ recommendationList }));
  } catch (error) {
    console.log(error);
  }
}
function* editProduct(action: PayloadAction<IAdminPayLoad>) {
  // console.log(action.payload.editVoucherPayLoad);
  yield put(adminAction.setSuccess({ successPopup: null }));
  try {
    const editVoucher: boolean = yield call(
      handleEditProduct,
      action.payload.editProductPayLoad
    );
    const productList: IProduct[] = yield call(handleGetProduct, 0);
    yield put(adminAction.setProductList({ productList }));
    yield put(adminAction.setIsOpenModal({ isOpenModal: false }));
    yield put(
      adminAction.setSuccess({ successPopup: "Chỉnh sửa sản phẩm thành công" })
    );
  } catch (error) {
    console.log(error);
  }
}
function* getProductDetailFull(action: PayloadAction<IAdminPayLoad>) {
  // console.log(action.payload.productDetailFullPayLoad);
  try {
    const productDetail: IProductFull = yield call(handleGetProductDetailFull, {
      product_id: action.payload.productDetailFullPayLoad.toString(),
    });
    yield put(
      adminAction.setProductDetailFull({ productDetailFull: productDetail })
    );
  } catch (error) {
    console.log(error);
  }
}
function* editProductSKU(action: PayloadAction<IAdminPayLoad>) {
  console.log(action.payload.editProductSKUPayLoad);
  yield put(adminAction.setError({ errorPopup: null }));
  yield put(adminAction.setSuccess({ successPopup: null }));
  try {
    const editVoucher: boolean = yield call(
      handleEditProductSKU,
      action.payload.editProductSKUPayLoad
    );
    const productDetail: IProductFull = yield call(handleGetProductDetailFull, {
      product_id: action.payload.editProductSKUPayLoad.product_id,
    });
    yield put(
      adminAction.setProductDetailFull({ productDetailFull: productDetail })
    );
    yield put(adminAction.setIsOpenModalTwo({ isOpenModalTwo: false }));
    yield put(adminAction.setSuccess({ successPopup: "Chỉnh sửa thành công" }));
  } catch (error) {
    yield put(adminAction.setError({ errorPopup: error.response.data }));
  }
}
function* createProduct(action: PayloadAction<IAdminPayLoad>) {
  // console.log(action.payload.createProductPayLoad);
  yield put(adminAction.setError({ errorPopup: null }));
  yield put(adminAction.setSuccess({ successPopup: null }));
  try {
    const res: boolean = yield call(
      handleCreateProduct,
      action.payload.createProductPayLoad
    );

    const productList: IProduct[] = yield call(handleGetProduct, 0);
    yield put(adminAction.setProductList({ productList }));
    yield put(adminAction.setIsOpenModal({ isOpenModal: false }));
    yield put(
      adminAction.setSuccess({ successPopup: "Thêm sản phẩm thành công" })
    );
  } catch (error) {
    yield put(adminAction.setError({ errorPopup: error.response.data }));
  }
}
function* createProductSKU(action: PayloadAction<IAdminPayLoad>) {
  console.log(action.payload.createProductSKUPayload);
  yield put(adminAction.setError({ errorPopup: null }));
  yield put(adminAction.setSuccess({ successPopup: null }));
  try {
    const res: boolean = yield call(
      handleCreateProductSKU,
      action.payload.createProductSKUPayload
    );
    const productDetail: IProductFull = yield call(handleGetProductDetailFull, {
      product_id: action.payload.createProductSKUPayload.product_id,
    });
    yield put(
      adminAction.setProductDetailFull({ productDetailFull: productDetail })
    );
    yield put(adminAction.setIsOpenModalTwo({ isOpenModalTwo: false }));
    yield put(adminAction.setSuccess({ successPopup: "Tạo thành công" }));
  } catch (error) {
    yield put(adminAction.setError({ errorPopup: error.response.data }));
  }
}
function* getDashboard(action: PayloadAction<IAdminPayLoad>) {
  //   console.log(action.payload.createStaffPayload);
  try {
    const dashboard: IDashboard = yield call(handleGetDashboard);
    yield put(adminAction.setDashboard({ dashboard }));
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
  yield takeLatest(adminAction.preSetCommendationList, getRecommendationList);
  yield takeLatest(adminAction.preEditProduct, editProduct);
  yield takeLatest(adminAction.preSetProductDetailFull, getProductDetailFull);
  yield takeLatest(adminAction.preEditProductSKU, editProductSKU);
  yield takeLatest(adminAction.preCreateProduct, createProduct);
  yield takeLatest(adminAction.preAddProductSKU, createProductSKU);
  yield takeLatest(adminAction.preSetDashboard, getDashboard);
}
