import { useAppDispatch, useAppSelector } from "@app/hook";
import {
  VStack,
  Text,
  HStack,
  Image,
  Button,
  Divider,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { selectCartItemList, userAction } from "@store/user";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export function Cart() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userAction.preSetCartItemList({}));
  }, [dispatch]);
  const CartItemListSelector = useAppSelector(selectCartItemList);
  // console.log(CartItemListSelector);
  let sum;
  if (CartItemListSelector !== undefined) {
    sum = CartItemListSelector.reduce(
      (sum, element) => sum + element.price * element.quantity,
      0
    );
  }

  if (CartItemListSelector !== undefined) {
    const totalItem = CartItemListSelector.length;
    dispatch(userAction.setNumberItem({ totalItem: totalItem }));
  }
  function handleOnClickDeleteButton(c) {
    dispatch(
      userAction.preDeleteItemFromCart({ deleteItemFromCartPayload: c })
    );
    console.log(c);
  }
  function handleViewCart() {
    router.push("/cart/cart-detail");
  }
  function handleOrder() {
    router.push("/order");
  }
  return (
    <VStack w="400px" p={3}>
      <Box w="100%" textAlign="center" backgroundColor="#630000">
        <Text fontWeight="bold" fontSize={20} textColor="white">
          Giỏ hàng
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
                  <Button
                    onClick={() => handleOnClickDeleteButton(cartItem.id)}
                  >
                    X
                  </Button>
                </HStack>
                <HStack justifyContent="space-between" w="100%">
                  <Text>{cartItem.quantity}</Text>
                  <Text fontWeight="bold">
                    {(cartItem.price * cartItem.quantity).toLocaleString(
                      "it-IT",
                      {
                        style: "currency",
                        currency: "VND",
                      }
                    )}
                  </Text>
                </HStack>
                <Divider />
              </VStack>
            </HStack>
          ))
        : null}
      <br />
      <HStack justifyContent="space-between" w="100%">
        <Text fontSize={23}>Tổng tiền: </Text>
        <Text fontWeight="bold">
          {sum
            ? sum.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })
            : null}
        </Text>
      </HStack>
      <br />
      <HStack justifyContent="space-between" w="100%">
        <Button
          w={150}
          onClick={handleViewCart}
          bg={useColorModeValue("gray.900", "gray.50")}
          color={useColorModeValue("white", "gray.900")}
        >
          Xem giỏ hàng
        </Button>
        <Button
          w={150}
          onClick={handleOrder}
          bg={useColorModeValue("gray.900", "gray.50")}
          color={useColorModeValue("white", "gray.900")}
        >
          Thanh toán
        </Button>
      </HStack>
    </VStack>
  );
}
