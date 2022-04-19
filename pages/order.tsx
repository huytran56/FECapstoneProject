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
import { selectCartItemList, userAction } from "@store/user";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { AiOutlineLine, AiFillPlusCircle } from "react-icons/ai";

export default function Order() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(userAction.preSetCartItemList({}));
  }, [dispatch]);
  const CartItemListSelector = useAppSelector(selectCartItemList);
  let sum;
  if (CartItemListSelector !== undefined) {
    sum = CartItemListSelector.reduce(
      (sum, element) => sum + element.price * element.quantity,
      0
    );
  }
  return (
    <VStack>
      <br />
      <br />
      <br />
      <br />
      <ModalGeneral>
        <AddAddress />
      </ModalGeneral>
      <Text fontWeight="bold" fontSize={30}>
        Thanh Toán
      </Text>
      <VStack marginTop="100px">
        <AiOutlineLine size={50} />
      </VStack>
      <br />
      <HStack w="100%" alignItems="flex-start">
        <VStack
          w="60%"
          ml={100}
          alignItems="start"
          boxShadow="rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
          p={5}
        >
          <Text fontWeight="bold"> Chọn địa chỉ giao hàng: </Text>
          <Select
            ml={5}
            placeholder="Địa chỉ giao hàng"
            name="gender_id"
            // onChange={(e) => setFieldValue("gender_id", e.target.value)}
          >
            <option value="0">
              Hùng Vương, Nam Lý,Đồng Hải,Đồng Hới,Quảng Bình, Người nhận: Đức
              Huy, SĐT: 0848050620
            </option>
            <option value="1">
              Tôn Đức Thắng, Hoà Nam,Ba Đình ,Hà Nội, Người nhận: Khánh Huyền,
              SĐT: 0385030200
            </option>
          </Select>
          <HStack w="100%" alignItems="start" ml={33}>
            <Text fontWeight="hairline">Bạn chưa có địa chỉ? Bấm để tạo: </Text>
            <span>
              <Link href="/address" fontWeight="light">
                {" "}
                Tạo địa chỉ
              </Link>
            </span>
          </HStack>
          <Divider variant="solid" />
          <VStack w="100%" alignItems="start">
            <Text fontWeight="bold">Hình thức thanh toán:</Text>
            <RadioGroup>
              <Stack direction="column">
                <Radio value="1">Thanh toán khi nhận hàng (COD)</Radio>
                <Radio value="2">VNPay</Radio>
              </Stack>
            </RadioGroup>
          </VStack>
          <Divider variant="solid" />
          <VStack w="100%" alignItems="start">
            <Text fontWeight="bold">Nhập mã giảm giá:</Text>
            <HStack>
              <Input type="text" placeholder="Mã giảm giá"></Input>
              <Button
                bg={useColorModeValue("gray.900", "gray.50")}
                color={useColorModeValue("white", "gray.900")}
              >
                Áp dụng
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
              Đơn hàng
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
          <VStack w="100%">
            <HStack w="100%" justifyContent="space-between">
              <Text fontSize={18}>Tổng tiền sản phẩm: </Text>
              <Text fontWeight="bold">
                {sum
                  ? sum.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                  : null}
              </Text>
            </HStack>
            <HStack w="100%" justifyContent="space-between">
              <Text fontSize={18}>Phí ship: </Text>
              <Text fontWeight="bold">15.000 VND</Text>
            </HStack>
            <HStack w="100%" justifyContent="space-between">
              <Text fontSize={18}>Giảm giá: </Text>
              <Text fontWeight="bold">- 30.000 VND</Text>
            </HStack>
            <HStack w="100%" justifyContent="space-between">
              <Text fontSize={18}>Tổng tiền đơn hàng: </Text>
              <Text fontWeight="bold">
                {sum
                  ? (sum + 15000 - 30000).toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })
                  : null}
              </Text>
            </HStack>
            <HStack>
              <Button
                w="400px"
                bg={useColorModeValue("gray.900", "gray.50")}
                color={useColorModeValue("white", "gray.900")}
              >
                Thanh Toán{" "}
              </Button>
            </HStack>
          </VStack>
          <br />
          {/* <HStack justifyContent="space-between" w="100%">
              <Button w={150} onClick={handleViewCart}>
                Xem giỏ hàng
              </Button>
              <Button w={150} onClick={handleOrder}>
                Thanh toán
              </Button>
            </HStack> */}
        </VStack>
      </HStack>
    </VStack>
  );
}
Order.Layout = MainLayout;
