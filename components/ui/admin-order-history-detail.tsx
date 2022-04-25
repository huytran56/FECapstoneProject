import { useAppDispatch, useAppSelector } from "@app/hook";
import {
  FormControl,
  Stack,
  FormLabel,
  Input,
  HStack,
  VStack,
  Box,
  Select,
  Text,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  OrderedList,
  Image,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { IOrderItemDetail } from "@models/admin";
import {
  adminAction,
  selectCurrentEditAccount,
  selectCurrentOrderItem,
  selectCurrentProduct,
  selectProductSKUList,
} from "@store/admin";
import {
  selectCurrentOrderDetail,
  userAction,
  selectCurrentProductSKUs,
  selectCurrentOrderDetailPopup,
} from "@store/user";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ModalGeneralTwo, TextField } from ".";
import AddReview from "./add-review";

export function OrderHistoryDetailAdmin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentOrderDetailSelector = useAppSelector(selectCurrentOrderDetail);
  console.log(currentOrderDetailSelector);
  const currentOrderDetailPopupSelector = useAppSelector(
    selectCurrentOrderDetailPopup
  );
  useEffect(() => {
    console.log({ currentOrderDetailPopupSelector });
  }, [dispatch, currentOrderDetailPopupSelector]);

  //   function handleOnClickReview(order) {
  //     dispatch(adminAction.setIsOpenModalTwo({ isOpenModalTwo: true }));
  //     dispatch(
  //       userAction.setProductSKU({ currentProductSKUPayload: order.productSKUId })
  //     );
  //   }

  return (
    <VStack w="100%">
      {/* <ModalGeneralTwo>
        <AddReview />
      </ModalGeneralTwo> */}
      <Text fontWeight="bold" fontSize="25">
        Chi tiết đơn hàng
      </Text>
      <br />
      {currentOrderDetailPopupSelector
        ? currentOrderDetailPopupSelector.map((order: any, index) => (
            <HStack
              w="100%"
              justifyContent="space-between"
              boxShadow=" rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
              p={3}
              key={index}
            >
              <Image
                src={order.productSKU.product.productImage[0].url}
                h={120}
                w={120}
                onClick={() =>
                  router.push(`/product/${order.productSKU.product.product_id}`)
                }
              />
              <VStack w="100%" alignItems="left" h="100%" marginTop="10px">
                <HStack w="100%">
                  <Text fontWeight="bold">
                    {order.productSKU.product.product_name}, Size{" "}
                    {order.productSKU.size}
                  </Text>
                  <Text></Text>
                </HStack>
                <Text> Số lượng : {order.quantity}</Text>
                <Text>
                  {" "}
                  Giá tiền :{" "}
                  {(order.price * order.quantity).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Text>
              </VStack>
              {/* {currentOrderDetailSelector.orderStatus === "SUCCESSFUL" &&
              order.review === false ? (
                <Button
                  bg={useColorModeValue("gray.900", "gray.50")}
                  color={useColorModeValue("white", "gray.900")}
                  w="200px"
                  onClick={() => handleOnClickReview(order)}
                >
                  Đánh giá
                </Button>
              ) : null} */}
              {/* <Divider /> */}
            </HStack>
          ))
        : null}
    </VStack>
  );
}
