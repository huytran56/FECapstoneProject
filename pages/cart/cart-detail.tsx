import { handleGetCartItemList } from "@api/auth-api";
import {
  Container,
  HStack,
  Image,
  Input,
  VStack,
  Stack,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Divider,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { MainLayout } from "@components/layout";
import { ICartItem } from "@models/user";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@app/hook";
import { selectCartItemList, selectNumberItem, userAction } from "@store/user";
import { AiOutlineLine, AiOutlineRollback } from "react-icons/ai";

export default function CartDetail() {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    dispatch(userAction.preSetCartItemList({}));
  }, [dispatch]);
  const CartItemListSelector = useAppSelector(selectCartItemList);
  const numberItemSelector = useAppSelector(selectNumberItem);

  function handleOnClickDeleteButton(c) {
    dispatch(
      userAction.preDeleteItemFromCart({ deleteItemFromCartPayload: c })
    );
    console.log(c);
  }
  let sum;
  if (CartItemListSelector !== undefined) {
    sum = CartItemListSelector.reduce(
      (sum, element) => sum + element.price * element.quantity,
      0
    );
  }
  const handleChange = (quantity) => setQuantity(quantity);

  function handleIncrement(id, price, productSKUId) {
    (quantity) => setQuantity(quantity + 1);
    console.log(id, price, productSKUId, quantity);
    dispatch(
      userAction.preSetChangeQuantityCart({
        changeQuantityCartPayLoad: { id, price, productSKUId, quantity },
      })
    );
  }
  function handleDecrement(id, price, productSKUId) {
    (quantity) => setQuantity(quantity - 1);
    dispatch(
      userAction.preSetChangeQuantityCart({
        changeQuantityCartPayLoad: { id, price, productSKUId, quantity },
      })
    );
  }

  // console.log(CartItemListSelector);

  return (
    <>
      <VStack>
        <br />
        <br />
        <br />
        <br />
        <Text fontWeight="bold" fontSize={30}>
          Giỏ hàng của bạn
        </Text>
        <VStack marginTop="100px">
          <Text>
            Có {CartItemListSelector ? CartItemListSelector.length : 0} sản phẩm
            trong giỏ hàng
          </Text>
          <AiOutlineLine size={50} />
        </VStack>
        <br />

        {/* <Image
          src={CartItemListSelector ? CartItemListSelector[1].imageUrl : null}
          w="300px"
          h="300px"
        /> */}
      </VStack>
      <HStack paddingLeft={20}>
        <VStack w="65%">
          {CartItemListSelector
            ? CartItemListSelector.map((cartItem, index) => (
                <HStack w="100%" key={index}>
                  <Image
                    src={cartItem.imageUrl}
                    w={130}
                    h={130}
                    alt={cartItem.productSKUName}
                  />
                  <VStack w="60%">
                    <HStack w="100%" justifyContent="space-between">
                      <Text fontWeight="bold">{cartItem.productSKUName}</Text>
                      <Button
                        onClick={() => handleOnClickDeleteButton(cartItem.id)}
                      >
                        X
                      </Button>
                    </HStack>
                    <Text w="100%" alignItems="start">
                      {cartItem.price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>
                    {/* <Text w="100%" alignItems="start"></Text> */}
                    <HStack
                      w="100%"
                      alignItems="start"
                      justifyContent="space-between"
                    >
                      <NumberInput
                        size="sm"
                        defaultValue={1}
                        value={cartItem.quantity}
                        min={1}
                        w={90}
                        onChange={handleChange}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper
                            onClick={() =>
                              handleIncrement(
                                cartItem.id,
                                cartItem.price,
                                cartItem.productSKUId
                              )
                            }
                          />
                          <NumberDecrementStepper
                            onClick={() =>
                              handleDecrement(
                                cartItem.id,
                                cartItem.price,
                                cartItem.productSKUId
                              )
                            }
                          />
                        </NumberInputStepper>
                      </NumberInput>
                      <Text>
                        {(cartItem.price * cartItem.quantity).toLocaleString(
                          "it-IT",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                      </Text>
                    </HStack>
                    <Divider></Divider>
                  </VStack>
                </HStack>
              ))
            : null}
        </VStack>
        <VStack
          w="50%"
          p={5}
          boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
          marginRight="30px"
        >
          <Text fontWeight="bold" fontSize="30">
            Thông tin đơn hàng
          </Text>
          <br></br>
          <Divider />
          <HStack w="100%" justifyContent="space-between">
            <Text fontWeight="bold" fontSize="25">
              Tổng tiền
            </Text>
            <Text fontWeight="bold" fontSize="25">
              {sum
                ? sum.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })
                : null}
            </Text>
          </HStack>
          <br />
          <Divider />
          <VStack alignItems="start">
            <Text fontSize="15">
              Phí vận chuyển sẽ được tính ở trang thanh toán
            </Text>
            <Text fontSize="15">
              Bạn cũng có thể nhập mã giảm giá ở trang thanh toán
            </Text>
            <Button
              w="100%"
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
            >
              Thanh toán
            </Button>
          </VStack>
          <HStack w="100%">
            <AiOutlineRollback color="#42C2FF" />
            <Link href="/" textColor="#42C2FF">
              Tiếp tục mua hàng
            </Link>
          </HStack>
        </VStack>
      </HStack>
    </>
  );
}
// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   const { id } = query;
//   if (typeof id === "string") {
//     const cart_detail = await handleGetCartItemList();
//     if (!cart_detail) return { notFound: true };
//     if (cart_detail) return { props: { ...cart_detail } };
//   }

//   return { notFound: true };
// };
CartDetail.Layout = MainLayout;
