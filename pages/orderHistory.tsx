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
  Badge,
} from "@chakra-ui/react";
import { MainLayout } from "@components/layout";
import { AddAddress, ModalGeneral, OrderHistoryDetail } from "@components/ui";
import { adminAction, selectIsAddNewState } from "@store/admin";
import { selectCartItemList, userAction } from "@store/user";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  AiOutlineLine,
  AiFillPlusCircle,
  AiOutlineDelete,
  AiOutlineEye,
} from "react-icons/ai";

export default function OrderHistory() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAddNewStateSelector = useAppSelector(selectIsAddNewState);
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
  function handleOnClickDetailButton() {
    dispatch(adminAction.setIsAddNewState({ isAddNew: true }));
    dispatch(adminAction.setIsOpenModal({ isOpenModal: true }));
  }
  return (
    <VStack>
      <br />
      <br />
      <br />
      <br />
      <ModalGeneral>
        <OrderHistoryDetail />
      </ModalGeneral>
      <Text fontWeight="bold" fontSize={30}>
        Lịch sử mua hàng
      </Text>
      <VStack marginTop="100px">
        <AiOutlineLine size={50} />
      </VStack>
      <VStack w="100%">
        <VStack
          w="50%"
          boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
        >
          <HStack w="100%" p={2}>
            <HStack>
              <Text fontWeight="bold">Mã đơn hàng: </Text>
              <Text> 14</Text>
            </HStack>
            <HStack pl={44}>
              <Text fontWeight="Bold">Giá tiền: </Text>
              <Text>200.000 VNĐ</Text>
            </HStack>
          </HStack>
          <HStack w="100%" justifyContent="space-between" p={2}>
            <HStack>
              <Text fontWeight="bold">Ngày Order</Text>
              <Text>2020-05-03</Text>
            </HStack>
          </HStack>
          <HStack w="100%" justifyContent="space-between" p={2}>
            <HStack>
              <Text fontWeight="bold">Trạng thái đơn hàng</Text>
              <Badge colorScheme="green" fontSize={15}>
                Hoàn thành
              </Badge>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Trạng thái thanh toán</Text>
              <Badge colorScheme="green" fontSize={15}>
                Thành Công
              </Badge>
            </HStack>
            <HStack>
              <Button colorScheme="yellow" onClick={handleOnClickDetailButton}>
                <AiOutlineEye fontSize={25} />
              </Button>
            </HStack>
          </HStack>
        </VStack>
        <br />
        <VStack
          w="50%"
          boxShadow=" rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
        >
          <HStack w="100%" p={2}>
            <HStack>
              <Text fontWeight="bold">Mã đơn hàng: </Text>
              <Text> 15</Text>
            </HStack>
            <HStack pl={44}>
              <Text fontWeight="Bold">Giá tiền: </Text>
              <Text>500.000 VNĐ</Text>
            </HStack>
          </HStack>
          <HStack w="100%" p={2}>
            <HStack w="100%" justifyContent="space-between" p={2}>
              <HStack>
                <Text fontWeight="bold">Ngày Order</Text>
                <Text>2022-06-03</Text>
              </HStack>
            </HStack>
            <Button colorScheme="red">
              {" "}
              <AiOutlineDelete fontSize={25} />
            </Button>
          </HStack>
          <HStack w="100%" justifyContent="space-between" p={2}>
            <HStack>
              <Text fontWeight="bold">Trạng thái đơn hàng</Text>
              <Badge colorScheme="yellow" fontSize={15}>
                Chờ xác nhận
              </Badge>
            </HStack>
            <HStack>
              <Text fontWeight="bold">Trạng thái thanh toán</Text>
              <Badge colorScheme="yellow" fontSize={15}>
                Chờ thanh toán
              </Badge>
            </HStack>
            <HStack>
              <Button colorScheme="yellow" onClick={handleOnClickDetailButton}>
                <AiOutlineEye fontSize={25} />
              </Button>
            </HStack>
          </HStack>
        </VStack>
      </VStack>
      <br />
    </VStack>
  );
}
OrderHistory.Layout = MainLayout;
