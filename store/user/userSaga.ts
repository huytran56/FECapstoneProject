import {
  handleAddNewAddress,
  handleAddToCartItem,
  handleChangeQuantityCart,
  handleDeleteAddress,
  handleDeleteCartItem,
  handleGetAddressList,
  handleGetCartItemList,
} from "@api/auth-api";
import {} from "@models/admin";
import { IAddress, ICartItem } from "@models/user";
import { put, takeLatest, call } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { IUserPayLoad } from "@store/index";
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

export function* userSaga() {
  yield takeLatest(userAction.preSetCartItemList, getCartItemList);
  yield takeLatest(userAction.preSetAddToCartItem, createCartItem);
  yield takeLatest(userAction.preDeleteItemFromCart, deleteCartItem);
  yield takeLatest(userAction.preSetChangeQuantityCart, changeQuantity);
  yield takeLatest(userAction.preSetAddressList, getAddressList);
  yield takeLatest(userAction.preSetAddNewAddress, addNewAddress);
  yield takeLatest(userAction.preDeleteAddress, deleteAddress);
}
