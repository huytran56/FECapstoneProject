import { IAddress, ICartItem } from "@models/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

interface IInitialState {
  cartItemList: ICartItem[];
  totalItem: number;
  addressList: IAddress[];
  starReview: 1 | 2 | 3 | 4 | 5;
}
export interface IUserPayLoad {
  cartItemListPayload?: ICartItem[];
  totalItem?: number;
  addToCardPayload?: ICartItem;
  deleteItemFromCartPayload?: Number;
  changeQuantityCartPayLoad?: ICartItem;
  addressListPayload?: IAddress[];
  addNewAddressPayload?: IAddress;
  deleteAddressPayload?: Number;
  starReview?: 1 | 2 | 3 | 4 | 5;
}

const initialState: IInitialState = {
  cartItemList: [],
  totalItem: 0,
  addressList: [],
  starReview: 5,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    preSetCartItemList(state, action: PayloadAction<IUserPayLoad>) {},
    setCartItemList(state, action: PayloadAction<IUserPayLoad>) {
      state.cartItemList = action.payload.cartItemListPayload;
    },
    preSetNumberItem(state, action: PayloadAction<IUserPayLoad>) {},
    setNumberItem(state, action: PayloadAction<IUserPayLoad>) {
      state.totalItem = action.payload.totalItem;
    },
    preSetAddToCartItem(state, action: PayloadAction<IUserPayLoad>) {},
    preDeleteItemFromCart(state, action: PayloadAction<IUserPayLoad>) {},
    preSetChangeQuantityCart(state, action: PayloadAction<IUserPayLoad>) {},
    preSetAddressList(state, action: PayloadAction<IUserPayLoad>) {},
    setAddressList(state, action: PayloadAction<IUserPayLoad>) {
      state.addressList = action.payload.addressListPayload;
    },
    preSetAddNewAddress(state, action: PayloadAction<IUserPayLoad>) {},
    preDeleteAddress(state, action: PayloadAction<IUserPayLoad>) {},
    setStarReview(state, action: PayloadAction<IUserPayLoad>) {
      state.starReview = action.payload.starReview;
    },
  },
});

export const userAction = userSlice.actions;
export const selectCartItemList = (state: RootState) => state.user.cartItemList;
export const selectNumberItem = (state: RootState) => state.user.totalItem;
export const selectAddressList = (state: RootState) => state.user.addressList;
export const selectStarReview = (state: RootState) => state.user.starReview;
export const userReducer = userSlice.reducer;
