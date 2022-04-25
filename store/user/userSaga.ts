import {
  handleAddNewAddress,
  handleAddReview,
  handleAddToCartItem,
  handleApplyVoucher,
  handleCancelOrder,
  handleChangeQuantityCart,
  handleCreateOrder,
  handleDeleteAddress,
  handleDeleteCartItem,
  handleGetAddressById,
  handleGetAddressList,
  handleGetCartItemList,
  handleGetOrderInformation,
  handleGetOrderUser,
  handleGetProductSKU,
  handleGetRecommendListByProduct,
  handleGetReviewList,
  handleGetUserRole,
  handleSaveOrder,
  handleVnpay,
} from "@api/auth-api";
import {
  IOrder,
  IOrderItemDetail,
  IProductRecommend,
  IProductSKU,
} from "@models/admin";
import {
  IAddress,
  ICartItem,
  IReviewResponse,
  IVnpayResponse,
  IVoucherNewPrice,
} from "@models/user";
import { put, takeLatest, call } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { adminAction, IUserPayLoad } from "@store/index";
import { userAction } from "./userSlice";

function* getCartItemList(action: PayloadAction<IUserPayLoad>) {
  try {
    const cartItemList: ICartItem[] = yield call(handleGetCartItemList);
    console.log(cartItemList);
    yield put(
      userAction.setCartItemList({ cartItemListPayload: cartItemList })
    );
  } catch (error) {
    console.log(error);
  }
}
function* createCartItem(action: PayloadAction<IUserPayLoad>) {
  console.log(action.payload.addToCardPayload);
  try {
    const res: boolean = yield call(
      handleAddToCartItem,
      action.payload.addToCardPayload
    );
    // if (res) {
    const cartItemList: ICartItem[] = yield call(handleGetCartItemList);
    yield put(
      userAction.setCartItemList({ cartItemListPayload: cartItemList })
    );
    // }
  } catch (error) {
    console.log(error);
  }
}
function* deleteCartItem(action: PayloadAction<IUserPayLoad>) {
  console.log(action.payload.deleteItemFromCartPayload);
  try {
    const deleteCartItem: ICartItem = yield call(handleDeleteCartItem, {
      id: action.payload.deleteItemFromCartPayload,
    });
    const cartItemList: ICartItem[] = yield call(handleGetCartItemList);
    yield put(
      userAction.setCartItemList({ cartItemListPayload: cartItemList })
    );
  } catch (error) {
    console.log(error);
  }
}
function* changeQuantity(action: PayloadAction<IUserPayLoad>) {
  console.log(action.payload.changeQuantityCartPayLoad);
  try {
    const cartItem: ICartItem = yield call(
      handleChangeQuantityCart,
      action.payload.changeQuantityCartPayLoad
    );
    const cartItemList: ICartItem[] = yield call(handleGetCartItemList);
    yield put(
      userAction.setCartItemList({ cartItemListPayload: cartItemList })
    );
  } catch (error) {
    console.log(error);
  }
}
function* getAddressList(action: PayloadAction<IUserPayLoad>) {
  try {
    const addressList: IAddress[] = yield call(handleGetAddressList);
    console.log(addressList);
    yield put(userAction.setAddressList({ addressListPayload: addressList }));
  } catch (error) {
    console.log(error);
  }
}
function* addNewAddress(action: PayloadAction<IUserPayLoad>) {
  console.log(action.payload.addToCardPayload);
  try {
    const res: boolean = yield call(
      handleAddNewAddress,
      action.payload.addNewAddressPayload
    );
    // if (res) {
    const addressList: IAddress[] = yield call(handleGetAddressList);
    yield put(userAction.setAddressList({ addressListPayload: addressList }));
    // }
  } catch (error) {
    console.log(error);
  }
}

function* deleteAddress(action: PayloadAction<IUserPayLoad>) {
  console.log(action.payload.deleteAddressPayload);
  try {
    const deleteCartItem: IAddress = yield call(handleDeleteAddress, {
      id: action.payload.deleteAddressPayload,
    });
    const addressList: IAddress[] = yield call(handleGetAddressList);
    yield put(userAction.setAddressList({ addressListPayload: addressList }));
  } catch (error) {
    console.log(error);
  }
}
function* createOrder(action: PayloadAction<IUserPayLoad>) {
  // console.log(action.payload.createOrderPayload);
  try {
    const res: IOrder = yield call(
      handleCreateOrder,
      action.payload.createOrderPayload
    );
    // console.log(res);
    // if (res) {
    // const addressList: IAddress[] = yield call(handleGetAddressList);
    yield put(userAction.setNewOrderResponse({ newOrderResponsePayload: res }));
    // }
  } catch (error) {
    console.log(error);
  }
}
function* applyVoucher(action: PayloadAction<IUserPayLoad>) {
  console.log(action.payload.applyVoucherPayload);
  try {
    const res: IVoucherNewPrice = yield call(
      handleApplyVoucher,
      action.payload.applyVoucherPayload
    );
    console.log(res);
    yield put(
      userAction.setNewVoucherResponse({ newVoucherResponsePayload: res })
    );
  } catch (error) {
    console.log(error);
  }
}
function* chooseVnpay(action: PayloadAction<IUserPayLoad>) {
  console.log(action.payload.vnpayPayload);
  try {
    const res: IVnpayResponse = yield call(
      handleVnpay,
      action.payload.vnpayPayload
    );
    console.log(res);
    yield put(userAction.setVnpayResponse({ vnpayResponsePayload: res }));
  } catch (error) {
    console.log(error);
  }
}
function* saveOrder(action: PayloadAction<IUserPayLoad>) {
  try {
    const saveOrder: boolean = yield call(handleSaveOrder);
    console.log(saveOrder);
  } catch (error) {
    console.log(error);
  }
}
function* getOrderListUser(action: PayloadAction<IUserPayLoad>) {
  try {
    const orderList: IOrder[] = yield call(handleGetOrderUser);
    console.log(orderList);
    yield put(userAction.setOrderListUser({ orderListUserPayload: orderList }));
  } catch (error) {
    console.log(error);
  }
}
function* getProductSKU(action: PayloadAction<IUserPayLoad>) {
  // console.log(action.payload.getProductSKUPayload);
  try {
    const productSKU: IProductSKU = yield call(handleGetProductSKU, {
      id: action.payload.getProductSKUPayload,
    });
    console.log(productSKU);
    yield put(
      userAction.setProductSKU({ currentProductSKUPayload: productSKU })
    );
  } catch (error) {
    console.log(error);
  }
}

