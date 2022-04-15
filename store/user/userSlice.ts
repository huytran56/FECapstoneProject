import { ICartItem } from "@models/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

interface IInitialState {
  cartItemList: ICartItem[];
  totalItem: number;
}
export interface IUserPayLoad {
  cartItemListPayload?: ICartItem[];
  totalItem?: number;
  addToCardPayload?: ICartItem;
  deleteItemFromCartPayload?: Number;
  changeQuantityCartPayLoad?: ICartItem;
}

const initialState: IInitialState = {
  cartItemList: [],
  totalItem: 0,
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
  },
});

export const userAction = userSlice.actions;
export const selectCartItemList = (state: RootState) => state.user.cartItemList;
export const selectNumberItem = (state: RootState) => state.user.totalItem;
export const userReducer = userSlice.reducer;
