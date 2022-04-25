import { IdProvider } from "@chakra-ui/hooks";
import {
  IOrder,
  IOrderItemDetail,
  IProductRecommend,
  IProductSKU,
} from "@models/admin";
import {
  IAddress,
  ICartItem,
  IReview,
  IReviewResponse,
  IVnpay,
  IVnpayResponse,
  IVoucherNewPrice,
  IVoucherValidate,
} from "@models/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { isExportDeclaration } from "typescript";

interface IInitialState {
  cartItemList: ICartItem[];
  totalItem: number;
  addressList: IAddress[];
  starReview: 1 | 2 | 3 | 4 | 5;
  newVoucherResponse: IVoucherNewPrice;
  newOrderResponse: IOrder;
  vnpayResponse: IVnpayResponse;
  orderListUser: IOrder[];
  currentOrderDetail: IOrder;
  currentProductSKU: IProductSKU;
  currentOrderDetailPopup: IOrderItemDetail[];
  reviewList: IReviewResponse[];
  recommendListByProduct: IProductRecommend[];
  currentAddress: IAddress;
  userRole: string[];
  isFisrtGetRole: boolean;
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
  createOrderPayload?: IOrder;
  applyVoucherPayload?: IVoucherValidate;
  newVoucherResponsePayload?: IVoucherNewPrice;
  newOrderResponsePayload?: IOrder;
  vnpayPayload?: IVnpay;
  vnpayResponsePayload?: IVnpayResponse;
  orderListUserPayload?: IOrder[];
  currentOrderDetailPayload?: IOrder;
  getProductSKUPayload?: Number;
  currentProductSKUPayload?: IProductSKU;
  currentOrderDetailPopup?: IOrderItemDetail[];
  addReviewPayload?: IReview;
  reviewListPayload?: IReviewResponse[];
  productIdReviewListPayload?: string;
  cancelOrderPayload?: Number;
  productIDPayload?: string;
  recommendListByProductPayload?: IProductRecommend[];
  addressByIdPayload?: number;
  currentAddress?: IAddress;
  userRole?: string[];
  isFisrtGetRole?: boolean;
}

const initialState: IInitialState = {
  cartItemList: [],
  totalItem: 0,
  addressList: [],
  starReview: 5,
  newVoucherResponse: null,
  newOrderResponse: null,
  vnpayResponse: null,
  orderListUser: [],
  currentOrderDetail: null,
  currentProductSKU: null,
  currentOrderDetailPopup: [],
  reviewList: [],
  recommendListByProduct: [],
  currentAddress: null,
  userRole: [],
  isFisrtGetRole: true,
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
    preCreateOrder(state, action: PayloadAction<IUserPayLoad>) {},
    preSetNewVoucherResponse(state, action: PayloadAction<IUserPayLoad>) {},
    setNewVoucherResponse(state, action: PayloadAction<IUserPayLoad>) {
      state.newVoucherResponse = action.payload.newVoucherResponsePayload;
    },
    preApplyVoucher(state, action: PayloadAction<IUserPayLoad>) {},
    preSetNewOrderResponse(state, action: PayloadAction<IUserPayLoad>) {},
    setNewOrderResponse(state, action: PayloadAction<IUserPayLoad>) {
      state.newOrderResponse = action.payload.newOrderResponsePayload;
    },
    preSetVnpay(state, action: PayloadAction<IUserPayLoad>) {},
    preSetVnpayResponse(state, action: PayloadAction<IUserPayLoad>) {},
    setVnpayResponse(state, action: PayloadAction<IUserPayLoad>) {
      state.vnpayResponse = action.payload.vnpayResponsePayload;
    },
    preSaveOrderRecommend(state, action: PayloadAction<IUserPayLoad>) {},
    preSetOrderListUser(state, action: PayloadAction<IUserPayLoad>) {},
    setOrderListUser(state, action: PayloadAction<IUserPayLoad>) {
      state.orderListUser = action.payload.orderListUserPayload;
    },
    setCurrentOrderDetail(state, action: PayloadAction<IUserPayLoad>) {
      state.currentOrderDetail = action.payload.currentOrderDetailPayload;
    },
    preSetProductSKU(state, action: PayloadAction<IUserPayLoad>) {},
    setProductSKU(state, action: PayloadAction<IUserPayLoad>) {
      state.currentProductSKU = action.payload.currentProductSKUPayload;
    },
    preSetCurrentOrderDetailPopup(
      state,
      action: PayloadAction<IUserPayLoad>
    ) {},
    setCurrentOrderDetailPopup(state, action: PayloadAction<IUserPayLoad>) {
      state.currentOrderDetailPopup = action.payload.currentOrderDetailPopup;
    },
    preAddReview(state, action: PayloadAction<IUserPayLoad>) {},
    preSetReviewList(state, action: PayloadAction<IUserPayLoad>) {},
    setReviewList(state, action: PayloadAction<IUserPayLoad>) {
      state.reviewList = action.payload.reviewListPayload;
    },
    preSetCancelOrder(state, action: PayloadAction<IUserPayLoad>) {},
    preSetRecommendListByProduct(state, action: PayloadAction<IUserPayLoad>) {},
    setRecommendListByProduct(state, action: PayloadAction<IUserPayLoad>) {
      state.recommendListByProduct =
        action.payload.recommendListByProductPayload;
    },
    preSetCurrentAddress(state, action: PayloadAction<IUserPayLoad>) {},
    setCurrentAdress(state, action: PayloadAction<IUserPayLoad>) {
      state.currentAddress = action.payload.currentAddress;
    },
    preSetUserRole(state, action: PayloadAction<IUserPayLoad>) {},
    setUserRole(state, action: PayloadAction<IUserPayLoad>) {
      state.userRole = action.payload.userRole;
    },
    setIsFirstGetRole(state, action: PayloadAction<IUserPayLoad>) {
      state.isFisrtGetRole = action.payload.isFisrtGetRole;
    },
  },
});

export const userAction = userSlice.actions;

export const selectCartItemList = (state: RootState) => state.user.cartItemList;
export const selectNumberItem = (state: RootState) => state.user.totalItem;
export const selectAddressList = (state: RootState) => state.user.addressList;
export const selectStarReview = (state: RootState) => state.user.starReview;
export const selectNewVoucherResponse = (state: RootState) =>
  state.user.newVoucherResponse;
export const selectNewOrderResponse = (state: RootState) =>
  state.user.newOrderResponse;
export const selectVnpayResponse = (state: RootState) =>
  state.user.vnpayResponse;
export const selectOrderListUser = (state: RootState) =>
  state.user.orderListUser;
export const selectCurrentOrderDetail = (state: RootState) =>
  state.user.currentOrderDetail;
export const selectCurrentProductSKUs = (state: RootState) =>
  state.user.currentProductSKU;
export const selectCurrentOrderDetailPopup = (state: RootState) =>
  state.user.currentOrderDetailPopup;
export const selectReviewList = (state: RootState) => state.user.reviewList;
export const selectRecommendListByProduct = (state: RootState) =>
  state.user.recommendListByProduct;
export const selectCurrentAdress = (state: RootState) =>
  state.user.currentAddress;
export const selectUserRole = (state: RootState) => state.user.userRole;
export const selectIsFirstGetRole = (state: RootState) =>
  state.user.isFisrtGetRole;

export const userReducer = userSlice.reducer;