function* getOrderDetailPopup(action: PayloadAction<IUserPayLoad>) {
  try {
    const orderDetail: IOrderItemDetail[] = yield call(
      handleGetOrderInformation,
      { order: action.payload.currentOrderDetailPayload }
    );

    yield put(
      userAction.setCurrentOrderDetailPopup({
        currentOrderDetailPopup: orderDetail,
      })
    );
  } catch (error) {}
}
function* getReviewList(action: PayloadAction<IUserPayLoad>) {
  // console.log(action.payload.productIdReviewListPayload);
  try {
    const reviewList: IReviewResponse[] = yield call(handleGetReviewList, {
      product_id: action.payload.productIdReviewListPayload,
    });
    console.log(reviewList);
    yield put(userAction.setReviewList({ reviewListPayload: reviewList }));
  } catch (error) {
    console.log(error);
  }
}
function* addReview(action: PayloadAction<IUserPayLoad>) {
  // console.log(action.payload.createOrderPayload);
  try {
    const res: IReviewResponse = yield call(
      handleAddReview,
      action.payload.addReviewPayload
    );
    console.log(res);
    yield put(adminAction.setIsOpenModalTwo({ isOpenModalTwo: false }));
    // console.log(res);
    // if (res) {
    // const addressList: IAddress[] = yield call(handleGetAddressList);
    // yield put(userAction.setNewOrderResponse({ newOrderResponsePayload: res }));
    // }
  } catch (error) {
    console.log(error);
  }
}
function* cancelOrder(action: PayloadAction<IUserPayLoad>) {
  // console.log(action.payload.createOrderPayload);
  try {
    const res: boolean = yield call(handleCancelOrder, {
      id: action.payload.cancelOrderPayload,
    });
    const orderList: IOrder[] = yield call(handleGetOrderUser);
    // console.log(orderList);
    yield put(userAction.setOrderListUser({ orderListUserPayload: orderList }));
  } catch (error) {
    console.log(error);
  }
}
function* getRecommendListByProduct(action: PayloadAction<IUserPayLoad>) {
  // console.log(action.payload.productIdReviewListPayload);
  try {
    const recommendList: IProductRecommend[] = yield call(
      handleGetRecommendListByProduct,
      {
        product_id: action.payload.productIDPayload,
      }
    );
    // console.log(recommendList);
    yield put(
      userAction.setRecommendListByProduct({
        recommendListByProductPayload: recommendList,
      })
    );
  } catch (error) {
    console.log(error);
  }
}
function* getAddressById(action: PayloadAction<IUserPayLoad>) {
  // console.log(action.payload.productIdReviewListPayload);
  try {
    const address: IAddress = yield call(handleGetAddressById, {
      id: action.payload.addressByIdPayload,
    });
    // console.log(recommendList);
    yield put(
      userAction.setCurrentAdress({
        currentAddress: address,
      })
    );
  } catch (error) {
    console.log(error);
  }
}
function* getUserRole(action: PayloadAction<IUserPayLoad>) {
  try {
    const userRole: string[] = yield call(handleGetUserRole);
    yield put(userAction.setIsFirstGetRole({ isFisrtGetRole: false }));
    yield put(userAction.setUserRole({ userRole: userRole ? userRole : [] }));
  } catch (error) {
    console.log(error);
  }
}
export function* userSaga() {
  yield takeLatest(userAction.preSetCartItemList, getCartItemList);
  yield takeLatest(userAction.preSetAddToCartItem, createCartItem);
  yield takeLatest(userAction.preDeleteItemFromCart, deleteCartItem);
  yield takeLatest(userAction.preSetChangeQuantityCart, changeQuantity);
  yield takeLatest(userAction.preSetAddressList, getAddressList);
  yield takeLatest(userAction.preSetAddNewAddress, addNewAddress);
  yield takeLatest(userAction.preDeleteAddress, deleteAddress);
  yield takeLatest(userAction.preCreateOrder, createOrder);
  yield takeLatest(userAction.preApplyVoucher, applyVoucher);
  yield takeLatest(userAction.preSetVnpay, chooseVnpay);
  yield takeLatest(userAction.preSaveOrderRecommend, saveOrder);
  yield takeLatest(userAction.preSetOrderListUser, getOrderListUser);
  yield takeLatest(userAction.preSetProductSKU, getProductSKU);
  yield takeLatest(userAction.preAddReview, addReview);
  yield takeLatest(userAction.preSetReviewList, getReviewList);
  yield takeLatest(userAction.preSetCancelOrder, cancelOrder);
  yield takeLatest(userAction.preSetCurrentAddress, getAddressById);
  yield takeLatest(userAction.preSetUserRole, getUserRole);
  yield takeLatest(
    userAction.preSetRecommendListByProduct,
    getRecommendListByProduct
  );
  yield takeLatest(
    userAction.preSetCurrentOrderDetailPopup,
    getOrderDetailPopup
  );
}
