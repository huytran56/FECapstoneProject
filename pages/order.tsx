import { useAppDispatch, useAppSelector } from "@app/hook";
import {
  Stack,
  VStack,
  Text,
  HStack,
  Select,
  Link,
  RadioGroup,
  Radio,
  Input,
  Button,
  Box,
  Divider,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { MainLayout } from "@components/layout";
import { AddAddress, ModalGeneral } from "@components/ui";
import OrderSuccess from "@components/ui/order-success";
import { adminAction, selectUserInfo } from "@store/admin";
import {
  selectAddressList,
  selectCartItemList,
  selectNewOrderResponse,
  selectNewVoucherResponse,
  selectVnpayResponse,
  userAction,
} from "@store/user";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineLine, AiFillPlusCircle } from "react-icons/ai";

export default function Order() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [value, setValue] = React.useState("");
  const [readOnly, setReadOnly] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const handleChange = (event) => setValue(event.target.value);
  const CartItemListSelector = useAppSelector(selectCartItemList);
  const AddressListSelector = useAppSelector(selectAddressList);
  const UserInfoSelector = useAppSelector(selectUserInfo);
  const NewPriceSelector = useAppSelector(selectNewVoucherResponse);
  const NewOrderResponseSelector = useAppSelector(selectNewOrderResponse);
  const VnpayResponseSelector = useAppSelector(selectVnpayResponse);
  useEffect(() => {
    dispatch(userAction.preSetCartItemList({}));
  }, [dispatch]);
  useEffect(() => {
    dispatch(userAction.preSetAddressList({}));
    // dispatch(adminAction.preSetUserInfo({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(userAction.preSetNewOrderResponse({}));
    // dispatch(adminAction.preSetUserInfo({}));
  }, [dispatch]);
  useEffect(() => {
    if (NewOrderResponseSelector) {
      if (NewOrderResponseSelector.payment === "VNPAY") {
        dispatch(
          userAction.preSetVnpay({
            vnpayPayload: {
              amount: NewOrderResponseSelector.paymentTotal,
              bankCode: "NCB",
              billingFullname: "Huy Tran",
              language: "VN",
              vnpOrderInfo: NewOrderResponseSelector.id,
            },
          })
        );
      }
    }
  }, [dispatch, NewOrderResponseSelector]);

  useEffect(() => {
    if (VnpayResponseSelector) {
      window.open(VnpayResponseSelector.data, "_blank");
    }
  }, [dispatch, VnpayResponseSelector]);

  if (VnpayResponseSelector !== undefined) {
    console.log(VnpayResponseSelector);
  }
  if (NewOrderResponseSelector !== undefined) {
    console.log(NewOrderResponseSelector);
  }

  let subTotal;
  if (CartItemListSelector !== undefined) {
    subTotal = CartItemListSelector.reduce(
      (subTotal, element) => subTotal + element.price * element.quantity,
      0
    );
  }
  let username;
  if (UserInfoSelector !== undefined) {
    username = UserInfoSelector ? UserInfoSelector.username : null;
  }
  const deliveryFeeTotal = 25000;
  let paymentTotal = subTotal + deliveryFeeTotal;
  if (NewPriceSelector !== undefined) {
    NewPriceSelector
      ? (paymentTotal = NewPriceSelector.newTotal + deliveryFeeTotal)
      : paymentTotal;
  }

  const orderItemDtos = CartItemListSelector.map((cartItem, index) => {
    return {
      price: cartItem.price,
      productSKUId: cartItem.productSKUId,
      quantity: cartItem.quantity,
    };
  });
  const handleOnClickPromo = (value) => {
    dispatch(
      userAction.preApplyVoucher({
        applyVoucherPayload: { cartTotal: subTotal, voucherCode: value },
      })
    );
    setReadOnly(true);
    setVoucherCode(value);
  };
  // console.log(voucherCode);
  const handleOnClickCheckoutButton = (value) => {
    // console.log(value);
    if (value.payment === "COD") {
      dispatch(
        userAction.preCreateOrder({
          createOrderPayload: {
            ...value,
            orderItemDtos,
            username,
            subTotal,
            deliveryFeeTotal,
            paymentTotal,
            voucherCode,
          },
        })
      );
      dispatch(userAction.preSaveOrderRecommend({}));
      dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
    } else if (value.payment === "VNPAY") {
      dispatch(
        userAction.preCreateOrder({
          createOrderPayload: {
            ...value,
            orderItemDtos,
            username,
            subTotal,
            deliveryFeeTotal,
            paymentTotal,
            voucherCode,
          },
        })
      );
      dispatch(userAction.preSaveOrderRecommend({}));
      dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
    }
  };
  return (
    <VStack>
      <br />
      <br />
      <br />
      <br />
      <ModalGeneral>
        <OrderSuccess />
      </ModalGeneral>
      <Text fontWeight="bold" fontSize={30}>
        Thanh To??n
      </Text>
      <VStack marginTop="100px">
        <AiOutlineLine size={50} />
      </VStack>
      <br />
      <Formik
        initialValues={{
          addressId: "",
          payment: "COD",
        }}
        //   validationSchema={validate}
        onSubmit={handleOnClickCheckoutButton}
        // validationSchema={validate}
      >
        {({ setFieldValue }) => (
          <Form>
            <HStack w="100%" alignItems="flex-start">
              <VStack
                w="60%"
                ml={100}
                alignItems="start"
                boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
                p={5}
              >
                <Text fontWeight="bold"> Ch???n ?????a ch??? giao h??ng: </Text>

                <Select
                  ml={5}
                  placeholder="?????a ch??? giao h??ng"
                  name="addressId"
                  onChange={(e) => setFieldValue("addressId", e.target.value)}
                >
                  {AddressListSelector
                    ? AddressListSelector.map((address, index) => (
                        <option value={address.id} key={index}>
                          Ng?????i nh???n: {address.receiverName}, ?????a ch???:
                          {address.street}, {address.subDistrict},{" "}
                          {address.district}, {address.city}, {address.province}
                          S??T: {address.phoneNumber}
                        </option>
                      ))
                    : ""}

                  {/* <option value="1">
                    T??n ?????c Th???ng, Ho?? Nam,Ba ????nh ,H?? N???i, Ng?????i nh???n: Kh??nh
                    Huy???n, S??T: 0385030200
                  </option> */}
                </Select>
                <HStack w="100%" alignItems="start" ml={33}>
                  <Text fontWeight="hairline">
                    B???n ch??a c?? ?????a ch???? B???m ????? t???o:{" "}
                  </Text>
                  <span>
                    <Link href="/address" fontWeight="light">
                      {" "}
                      T???o ?????a ch???
                    </Link>
                  </span>
                </HStack>
                <Divider variant="solid" />
                <VStack w="100%" alignItems="start">
                  <Text fontWeight="bold">H??nh th???c thanh to??n:</Text>
                  <RadioGroup
                    defaultValue="COD"
                    name="payment"
                    onChange={(e) => {
                      console.log(e);
                      setFieldValue("payment", e);
                    }}
                  >
                    <Stack direction="column">
                      <Radio value="COD">Thanh to??n khi nh???n h??ng (COD)</Radio>
                      <Radio value="VNPAY">VNPay</Radio>
                    </Stack>
                  </RadioGroup>
                  {/* <RadioGroup>
                    <Stack direction="column">
                      <Radio value="1">Thanh to??n khi nh???n h??ng (COD)</Radio>
                      <Radio value="2">VNPay</Radio>
                    </Stack>
                  </RadioGroup> */}
                </VStack>
                <Divider variant="solid" />
                <VStack w="100%" alignItems="start">
                  <Text fontWeight="bold">Nh???p m?? gi???m gi??:</Text>
                  <HStack>
                    <Input
                      type="text"
                      placeholder="M?? gi???m gi??"
                      value={value}
                      onChange={handleChange}
                      name="voucherCode"
                      isReadOnly={readOnly}
                    ></Input>
                    <Button
                      bg="gray.900"
                      color="white"
                      onClick={() => handleOnClickPromo(value)}
                    >
                      ??p d???ng
                    </Button>
                  </HStack>
                </VStack>
              </VStack>
              <VStack w="40%" pr={100}>
                <Box
                  w="100%"
                  textAlign="center"
                  backgroundColor="#DFDFDE"
                  borderRadius="5px"
                >
                  <Text fontWeight="bold" fontSize={20}>
                    ????n h??ng
                  </Text>
                </Box>
                <br />
                {CartItemListSelector
                  ? CartItemListSelector.map((cartItem, index) => (
                      <HStack w="100%" key={index}>
                        <Image
                          src={cartItem.imageUrl}
                          w="90px"
                          h="90px"
                          alt={cartItem.productSKUName}
                        />
                        <VStack w="100%" alignItems="start">
                          <HStack justifyContent="space-between" w="100%">
                            <Text fontSize={18}>{cartItem.productSKUName}</Text>
                            {/* <Button
                        // onClick={() => handleOnClickDeleteButton(cartItem.id)}
                        >
                          X
                        </Button> */}
                          </HStack>
                          <HStack justifyContent="space-between" w="100%">
                            <Text>{cartItem.quantity}</Text>
                            <Text fontWeight="bold">
                              {(
                                cartItem.price * cartItem.quantity
                              ).toLocaleString("it-IT", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </Text>
                          </HStack>
                          <Divider />
                        </VStack>
                      </HStack>
                    ))
                  : ""}
                <br />
                <VStack w="100%">
                  <HStack w="100%" justifyContent="space-between">
                    <Text fontSize={18}>T???ng ti???n s???n ph???m: </Text>
                    <Text fontWeight="bold">
                      {subTotal
                        ? subTotal.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })
                        : null}
                    </Text>
                  </HStack>
                  <HStack w="100%" justifyContent="space-between">
                    <Text fontSize={18}>Ph?? ship: </Text>
                    <Text fontWeight="bold">25.000 VND</Text>
                  </HStack>
                  <HStack w="100%" justifyContent="space-between">
                    <Text fontSize={18}>Gi???m gi??: </Text>
                    <Text fontWeight="bold">
                      {NewPriceSelector
                        ? NewPriceSelector.discountValue.toLocaleString(
                            "it-IT",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )
                        : "0 VN??"}
                    </Text>
                  </HStack>
                  <HStack w="100%" justifyContent="space-between">
                    <Text fontSize={18}>T???ng ti???n ????n h??ng: </Text>
                    <Text fontWeight="bold">
                      {paymentTotal
                        ? paymentTotal.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })
                        : null}
                    </Text>
                  </HStack>
                  <HStack>
                    <Button w="400px" bg="gray.900" color="white" type="submit">
                      Thanh To??n{" "}
                    </Button>
                  </HStack>
                </VStack>
                <br />
                {/* <HStack justifyContent="space-between" w="100%">
              <Button w={150} onClick={handleViewCart}>
                Xem gi??? h??ng
              </Button>
              <Button w={150} onClick={handleOrder}>
                Thanh to??n
              </Button>
            </HStack> */}
              </VStack>
            </HStack>
          </Form>
        )}
      </Formik>
    </VStack>
  );
}
Order.Layout = MainLayout;
